import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { PageTitleContext } from "../../contexts/pageTitleContext";
import ThemeSwitcher from "../themeSwitcher";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pageTitle } = useContext(PageTitleContext);
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlist", path: "/movies/playlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/topRated" },
    { label: "Now Playing", path: "/movies/nowPlaying" }
  ];

  const handleMenuSelect = (pageURL) => {
    setDrawerOpen(false);
    navigate(pageURL);
  };

  const handleMenuOpen = () => {
    setDrawerOpen(true);
  };

  const handleMenuClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography 
            variant="h4" 
            sx={{ flexGrow: 1, fontFamily: 'PixelGame', cursor: 'pointer' }}
            onClick={() => navigate("/")}
          >
            MATMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'PixelGame' }}>
            {pageTitle}
          </Typography>
          <ThemeSwitcher />
          <IconButton
            aria-label="menu"
            aria-controls="menu-drawer"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            id="menu-drawer"
            anchor="right"
            open={drawerOpen}
            onClose={handleMenuClose}
          >
            <List sx={{ width: 250 }}>
              {menuOptions.map((opt) => (
                <ListItem
                  button
                  key={opt.label}
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  <ListItemText 
                    primary={opt.label} 
                    primaryTypographyProps={{ sx: { fontFamily: 'PixelGame' } }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
