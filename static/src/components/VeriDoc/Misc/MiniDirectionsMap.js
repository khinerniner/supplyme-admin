import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import TablePaginationActions from '../../TablePaginationActions';

import {
  formatDateWTime,
  formatAddress,
  formatDateNoTime
} from '../../../utils/misc';
import {
  formatRequestStatus
} from '../../../utils/events';

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
    color: '#2A38D8',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
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
  mapStyles: {
    width: '100%',
    height: '100%',
  },
});

const MiniDirectionsMap = withScriptjs(withGoogleMap((props) => {
  const { classes, origin, destination } = props;
  var myOptions = {
     mapTypeControl: false,
     draggable: false,
     scaleControl: false,
     scrollwheel: false,
     navigationControl: false,
     streetViewControl: false,
     disableDefaultUI: true,
  };
  console.log(origin)
  console.log(destination)
  const DirectionsService = new google.maps.DirectionsService();
  console.log(DirectionsService)
  // const waypoint = google.maps.DirectionsWaypoint({lat: 40.8507300, lng: -86.6512600})
  var directions = null;
  var waypoints = null;
  DirectionsService.route({
      origin: new google.maps.LatLng(41.8507300, -87.6512600),
      destination: new google.maps.LatLng(41.8525800, -87.6514100),
      // waypoints: [waypoint],
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true
  }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
          directions = result;
      } else {
          console.error(`Error fetching directions ${result}`);
      }
  });
  console.log(waypoints)
  console.log(directions)
  return (
    <Paper className={classes.root}>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
            defaultOptions={myOptions}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    </Paper>
  );
}));

MiniDirectionsMap.propTypes = {
  googleMapURL: PropTypes.string.isRequired,
  loadingElement: PropTypes.object.isRequired,
  containerElement: PropTypes.object.isRequired,
  mapElement: PropTypes.object.isRequired,
  origin: PropTypes.object.isRequired,
  destination: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MiniDirectionsMap);
