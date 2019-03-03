import * as React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import MapboxDrawControls from './MapboxDrawControls';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZWRpc2hpb25zIiwiYSI6ImNqamVyM2hkcDMyenUzdHBlZmI5MWh0ejEifQ.KtanJZfVk0FiYLH4VI8UUQ',
  maxZoom: 25,
  minZoom: 10
});

const styles = createStyles({
  controls: {
    width: 60,
    height: '100%',
    position: 'absolute',
    right: 0,
    backgroundColor: grey[600]
  }
});

interface Props extends WithStyles<typeof styles> { }

const MapboxDraw = ({ classes }: Props) => {
  return (
    <Map 
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{
        height: '100vh',
        width: '100%'
      }}
    >
      <MapboxDrawControls />
    </Map>
  );
};

export default withStyles(styles)(MapboxDraw);