// notAuthenticatedComponent.js
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../history';

import RetailerBase from '../components/VeriDoc/Base/RetailerBase';
import Base from '../components/VeriDoc/Base';

function mapStateToProps(state) {
    return {
        routing: state.routing,
    };
}

export function requireNoAuthentication(Component) {

    @connect(mapStateToProps)
    class notAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false,
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
            if (!this.state.isAuthenticated) {
                const idToken = localStorage.getItem('idToken');
                if (!idToken) {
                    console.log('N1');
                    this.setState({
                        isLoaded: true,
                    });
                } else {
                    console.log('N2');
                    this.setState({
                        isLoaded: true,
                    });
                }
            } else {
                console.log('N3');
                this.setState({
                    isLoaded: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {!this.state.isAuthenticated && this.state.isLoaded
                        ? (
                          <Base>
                              <Component {...this.props} />
                          </Base>
                        )
                        : null
                    }
                </div>
            );
        }
    }

    notAuthenticatedComponent.defaultProps = {
        isLoginAuthenticated: false,
    };

    notAuthenticatedComponent.propTypes = {
        isLoginAuthenticated: PropTypes.bool,
    };

    return notAuthenticatedComponent;

}
