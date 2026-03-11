import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoriesByLocationId, getAddonsByLocationId } from "../utils";
import CreateAddon from './CreateAddon';
import Layout from "./Layout";

const Addons= ()=>{
    const [open, setOpen] = useState(false)
    const {addons, addonCategories, menusAddonCategories, menusMenuCategoriesLocations} = useContext(AppContext)
    console.log('addons', addons);
    
    const validAddonCategories = getAddonCategoriesByLocationId(addonCategories, menusAddonCategories, menusMenuCategoriesLocations)
    const validAddons = getAddonsByLocationId(addons, validAddonCategories)

    return(
        <Layout title="Addons">
            <Box sx= {{m: 3}}>
                <Box sx= {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon= {<AddIcon />} onClick={()=> setOpen(true)}>
                        Create New Addon
                    </Button>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {validAddons.map(item=> {
                        return (
                            <Link
                                key={item.id}
                                to= {`/addons/${item.id}`}
                                style= {{textDecoration: 'none'}}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{width: 170, height: 170, mr:4, mb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pl: 2, pb: 2,}}
                                >
                                
                                    <Typography sx={{ color: '#4c4c6d', fontWeight: 'bold'}}>
                                        {item.name}
                                    </Typography> 
                                    <Typography sx={{ color: '#4c4c6d', fontWeight: '500'}}>
                                        {item.price} kyats
                                    </Typography> 
                                </Paper>
                            </Link>
                        )
                    })}
                </Box>
            </Box>
            <CreateAddon open={open} setOpen={setOpen} />
        </Layout>
    )
}

export default Addons;