import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, TextField } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Menu } from '../typings/types';
import { getAccessToken } from '../utils';
import DeleteDialog from './DeleteDialog';
import Layout from './Layout';

const EditMenu = () => {
  const navigate = useNavigate();
  const params = useParams();
  const menuId = params.id as string;
  const { locations, menus, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const accessToken = getAccessToken();
  const [menu, setMenu] = useState<Menu>();
  const selectedMenu = useMemo(
    () => menus.find((item) => item.id === Number(menuId)),
    [menus, menuId],
  );
  const currentMenu = menu ?? selectedMenu;

  const updateMenu = async () => {
    if (!currentMenu?.name || !currentMenu?.description)
      return alert('Name and description are required !');

    await fetch(`http://localhost:5000/menus/${menuId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentMenu),
    });
    accessToken && fetchData(accessToken);
    navigate('/menus');
  };

  const handleDeleteMenu = async () => {
    const isValid = menu?.name && menu.description;
    if (!isValid) alert('Name and address are required!');

    await fetch(`http://localhost:5000/menus/${menuId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate('/menus');
  };

  if (!currentMenu) return null;

  return (
    <Layout title="Edit Menu">
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
            defaultValue={currentMenu.name}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...currentMenu, name: evt.target.value })
            }
          />
          <TextField
            defaultValue={currentMenu.description}
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...currentMenu, description: evt.target.value })
            }
          />
        </Box>

        <Button
          onClick={updateMenu}
          variant="contained"
          sx={{ mt: 2, width: 'fit-content' }}
        >
          update
        </Button>

        <DeleteDialog
          title="Are you sure you want to delete this menu?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteMenu}
        />
      </Box>
    </Layout>
  );
};

export default EditMenu;
