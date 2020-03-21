/* eslint camelcase: 0, no-underscore-dangle: 0, react/jsx-indent-props: 0 */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone';

// import {
//   createAccountMedia,
// } from '../../../services/media/actions';
import { sortByValue } from '../../../utils/misc';

const styles = theme => ({
    fab: {
        float: 'left',
        margin: theme.spacing(1),
    },
    flex: {
        display: 'flex !important',
        minWidth: '100%',
    },
    mediaBox: {
        margin: 5,
        padding: 5,
        color: '#34495e',
    },
    box: {
        maxHeight: 120,
        margin: 5,
        padding: 5,
        color: '#34495e',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        width: 'auto',
    },
    tagBox: {
        width: '50%',
    },
    secondText: {
        color: '#000000a8',
        fontFamily: 'roboto',
        fontSize: 12,
        fontWeight: 400,
    },
    helpText: {
        fontWeight: 200,
        fontSize: 12,
    },
    imgContainer: {
        width: '50%',
        float: 'right',
    },
    img: {
        height: 150,
        width: 'auto',
    },
    container: {
        overflow: 'hidden',
        flexWrap: 'wrap',
        display: 'flex',
    },
    desktop: {
        width: '50%',
    },
    mediaDisplay: {
        width: 300,
        margin: 10,
        border: '5px solid #5cceda',
        padding: 20,
    },
    samyh4: {
        color: 'black',
        fontFamily: 'roboto',
        fontSize: 18,
        fontWeight: 400,
        marginBottom: 8,
        marginTop: 28,
    },
    autoBox: {
        padding: 20,
    },
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            // createAccountMedia: bindActionCreators(createAccountMedia, dispatch),
        },
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class UploadValorMedia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            filePreview: '/',
            hasFiles: false,
        };
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        console.error('Media Component Received Props');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState === this.state) {
            return false;
        }
        return true;
    }

    uploadMedia = () => {
        const {
            actions,
            idToken,
            employeeID,
            accountID,
            type,
            typeID,
        } = this.props;
        // actions.createAccountMedia(idToken, employeeID, accountID, this.state.files, this.state.keywordList, this.state.location);
    }

    onDrop = (files) => {
        console.log(files)
        this.setState({
            files,
            filePreview: URL.createObjectURL(files[0]),
            hasFiles: true,
        });
    }

    renderDropDisplay = (isDragActive) => {
        const { classes } = this.props;
        return (
            <img className={classes.img} src="/src/containers/App/styles/img/add_media.png" />
        );
    }

    render() {
        const { classes, medias, upload } = this.props;
        const {
            hasFiles,
            filePreview,
        } = this.state;
        return (
          <div>
              <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} style={{width: 150}} className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}>
                          <input onClick={e => e.preventDefault()} {...getInputProps()} />
                          {this.renderDropDisplay(isDragActive)}
                      </div>
                  )}
              </Dropzone>
          </div>
        );
    }
}

UploadValorMedia.defaultProps = {
    createAccountMedia: f => f,
};
UploadValorMedia.propTypes = {
    createAccountMedia: PropTypes.func,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(UploadValorMedia);

// {sortByValue(medias, 'createdTime').map(this.renderMediaMedia, this)}
