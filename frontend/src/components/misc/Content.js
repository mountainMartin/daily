import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export const Content = ({
  tabs,
  tabList,
  lastTab,
  children,
  handleTabChange,
}) => {
  const [value, setValue] = useState(lastTab);
  const [tabpanel, setTabpanel] = useState(null);

  useEffect(() => {
    if (tabs && lastTab) {
      setValue(lastTab);
    } else {
      setValue(1);
    }
  }, [tabs, lastTab]);

  useEffect(() => {
    if (tabs) {
      const tab = children.find((item) => item.props.value === value);

      if (tab) {
        setTabpanel(tab);
      } else {
        const first = children.find((item) => item.props.value === 1);
        setTabpanel(first);
      }
    }
  }, [children, tabs, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleTabChange
      ? handleTabChange(newValue)
      : console.log('no sessionHandleChange');
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: '5px',
          margin: '2em 2em 0em 2em',
          bgcolor: 'background.paper',
          boxShadow:
            'inset rgb(50 50 93 / 25%) 0px 2px 5px -1px, inset rgb(0 0 0 / 30%) 0px 1px 3px -1px',
        }}
      >
        {tabs && (
          <Tabs value={value} onChange={handleChange}>
            {tabList.map((tab, index) => {
              return (
                <Tab
                  key={index + 1}
                  value={tab.id}
                  label={tab.label}
                  href={tab.href}
                  wrapped
                />
              );
            })}
          </Tabs>
        )}
      </Box>
      <div style={{ margin: '2em' }}>{tabs ? tabpanel : children}</div>
    </>
  );
};
