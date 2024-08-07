import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { getComparator, stableSort } from '../../utils/table-utils';
import { visuallyHidden } from '@mui/utils';
import { IsActiveChip } from '../misc/IsActiveChip';
import { InputText } from '../inputs/InputText';
import { InputTextNumber } from '../inputs/InputTextNumber';
import { InputNumber } from '../inputs/InputNumber';
import { InputDate } from '../inputs/InputDate';
import { InputTime } from '../inputs/InputTime';
import { EditIconButton } from '../icon-buttons/EditIconButton';
import { SaveIconButton } from '../icon-buttons/SaveIconButton';
import { DeleteIconButton } from '../icon-buttons/DeleteIconButton';
import { InputSelect } from '../inputs/InputSelect';

export const EditableTable = ({
  columns,
  data,
  colSpan,
  onRowDoubleClick,
  handleRowChange,
  rowData,
  setRowData,
  submitRow,
  deleteRow,
  defaultSorter,
  ...props
}) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(defaultSorter ?? 'id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 10);
  const [pointer, setPointer] = useState(0);
  const [rowToEdit, setRowToEdit] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cancelEdit = () => {
    setRowToEdit('');
    setRowData({});
  };

  const handleRowToEdit = (row) => {
    if (rowToEdit !== '') {
      setRowToEdit('');
      setRowData({});
    } else {
      setRowToEdit(row.id.value);
      const transformedObject = Object.keys(row).reduce((acc, key) => {
        acc[key] = row[key].value;
        return acc;
      }, {});
      setRowData(transformedObject);
    }
  };

  const handleDelete = () => {
    deleteRow();
    setRowToEdit('');
    setRowData({});
  };

  const renderInput = (key, type, label, required, selectOptions) => {
    switch (type) {
      case 'text': {
        return (
          <InputText
            fullWidth
            required={required}
            label={label}
            value={rowData[key]}
            onChange={(e) => handleRowChange(key, e.target.value)}
          />
        );
      }
      case 'text-number': {
        return (
          <InputTextNumber
            fullWidth
            required={required}
            label={label}
            value={rowData[key]}
            onChange={(e) => handleRowChange(key, e.target.value)}
          />
        );
      }
      case 'number': {
        return (
          <InputNumber
            fullWidth
            required={required}
            label={label}
            value={rowData[key]}
            onChange={(e) => handleRowChange(key, e.target.value)}
          />
        );
      }
      case 'date': {
        return (
          <InputDate
            fullWidth
            required={required}
            label={label}
            value={new Date(rowData[key])}
            onChange={(value) => handleRowChange(key, value)}
          />
        );
      }
      case 'time': {
        return (
          <InputTime
            fullWidth
            required={required}
            label={label}
            value={new Date('1993-09-22T' + rowData[key])}
            onChange={(value) => handleRowChange(key, value)}
          />
        );
      }
      case 'chip': {
        return (
          <IsActiveChip
            isActive={rowData[key]}
            onClick={() => handleRowChange(key, !rowData[key])}
          />
        );
      }
      case 'select': {
        return (
          <InputSelect
            fullWidth
            required={required}
            label={label}
            value={rowData[key] ?? null}
            options={selectOptions}
            onChange={(e, item) => handleRowChange(key, item)}
          />
        );
      }
      default: {
        return;
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitRow();
        cancelEdit();
      }}
    >
      <TableContainer component={Paper}>
        <Table size='small'>
          {colSpan && colSpan.length > 0 && (
            <colgroup>
              {colSpan.map((col, i) => (
                <col key={i + 1} width={col.toString() + '%'} />
              ))}
              <col width='10%' />
            </colgroup>
          )}
          <TableHead
            sx={{
              textTransform: 'capitalize',
              height: '50px',
              background: '#f5f5f5',
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sortDirection={orderBy === column.key ? order : false}
                >
                  <TableSortLabel
                    key={column.label}
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : 'asc'}
                    onClick={createSortHandler(column.key)}
                  >
                    <Typography>{column.label}</Typography>
                    {orderBy === column.key ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell key='handle'>
                <Typography>Hantera</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id.value}
                    hover={rowToEdit === ''}
                    onClick={() => {
                      setPointer(row.id.value);
                      setTimeout(() => setPointer(0), 500);
                    }}
                    onDoubleClick={() => onRowDoubleClick(row)}
                    sx={{
                      height: '40px',
                      cursor: pointer === row.id.value ? 'pointer' : 'auto',
                      background:
                        rowToEdit === row.id.value ? '#e9efff' : undefined,
                    }}
                  >
                    {columns.map((column) => {
                      const cellData = row[column.key];

                      if (cellData && cellData.visible) {
                        if (rowToEdit === row.id.value && cellData.editable) {
                          return (
                            <TableCell key={column.key + row.id.value}>
                              {renderInput(
                                column.key,
                                cellData.type,
                                column.label,
                                cellData.required,
                                cellData.selectOptions
                              )}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.key + row.id.value}>
                              {typeof cellData.value === 'boolean' ? (
                                <IsActiveChip isActive={cellData.value} />
                              ) : (
                                <Typography>
                                  {cellData.value.label
                                    ? cellData.value.label
                                    : cellData.value}
                                </Typography>
                              )}
                            </TableCell>
                          );
                        }
                      } else {
                        return null;
                      }
                    })}
                    <TableCell>
                      <EditIconButton
                        editMode={rowToEdit === row.id.value}
                        onClick={() => handleRowToEdit(row)}
                      />
                      {rowToEdit === row.id.value && (
                        <>
                          <SaveIconButton type='submit' />
                          <DeleteIconButton onClick={handleDelete} />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ background: '#f5f5f5' }}
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Rader per sida: '}
        />
      </TableContainer>
    </form>
  );
};
