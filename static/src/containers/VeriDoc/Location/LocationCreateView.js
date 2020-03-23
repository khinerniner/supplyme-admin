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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { toNewLocation } from '../../../services/account/model';
import { geocodeGooglePlace } from '../../../services/google/actions';
// import { saveNewAccount, updateAccount, deleteAccount } from '../../../services/location/actions';
import {
    getKeys,
    validateString,
    roundUp,
} from '../../../utils/misc';

import AutoCompleteHospitals from '../../../components/VeriDoc/AutoCompletes/AutoCompleteHospitals';
import PhoneTextInput from '../../../components/VeriDoc/Misc/PhoneTextInput';

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
        account: state.accountData.account,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            // saveNewAccount: bindActionCreators(saveNewAccount, dispatch),
            // deleteAccount: bindActionCreators(deleteAccount, dispatch),
            // updateAccount: bindActionCreators(updateAccount, dispatch),
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class AccountEditView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: this.props.account,
            name_error_text: null,
            phoneNumber_error_text: null,
            disabled: true,
            redirectRoute: `/accounts/${this.props.accountID}/locations`,
        };
    }

    componentDidMount() {
        console.log('Account Create Mounted');
    }

    componentWillReceiveProps(nextProps) {}

    componentWillUnmount() {
        console.log('Account Create UnMounted');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false;
        }
        return true;
    }

    loadCompData = (props = this.props) => {
        const { locations, pathname } = props;
        const keys = getKeys(pathname);
        const locationID = keys.second;
        console.warn(locationID);
        if (locationID && locationID !== null) {
            locations.forEach((location) => {
                if (location.locationID === locationID) {
                    console.log('Setting Account State')
                    const next_state = this.state;
                    next_state.location = location;
                    this.setState(next_state, () => {
                        this.isAccountDisabled();
                    });
                }
            })
        }
    }

    handleLocationSelected = (location) => {
        const { idToken, accountID } = this.props;
        const next_state = this.state;
        const { place_id } = location;
        const locationInfo = toNewLocation(location);
        locationInfo.location = location.geometry.location;
        locationInfo.name = location.name;
        geocodeGooglePlace(idToken, accountID, location.formatted_address).then((result) => {
            console.log(result)
            locationInfo.placeID = place_id;
            locationInfo.locality = result.locality;
            locationInfo.country = result.country;
            locationInfo.region = result.region;
            locationInfo.street1 = result.street1;
            locationInfo.street2 = result.street2;
            locationInfo.postal = result.postal;
            let next_locations = this.state.accout.locations;
            if (this.state.location.locations.map(i => i).includes(locationInfo.name)) {
                next_locations = next_locations.filter(e => e !== locationInfo.name);
            } else {
                next_locations.push(locationInfo);
            }
            next_state.location.locations = next_locations;
            this.setState(next_state, () => {});
        });
    }

    handlePhoneChange = (e, name) => {
        const { value } = e.target;
        const next_state = this.state;
        next_state.location[name] = value;
        this.setState(next_state, () => {
            this.isAccountDisabled();
        });
    }

    handleChange = (e, parent, name) => {
        const { value } = e.target;
        const next_state = this.state;
        if (parent) {
            next_state.location[parent][name] = value;
        } else {
            next_state.location[name] = value;
        }
        this.setState(next_state, () => {
            this.isAccountDisabled();
        });
    }

    isAccountDisabled() {
        this.setState({
            disabled: true,
        });
        let name_is_valid = false;
        let email_is_valid = false;

        // Validate Account Name
        if (this.state.location.name === null || this.state.location.name === '') {
            this.setState({
                name_error_text: null,
            });
        } else if (validateString(this.state.location.name) && this.state.location.name.length < 40
            && this.state.location.name.length > 1) {
            name_is_valid = true;
            this.setState({
                name_error_text: null,
            });
        } else {
            this.setState({
                name_error_text: `The location first name must be a string and < ${40} and > 1 characters.`,
            });
        }

        // Validate Account Email
        if (this.state.location.email === null || this.state.location.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.location.email) && this.state.location.email.length < 40) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });
        } else {
            this.setState({
                email_error_text: `Please enter a valid email`,
            });
        }



        // console.warn(this.state.location)
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
        const { location, redirectRoute } = this.state;
        e.prlocationDefault();
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
                        actions.deleteAccount(employeeID, accountID, location, redirectRoute);
                        break;
                    default:
                        break;
                }
            });
    }

    updateThisAccount = () => {
        const { actions, idToken, employeeID, accountID } = this.props;
        const { location, redirectRoute } = this.state;
        actions.updateAccount(employeeID, accountID, location, redirectRoute);

    }
    deleteProp(e, prop){
        let next_state = this.state.location.locations
        for(let i = 0; i < next_state.length; i++){
            if(next_state[i] === prop){
                next_state.splice(i,1)
            }
        }
        this.setState(next_state, () => { })
    }

    renderAccountLocations = (location) => {
        const { classes } = this.props;
        return (
            <div>
                <IconButton
                  color='secondary'
                  disabled={false}
                  // onClick={e => this.deleteProp(e, location)}
                >
                    <RemoveCircleOutlineIcon className={classes.iconButton} />
                </IconButton>
                <span key={location.id} className={classes.detailListDt}>
                    {location.name}
                </span>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const {
            account,
            name_error_text,
            phoneNumber_error_text,
            disabled,
        } = this.state;


        const NameContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        Account Information
                    </div>
                </div>
                <div className={classes.childHeaderCell}>
                    <div className={classes.childHeaders}>
                        Enter the location name and contact information.
                    </div>
                </div>
                <label className={classes.inputLabel}>Account Name</label>
                <div className={classes.textCell}>
                    <TextField
                        placeholder="Ex. John Doe"
                        margin="dense"
                        variant="outlined"
                        helperText={name_error_text}
                        value={account.name}
                        className={classes.textField}
                        onChange={e => this.handleChange(e, null, 'name')}
                        FormHelperTextProps={{ classes: { root: classes.helperText } }}
                    />
                </div>
            </div>
        );

        const LocationsContainer = (
            <div className={classes.outerCell}>
                <div className={classes.subHeaderCell}>
                    <div className={classes.subHeaders}>
                        Account Locations Information
                    </div>
                </div>
                <div className={classes.block}>
                    <dl className={classes.detailList}>
                        <div className={classes.detailListFlex}>
                            {account.locations.map(this.renderAccountLocations, this)}
                        </div>
                    </dl>
                </div>
                <div className={classes.textField}>
                    <AutoCompleteHospitals onFinishedSelecting={this.handleLocationSelected} />
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
                        onClick={location.active ? this.updateThisAccount : this.createNewAccount}
                        className={classes.createButton}
                        disabled={disabled}
                        style={{ marginRight: 10 }}
                    >
                        {'Update Account'}
                    </Button>
                </div>
            </div>
        )

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.headerCell}>
                        <div className={classes.headers}>
                            {'Edit Account'}
                        </div>
                    </div>
                    {NameContainer}
                    {LocationsContainer}
                    {CreateContainer}
                </div>
            </div>
        );
    }
}

AccountEditView.defaultProps = {
    saveNewAccount: f => f,
    deleteAccount: f => f,
    updateAccount: f => f,
};
AccountEditView.propTypes = {
    saveNewAccount: PropTypes.func,
    updateAccount: PropTypes.func,
    deleteAccount: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountEditView);
