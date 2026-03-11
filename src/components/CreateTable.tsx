import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"

import { AppContext } from "../contexts/AppContext"
import { getAccessToken, getSelectedLocationId } from "../utils"

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

const CreateTable = ({open, setOpen}: Props) => {
    const {fetchData} = useContext(AppContext)
    const [newTable, setNewTable] = useState('')
    const accessToken = getAccessToken()
    const selectedLocationId = getSelectedLocationId()
    
    const createTable = async () => {
        if(!newTable) {return alert('Table name is required!'); }

        await fetch('http://localhost:5000/tables',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newTable, locationId: selectedLocationId})
        })
        accessToken && fetchData(accessToken)
        setOpen(false)
    }
    
    return(
        <Dialog 
            open={open}
            onClose={()=>setOpen(false)}
        >
            <DialogTitle>create new table</DialogTitle>
            <DialogContent sx={{width: 400}}>
                <TextField placeholder="Table name" sx={{mb: 2, width: '100%'}} onChange={(evt)=>setNewTable(evt.target.value)}/>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button 
                        onClick={createTable}
                        variant="contained"
                    >
                        Create
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>  
    )
}

export default CreateTable