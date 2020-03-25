/* eslint camelcase: 0, no-underscore-dangle: 0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { toNewRequest, toNewRequestItem } from '../../../services/request/model';
import { saveNewRequest, updateRequest, deleteRequest } from '../../../services/request/actions';
import { geocodeGooglePlace } from '../../../services/google/actions';
import {
    getKeys,
    validateString,
    validateDate,
    validateEmail,
    validateDatePick,
    roundUp,
} from '../../../utils/misc';

import AutoCompleteLocations from '../../../components/VeriDoc/AutoCompletes/AutoCompleteLocations';
import AutoCompleteMenuItems from '../../../components/VeriDoc/AutoCompletes/AutoCompleteMenuItems';

function renderPriorityType() {
    const array = [];
    array.push(<MenuItem key={'high'} value={'high'}>High</MenuItem>);
    array.push(<MenuItem key={'med'} value={'med'}>Medium</MenuItem>);
    array.push(<MenuItem key={'low'} value={'low'}>Low</MenuItem>);
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
        requests: state.requestData.requests,
        receivedAt: state.requestData.receivedAt,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            saveNewRequest: bindActionCreators(saveNewRequest, dispatch),
            deleteRequest: bindActionCreators(deleteRequest, dispatch),
            updateRequest: bindActionCreators(updateRequest, dispatch),
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class RequestCreateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: toNewRequest(),
            menuItem: toNewRequestItem(),
            menuItemOpen: false,
            requiredBy_error_text: null,
            // phoneNumber_error_text: null,
            redirectRoute: `/accounts/${this.props.accountID}/requests`,
        };
    }

    componentDidMount() {
        console.log('Request Create Mounted')
        this.loadCompData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.receivedAt !== null && this.props.receivedAt === null) {
            this.loadCompData(nextProps);
        }
    }

    componentWillUnmount() {
        console.log('Request Create UnMounted')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false;
        }
        return true;
    }

    loadCompData = (props = this.props) => {
        const { requests, pathname } = props;
        const keys = getKeys(pathname);
        const requestID = keys.second;
        console.warn(requestID);
        if (requestID && requestID !== null) {
            requests.forEach((request) => {
                if (request.requestID === requestID) {
                    console.log('Setting Request State')
                    const next_state = this.state;
                    next_state.request = request;
                    this.setState(next_state, () => {
                        this.isRequestDisabled();
                    });
                }
            })
        }
    }

    handleChange = (e, parent, name) => {
        const { value } = e.target;
        const next_state = this.state;
        next_state.request[name] = value;
        this.setState(next_state, () => {});
    }

    handleDateChange = (name) => (date) => {
        const next_state = this.state;
        next_state.request[name] = date.toDate();
        this.setState(next_state, () => {});
    }

    handleLocationSelected = (location) => {
        const next_state = this.state;
        console.log(location)
        next_state.request.location = location;
        this.setState(next_state, () => {});
    }

    handleMenuItemChange = (e, name) => {
        const { value } = e.target;
        const next_state = this.state;
        next_state.menuItem[name] = value;
        this.setState(next_state, () => {});
    }

    handleMenuItemAdd = () => {
        const next_state = this.state;
        let next_items = this.state.request.menuItems;
        if (this.state.request.menuItems.map(i => i).includes(this.state.menuItem.item.itemID)) {
            next_items = next_items.filter(e => e !== this.state.menuItem.item.itemID);
        } else {
            next_items.push(this.state.menuItem);
        }
        next_state.request.menuItems = next_items;
        next_state.menuItemOpen = false;
        next_state.menuItem = toNewRequestItem();
        this.setState(next_state, () => {});
    }

    handleMenuItemSelected = (item) => {
        console.log(item)
        const next_state = this.state;
        next_state.menuItem.item = item;
        this.setState(next_state, () => {});
    }

    isRequestDisabled() {
        this.setState({
            disabled: true,
        });
        let name_is_valid = false;
        let email_is_valid = false;

        // Validate Request Name
        if (this.state.request.contactInfo.name === null || this.state.request.contactInfo.name === '') {
            this.setState({
                name_error_text: null,
            });
        } else if (validateString(this.state.request.contactInfo.name) && this.state.request.contactInfo.name.length < 40) {
            name_is_valid = true;
            this.setState({
                name_error_text: null,
            });
        } else {
            this.setState({
                name_error_text: `The request first name must be a string and < ${40} and > 1 characters.`,
            });
        }

        // Validate Request Email
        if (this.state.request.contactInfo.email === null || this.state.request.contactInfo.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.request.contactInfo.email) && this.state.request.contactInfo.email.length < 40) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });
        } else {
            this.setState({
                email_error_text: `Please enter a valid email`,
            });
        }

        // console.warn(this.state.request)
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
        const { request, redirectRoute } = this.state;
        e.prrequestDefault();
        swal({
            title: `Delete this Property?`,
            text: `Doing so will permanently delete the data for this Property?.`,
            icon: 'warning',
            buttons: {
                cancel: 'Cancel',
                request: {
                    text: 'Delete',
                    value: 'delete',
                },
            },
        })
            .then((value) => {
                switch (value) {
                    case 'delete':
                        console.log(`Delete Property`);
                        actions.deleteRequest(employeeID, accountID, request, redirectRoute);
                        break;
                    default:
                        break;
                }
            });
    }

    createNewRequest = () => {
        const { actions, idToken, employeeID, accountID } = this.props;
        const { request, redirectRoute } = this.state;
        actions.saveNewRequest(idToken, employeeID, accountID, request, redirectRoute);
    }

    updateThisRequest = () => {
        const { actions, idToken, employeeID, accountID } = this.props;
        const { request, redirectRoute } = this.state;
        actions.updateRequest(employeeID, accountID, request, redirectRoute);

    }

    deleteMenuItem(e, item){
        let next_state = this.state.request.menuItems
        for(let i = 0; i < next_state.length; i++){
            if(next_state[i] === item){
                next_state.splice(i,1)
            }
        }
        this.setState(next_state, () => { })
    }

    toggleAddMenuItem = (e, menuItemOpen) => {
        this.setState({menuItemOpen: menuItemOpen})
    }

    renderRequestMenuItems = (item) => {
        console.log(item)
        const { classes } = this.props;
        return (
            <div key={item.item.itemID}>
                <IconButton
                  color='secondary'
                  disabled={false}
                  onClick={e => this.deleteMenuItem(e, item)}
                >
                    <RemoveCircleOutlineIcon className={classes.iconButton} />
                </IconButton>
                <span className={classes.detailListDt}>
                    Item Name: {item.item.itemName} - Requested: {item.quantity}
                </span>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const {
            request,
            requiredBy_error_text,
            menuItemOpen,
        } = this.state;

        const priorityTypes = renderPriorityType();

        const NameContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        Request Information
                    </div>
                </div>
                <div className={classes.childHeaderCell}>
                    <div className={classes.childHeaders}>
                        Enter the request name and contact information.
                    </div>
                </div>
                <label className={classes.inputLabel}>Priority</label>
                <div style={{paddingBottom: 20}} className={classes.textCell}>
                    <Select
                        onChange={e => this.handleChange(e, 'priority')}
                        value={request.priority}
                        variant="outlined"
                        inputProps={{
                            name: 'priority',
                            id: 'priority',
                        }}
                    >
                        {priorityTypes}
                    </Select>
                </div>
                <label className={classes.inputLabel}>{'Required By'}</label>
                <div className={classes.textCell}>
                    <KeyboardDatePicker
                        autoOk
                        value={request.requiredBy}
                        margin="normal"
                        variant="inline"
                        helperText={requiredBy_error_text}
                        className={classes.pickerField}
                        onChange={this.handleDateChange('requiredBy')}
                        format="MM/DD/YYYY"
                        id="date-picker-inline"
                    />
                </div>
                <label className={classes.inputLabel}>Location</label>
                <div className={classes.textField}>
                    <AutoCompleteLocations name={request.location.name} onFinishedSelecting={this.handleLocationSelected}/>
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
                        onClick={request.active ? this.updateThisRequest : this.createNewRequest}
                        className={classes.createButton}
                        style={{ marginRight: 10 }}
                    >
                        {request.active ? 'Update Request' : 'Create Request'}
                    </Button>
                    <Button
                        variant="contained"
                        disableRipple
                        disableFocusRipple
                        onClick={this.deleteActiveProperty}
                        className={classes.deleteButton}
                    >
                        {'Delete Request'}
                    </Button>
                </div>
            </div>
        );

        const MenuItemsContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        Request Menu Items
                    </div>
                </div>
                <div className={classes.block}>
                    <dl className={classes.detailList}>
                        <div className={classes.detailListFlex}>
                            {request.menuItems.map(this.renderRequestMenuItems, this)}
                        </div>
                    </dl>
                </div>
                <IconButton onClick={(e) => this.toggleAddMenuItem(e, !menuItemOpen)}>
                    <AddCircleOutlineIcon className={classes.iconButton} />
                    <span style={{ fontSize: 16, paddingLeft: 10 }}>Add New Menu Item</span>
                </IconButton>
            </div>
        );

        const AddMenuItemContainer = (
          <div className={classes.outerCell}>
              <div className={classes.subHeaderCell}>
                  <div className={classes.subHeaders}>
                      Add Menu Item & Quantity
                  </div>
              </div>
              <div>
                  <AutoCompleteMenuItems onFinishedSelecting={this.handleMenuItemSelected} />
              </div>
              <div className={classes.textCell}>
                  <TextField
                    placeholder="Ex. 10"
                    label="Quantity"
                    margin="dense"
                    variant="outlined"
                    type="number"
                    // helperText={'cbdContent_error_text'}
                    // value={menuItemQuaa.stock || ''}
                    className={classes.textFieldSmall}
                    onChange={e => this.handleMenuItemChange(e, 'quantity')}
                    // FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    autoComplete=""
                  />
              </div>
              <div className={classes.textCell}>
                  <Button
                    variant="contained"
                    disableRipple
                    disableFocusRipple
                    onClick={this.handleMenuItemAdd}
                    className={classes.createButton}
                  >
                      {'Add Menu Item'}
                  </Button>
              </div>
          </div>
        );

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.headerCell}>
                        <div className={classes.headers}>
                            {request.active ? 'Edit Request' : 'New Request'}
                        </div>
                    </div>
                    {NameContainer}
                    {MenuItemsContainer}
                    {menuItemOpen ? AddMenuItemContainer : null}
                    {CreateContainer}
                </div>
            </div>
        );
    }
}

RequestCreateView.defaultProps = {
    saveNewRequest: f => f,
    deleteRequest: f => f,
    updateRequest: f => f,
};
RequestCreateView.propTypes = {
    saveNewRequest: PropTypes.func,
    updateRequest: PropTypes.func,
    deleteRequest: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestCreateView);
