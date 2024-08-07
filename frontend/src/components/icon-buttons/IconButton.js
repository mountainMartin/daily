import React from 'react';
import MUIIconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { DevIcon } from '../../app/AppIcons';

export const IconButton = ({ icon, ...props }) => {
  return (
    <Tooltip
      title={props.label ?? null}
      placement={props.placement ?? 'top'}
      arrow
    >
      <span>
        <MUIIconButton
          disabled={props.disabled ?? false}
          color={props.color ?? ''}
          size={props.size ?? 'small'}
          type={props.type ?? 'button'}
          onClick={props.onClick}
        >
          {icon ?? <DevIcon />}
        </MUIIconButton>
      </span>
    </Tooltip>
  );
};
