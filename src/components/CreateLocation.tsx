import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useContext, useState } from "react"

import { AppContext } from "../contexts/AppContext"
import { getAccessToken } from "../utils"

interface Props {
    open: boolean,
    setOpen: (value: boolean) => void
}

const CreateLocation = ({open, setOpen}: Props) => {
    const [newLocation, setNewLocation] = useState({name: '', address: ''})
    const {fetchData, company} = useContext(AppContext)
    const accessToken = getAccessToken()
    
    const createLocation = async () => {
        const isValid = newLocation.name && newLocation.address && company?.id
        if(!isValid) {return alert('Name and address are required!'); }

        await fetch('http://localhost:5000/locations',{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newLocation.name, address: newLocation.address, companyId: company.id})
        })
        accessToken && fetchData(accessToken)
        setOpen(false)
    }
    
    return(
        <Dialog 
            open={open}
            onClose={()=>setOpen(false)}
        >
            <DialogTitle>create new location</DialogTitle>
            <DialogContent sx={{width: 400}}>
                <TextField placeholder="Location name" sx={{mb: 2, width: '100%'}} onChange={(evt)=>setNewLocation({...newLocation, name: evt.target.value})}/>

                <TextField placeholder="Address name" sx={{mb: 2, width: '100%'}} onChange={(evt)=>setNewLocation({...newLocation, address: evt.target.value})}/>

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button 
                        onClick={createLocation}
                        variant="contained"
                    >
                        Create
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>  
    )
}

export default CreateLocation