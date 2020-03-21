/* eslint camelcase: 0, no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
      flex: 1,
      height: '100vh',
      backgroundColor: '#e8e8e8',
      fontFamily: "Times New Roman",
    },
    header: {
        fontSize: 62,
        fontWeight: 800,
        paddingTop: 40,
    },
    headerImg: {
        padding: 20,
    },
    headerBox: {
        zIndex: 100,
        margin: 'auto',
        paddingTop: 40,
        textAlign: 'center',
        color: '#000'
    },
    middleBox: {
        maxWidth: 400,
        zIndex: 100,
        margin: 'auto',
        paddingTop: 20,
        textAlign: 'center',
        color: '#000'
    },
    bold: {
        fontWeight: 600,
    },
    quote: {
        fontSize: 16,
    },
    tributeBox: {
      paddingTop: 30,
      width: '80%',
      margin: 'auto',
      overflowX: 'auto',
    },
    tribute: {
      display: 'inline-flex',
      justifyContent: 'space-between',
    },
    tributeChild: {
      textAlign: 'center',
      padding: 10
    },
    img: {
        borderRadius: '50%',
        height: 40,
        margin: 'auto',
        width: 'auto',
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: '#000'
    },
    link: {
        fontSize: 14,
        fontWeight: 600,
        color: '#1835ff',
        cursor: 'pointer'
    }
};

class WallOfValor extends Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.headerBox}>
                  <span className={classes.header}>THE WALL</span><img className={classes.headerImg} alt="ae_logo" height="200px" width="200px" src="/src/containers/App/styles/img/aelogo.png" /><span className={classes.header}>OF VALOR</span>
                  <div className={classes.middleBox}>
                      <h3 className={classes.bold}>COVID-19 Lives Claimed: 12354</h3>
                      <div className={classes.quote}>
                          {'IN HONOR OF THOSE WHO LOST THEIR LIVES DURING THE 2020 GLOBAL PANDEMIC'}
                      </div>
                      <div className={classes.link}>
                          {'Want To Add Someone Special?'}
                      </div>
                  </div>
                </div>
                <div className={classes.tributeBox}>
                    <div className={classes.tribute}>
                        <div className={classes.tributeChild}>
                            <img className={classes.img} src="/src/containers/App/styles/img/temp_anon.jpg" alt="" />
                            <div className={classes.name}>John Doe</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

WallOfValor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WallOfValor);
