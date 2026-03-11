import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Location } from '../typings/types';
import { getAccessToken } from '../utils';
import DeleteDialog from './DeleteDialog';
import Layout from './Layout';

const EditLocation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const locationId = params.id as string;
  const { locations, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const accessToken = getAccessToken();
  const [location, setLocation] = useState<Location>();
  const selectedLocation = useMemo(
    () => locations.find((item) => item.id === Number(locationId)),
    [locations, locationId],
  );
  const currentLocation = location ?? selectedLocation;

  const updateLocation = async () => {
    if (!currentLocation?.name || !currentLocation?.address)
      return alert('Name and address are required !');

    await fetch(`http://localhost:5000/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentLocation),
    });
    accessToken && fetchData(accessToken);
    navigate('/locations');
  };

  const handleDeleteLocation = async () => {
    const isValid = location?.name && location.address;
    if (!isValid) alert('Name and address are required!');

    await fetch(`http://localhost:5000/locations/${locationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate('/locations');
  };

  if (!currentLocation) return null;

  return (
    <Layout title="Edit Location">
      <Box sx={{ m: 3, display: 'flex', flexDirection: 'column' }}>
        <Box style={{ textAlign: 'right' }}>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            maxWidth: 700,
          }}
        >
          <TextField
            defaultValue={currentLocation.name}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setLocation({ ...currentLocation, name: evt.target.value })
            }
          />
          <TextField
            defaultValue={currentLocation.address}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setLocation({ ...currentLocation, address: evt.target.value })
            }
          />
        </Box>

        <Button
          onClick={updateLocation}
          variant="contained"
          sx={{ mt: 2, width: 'fit-content' }}
        >
          update
        </Button>

        <DeleteDialog
          title="Are you sure you want to delete this location?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteLocation}
        />
      </Box>
    </Layout>
  );
};

export default EditLocation;
