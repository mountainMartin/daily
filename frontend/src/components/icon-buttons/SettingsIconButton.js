import React from 'react';
import { SettingsIcon } from '../../app/AppIcons';
import { IconButton } from './IconButton';

export const SettingsIconButton = (props) => {
  return (
    <IconButton
      label={props.label ?? 'Inställningar'}
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      icon={<SettingsIcon />}
    />
  );
};
