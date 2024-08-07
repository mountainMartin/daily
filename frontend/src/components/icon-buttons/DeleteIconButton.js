import React from 'react';
import { IconButton } from './IconButton';
import { DeleteIcon } from '../../app/AppIcons';

export const DeleteIconButton = (props) => {
  return (
    <IconButton
      label='Radera'
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      color={props.color ?? 'error'}
      icon={<DeleteIcon />}
    />
  );
};
