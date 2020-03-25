/* eslint camelcase: 0, no-underscore-dangle: 0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { toNewMenuItem } from '../../../services/menuItem/model';
import { saveNewMenuItem, updateMenuItem, deleteMenuItem } from '../../../services/menuItem/actions';
import { geocodeGooglePlace } from '../../../services/google/actions';
import {
    getKeys,
    validateString,
    validateDate,
    validateEmail,
    validateDatePick,
    roundUp,
} from '../../../utils/misc';

function renderItemType() {
    const array = [];
    array.push(<MenuItem key={'ppe'} value={'ppe'}>PPE</MenuItem>);
    array.push(<MenuItem key={'other'} value={'other'}>Other</MenuItem>);
    return array;
}

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingTop: 42,
        paddingBottom: 42,
        paddingLeft: 80,
        paddingRight: 80,
    },
    outerCell: {
        marginBottom: 40,
    },
    headerCell: {
        marginBottom: 40,
        display: 'block',
    },
    headers: {
        display: 'inline-block',
        fontWeight: 500,
        fontSize: 28,
        // fontFamily: 'AvenirNext-DemiBold',
    },
    subHeaderCell: {
        marginBottom: 24,
        display: 'block',
    },
    subHeaders: {
        display: 'inline-block',
        fontWeight: 500,
        fontSize: 20,
        // fontFamily: 'AvenirNext-DemiBold',
    },
    childHeaderCell: {
        marginTop: 16,
        marginBottom: 16,
    },
    childHeaders: {
        display: 'inline-block',
        fontWeight: 500,
        fontSize: 16,
    },
    textField: {
        width: 250,
    },
    textCell: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 13,
        fontFamily: 'AvenirNext',
        paddingBottom: 5,
        display: 'inline-block',
    },
    helperText: {
        fontSize: 12,
        color: '#d22323',
    },
    createButton: {
        color: '#ffffff',
        backgroundColor: theme.palette.primary.main,
        textTransform: 'none',
    },
    deleteButton: {
        color: theme.palette.primary.main,
        backgroundColor: '#e02626',
        textTransform: 'none',
    },
    outerFlexCell: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 40,
    },
    innerFlexCell: {
        paddingRight: 10,
    },
    block: {
        marginBottom: 40,
    },
    detailList: {
        // borderTop: '1px solid #e6e6e6',
        paddingTop: 15,
        display: 'block',
    },
    detailListDt: {
        minWidth: '30%',
        border: 0,
        padding: '.5rem 0',
        margin: 0,
    },
    detailListDd: {
        minWidth: '60%',
        border: 0,
        fontWeight: 500,
        padding: '.5rem 0',
        margin: 0,
        marginLeft: 5,
    },
    detailListFlex: {
        // display: 'flex',
    },
});

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        idToken: state.app.idToken,
        employeeID: state.app.employeeID,
        accountID: state.app.accountID,
        menuItems: state.menuItemData.menuItems,
        receivedAt: state.menuItemData.receivedAt,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            saveNewMenuItem: bindActionCreators(saveNewMenuItem, dispatch),
            deleteMenuItem: bindActionCreators(deleteMenuItem, dispatch),
            updateMenuItem: bindActionCreators(updateMenuItem, dispatch),
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class MenuItemCreateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItem: toNewMenuItem(),
            quantity: {
                pricePerUnit: 0,
                stock: 0,
            },
            name_error_text: null,
            notes_error_text: null,
            sku_error_text: null,
            redirectRoute: `/accounts/${this.props.accountID}/menuItems`,
        };
    }

    componentDidMount() {
        console.log('MenuItem Create Mounted')
        this.loadCompData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.receivedAt !== null && this.props.receivedAt === null) {
            this.loadCompData(nextProps);
        }
    }

    componentWillUnmount() {
        console.log('MenuItem Create UnMounted')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false;
        }
        return true;
    }

    loadCompData = (props = this.props) => {
        const { menuItems, pathname } = props;
        const keys = getKeys(pathname);
        const menuItemID = keys.second;
        console.warn(menuItemID);
        if (menuItemID && menuItemID !== null) {
            menuItems.forEach((menuItem) => {
                if (menuItem.menuItemID === menuItemID) {
                    console.log('Setting MenuItem State')
                    const next_state = this.state;
                    next_state.menuItem = menuItem;
                    this.setState(next_state, () => {
                        this.isMenuItemDisabled();
                    });
                }
            })
        }
    }

    handlePhoneChange = (e, name) => {
        const { value } = e.target;
        const next_state = this.state;
        next_state.menuItem.contactInfo[name] = value;
        this.setState(next_state, () => {
            this.isMenuItemDisabled();
        });
    }

    handleChange = (e, parent, name) => {
        const { value } = e.target;
        const next_state = this.state;
        if (parent) {
            next_state.menuItem[parent][name] = value;
        } else {
            next_state.menuItem[name] = value;
        }
        this.setState(next_state, () => {
            this.isMenuItemDisabled();
        });
    }

    handleMenuItemSelected = (menuItem) => {
        const { place_id, description } = menuItem;
        const { main_text } = menuItem.structured_formatting;
        const { idToken, accountID } = this.props;
        const next_state = this.state;
        next_state.menuItem.name = description;
        geocodeGooglePlace(idToken, accountID, description).then((result) => {
            result.placeID = place_id
            next_state.menuItem.address = result;
            this.setState(next_state, () => {});
        });
    }

    isMenuItemDisabled() {
        this.setState({
            disabled: true,
        });
        let name_is_valid = false;
        let email_is_valid = false;

        // Validate MenuItem Name
        if (this.state.menuItem.contactInfo.name === null || this.state.menuItem.contactInfo.name === '') {
            this.setState({
                name_error_text: null,
            });
        } else if (validateString(this.state.menuItem.contactInfo.name) && this.state.menuItem.contactInfo.name.length < 40) {
            name_is_valid = true;
            this.setState({
                name_error_text: null,
            });
        } else {
            this.setState({
                name_error_text: `The menuItem first name must be a string and < ${40} and > 1 characters.`,
            });
        }

        // Validate MenuItem Email
        if (this.state.menuItem.contactInfo.email === null || this.state.menuItem.contactInfo.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.menuItem.contactInfo.email) && this.state.menuItem.contactInfo.email.length < 40) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });
        } else {
            this.setState({
                email_error_text: `Please enter a valid email`,
            });
        }

        // console.warn(this.state.menuItem)
        // console.warn(name_is_valid)

        if (
            name_is_valid && email_is_valid
        ) {
            this.setState({
                disabled: false,
            });
        }
    }

    deleteActiveProperty = (e) => {
        const {
            actions,
            idToken,
            employeeID,
            accountID,
        } = this.props;
        const { menuItem, redirectRoute } = this.state;
        e.prmenuItemDefault();
        swal({
            title: `Delete this Property?`,
            text: `Doing so will permanently delete the data for this Property?.`,
            icon: 'warning',
            buttons: {
                cancel: 'Cancel',
                menuItem: {
                    text: 'Delete',
                    value: 'delete',
                },
            },
        })
            .then((value) => {
                switch (value) {
                    case 'delete':
                        console.log(`Delete Property`);
                        actions.deleteMenuItem(employeeID, accountID, menuItem, redirectRoute);
                        break;
                    default:
                        break;
                }
            });
    }

    createNewMenuItem = () => {
        const { actions, idToken, employeeID, accountID } = this.props;
        const { menuItem, redirectRoute } = this.state;
        actions.saveNewMenuItem(idToken, employeeID, accountID, menuItem, redirectRoute);
    }

    updateThisMenuItem = () => {
        const { actions, idToken, employeeID, accountID } = this.props;
        const { menuItem, redirectRoute } = this.state;
        actions.updateMenuItem(employeeID, accountID, menuItem, redirectRoute);

    }

    renderItemQuantities = (quantity) => {
        const { classes } = this.props;
        return (
            <div>
                <IconButton
                  color='secondary'
                  disabled={false}
                  onClick={e => this.deleteProp(e, property)}
                >
                    <RemoveCircleOutlineIcon className={classes.iconButton} />
                </IconButton>
                <span key={property.id} className={classes.detailListDt}>
                    {property.name}
                </span>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const {
            menuItem,
            name_error_text,
            notes_error_text,
            sku_error_text,
            quantity,
        } = this.state;

        const itemTypes = renderItemType()

        const NameContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        MenuItem Information
                    </div>
                </div>
                <div className={classes.childHeaderCell}>
                    <div className={classes.childHeaders}>
                        Enter the general menu item information.
                    </div>
                </div>
                <label className={classes.inputLabel}>Item Type</label>
                <div style={{paddingBottom: 20}} className={classes.textCell}>
                    <Select
                        onChange={e => this.handleChange(e, 'itemType')}
                        value={menuItem.itemType}
                        variant="outlined"
                        inputProps={{
                            name: 'itemType',
                            id: 'itemType',
                        }}
                    >
                        {itemTypes}
                    </Select>
                </div>
                <label className={classes.inputLabel}>Item Name</label>
                <div className={classes.textCell}>
                    <TextField
                        placeholder="Ex. n95 Masks"
                        margin="dense"
                        variant="outlined"
                        helperText={name_error_text}
                        value={menuItem.itemName}
                        className={classes.textField}
                        onChange={e => this.handleChange(e, 'itemName')}
                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    />
                </div>
                <label className={classes.inputLabel}>Item SKU</label>
                <div className={classes.textCell}>
                    <TextField
                        placeholder="Ex. 123-DHFG23"
                        margin="dense"
                        variant="outlined"
                        type="text"
                        helperText={sku_error_text}
                        value={menuItem.skuID}
                        className={classes.textField}
                        onChange={e => this.handleChange(e, 'skuID')}
                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    />
                </div>
                <label className={classes.inputLabel}>Item Notes</label>
                <div className={classes.textCell}>
                    <TextField
                        placeholder="Ex. Notes"
                        margin="dense"
                        variant="outlined"
                        type="text"
                        helperText={notes_error_text}
                        value={menuItem.notes}
                        className={classes.textField}
                        onChange={e => this.handleChange(e, 'notes')}
                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    />
                </div>
            </div>
        );

        const QuantitiesContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        Menu Item Quantites Information
                    </div>
                </div>
                <div className={classes.block}>
                    <dl className={classes.detailList}>
                        <div className={classes.detailListFlex}>
                            {Object.entries(menuItem.quantities).map(this.renderItemQuantities, this)}
                        </div>
                    </dl>
                </div>
            </div>
        );

        const CreateQuantityContainer = (
          <div className={classes.outerCell}>
              <div className={classes.subHeaderCell}>
                  <div className={classes.subHeaders}>
                      Create Quantity
                  </div>
              </div>
              <div className={classes.outerFlexCell}>
                <div className={classes.innerFlexCell}>
                <label className={classes.inputLabel}>* Price</label>
                <div className={classes.textCell}>
                    <TextField
                      placeholder="Ex. $ 10.00"
                      margin="dense"
                      variant="outlined"
                      // helperText={'thcContent_error_text'}
                      value={quantity.pricePerUnit || ''}
                      className={classes.textFieldSmall}
                      onChange={e => this.handleQuantityChange(e, 'pricePerUnit')}
                      // FormHelperTextProps={{ classes: { root: classes.helperText } }}
                      autoComplete=""
                    />
                </div>
                </div>
                <div className={classes.innerFlexCell}>
                <label className={classes.inputLabel}>* Price</label>
                <div className={classes.textCell}>
                    <TextField
                      placeholder="Ex. 10"
                      margin="dense"
                      variant="outlined"
                      type="number"
                      // helperText={'cbdContent_error_text'}
                      value={quantity.stock || ''}
                      className={classes.textFieldSmall}
                      onChange={e => this.handleQuantityChange(e, 'stock')}
                      // FormHelperTextProps={{ classes: { root: classes.helperText } }}
                      autoComplete=""
                    />
                </div>
              </div>
            </div>
            <div className={classes.textCell}>
                <Button
                  variant="contained"
                  disableRipple
                  disableFocusRipple
                  onClick={this.handlePriceLevelSelected}
                  className={classes.createButton}
                >
                    {'Add Price Level'}
                </Button>
            </div>
          </div>
        );

        const CreateContainer = (
            <div className={classes.outerCell}>
                <div className={classes.textCell}>
                    <Button
                        variant="contained"
                        disableRipple
                        disableFocusRipple
                        onClick={menuItem.active ? this.updateThisMenuItem : this.createNewMenuItem}
                        className={classes.createButton}
                        disabled={disabled}
                        style={{ marginRight: 10 }}
                    >
                        {menuItem.active ? 'Update MenuItem' : 'Create MenuItem'}
                    </Button>
                    <Button
                        variant="contained"
                        disableRipple
                        disableFocusRipple
                        onClick={this.deleteActiveProperty}
                        className={classes.deleteButton}
                    >
                        {'Delete MenuItem'}
                    </Button>
                </div>
            </div>
        )

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.headerCell}>
                        <div className={classes.headers}>
                            {menuItem.active ? 'Edit MenuItem' : 'New MenuItem'}
                        </div>
                    </div>
                    {NameContainer}
                    {CreateQuantityContainer}
                    {CreateContainer}
                </div>
            </div>
        );
    }
}

MenuItemCreateView.defaultProps = {
    saveNewMenuItem: f => f,
    deleteMenuItem: f => f,
    updateMenuItem: f => f,
};
MenuItemCreateView.propTypes = {
    saveNewMenuItem: PropTypes.func,
    updateMenuItem: PropTypes.func,
    deleteMenuItem: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuItemCreateView);
