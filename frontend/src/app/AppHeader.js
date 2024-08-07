import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIconButton } from '../components/icon-buttons/SettingsIconButton';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
} from '@mui/material';
import { Logout } from '../authentication/useAuthenticationApi';
import { LogoutIcon } from './AppIcons';
import { useAuthenticationContext } from '../authentication/useAuthenticationContext';

export const AppHeader = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthenticationContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { mutate: logout } = Logout();

  const handleLogout = () => {
    handleCloseSettings();
    logout();
    setAuth(null);
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '1em',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <SettingsIconButton size='large' onClick={handleClickSettings} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logga ut</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
};
