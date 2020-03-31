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

import { formatDateWTime } from '../../../utils/misc';

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
      color: '#202020',
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

function EmployeeCodeResultsTable(props) {
  const { classes, type, employeeCodes, handleLink, handleEmailAction, handleDeleteAction } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaders} align="right">Activation Code ID</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Permissions</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Name</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Email</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Phone</TableCell>
            <TableCell className={classes.tableHeaders} align="left">Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeCodes.map(employeeCode => (
            <TableRow key={employeeCode.id}>
              <TableCell align="right"><a onClick={e => handleLink(e, employeeCode.activationCode)} className={classes.linkText}>{employeeCode.activationCode}</a></TableCell>
              <TableCell>
                {employeeCode.permissionLevel}
              </TableCell>
              <TableCell>
                {employeeCode.ownerName}
              </TableCell>
              <TableCell>
                {employeeCode.email || 'No Current Email'}
                <div onClick={e => handleEmailAction(e, employeeCode)} style={{color: 'blue', cursor: 'pointer'}}>Resend Invite</div>
              </TableCell>
              <TableCell>
                {employeeCode.phoneNumber || 'No Current Phone'}
              </TableCell>
              <TableCell>
                {formatDateWTime(employeeCode.updatedDate ? employeeCode.updatedDate : employeeCode.creationDate)}
                <div onClick={e => handleDeleteAction(e, employeeCode)} style={{color: 'red', cursor: 'pointer'}}>Delete</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}


EmployeeCodeResultsTable.propTypes = {
    type: PropTypes.string.isRequired,
    employeeCodes: PropTypes.array.isRequired,
    handleLink: PropTypes.func.isRequired,
    handleEmailAction: PropTypes.func.isRequired,
    handlePasswordAction: PropTypes.func.isRequired,
    handleDeleteAction: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmployeeCodeResultsTable);
