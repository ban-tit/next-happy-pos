import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Menu } from '../typings/types';
import {
  getAccessToken,
  getAddonCategoriesByLocationId,
  getMenuByLocationId,
  getMenuCategoriesByLocationId,
  getMenusByAddonCategoryId,
  getSelectedLocationId,
} from '../utils';
import Autocomplete from './Autocomplete';
import DeleteDialog from './DeleteDialog';
import Layout from './Layout';

const EditAddonCategory = () => {
  const navigate = useNavigate();
  const {
    menus,
    menuCategories,
    menusAddonCategories,
    addonCategories,
    locations,
    menusMenuCategoriesLocations,
    fetchData,
  } = useContext(AppContext);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [openDeleteAddonCategoryDialog, setOpenDeleteAddonCategoryDialog] =
    useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu>();
  const selectedLocationId = getSelectedLocationId() as string;
  const addonCategoryId = params.id as string;
  const [newAddonCategory, setNewAddonCategory] = useState({
    id: addonCategoryId,
    name: '',
    menuIds: [] as number[],
  });

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  );
  console.log('validAddonCategories:', validAddonCategories);

  if (!addonCategoryId) return null;

  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId),
  );
  if (!addonCategory)
    return (
      <Layout title="Edit Addon Category">
        <Box sx={{ mt: 3, ml: 3, display: 'flex' }}>
          <Typography variant="h4">Addon Category not found.</Typography>
        </Box>
      </Layout>
    );

  const menuCategorieByLocationId = getMenuCategoriesByLocationId(
    menuCategories,
    menusMenuCategoriesLocations,
  );
  console.log('menuCategorieByLocationId', menuCategorieByLocationId);
  const chosenMenuIds = menusAddonCategories
    .filter((item) => item.addon_categories_id === Number(addonCategoryId))
    .map((item) => item.menus_id);

  console.log(
    'test',
    menus.map((item) => chosenMenuIds.includes(item.id as number)),
  );

  // const mappedValidLocations = validLocaions.map(item => ({id: item.id as number, name: item.name}))
  // console.log('locations', locations);
  // console.log('mappedValidLocations', mappedValidLocations);

  const mappedMenus = getMenuByLocationId(
    menus,
    menusMenuCategoriesLocations,
  ).map((item) => ({ id: item.id as number, name: item.name }));
  // const mappedMenus = menus.map(item => ({id: item.id as number, name: item.name}))
  // const mappedLocations = locations.map(item => ({id: item.id as number, name: item.name}))
  // .filter((item)=>{
  //     const validLocaionIds = validLocaions.map((item)=> item.id as number)
  //     return !validLocaionIds.includes(item.id)
  // })
  console.log('mappedMenus', mappedMenus);

  const accessToken = getAccessToken();

  const menusByAddonCategoryId = getMenusByAddonCategoryId(
    Number(addonCategoryId),
    menusAddonCategories,
  );
  console.log('menusByAddonCategoryId:', menusByAddonCategoryId);
  const validMenuIds = menusByAddonCategoryId.map((item) => item.menus_id);
  console.log('validMenuIds: ', validMenuIds);

  const mappedValidMenus = mappedMenus.filter((item) =>
    validMenuIds.includes(item.id),
  );
  console.log('mappedValidMenus: ', mappedValidMenus);

  const updateAddonCategory = async () => {
    const payload = {
      ...newAddonCategory,
      name: newAddonCategory.name.length
        ? newAddonCategory.name
        : addonCategory.name,
    };
    console.log('newAddonCategory', payload);

    await fetch(`http://localhost:5000/addonCategories/${addonCategoryId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate('/addonCategories');
  };

  const handleRemoveMenuFromMenuCategory = async () => {
    await fetch(`http://localhost:5000/menuCategories/removeMenu`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuId: selectedMenu?.id,
        addonCategoryId,
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData(accessToken);
  };

  const handleDeleteAddonCategory = async () => {
    await fetch(`http://localhost:5000/addonCategories/${addonCategoryId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddonCategory),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate('/addonCategories');
  };

  // useEffect(()=>{
  //     if(addonCategories.length) {
  //         const validAddonCategory = addonCategories.find(
  //             item => item.id === Number(addonCategoryId)
  //         )
  //         // setNewAddonCategory(validAddonCategory)
  //     }
  // }, [addonCategories])

  if (!addonCategory) return null;

  return (
    <Layout title="Edit Addon Categories">
      <Box sx={{ p: 3 }}>
        <Box style={{ textAlign: 'right' }}>
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpenDeleteAddonCategoryDialog(true)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Box>
        <Box>
          <Box>
            <TextField
              defaultValue={addonCategory.name}
              sx={{ mb: 2 }}
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  name: evt.target.value,
                })
              }
            />
          </Box>

          <Autocomplete
            options={mappedMenus}
            defaultValue={mappedValidMenus}
            label="Menus"
            placeholder="Menus"
            onChange={(options) =>
              setNewAddonCategory({
                ...newAddonCategory,
                menuIds: options.map((item) => item.id),
              })
            }
          />

          <FormControlLabel
            sx={{ my: 2 }}
            control={
              <Switch
                checked={addonCategory.isReuqierd ? true : false}
                onChange={(evt) => {
                  setNewAddonCategory({
                    ...newAddonCategory,
                    // is_required: evt.target.checked
                  });
                }}
              />
            }
            label="required"
          />
          <Button
            onClick={updateAddonCategory}
            variant="contained"
            sx={{ mt: 5, width: 'fit-content' }}
          >
            update
          </Button>
        </Box>
      </Box>

      <DeleteDialog
        title="Are you sure that you want to remove this addon category ?"
        open={openDeleteAddonCategoryDialog}
        setOpen={setOpenDeleteAddonCategoryDialog}
        callback={handleDeleteAddonCategory}
      />
    </Layout>
  );
};

export default EditAddonCategory;
