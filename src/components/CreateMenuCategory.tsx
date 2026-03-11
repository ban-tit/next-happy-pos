//2.6.2023 videos yu nna naw galaw ra
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";
// import FileDropZone from "./FileDropZone";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void
}

const CreateMenuCategory=({open, setOpen}: Props)=>{
    const {locations, fetchData}= useContext(AppContext)
    const accessToken = localStorage.getItem('accessToken')
    const [newMenuCategory, setNewMenuCategory] = useState({
        name: '', 
        locationIds: [] as number []
    })
    
    const createNewMenuCategory = async () => {
        const isValid = newMenuCategory.name && newMenuCategory.locationIds.length;
        if(!isValid) return alert('name and locations are required!');

        const response = await fetch('http://localhost:5000/menuCategories',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuCategory)
        })

        accessToken && fetchData(accessToken)        
        setOpen(false)
    }

    const mappedLocations = locations.map(item => ({
        id: item.id as number,
        name: item.name
    }))
    
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}
            sx={{p: 4}}
        >
            <DialogTitle variant='h5'>Create New Menu Category</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: 500}}>
                    <TextField 
                        placeholder="name" 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setNewMenuCategory({...newMenuCategory, name: evt.target.value})}/>
                                     
                    <Box 
                        sx={{mb: 2}}
                    >
                        <Autocomplete 
                            options={mappedLocations} 
                            label='Locations' 
                            placeholder="Locations"
                            onChange={(options)=>
                                setNewMenuCategory({
                                    ...newMenuCategory, 
                                    locationIds: options.map(item => item.id)
                                })
                            }
                        />
                    </Box>                                      
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' sx={{width: 'fit-content'}} onClick={createNewMenuCategory}>
                    Create Menu Category
                </Button>
            </DialogActions>
        </Dialog>        
    )
}

export default CreateMenuCategory;