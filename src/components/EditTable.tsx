import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { Table } from '../typings/types';
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditTable= ()=>{
    const navigate = useNavigate()
    const params = useParams()
    const tableId = params.id as string;
    const {tables, fetchData} = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const accessToken = getAccessToken()
    const [table, setTable] = useState<Table>()
   
    const updateTable = async () => {
        const isValid = table && table.name
        if(!isValid) return alert ('Table name is required!')

        await fetch(`http://localhost:5000/tables/${tableId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(table)    
        })
        accessToken && fetchData(accessToken)
        navigate('/tables')        
    }

    const handleDeleteTable = async () => {
        await fetch(`http://localhost:5000/tables/${tableId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        })
        accessToken && fetchData(accessToken)
        setOpen(false)
        navigate('/tables')
    }

    useEffect(()=>{
        if(tables.length) {
            const validTable = tables.find(
                item => item.id === Number(tableId)
            )
            validTable && setTable(validTable)
        }
    }, [tables]);

    if(!table) return null;
    
    return(
        <Layout title="Edit Table">
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
                        defaultValue={table.name} 
                        sx={{mb: 2}} 
                        onChange={(evt)=>setTable({...table, name: evt.target.value})}
                    />
                </Box>
                
                <Button 
                    onClick={updateTable} 
                    variant="contained" 
                    sx={{mt: 2, width: 'fit-content'}}
                >
                    update
                </Button>

                <DeleteDialog
                    title= 'Are you sure you want to delete this table?'
                    open= {open}
                    setOpen= {setOpen}
                    callback= {handleDeleteTable}
                />
            </Box>
        </Layout>
    )
}

export default EditTable;