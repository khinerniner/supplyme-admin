import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';

import TablePaginationActions from '../../TablePaginationActions';

import MenuItemCell from './MenuItemCell';

import { formatDateWTime, formatAddress, formatDateNoTime } from '../../../utils/misc';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: 40,
    overflowX: 'auto',
    boxShadow: 'none',
  },
  table: {
    minWidth: 650,
    overflow: 'hidden',
  },
  tableHeaders: {
    fontSize: 12,
    fontWeight: 500,
    borderBottom: '1px solid #d6d6d6',
    borderLeft: 0,
    verticalAlign: 'bottom',
    color: theme.palette.primary.black,
  },
  linkText: {
    color: '#2A38D8 !important',
    fontWeight: '600px !important',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px !important',
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
  textField: {
      width: 150,
  },
  textCell: {
      marginBottom: 15,
  },
});



function PublicMenuItemResultsTable(props) {
  const { classes, menuItems, handleAction, handleChange } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, menuItems.length - page * rowsPerPage);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaders} >Name</TableCell>
            <TableCell className={classes.tableHeaders} >Item Image</TableCell>
            <TableCell className={classes.tableHeaders} >Item Type</TableCell>
            <TableCell className={classes.tableHeaders} >Brand Name</TableCell>
            <TableCell className={classes.tableHeaders} >UPC ID</TableCell>
            <TableCell style={{textAlign: 'center'}} className={classes.tableHeaders} >Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? menuItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : menuItems
          ).map(menuItem => (
            <TableRow key={menuItem.id}>
              <TableCell><a onClick={e => handleLink(e, menuItem.id)} className={classes.linkText}>{menuItem.itemName}</a></TableCell>
              <TableCell style={{width: 100}}>
                  <MenuItemCell itemID={menuItem.itemID} itemImage={menuItem.thumbItemImageURL} />
              </TableCell>
              <TableCell>
                {menuItem.itemType}
              </TableCell>
              <TableCell>
                {menuItem.brandName}
              </TableCell>
              <TableCell>
                {menuItem.upcID || 'None'}
              </TableCell>
              <TableCell style={{textAlign: 'center'}}>
                  <div className={classes.textCell}>
                      <TextField
                        placeholder="Ex. 10"
                        label="Quantity"
                        margin="dense"
                        variant="outlined"
                        type="number"
                        // helperText={'cbdContent_error_text'}
                        // value={menuItemQuaa.stock || ''}
                        className={classes.textField}
                        onChange={e => handleChange(e, 'quantity')}
                        // FormHelperTextProps={{ classes: { root: classes.helperText } }}
                        autoComplete=""
                      />
                  </div>
                  <div onClick={e => handleAction(e, menuItem)} style={{fontWeight: 600, color: 'blue', cursor: 'pointer'}}>Add To Cart</div>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={menuItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              selectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              actionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}



PublicMenuItemResultsTable.propTypes = {
  menuItems: PropTypes.array.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PublicMenuItemResultsTable);
