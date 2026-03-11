import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import { getAccessToken, getLocationsByMenuCategoryId, getMenusByMenuCategoryId, getSelectedLocationId } from "../utils";
import Autocomplete from "./Autocomplete";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";
import MenuCard from "./MenuCard";

const EditMenuCategories= ()=>{
    const navigate = useNavigate()
    const {menus, menuCategories, locations, menusMenuCategoriesLocations, fetchData} = useContext(AppContext)
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState<Menu>()
    const selectedLocationId = getSelectedLocationId() as string
    const menuCategoryId = params.id as string;
    const [newMenuCategory, setNewMenuCategory] = useState({
        id: menuCategoryId,
        name: '',
        locationIds: [] as number[]
    })   
    const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([])

    const validLocaions = getLocationsByMenuCategoryId(locations, menuCategoryId, menusMenuCategoriesLocations)

    const validLocaionIds = validLocaions.map(item => item.id)
    
    if( !menuCategoryId ) return null
    
    const menuCategory = menuCategories.find(item => item.id === Number(menuCategoryId))
    if(!menuCategory) return <Layout title="Edit Menu Categories">
                                <Box
                                    sx={{mt:3, ml: 3, display: 'flex',
                                }}
                                >
                                    <Typography variant="h4">Menu Category not found.</Typography>
                                </Box>
                            </Layout>

const mappedValidLocations = validLocaions.map(item => ({id: item.id as number, name: item.name}))
console.log('locations', locations);
console.log('mappedValidLocations', mappedValidLocations);

const mappedLocations = locations.map(item => ({id: item.id as number, name: item.name}))
// .filter((item)=>{
    //     const validLocaionIds = validLocaions.map((item)=> item.id as number)
    //     return !validLocaionIds.includes(item.id)
    // })
    console.log('mapped locations', mappedLocations);
    
    const validMenus = getMenusByMenuCategoryId(menus, menuCategoryId, menusMenuCategoriesLocations)
    
    const validMenuIds = validMenus.map(item => item.id) as number []
    
    const accessToken = getAccessToken()
    
    const updateMenuCategory = async () => {
        console.log('newMenuCategory', newMenuCategory);
        
        await fetch('http://localhost:5000/menuCategories', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenuCategory)
        })
    }
    
    const handleDeleteMenuCategory = async () => {
        await fetch(`http://localhost:5000/menuCategories/${menuCategoryId}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({locationId: selectedLocationId})
        })
        accessToken && fetchData(accessToken)
        navigate('/menuCategories')
    }
    
    const handleRemoveMenuFromMenuCategory = async () => {
        await fetch(`http://localhost:5000/menuCategories/removeMenu`,{
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({menuId: selectedMenu?.id, menuCategoryId, locationId: selectedLocationId})
        })
        accessToken && fetchData(accessToken)
    }

    const handleAddMenusToMenuCategory = async () => {
        await fetch(`http://localhost:5000/menuCategories/addMenu`,{
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({menuIds: selectedMenuIds, menuCategoryId, locationIds: validLocaionIds})
        })
        accessToken && fetchData(accessToken)
    }

    const mappedMenus = menus.map((item) => ({
        id: item.id as number,
        name: `${item.name} - ${item.id}`
    })).filter(item => !validMenuIds.includes(item.id))
    
    return(
        <Layout title="Edit Menu Categories">
            <Box sx={{p: 3}}>
                <Box
                    style={{textAlign: 'right'}}
                >
                    <Button
                        color= 'error'
                        variant= 'contained'
                        onClick= {()=> setOpenDeleteMenuCategoryDialog(true)}
                        startIcon= {<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </Box>
                <Box>   
                    <Box>
                        <TextField 
                            defaultValue={menuCategory.name} 
                            sx={{mb: 2}} 
                            onChange={(evt)=>setNewMenuCategory({...newMenuCategory, name: evt.target.value})}
                        />
                    </Box>
                    
                    <Autocomplete 
                        options={mappedLocations} 
                        defaultValue={mappedValidLocations} 
                        label='Locations' 
                        placeholder="Locations"
                        onChange={(options)=>setNewMenuCategory({...newMenuCategory, locationIds: options.map(item => item.id)})}
                    />
                    <Button 
                        onClick={updateMenuCategory} 
                        variant="contained" 
                        sx={{mt: 5, width: 'fit-content'}}
                    >
                        update
                    </Button>

                    <Box sx={{mt: 5}}>
                        <Typography variant="h3" sx={{mb: 2}}>Menus</Typography>

                        <Box>
                            <Autocomplete 
                                options={mappedMenus} 
                                label='Menus' 
                                placeholder="Menus"
                                onChange={(options)=>setSelectedMenuIds(options.map(item => item.id))}
                            />

                            <Button 
                                variant='contained' 
                                sx={{mt: 2}} 
                                onClick={handleAddMenusToMenuCategory}
                            >
                                Add
                            </Button>
                        </Box>

                        <Box 
                            sx= {{
                                mt: 5, 
                                display: 'flex',
                                flexWrap: 'wrap'                      
                            }}
                        >

                            {validMenus.map(item => {
                                return (
                                    <Box
                                        key= {item.id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            mr: 2
                                        }}
                                    >
                                        <MenuCard menu= {item} />

                                        <Button
                                            onClick={()=> {
                                                setSelectedMenu(item)
                                                setOpen(true)
                                            }}
                                            variant="contained"
                                            color= 'error'
                                            sx={{mt: 1, width: 'fit-content'}}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                )
                            })}
                        </Box>   
                    </Box>             
                </Box>
            </Box>

            <DeleteDialog 
                title='Are you sure that you want to remove this menu category ?'
                open={openDeleteMenuCategoryDialog} 
                setOpen={setOpenDeleteMenuCategoryDialog} 
                callback={handleDeleteMenuCategory} 
            />

            <DeleteDialog 
                title='Are you sure that you want to remove this menu from this menu category ?'
                open={open} 
                setOpen={setOpen} 
                callback={handleRemoveMenuFromMenuCategory} 
            />
        </Layout>
    )
}

export default EditMenuCategories;