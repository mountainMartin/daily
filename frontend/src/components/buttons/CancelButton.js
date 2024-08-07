import React from 'react';
import MUITooltip from '@mui/material/Tooltip';
import MUIButton from '@mui/material/Button';

export const CancelButton = (props) => {
  return (
    <MUITooltip
      title={props.title ?? null}
      placement={props.placement ?? 'top'}
      arrow
    >
      <span>
        <MUIButton
          fullWidth={props.fullWidth ?? false}
          className={props.className}
          disabled={props.disabled}
          type={props.type ?? 'button'}
          onClick={props.onClick}
          variant={props.variant ?? 'outlined'}
          color={props.color ?? 'error'}
          size={props.size ?? 'small'}
          sx={props.style}
        >
          {props.label ?? 'cancel'}
        </MUIButton>
      </span>
    </MUITooltip>
  );
};
