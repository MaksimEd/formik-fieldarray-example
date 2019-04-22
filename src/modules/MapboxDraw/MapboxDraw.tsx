import * as React from 'react';
import ReactMapGL from 'react-map-gl';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

// import MapboxDrawControls from './MapboxDrawControls';

const styles = createStyles({
  controls: {
    backgroundColor: grey[600],
    height: '100%',
    position: 'absolute',
    right: 0,
    width: 60
  }
});

interface Props extends WithStyles<typeof styles> { }

const MapboxDraw = ({ classes }: Props) => {
  const [viewport, setViewport] = React.useState<any>({
    width: '100%',
    height: '100%',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    minZoom: 7,
    maxZoom: 9
  });
  const updateState = (v: any) => setViewport(v);
  return (
    <div style={{width: '100%', height: '100vh'}}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        
        onViewportChange={updateState}
        mapboxApiAccessToken="pk.eyJ1IjoiZWRpc2hpb25zIiwiYSI6ImNqamVyM2hkcDMyenUzdHBlZmI5MWh0ejEifQ.KtanJZfVk0FiYLH4VI8UUQ"
      />
    </div>
  );
};

export default withStyles(styles)(MapboxDraw);