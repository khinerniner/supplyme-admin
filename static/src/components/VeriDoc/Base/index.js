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

import { isMobileAndTablet } from '../../../utils/isMobileAndTablet';
import { dispatchNewRoute } from '../../../utils/misc';

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
});

function mapStateToProps(state) {
    return {
        pathname: state.router.location.pathname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {},
    };
}


@connect(mapStateToProps, mapDispatchToProps)
class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileAndTablet: isMobileAndTablet(),
        };
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) { }

    componentWillUnmount() { }

    render() {
        const {
            classes,
            pathname,
        } = this.props;
        const {
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
                        <IconButton
                          onClick={e => dispatchNewRoute('/')}
                        >
                            <div style={{ paddingLeft: 10, fontWeight: 500, fontSize: 16, color: '#fff' }}>
                                VeriDoc
                          </div>
                        </IconButton>
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
                            onClick={e => dispatchNewRoute('/login')}
                        >
                            <div style={{ fontSize: 14, color: '#adadad' }}>
                                <i class="fa fa-user"></i>
                                <span style={{ marginLeft: 8 }}>Log In</span>
                            </div>
                        </IconButton>
                    </div>
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
                    <span>©2016-2019 Angell Enterprises, Inc. All rights reserved.</span>
                </div>
            </div>
        );
    }
}

Base.propTypes = {
    pathname: PropTypes.string,
    classes: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
};

export default withStyles(styles)(Base);
