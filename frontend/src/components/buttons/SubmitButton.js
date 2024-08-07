import React from 'react';
import MUITooltip from '@mui/material/Tooltip';
import MUIButton from '@mui/material/Button';
import MUILoadingButton from '@mui/lab/LoadingButton';

export const SubmitButton = ({ loading, ...props }) => {
  return (
    <>
      {loading ? (
        <MUILoadingButton
          size={props.size ?? 'small'}
          loading={loading}
          variant={props.variant ?? 'contained'}
        >
          <span>{props.label ?? 'submit'}</span>
        </MUILoadingButton>
      ) : (
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
              type='submit'
              onClick={props.onClick}
              variant={props.variant ?? 'contained'}
              color={props.color ?? 'primary'}
              size={props.size ?? 'small'}
              sx={props.style}
              startIcon={props.icon ?? null}
            >
              {props.label ?? 'submit'}
            </MUIButton>
          </span>
        </MUITooltip>
      )}
    </>
  );
};
