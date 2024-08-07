import React from 'react';
import { Chip } from './Chip';

export const IsActiveToggle = (props) => {
  return (
    <div style={{ display: 'flex', gap: '0.3em' }}>
      <Chip
        label='Alla'
        color='primary'
        variant={props.activeToggleValue === 'all' ? 'contained' : 'outlined'}
        onClick={() => props.handleActiveToggleValue('all')}
      />
      <Chip
        label='Aktiva'
        color='success'
        variant={
          props.activeToggleValue === 'active' ? 'contained' : 'outlined'
        }
        onClick={() => props.handleActiveToggleValue('active')}
      />
      <Chip
        label='Inaktiva'
        color='error'
        variant={
          props.activeToggleValue === 'inactive' ? 'contained' : 'outlined'
        }
        onClick={() => props.handleActiveToggleValue('inactive')}
      />
    </div>
  );
};
