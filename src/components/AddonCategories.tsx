import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoriesByLocationId } from "../utils";
import CreateAddonCategory from './CreateAddonCategory';
import Layout from "./Layout";

const AddonCategories= ()=>{
    const {addonCategories, menusAddonCategories, menusMenuCategoriesLocations} = useContext(AppContext)
    const [open, setOpen] = useState(false)
    
    const validAddonCategories = getAddonCategoriesByLocationId(addonCategories, menusAddonCategories, menusMenuCategoriesLocations)

    return(
        <Layout title="Addon Categories">
             <Box sx= {{m: 3}}>
                <Box sx= {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon= {<AddIcon />} onClick={()=> setOpen(true)}>
                        Create New Addon Category
                    </Button>
                </Box>
                <Box
                    sx={{mt:3, ml: 3, display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {validAddonCategories.map(item=> {
                        return (
                            <Link
                                key={item.id}
                                to= {`/addonCategories/${item.id}`}
                                style= {{textDecoration: 'none'}}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{width: 170, height: 170, mr:4, mb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pl: 2, pb: 2,}}
                                >
                                
                                    <Typography sx={{ fontWeight: 'bold'}}>{item.name}</Typography> 
                                    {/* <Typography sx={{ color: '#4c4c6d', fontWeight: '500'}}>
                                        {item.menu} menus
                                    </Typography> */}
                                </Paper>
                            </Link>
                        )
                    })}
                </Box>
                <CreateAddonCategory open= {open} setOpen={setOpen} />
            </Box>
        </Layout>
    )
}

export default AddonCategories;