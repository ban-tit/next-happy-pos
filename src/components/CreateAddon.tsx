//2.6.2023 videos yu nna naw galaw ra
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoriesByLocationId, getSelectedLocationId } from "../utils";
// import FileDropZone from "./FileDropZone";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void
}

const CreateAddon=({open, setOpen}: Props)=>{
    const {menus, menuCategories, menusAddonCategories, menusMenuCategoriesLocations, addonCategories, fetchData}= useContext(AppContext)
    const accessToken = localStorage.getItem('accessToken')
    const selectedLocationId = getSelectedLocationId() as string;
    const [newAddon, setNewAddon] = useState({
        name: '',
        price: 0,
        addonCategoryId: ''
    })

    const validAddonCategories = getAddonCategoriesByLocationId(addonCategories, menusAddonCategories, menusMenuCategoriesLocations)
    const createNewAddon = async () => {
        const isValid = newAddon.name && newAddon.addonCategoryId
        if(!isValid) return alert('Name and addon category are required!');

        await fetch('http://localhost:5000/addons',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAddon)
        })

        accessToken && fetchData(accessToken)        
        setOpen(false)
    }
    
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}
            sx={{p: 4}}
        >
            <DialogTitle variant='h5'>Create New Addon</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column', width: 400}}>
                    <TextField 
                        placeholder="name" 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setNewAddon({...newAddon, name: evt.target.value})}/>
                    <TextField placeholder="price" type="number" sx={{mb: 2}} 
                        onChange={(evt)=>setNewAddon({...newAddon, price: Number(evt.target.value)})} />
                    <FormControl fullWidth>
                        <InputLabel>Addon Category</InputLabel>
                        <Select
                            label='Addon Category'
                            value= {newAddon.addonCategoryId}
                            onChange={(evt)=>
                                setNewAddon({...newAddon, addonCategoryId: String(evt.target.value)})
                            }
                        >
                            {
                                addonCategories.map(item=>{
                                    return <MenuItem value={item.id}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' sx={{width: 'fit-content'}} onClick={createNewAddon}>
                    Create Addon
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateAddon;