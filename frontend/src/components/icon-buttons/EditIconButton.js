import React from 'react';
import { IconButton } from './IconButton';
import { EditIcon, EditOffIcon } from '../../app/AppIcons';

export const EditIconButton = ({ editMode, ...props }) => {
  return (
    <IconButton
      label={
        props.disabled
          ? props.label
            ? props.label
            : ''
          : props.label
          ? props.label
          : editMode
          ? 'Avbryt'
          : 'Redigera'
      }
      disabled={props.disabled ?? false}
      size={props.size ?? 'small'}
      type={props.type ?? 'button'}
      onClick={props.onClick}
      color={editMode ? 'default' : 'info'}
      sx={{ padding: 0 }}
      icon={editMode ? <EditOffIcon /> : <EditIcon />}
    />
  );
};
