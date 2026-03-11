import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getSelectedLocationId } from "../utils";
import CreateTable from './CreateTable';
import Layout from "./Layout";

const Tables= ()=>{
    const [open, setOpen] = useState(false)
    const {tables} = useContext(AppContext)
    const selectedLocationId = getSelectedLocationId()
    
    const validTables = tables.filter(item => item.locations_id === Number(selectedLocationId))

    return(
        <Layout title="Tables">
            <Box sx= {{m: 3}}>
                <Box sx= {{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" startIcon= {<AddIcon />} onClick={()=> setOpen(true)}>
                        Create New Table
                    </Button>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}
                >
                    {validTables.map(item=> {
                        return (
                            <Link
                                key={item.id}
                                to= {`/tables/${item.id}`}
                                style= {{textDecoration: 'none'}}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{width: 170, height: 170, mr:4, mb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pl: 2, pb: 2,}}
                                >
                                
                                    <Typography sx={{ color: '#4c4c6d', fontWeight: 'bold'}}>
                                        {item.name}
                                    </Typography> 
                                </Paper>
                            </Link>
                        )
                    })}
                </Box>
            </Box>
            <CreateTable open={open} setOpen={setOpen} />
        </Layout>
    )
}

export default Tables;