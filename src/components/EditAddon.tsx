import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Addon } from '../typings/types';
import { getAccessToken } from '../utils';
import DeleteDialog from './DeleteDialog';
import Layout from './Layout';

const EditAddon = () => {
  const navigate = useNavigate();
  const params = useParams();
  const addonId = params.id as string;
  const { addons, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const accessToken = getAccessToken();
  const [addon, setAddon] = useState<Addon>();
  const selectedAddon = useMemo(
    () => addons.find((item) => item.id === Number(addonId)),
    [addons, addonId],
  );
  const currentAddon = addon ?? selectedAddon;

  const updateAddon = async () => {
    if (!currentAddon?.name) return alert('Name and price are required !');
    if (!currentAddon?.price) return alert('Name and price are required !');

    await fetch(`http://localhost:5000/addons/${addonId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentAddon),
    });
    accessToken && fetchData(accessToken);
    navigate('/addons');
  };

  const handleDeleteAddon = async () => {
    await fetch(`http://localhost:5000/addons/${addonId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate('/addons');
  };

  if (!currentAddon) return null;

  return (
    <Layout title="Edit Addon">
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
            defaultValue={currentAddon.name}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setAddon({ ...currentAddon, name: evt.target.value })
            }
          />
          <TextField
            type="number"
            defaultValue={currentAddon.price}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setAddon({ ...currentAddon, price: Number(evt.target.value) })
            }
          />
        </Box>

        <Button
          onClick={updateAddon}
          variant="contained"
          sx={{ mt: 2, width: 'fit-content' }}
        >
          update
        </Button>

        <DeleteDialog
          title="Are you sure you want to delete this addon?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteAddon}
        />
      </Box>
    </Layout>
  );
};

export default EditAddon;
