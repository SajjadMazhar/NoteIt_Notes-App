import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Link } from 'react-router-dom';
import userContext from '../context/UserContext';
import designContext from '../context/DesignContext';
const pages = ['favourites', 'login', 'register', 'about']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {profile, host, isLoggedIn, setIsloggedIn } = React.useContext(userContext)
  const {mode} = React.useContext(designContext)

  const handleLogOut = (setting)=>{
    const {navigate} = React.useContext(userContext)
    if(setting === 'logout'){
      localStorage.removeItem("authToken")
      setIsloggedIn(false)
      navigate('/login')
      window.location.reload()
    }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{backgroundColor:mode==="light"?"#ed6c02":"#282828"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NoteAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
         <Link to="/" style={{textDecoration:"none", color:"white"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NoteIt
          </Typography>
         </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {!isLoggedIn?pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/${page}`} style={{textDecoration:"none", color:"black"}}><Typography component="div" textAlign="center">{page.toUpperCase()}</Typography></Link>
                  </MenuItem>

              )):
              pages.filter(page=> (page==="login" || page==="register")? false:true)
              .map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/${page}`} style={{textDecoration:"none", color:"black"}}><Typography component="div" textAlign="center">{page.toUpperCase()}</Typography></Link>
                  </MenuItem>))
              }
            </Menu>
          </Box>
          <NoteAltIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Link to="/" style={{textDecoration:"none", color:"white"}}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NoteIt
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {!isLoggedIn?pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/${page}`} style={{textDecoration:"none", color:"white"}}><Typography component="div" textAlign="center">{page.toUpperCase()}</Typography></Link>
                  </MenuItem>

              )):
              pages.filter(page=> (page==="login" || page==="register")? false:true)
              .map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={`/${page}`} style={{textDecoration:"none", color:"white"}}><Typography component="div" textAlign="center">{page.toUpperCase()}</Typography></Link>
                  </MenuItem>))
              }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={!profile? "" : host+"/"+profile.dp} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn? settings.map((setting) => (
                <Link key={setting} to={`/${setting}`} onClick={()=>handleLogOut(setting.toLowerCase())} style={{textDecoration:"none", color:"black"}}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                </Link>
              )):
              settings.filter((setting) => (setting==="Logout")? false:true).map((setting) => (
                <Link key={setting} to={`/${setting}`} onClick={()=>handleLogOut(setting.toLowerCase())} style={{textDecoration:"none", color:"black"}}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
