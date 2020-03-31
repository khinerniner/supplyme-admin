import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { formatDateWTime, formatAddress } from '../../../utils/misc';

const styles = (theme) => ({
    root: {
      width: '100%',
      marginTop: 40,
      boxShadow: 'none',
      borderRadius: 8,
      padding: 30,
    },
    table: {},
    tableHeaders: {
      fontSize: 12,
      fontWeight: 500,
      borderBottom: '1px solid #d6d6d6',
      borderLeft: 0,
      verticalAlign: 'bottom',
      color: theme.palette.primary.main,
    },
    linkText: {
      color: '#2A38D8',
      fontWeight: 500,
      cursor: 'pointer',
    },
    cancelIcon: {
        color: '#e02626',
        margin: 0,
        padding: 0,
    },
    checkIcon: {
        color: '#37e026',
        margin: 0,
        padding: 0,
    },
});

function EmployeeResultsTable(props) {
  const { classes, type, rows, handleLink, handleAction } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaders} align="right">Employee Name</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Employee Permissions</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Email</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Phone</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Active</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Updated Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell align="right"><a onClick={e => handleLink(e, row.id)} className={classes.linkText}>{row.name}</a></TableCell>
              <TableCell component="th" scope="row">
                {row.permissionLevel}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email || 'No Current Email'}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.phoneNumber || 'No Current Phone'}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.active ? 'True' : 'False'}
              </TableCell>
              <TableCell component="th" scope="row">{row.updatedDate ? formatDateWTime(new Date(row.updatedDate)) : formatDateWTime(new Date(row.creationDate))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}


EmployeeResultsTable.propTypes = {
    type: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    handleLink: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmployeeResultsTable);
