import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PaletteIcon from '@mui/icons-material/Palette';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../../contexts/themeContext';
import ThemeEditor from '../themeEditor';

export default function ThemeSwitcher() {
  const { currentThemeName, setTheme, availableThemes, isDarkMode } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
    handleClose();
  };

  const handleOpenEditor = () => {
    handleClose();
    setEditorOpen(true);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="theme menu"
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        title="Select theme"
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Object.entries(availableThemes).map(([key, themeConfig]) => (
          <MenuItem
            key={key}
            onClick={() => handleThemeSelect(key)}
            selected={key === currentThemeName}
          >
            {themeConfig.name}
            {themeConfig.isCustom}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleOpenEditor}>
          <AddIcon sx={{ mr: 1 }} />
          Create Theme
        </MenuItem>
      </Menu>
      <ThemeEditor open={editorOpen} onClose={() => setEditorOpen(false)} />
    </>
  );
}
