import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
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

export const CheckTable = ({
  columns,
  data,
  colSpan,
  onRowDoubleClick,
  checkMode,
  checkRow,
  checkAllRows,
  ...props
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 10);
  const [pointer, setPointer] = useState(0);
  const [allCheck, setAllCheck] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);

  useEffect(() => {
    setCheckedRows([]);
    setAllCheck(false);
  }, [checkMode]);

  const transFormRow = (row) => {
    return Object.keys(row).reduce((acc, key) => {
      acc[key] = row[key].value;
      return acc;
    }, {});
  };

  const handleAllCheck = () => {
    const _rows = [];
    const _rowIds = [];
    for (let i = 0; i < data.length; i++) {
      _rows.push(transFormRow(data[i]));
      _rowIds.push(transFormRow(data[i]).id);
    }

    if (allCheck) {
      setAllCheck(false);
      setCheckedRows([]);
      checkAllRows([]);
    } else {
      setAllCheck(true);
      checkAllRows(_rows);
      setCheckedRows(_rowIds);
    }
  };

  const handleRowCheck = (row) => {
    if (allCheck) {
      setAllCheck(false);
      setCheckedRows([]);
      checkAllRows([]);
    }

    const transformedObject = transFormRow(row);

    checkRow(transformedObject);

    const exists = checkedRows.find((x) => x === transformedObject.id);
    if (exists) {
      let newCheckedRows = checkedRows.filter(
        (x) => x !== transformedObject.id
      );
      setCheckedRows(newCheckedRows);
    } else {
      setCheckedRows([...checkedRows, transformedObject.id]);
    }
  };

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

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        {colSpan && colSpan.length > 0 && (
          <colgroup>
            {checkMode && <col key='check' width='5%' />}
            {colSpan.map((col, i) => (
              <col key={i + 1} width={col.toString() + '%'} />
            ))}
          </colgroup>
        )}
        <TableHead
          sx={{
            textTransform: 'capitalize',
            height: '50px',
            background: '#f5f5f5',
          }}
        >
          <TableRow
            sx={{ cursor: checkMode ? 'pointer' : 'auto' }}
            onDoubleClick={() => {
              checkMode
                ? handleAllCheck()
                : setTimeout(() => setPointer(0), 500);
            }}
          >
            {checkMode && (
              <TableCell>
                <Checkbox
                  checked={allCheck}
                  onClick={() => handleAllCheck()}
                  sx={{ padding: 0 }}
                />
              </TableCell>
            )}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id.value}
                  hover={!checkMode}
                  onClick={() => {
                    checkMode ? handleRowCheck(row) : setPointer(row.id.value);
                    setTimeout(() => setPointer(0), 500);
                  }}
                  onDoubleClick={() =>
                    checkMode ? handleRowCheck(row) : onRowDoubleClick(row)
                  }
                  sx={{
                    cursor: checkMode
                      ? 'pointer'
                      : pointer === row.id.value
                      ? 'pointer'
                      : 'auto',
                    background: checkedRows.includes(row.id.value)
                      ? '#e9efff'
                      : undefined,
                  }}
                >
                  {checkMode && (
                    <TableCell>
                      <Checkbox
                        checked={allCheck || checkedRows.includes(row.id.value)}
                        onClick={() => handleRowCheck(row)}
                        sx={{ padding: 0 }}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const cellData = row[column.key];
                    return cellData && cellData.visible ? (
                      <TableCell key={column.key}>
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
                    ) : null;
                  })}
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
  );
};
