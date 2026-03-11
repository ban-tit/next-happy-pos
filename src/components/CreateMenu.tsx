//2.6.2023 videos yu nna naw galaw ra
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { getMenuCategoriesByLocationId, getSelectedLocationId } from "../utils";
import Autocomplete from "./Autocomplete";
// import FileDropZone from "./FileDropZone";

interface Props {
    open: boolean;
    setOpen: (value: boolean) => void
}

const CreateMenu=({open, setOpen}: Props)=>{
    const {menuCategories, menusMenuCategoriesLocations, fetchData}= useContext(AppContext)
    // const [selectedFiles, setSelectedFiles] = useState<File[]>()
    const accessToken = localStorage.getItem('accessToken')
    const selectedLocationId = getSelectedLocationId() as string;
    const [newMenu, setNewMenu] = useState({
        name: '', 
        description: '', 
        price: 0, 
        assetUrl: '', 
        locationId: selectedLocationId,
        menuCategoryIds: [] as number[]
    })
    
    const createNewMenu = async () => {
        const isValid = newMenu.name && newMenu.description && newMenu.menuCategoryIds
        if(!isValid) return alert('name, description and menu categories are required!');

        // if(selectedFiles?.length) {
        //     const formData = new FormData()
        //     formData.append('file', selectedFiles[0])
    
        //     const response = await fetch('http://localhost:5000/assets', {
        //         method: 'POST',
        //         body: formData
        //     })
        //     const responseData = await response.json()
        //     newMenu.assetUrl = responseData.assetUrl
        // }
        
        const response = await fetch('http://localhost:5000/menus',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenu)
        })

        accessToken && fetchData(accessToken)        
        setOpen(false)
    }

    // const onFileSelected = (selectedFiles: File[]) => {
    //     setSelectedFiles(selectedFiles);
        
    // }

    const validMenuCategory = getMenuCategoriesByLocationId(menuCategories, menusMenuCategoriesLocations)
    const mappedMenuCategories = validMenuCategory.map(item => ({
        id: item.id as number,
        name: item.name
    }))
    
    return(
        <Dialog open={open} onClose={()=>setOpen(false)}
            sx={{p: 4}}
        >
            <DialogTitle variant='h5'>Create New Menu</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'column', maxWidth: 500}}>
                    <TextField 
                        placeholder="name" 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setNewMenu({...newMenu, name: evt.target.value})}/>

                    <TextField 
                        placeholder="description" 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setNewMenu({...newMenu, description: evt.target.value})} 
                    />
                    
                    <TextField placeholder="price" type="number" sx={{mb: 2}} 
                        onChange={(evt)=>setNewMenu({...newMenu, price: Number(evt.target.value)})} />

                    <Box 
                        sx={{mb: 2}}
                    >
                        <Autocomplete 
                            options={mappedMenuCategories} 
                            label='Menu categories' 
                            placeholder="Menu categories"
                            onChange={(options)=>
                                setNewMenu({
                                    ...newMenu, 
                                    menuCategoryIds: options.map(item => item.id)
                                })
                            }
                        />
                    </Box>

                    <Box>
                        <input type="file" onChange={(evt)=>console.log(evt.target.value)} />
                        <Chip   onDelete={()=>{
                                    // const filteredSelectedFiles = selectedFiles.filter(selectedFile => selectedFile.name !== file.name)
                                    // setSelectedFiles(filteredSelectedFiles)
                                }} 
                        />                    
                    </Box>
                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' sx={{width: 'fit-content'}} onClick={createNewMenu}>
                    Create Menu
                </Button>
            </DialogActions>
        </Dialog>
        // <Layout title="create menu">
        //     <Box sx={{ml:3, mt: 5, display: 'flex', flexDirection: 'column', maxWidth: 500}}>
        //         <TextField placeholder="name" sx={{mb: 2}} onChange={(evt)=>setNewMenu({...newMenu, name: evt.target.value})}/>
        //         <TextField placeholder="description" sx={{mb: 2}} onChange={(evt)=>setNewMenu({...newMenu, description: evt.target.value})} />
        //         <TextField placeholder="price" type="number" sx={{mb: 2}} 
        //             onChange={(evt)=>setNewMenu({...newMenu, price: Number(evt.target.value)})} />

        //         <Box>
        //             <input type="file" onChange={(evt)=>console.log(evt.target.value)} />
        //             <Chip   onDelete={()=>{
        //                         // const filteredSelectedFiles = selectedFiles.filter(selectedFile => selectedFile.name !== file.name)
        //                         // setSelectedFiles(filteredSelectedFiles)
        //                     }} 
        //             />

        //             {/* <FileDropZone onFileSelected={onFileSelected} /> */}
        //             {/* {selectedFiles.map(file => {
        //                 return <Chip key={file.name} label={file.name} 
        //                             onDelete={()=>{
        //                                 const filteredSelectedFiles = selectedFiles.filter(selectedFile => selectedFile.name !== file.name)
        //                                 setSelectedFiles(filteredSelectedFiles)
        //                             }} />
        //             })} */}
        //         </Box>
        //         <Button variant='contained' sx={{width: 'fit-content', mt: 5}} onClick={createNewMenu}>
        //             Create Menu
        //         </Button>
        //     </Box>
        // </Layout>
    )
}

export default CreateMenu;