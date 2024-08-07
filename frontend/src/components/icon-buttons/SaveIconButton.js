import React from 'react';
import { IconButton } from './IconButton';
import { SaveIcon } from '../../app/AppIcons';

export const SaveIconButton = (props) => {
  return (
    <IconButton
      label='Spara'
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      color={props.color ?? 'success'}
      icon={<SaveIcon />}
    />
  );
};
