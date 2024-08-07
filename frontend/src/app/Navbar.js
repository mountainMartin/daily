import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { DevIcon, HomeIcon } from './AppIcons';
// import { useAuthenticationContext } from '../authentication/useAuthenticationContext';
import { useTheme } from '@emotion/react';

export const Navbar = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  //   const { auth } = useAuthenticationContext();

  const [activeLink, setActiveLink] = useState('');
  const [activeChildLink, setActiveChildLink] = useState('');
  const [activeParentLink, setActiveParentLink] = useState('');

  const navLinks = [
    {
      key: 'home',
      name: 'Hem',
      href: '/home',
      icon: <HomeIcon />,
      roles: ['GODADMIN', 'SUPERADMIN', 'ADMIN', 'SUPERUSER', 'USER'],
    },
    {
      key: 'dev',
      name: 'Dev',
      href: '/dev/',
      icon: <DevIcon />,
      roles: ['GODADMIN'],
      links: [
        {
          key: 'components',
          name: 'Komponenter',
          href: '/dev/components/',
          icon: <DevIcon />,
          roles: ['GODADMIN'],
        },
        {
          key: 'data',
          name: 'Data',
          href: '/dev/data/',
          icon: <DevIcon />,
          roles: ['GODADMIN'],
        },
      ],
    },
  ];

  const visibleLinks = true;
  //   const visibleLinks = navLinks.filter((link) =>
  //     link.roles.includes(auth.role)
  //   );

  const handleLinkColor = (state, link) => {
    if (state === 'single') {
      return activeLink === link.key ? theme.palette.primary.main : undefined;
    }

    if (state === 'parent') {
      return activeParentLink === link.key
        ? theme.palette.primary.main
        : undefined;
    }

    if (state === 'child') {
      return activeChildLink === link.key
        ? theme.palette.primary.main
        : undefined;
    }
  };

  const handleNavClick = (state, link) => {
    if (state === 'single') {
      navigate(link.href);
      setActiveLink(link.key);
      setActiveChildLink('');
      setActiveParentLink('');
    }

    if (state === 'parent') {
      if (activeParentLink === link.key) {
        setActiveParentLink('');
      } else {
        setActiveParentLink(link.key);
      }
    }

    if (state === 'child') {
      navigate(link.href);
      setActiveLink('');
      setActiveChildLink(link.key);
    }
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }} component='nav'>
      {visibleLinks.map((link) => {
        return (
          <div key={link.key} style={{ padding: '5px' }}>
            <ListItemButton
              onClick={() => {
                link.links
                  ? handleNavClick('parent', link)
                  : handleNavClick('single', link);
              }}
              color='info'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: link.links
                  ? handleLinkColor('parent', link)
                  : handleLinkColor('single', link),
                padding: '5px 10px',
                borderRadius: '5px',
                alignItems: 'center',
                opacity: activeParentLink === link.key ? 0.7 : undefined,
              }}
            >
              <ListItemIcon
                style={{
                  color:
                    activeLink === link.key || activeParentLink === link.key
                      ? '#ffffff'
                      : undefined,
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    activeLink === link.key || activeParentLink === link.key
                      ? '#ffffff'
                      : undefined,
                }}
                primary={link.name}
              />

              {link.links && activeParentLink === link.key ? (
                <MdKeyboardArrowUp
                  style={{
                    color:
                      activeLink === link.key || activeParentLink === link.key
                        ? '#ffffff'
                        : undefined,
                  }}
                />
              ) : link.links && activeLink !== link.key ? (
                <MdKeyboardArrowDown
                  style={{
                    color:
                      activeLink === link.key || activeParentLink === link.key
                        ? '#ffffff'
                        : undefined,
                  }}
                />
              ) : null}
            </ListItemButton>
            {link.links && (
              <Collapse
                in={activeParentLink === link.key}
                timeout='auto'
                unmountOnExit
                sx={{ padding: '5px 0px 5px 20px' }}
              >
                {link.links.map((subLink) => (
                  <div key={subLink.key} style={{ padding: '2px' }}>
                    <ListItemButton
                      onClick={() => handleNavClick('child', subLink)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        background:
                          activeChildLink === subLink.key
                            ? theme.palette.primary.main
                            : undefined,
                        padding: '5px 10px',
                        borderRadius: '5px',
                        alignItems: 'center',
                      }}
                    >
                      <ListItemIcon
                        style={{
                          color:
                            activeChildLink === subLink.key
                              ? '#ffffff'
                              : undefined,
                        }}
                      >
                        {subLink.icon}
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          color:
                            activeChildLink === subLink.key
                              ? '#ffffff'
                              : undefined,
                        }}
                        primary={subLink.name}
                      />
                    </ListItemButton>
                  </div>
                ))}
              </Collapse>
            )}
          </div>
        );
      })}
    </List>
  );
};
