import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" sx={{ fontFamily: 'PixelGame', marginBottom: 1 }}>
          Matthew's Awesome TMDB Client
        </Typography>
        <Typography variant="caption" align="center" color="textSecondary" display="block">
          Powered by The Movie Database (TMDB) API
        </Typography>
        <Typography variant="caption" align="center" color="textSecondary" display="block">
          © {currentYear} Matthew Horan.
        </Typography>
      </Container>
    </Box>
  );
};

export default SiteFooter;
