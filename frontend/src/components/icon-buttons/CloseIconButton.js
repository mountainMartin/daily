import React from 'react';
import { IconButton } from './IconButton';
import { CloseIcon } from '../../app/AppIcons';

export const CloseIconButton = (props) => {
  return (
    <IconButton
      label={props.label ?? 'Stäng'}
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      color={props.color ?? 'default'}
      sx={{ padding: '0px' }}
      icon={<CloseIcon />}
    />
  );
};
