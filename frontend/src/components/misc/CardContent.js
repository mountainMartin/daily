import React, { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import MUIBox from '@mui/material/Box';
import MUITabs from '@mui/material/Tabs';
import MUITab from '@mui/material/Tab';
import MUICard from '@mui/material/Card';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CloseIconButton } from '../icon-buttons/CloseIconButton';

const boxStyles = {
  margin: '0em, 0em, 0em, 2em',
  borderTopRightRadius: '15px',
  borderTopLeftRadius: '15px',
  padding: '0',
  width: 'fit-content',
};

export const CardContent = ({
  children,
  tabs,
  value,
  removable,
  tabList,
  handleTabChange,
  handleRemoveTab,
  ...props
}) => {
  const tabStyles = {
    minHeight: '30px',
    '.MuiTabs-scroller': {
      display: tabs && tabList.length === 0 ? 'none' : undefined,
    },
    '.MuiTabs-flexContainer': {
      padding: '2px 2px 0px 2px',
      marginLeft: '0.1em',
      borderTopRightRadius: '15px',
      borderTopLeftRadius: '15px',
      background: '#e7e7e7',
    },
    '.MuiTab-root': {
      borderTopRightRadius: '15px',
      borderTopLeftRadius: '15px',
      textTransform: 'none',
      minWidth: 72,
      padding: '4px 12px 0px 12px',
      fontSize: '0.85rem',
      minHeight: '30px',
      gap: '10px',
      '&.Mui-selected': {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 600,
      },
    },
    '.MuiButtonBase-root': {
      gap: '2em',
    },
    '.MuiTab-wrapper': {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '100px',
    },
    '.MuiTabs-indicator': {
      backgroundColor: 'transparent',
    },
  };

  const [tabpanel, setTabpanel] = useState(null);

  useEffect(() => {
    if (tabs) {
      const _tab = children.find((child) => child.props.value === value);
      setTabpanel(_tab);
    }
  }, [tabs, value, children]);

  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  return (
    <>
      {tabs ? (
        <MUIBox sx={boxStyles}>
          <MUITabs value={value} onChange={handleChange} sx={tabStyles}>
            {tabList.map((tab) => (
              <MUITab
                disableRipple
                component='div'
                key={tab.id}
                label={tab.label}
                value={tab.id}
                icon={
                  removable && tab.id === value ? (
                    <CloseIconButton onClick={() => handleRemoveTab(tab)} />
                  ) : null
                }
                iconPosition='end'
              />
            ))}
          </MUITabs>
        </MUIBox>
      ) : null}
      <MUICard
        sx={{
          bgcolor: 'background.paper',
          ...props.style,
        }}
      >
        {props.title && (
          <>
            <Typography color='default' variant='h5' sx={{ padding: 2 }}>
              {props.title}
            </Typography>
            <div style={{ padding: '1em' }}>
              <Divider />
            </div>
          </>
        )}

        {props.subtitle && (
          <Typography color='default' variant='h7' sx={{ paddingLeft: 2 }}>
            {props.subtitle}
          </Typography>
        )}
        <MUICardContent>{tabs ? tabpanel : children}</MUICardContent>
      </MUICard>
    </>
  );
};
