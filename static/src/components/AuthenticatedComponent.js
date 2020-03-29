import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import history from '../history';
import Loader from 'react-loaders';

import Base from '../components/VeriDoc/Base';

import { loginEmployeeWithPermissions, logoutAndRedirect } from '../services/app/actions';
import { auth } from '../store/firebase';

const styles = (theme) => ({
    loader: {
        color: theme.palette.primary.secondary,
    },
    overlay: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 2,
      cursor: 'pointer',
    }
});

function mapStateToProps(state) {
    return {
        router: state.router,
        accountID: state.app.accountID,
        isAccountLoaded: state.accountData.account.isLoaded,
        accountType: state.accountData.account.accountType,
        isAuthenticated: state.app.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loginEmployeeWithPermissions: bindActionCreators(loginEmployeeWithPermissions, dispatch),
            logoutAndRedirect: bindActionCreators(logoutAndRedirect, dispatch),
        },
    };
}


export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
            };
        }

        componentDidMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            const next = props.router.location.pathname;
            console.log(next)
            if (!props.isAuthenticated) {
                console.log('A1');
                const storageToken = localStorage.getItem('idToken');
                if (!storageToken) {
                    console.log('A2');
                    history.push(`/login?next=${next}`);
                } else {
                    console.log('A3');
                    auth().onAuthStateChanged((user) => {
                        if (user) {
                            props.actions.loginEmployeeWithPermissions(user.uid, next);
                        } else {
                            props.actions.logoutAndRedirect();
                        }
                    });
                }
            } else {
                if (next === '/') {
                    if (props.accountID === process.env.PRIVALGO_ADMIN_KEY) {
                        history.push(`/admin/locations`);
                    } else {
                        history.push(`/accounts/${props.accountID}/locations`);
                    }
                } else {
                    console.log('A4');
                    this.setState({
                        isLoaded: true,
                    });
                }
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.props.isAccountLoaded && this.state.isLoaded
                        ? (
                            <div>
                              <Base>
                                  <Component {...this.props} />
                              </Base>
                            </div>
                        )
                        : <div style={styles.overlay}>
                            <Loader color="#5e4443" type="ball-scale-multiple" />
                          </div>
                    }
                </div>
            );
        }
    }

    AuthenticatedComponent.defaultProps = {
        accountID: '',
        isAccountLoaded: false,
        isAuthenticated: false,
        loginEmployeeWithPermissions: f => f,
        logoutAndRedirect: f => f,
    };

    AuthenticatedComponent.propTypes = {
        accountID: PropTypes.string,
        isAccountLoaded: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        loginEmployeeWithPermissions: PropTypes.func,
        logoutAndRedirect: PropTypes.func,
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
