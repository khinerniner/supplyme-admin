/* eslint camelcase: 0, no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import history from '../../../history';

import { logoutAndRedirect } from '../../../services/app/actions';
import { isMobileAndTablet } from '../../../utils/isMobileAndTablet';
import { dispatchNewRoute, parseLabel } from '../../../utils/misc';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: 'white'
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 1,
        paddingRight: 64,
        paddingLeft: 64,
        backgroundColor: '#000000',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        height: '100%',
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    },
    signUpButton: {
        color: '#202020',
        fontWeight: 600,
        backgroundColor: '#fff',
        textTransform: 'none',
        fontSize: 14,
    },
    footer: {
        backgroundColor: '#202020',
        // borderTop: 1,
        // borderStyle: 'solid',
        // borderfColor: '#e6e6e6',
        color: '#B3B3B3',
        fontSize: 12,
        lineHeight: 2,
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    footerMain: {
        textAlign: 'left',
    },
    footerBottom: {
        marginTop: '5.4rem',
        textAlign: 'center',
        fontSize: 14,
    },
    row: {
        margin: '0 auto',
    },
    listItem: {
        fontSize: 16,
        zIndex: 5,
        color: '#fff',
        paddingRight: 10,
    },
    selectedItem: {
        fontSize: 16,
        zIndex: 5,
        color: theme.palette.primary.lightBlue,
        paddingRight: 10,
        borderBottom: 2,
        borderStyle: 'solid',
        borderfColor: theme.palette.primary.lightBlue,
        // backgroundColor: theme.palette.primary.appBar,
    },
});

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
        isAccountLoaded: state.accountData.account.isLoaded,
        isAuthenticated: state.app.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            logoutAndRedirect: bindActionCreators(logoutAndRedirect, dispatch),
        },
    };
}


@connect(mapStateToProps, mapDispatchToProps)
class RetailerBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileAndTablet: isMobileAndTablet(),
            baseDomain: '/accounts/',
            breadcrumb: 'account',
            listItems: [
                'locations',
                'requests',
                'orders',
                'items',
                'employees',
            ],
        };
    }

    componentDidMount() {
        this.getBreadcrumb();
    }

    componentWillReceiveProps(nextProps) { }

    componentWillUnmount() { }

    getBreadcrumb(props = this.props) {
        const { pathname } = this.props;
        if (pathname) {
            const vars = pathname.split('/');
            let locationName = [];
            for (let i = 0; i < vars.length; i++) {
                if (vars[i] !== '' && vars[i] !== '/' && vars[i].charAt(0) !== '-') {
                    locationName.push(vars[i]);
                }
            }
            this.setState({
                breadcrumb: locationName[2],
                childBreadcrumb: locationName[3],
                baseDomain: `/accounts/${locationName[1]}`,
            });
        }
    }

    // REFACTOR FOR PROD
    parseURL = (item) => {
        const { baseDomain } = this.state;
        switch (item) {
        case 'locations':
            return `${baseDomain}/locations`;
        case 'requests':
            return `${baseDomain}/requests`;
        case 'orders':
            return `${baseDomain}/orders`;
        case 'items':
            return `${baseDomain}/menuItems`;
        case 'employees':
            return `${baseDomain}/employees`;
        default:
            return `unknown`;
        }
    }

    // REFACTOR FOR PROD
    renderListItems = (item) => {
        const { classes } = this.props;
        const { breadcrumb } = this.state;
        const route = this.parseURL(item);
        console.warn(item)
        console.warn(breadcrumb === `${item}`)
        return (
            <IconButton
                key={item}
                disableRipple
                disableFocusRipple
                className={breadcrumb === `${item}` ? classes.selectedItem : classes.listItem}
                onClick={e => this.dispatchNewRoute(e, route)}
            >
                {parseLabel(item)}
            </IconButton>
        );
    }

    dispatchNewRoute(e, route) {
        console.log(route)
        e.preventDefault();
        history.push(route);
    }

    logout(e) {
        e.preventDefault();
        this.props.actions.logoutAndRedirect('userID', '/login');
        this.setState({
            showAlert: false,
            showAccount: false,
        });
    }

    render() {
        const {
            classes,
            pathname,
            isAuthenticated,
        } = this.props;
        const {
            listItems,
            isMobileAndTablet,
        } = this.state;

        const MainAppBar = (
            <AppBar
                position="fixed"
                className={classes.appBar}
                elevation={0}
            >
                <Toolbar>
                    <a href="/"><img alt="ae_logo" height="40px" width="40px" src="/src/containers/App/styles/img/logo.png" /></a>
                    <div className={classes.sectionDesktop}>
                    {
                      isAuthenticated ?
                      (
                        listItems.length > 0
                        ? listItems.map(this.renderListItems, this)
                        : null
                      ) : (
                        <section>
                        <IconButton
                          onClick={e => dispatchNewRoute('/')}
                        >
                            <div style={{ paddingLeft: 10, fontWeight: 500, fontSize: 16, color: '#fff' }}>
                                VeriDoc
                          </div>
                        </IconButton>
                        <IconButton
                          onClick={e => dispatchNewRoute('/valor')}
                        >
                            <div style={{ paddingLeft: 10, fontWeight: 500, fontSize: 16, color: '#fff' }}>
                                The Wall
                          </div>
                        </IconButton>
                        </section>
                      )
                    }
                    </div>
                    <div className={classes.root} />
                    <div className={classes.sectionDesktop}>
                        <IconButton>
                            <div style={{ fontSize: 14, color: '#adadad' }}>
                                <i class="fa fa-globe"></i>
                                <span style={{ marginLeft: 8 }}>EN</span>
                            </div>
                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            onClick={isAuthenticated ? e => this.logout(e) : e => dispatchNewRoute('/login')}
                        >
                            <div style={{ fontSize: 14, color: '#adadad' }}>
                                <i class="fa fa-user"></i>
                                <span style={{ marginLeft: 8 }}>{!isAuthenticated ? 'Log In' : 'Log Out'}</span>
                            </div>
                        </IconButton>
                    </div>
                    {
                      !isAuthenticated ?
                      (
                        <div className={classes.sectionDesktop}>
                            <Button
                                variant="contained"
                                disableRipple
                                disableFocusRipple
                                className={classes.signUpButton}
                                onClick={e => dispatchNewRoute('/register')}
                            >
                                {'Sign up'}
                            </Button>
                        </div>
                      ) : null
                    }
                </Toolbar>
            </AppBar>
        );
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    {MainAppBar}
                    <div className={classes.content}>
                        <div className={classes.toolbar} />
                        {this.props.children}
                    </div>
                </div>
                <div className={classes.footer}>
                    <span>©2020 Clean Alternative. Sustainable. Life. 501(c)(3) All rights reserved.</span>
                </div>
            </div>
        );
    }
}

RetailerBase.propTypes = {
    pathname: PropTypes.string,
    logoutAndRedirect: PropTypes.func,
    classes: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
};

export default withStyles(styles)(RetailerBase);
