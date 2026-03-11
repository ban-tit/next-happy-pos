//2.6.2023 videos yu nna naw galaw ra
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";
// import FileDropZone from "./FileDropZone";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void
}

const CreateAddonCategory=({open, setOpen}: Props)=>{
    const {menus, fetchData}= useContext(AppContext)
    const accessToken = localStorage.getItem('accessToken')
    const [newAddonCategory, setNewAddonCategory] = useState({
        name: '', 
        isRequired: false,
        menuIds: [] as number []
    })
    
    const createNewAddonCategory = async () => {
        const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
        if(!isValid) return alert('name and menus are required!');

        const response = await fetch('http://localhost:5000/addonCategories',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddonCategory)
        })

        accessToken && fetchData(accessToken)        
        setOpen(false)
    }

    const mappedMenus = menus.map(item => ({
        id: item.id as number,
        name: item.name
    }))
    
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}
            sx={{p: 4, display: 'flex'}}
        >
            <DialogTitle variant='h5'>Create New Addon Category</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField 
                        placeholder="name" 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setNewAddonCategory({...newAddonCategory, name: evt.target.value})}/>
                                     
                    <Box 
                        sx={{mb: 2}}
                    >
                        <Autocomplete 
                            options={mappedMenus} 
                            label='menus' 
                            placeholder="menus"
                            onChange={(options)=>
                                setNewAddonCategory({
                                    ...newAddonCategory, 
                                    menuIds: options.map(item => item.id)
                                })
                            }
                        />
                    </Box> 

                    <FormControlLabel
                        sx={{my: 2}}
                        control={
                            <Switch
                                checked={newAddonCategory.isRequired}
                                onChange={(evt)=>{
                                    setNewAddonCategory({
                                        ...newAddonCategory,
                                        isRequired: evt.target.checked
                                    })
                                }}
                            />
                        } 
                        label= 'required'  
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' sx={{width: 'fit-content', mb: 1}} onClick={createNewAddonCategory}>
                    Create Addon Category
                </Button>
            </DialogActions>
        </Dialog>        
    )
}

export default CreateAddonCategory;