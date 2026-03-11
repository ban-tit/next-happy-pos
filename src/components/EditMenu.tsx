import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { Menu } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditMenu= ()=>{
    const navigate = useNavigate()
    const params = useParams()
    const menuId = params.id as string;
    const {locations, menus, fetchData} = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const accessToken = getAccessToken()
    const [menu, setMenu] = useState<Menu>()
   
    const updateMenu = async () => {
        await fetch(`http://localhost:5000/menus/${menuId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menu)    
        })
        accessToken && fetchData(accessToken)
        navigate('/menus')        
    }

    const handleDeleteMenu = async () => {
        const isValid= menu?.name && menu.description
        if(!isValid) alert ('Name and address are required!')
            
        await fetch(`http://localhost:5000/menus/${menuId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
        accessToken && fetchData(accessToken)
        setOpen(false)
        navigate('/menus')
    }

    useEffect(()=>{
        if(menus.length) {
            const validMenu = menus.find(
                item => item.id === Number(menuId)
            )
            setMenu(validMenu)
        }
    }, [menus]);

    if(!menu) return null;
    
    return(
        <Layout title="Edit Menu">
            <Box
                 sx={{m:3, display: 'flex', flexDirection: 'column'
                 }}
            >   
                <Box
                    style={{textAlign: 'right'}}
                >
                    <Button
                        color= 'error'
                        variant= 'contained'
                        onClick= {()=> setOpen(true)}
                        startIcon= {<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        mt: 2,
                        maxWidth: 700
                    }}
                >
                    <TextField 
                        defaultValue={menu.name} 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setMenu({...menu, name: evt.target.value})}
                    />
                    <TextField 
                        defaultValue={menu.description} 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setMenu({...menu, description: evt.target.value})}
                    />
                </Box>
                
                <Button 
                    onClick={updateMenu} 
                    variant="contained" 
                    sx={{mt: 2, width: 'fit-content'}}
                >
                    update
                </Button>

                <DeleteDialog
                    title= 'Are you sure you want to delete this menu?'
                    open= {open}
                    setOpen= {setOpen}
                    callback= {handleDeleteMenu}
                />
            </Box>
        </Layout>
    )
}

export default EditMenu;