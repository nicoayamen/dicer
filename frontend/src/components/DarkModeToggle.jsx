// DarkModeToggle.jsx
import React from 'react';
import { IconButton } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import '../styles/darkmodetoggle.css';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DarkModeToggle;
