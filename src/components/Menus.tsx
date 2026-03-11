import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { AppContext } from "../contexts/AppContext";
import pic from '../pictures/test1.jpg';
import { getAccessToken, getMenuByLocationId } from "../utils";
import NewMenu from "./CreateMenu";
import Layout from "./Layout";


const Menus=()=>{
    const {menus, menusMenuCategoriesLocations}= useContext(AppContext)
    const [open, setOpen] = useState(false)
    const validMenus = getMenuByLocationId(menus, menusMenuCategoriesLocations)
    const accessToken = getAccessToken()
       
    return(
        <Layout title="menus">
            <Box sx= {{m: 3}}>
                <Box sx= {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon= {<AddIcon />} onClick={()=> setOpen(true)}>
                        Create New Menu
                    </Button>
                </Box>
                <Box sx={{mt: 3,display: 'flex'}}>
                    {validMenus.map(menu=>{
                        return(
                            <Link
                                key={menu.id}
                                to= {`/menus/${menu.id}`}
                                style= {{textDecoration: 'none'}}
                            >
                                <Card 
                                    sx={{maxWidth: 345, mr: 5, display: 'flex', alignItems: 'center'}}
                                    key={menu.id}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            component='img'
                                            height= '140'
                                            image= {pic}
                                            alt= 'mote hin khar'
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component='div'
                                            >
                                                {menu.name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                component='div'
                                            >
                                                {menu.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        )
                    })}
                </Box>
            </Box>

            <NewMenu open= {open} setOpen={setOpen} />
        </Layout>
    )
}

export default Menus;