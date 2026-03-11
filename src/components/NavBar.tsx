import CategoryIcon from '@mui/icons-material/Category'
import ClassIcon from '@mui/icons-material/Class'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LunchDiningIcon from '@mui/icons-material/LunchDining'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import TableBarIcon from '@mui/icons-material/TableBar'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButtuon from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const sidebarMenuItems= [
    {id: 1, label: 'orders', icon: <LocalMallIcon />, route: '/'},
    {id: 2, label: 'Menu Categories', icon: <CategoryIcon />, route: '/menuCategories'},
    {id: 3, label: 'Menus', icon: <LocalDiningIcon />, route: '/menus'},
    {id: 4, label: 'Addon Categories', icon: <ClassIcon />, route: '/addonCategories'},
    {id: 5, label: 'Addons', icon: <LunchDiningIcon />, route: '/addons'},
    {id: 6, label: 'tables', icon: <TableBarIcon />, route: '/tables'},
    {id: 7, label: 'Locations', icon: <LocationOnIcon />, route: '/locations'},
    {id: 8, label: 'Settings', icon: <SettingsIcon />, route: '/settings'},
]

interface Props{
    title?: string
}

const NavBar = ({title}:Props) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   
    const handleClose = () => {
        setAnchorEl(null)
	}

    const logout= () => {
        localStorage.removeItem('accessToken')
    }

    const renderDrawer= () =>{
        return(
            <Box
                sx={{width: 250}}
                role='presentation'
                onClick={()=>setOpen(false)}
                onKeyDown={()=>setOpen(false)}
            >
                <List>
                    {sidebarMenuItems.slice(0,7).map((menuItem)=>(
                        <Link to={menuItem.route} key={menuItem.id}
                            style={{textDecoration:'none', color:'#000'}}>
                            <ListItem key={menuItem.id} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {menuItem.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menuItem.label} />
                                </ListItemButton>                        
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {sidebarMenuItems.slice(-1).map((menuItem)=>(
                        <Link to={menuItem.route} key={menuItem.id} 
                            style={{textDecoration:'none', color:'#000'}}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {menuItem.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menuItem.label} />
                                </ListItemButton>                        
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        )         
    }

    if(title==='Log out'){
        return(
            <Box sx={{display:'flex', justifyContent: 'space-between',}}>
                <AppBar 
                    position='static' 
                    sx={{ }}
                >
                    <Toolbar
                        sx={{display:'flex', justifyContent: 'space-between',background:'green',alignItems: 'center'}}
                    >
                        <IconButtuon
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{mr: 2, color: 'green'}}
                            disabled
                        >
                            <MenuIcon sx={{color: 'green'}} />
                            
                        </IconButtuon>
                        <Typography 
                            variant='h6' 
                            component='div' 
                        >
                            Foodie POS{title && title==='Log out' ? `` : ` - ${title}`}
                        </Typography>
                        <Link 
                            onClick={logout}
                            to={'/login'}  
                            style={{textDecoration: 'none', color: 'white'}}
                        >
                            <Typography 
                                variant='h6' 
                                component='div' 
                            >
                                Log in
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }

    return(
        <Box sx={{display:'flex', justifyContent: 'space-between',}}>
            <AppBar 
                position='static' 
            >
                <Toolbar
                    sx={{display:'flex', justifyContent: 'space-between',background:'green',alignItems: 'center'}}
                >
                    <IconButtuon
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{mr: 2}}
                        disabled={title==='Log in' ? true : false}
                        onClick= {()=> setOpen(true)}                        
                    >
                        <MenuIcon sx={{color: title==='Log in' ? 'green' : 'white'}} />                        
                    </IconButtuon>
                    <Typography 
                        variant='h6' 
                        component='div' 
                    >
                        Foodie POS{title && title==='Log out' ? `` : ` - ${title}`}
                    </Typography>
                    <Link 
                        onClick={logout}
                        to={'/logout'}  
                        style={{textDecoration:'none', color:title==='Log in'? 'green':'white'}}
                    >
                        <Typography 
                            variant='h6' 
                            component='div' 
                        >
                            {/* {title==='Log in' ? '' : 'Log out'} */}
                            {title==='Log out' ? 'Log in' : 'Log out'}
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box>
                <Drawer open={open} onClose={()=>setOpen(false)}>
                    {renderDrawer()}
                </Drawer>
            </Box>
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuIcon onClick={handleClose}>Profile</MenuIcon>
                <MenuIcon onClick={handleClose}>My account</MenuIcon>
            </Menu>
        </Box>
    )
}

export default NavBar;