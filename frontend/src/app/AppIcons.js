import React from 'react';
import {
  AiOutlineBug,
  AiOutlineCheckCircle,
  AiOutlineDelete,
} from 'react-icons/ai';
import { IoClose, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdEdit, MdEditOff } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';

export const DevIcon = () => {
  return <AiOutlineBug />;
};

export const HomeIcon = () => {
  return <IoHomeOutline />;
};

export const SettingsIcon = () => {
  return <IoSettingsOutline />;
};

export const CloseIcon = () => {
  return <IoClose />;
};

export const EditIcon = () => {
  return <MdEdit />;
};

export const EditOffIcon = () => {
  return <MdEditOff />;
};

export const SearchIcon = () => {
  return <IoSearch />;
};

export const SaveIcon = () => {
  return <AiOutlineCheckCircle />;
};

export const DeleteIcon = () => {
  return <AiOutlineDelete />;
};
