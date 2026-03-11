import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getMenuCategoriesByLocationId } from "../utils";
import CreateMenuCategory from './CreateMenuCategory';
import Layout from "./Layout";

const MenuCategories= ()=>{
    const {menuCategories, menusMenuCategoriesLocations} = useContext(AppContext)
    const [open, setOpen] = useState(false)
    
    const validMenuCategories = getMenuCategoriesByLocationId(menuCategories, menusMenuCategoriesLocations)

    return(
        <Layout title="Menu Categories">
            <Box sx= {{m: 3}}>
                <Box sx= {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon= {<AddIcon />} onClick={()=> setOpen(true)}>
                        Create New Menu Category
                    </Button>
                </Box>

                <Box
                    sx={{ display: 'flex',
                        flexWrap: 'wrap',
                        mt: 2,
                    }}
                >
                    {validMenuCategories.map(item=> {
                        return (
                            <Link to={`/menuCategories/${item.id}`} key={item.id}>
                                <Box
                                    sx={{background: 'lightblue', mr: 2, width: 200, height: 200, borderRadius: '10px',display: 'flex',
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.name}
                                    </Typography> 
                                </Box>
                            </Link>)

                        })
                    }
                </Box>
            </Box>

            <CreateMenuCategory open={open} setOpen= {setOpen} />

        </Layout>
    )
}

export default MenuCategories;