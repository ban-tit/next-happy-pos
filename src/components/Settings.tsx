// import { useContext, useEffect, useState } from "react";
// import Layout from "./Layout";
// import { AppContext } from "../contexts/AppContext";
// import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

// const Settings=()=>{
//     const {fetchData, locations, company} = useContext(AppContext)
//     const [selectedLocationId, setSelectedLocationId]= useState<string>('')
//     console.log('selectedLocationId',selectedLocationId);
//     const accessToken= localStorage.getItem('accessToken')

//     useEffect(()=>{
//         if(locations.length){
//             const locationIdFromLocalStorage= localStorage.getItem('selectedLocationId')
//             if(locationIdFromLocalStorage){
//                 setSelectedLocationId(locationIdFromLocalStorage)
//             } else {
//                 const firstLocationId= String(locations[0].id)
//                 setSelectedLocationId(firstLocationId)
//             }
//         }
//     }, [locations])

//     useEffect(()=>{
//         if(accessToken){
//             fetchData()
//         }
//     }, [accessToken, selectedLocationId])

//     const handleChange= (event: SelectChangeEvent)=> {
//         const locationId= event.target.value
//         setSelectedLocationId(locationId)
//         localStorage.setItem('selectedLocationId', event.target.value)
//     }

//     return(
//         <Layout title="Settings">
//             <Box sx={{p: 3, width: '300px'}}>
//                 <TextField defaultValue={company?.name} />
//                 <Box sx={{mt: 3}}>
//                     <FormControl fullWidth>
//                         <InputLabel>Location</InputLabel>
//                         <Select
//                             value={selectedLocationId}
//                             label='Location'
//                             onChange={handleChange}
//                         >
//                             {
//                                 locations.map(location=>{
//                                     return <MenuItem value={location.id}
//                                                 key={location.id}
//                                             >
//                                                 {location.name}
//                                             </MenuItem>
//                                 })
//                             }
//                         </Select>
//                     </FormControl>
//                 </Box>
//             </Box>
//         </Layout>
//     )
// }

// export default Settings;

import { useContext, useState } from 'react';
import Layout from './Layout';
import { AppContext } from '../contexts/AppContext';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

const Settings = () => {
  const { fetchData, locations, company } = useContext(AppContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    () => localStorage.getItem('selectedLocationId') || '',
  );
  console.log('selectedLocationId', selectedLocationId);
  const accessToken = localStorage.getItem('accessToken') as string;

  const effectiveLocationId =
    selectedLocationId || (locations.length ? String(locations[0].id) : '');

  const handleChange = (event: SelectChangeEvent) => {
    const locationId = event.target.value;
    setSelectedLocationId(locationId);
    localStorage.setItem('selectedLocationId', event.target.value);
    fetchData(accessToken);
  };

  if (!company) return null;

  return (
    <Layout title="Settings">
      <Box sx={{ p: 3, width: '300px' }}>
        <TextField defaultValue={company?.name} />

        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={effectiveLocationId}
              label="Location"
              onChange={handleChange}
            >
              {locations.map((location) => {
                return (
                  <MenuItem value={location.id} key={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;
