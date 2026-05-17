import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeContext } from '../../contexts/themeContext';

export default function ThemeEditor({ open, onClose }) {
  const { addCustomTheme, removeCustomTheme, availableThemes } = useContext(ThemeContext);
  const [themeName, setThemeName] = useState('');
  const [mode, setMode] = useState('light');
  const [colors, setColors] = useState({
    backgroundDefault: '#fafafa',
    backgroundPaper: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#666666',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
  });

  const handleColorChange = (field, value) => {
    setColors({
      ...colors,
      [field]: value,
    });
  };

  const handleSaveTheme = () => {
    if (themeName.trim()) {
      const customThemeId = `custom_${Date.now()}`;
      addCustomTheme(customThemeId, {
        name: themeName,
        mode,
        ...colors,
      });
      handleReset();
    }
  };

  const handleReset = () => {
    setThemeName('');
    setMode('light');
    setColors({
      backgroundDefault: '#fafafa',
      backgroundPaper: '#ffffff',
      textPrimary: '#000000',
      textSecondary: '#666666',
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const customThemes = Object.entries(availableThemes).filter(
    ([_, themeObj]) => themeObj.isCustom
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Theme Editor</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create New Theme
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                label="Theme Name"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
                  />
                }
                label={`Dark Mode: ${mode === 'dark' ? 'On' : 'Off'}`}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Color Palette
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Default Background
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.backgroundDefault}
                  onChange={(e) => handleColorChange('backgroundDefault', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.backgroundDefault}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Paper/Card Background
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.backgroundPaper}
                  onChange={(e) => handleColorChange('backgroundPaper', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.backgroundPaper}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Primary Text
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.textPrimary}
                  onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.textPrimary}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Secondary Text
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.textSecondary}
                  onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.textSecondary}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Primary Accent
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.primaryColor}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Secondary Accent
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <input
                  type="color"
                  value={colors.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  style={{ width: '60px', height: '50px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                  {colors.secondaryColor}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Card sx={{ backgroundColor: colors.backgroundPaper, color: colors.textPrimary }}>
              <CardContent>
                <Typography color={colors.textSecondary} gutterBottom>
                  Preview Text (Secondary)
                </Typography>
                <Typography color={colors.textPrimary} variant="h6">
                  Preview Text (Primary)
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {customThemes.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Custom Themes
            </Typography>
            <Grid container spacing={2}>
              {customThemes.map(([key, themeObj]) => (
                <Grid item xs={12} key={key}>
                  <Card>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Typography variant="h6">{themeObj.name}</Typography>
                        <Chip
                          label={themeObj.isCustom ? 'Custom' : 'Built-in'}
                          size="small"
                          color={themeObj.isCustom ? 'primary' : 'default'}
                          sx={{ mt: 1 }}
                        />
                      </div>
                      <IconButton
                        color="error"
                        onClick={() => removeCustomTheme(key)}
                        title="Delete theme"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleReset} color="inherit">
          Reset
        </Button>
        <Button onClick={handleSaveTheme} variant="contained" color="primary">
          Save Theme
        </Button>
      </DialogActions>
    </Dialog>
  );
}
