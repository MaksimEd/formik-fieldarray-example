import * as React from 'react';
import { Map } from 'mapbox-gl';
const MapboxDraw = require('@mapbox/mapbox-gl-draw');
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import { withStyles, WithStyles, createStyles, Button } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const styles = createStyles({
  controls: {
    width: 60,
    height: '100%',
    position: 'absolute',
    right: 0,
    backgroundColor: grey[600]
  }
});

interface Props extends WithStyles<typeof styles> { 
  map: Map;
}

class MapboxDrawControls extends React.PureComponent<Props> {

  private draw?: any;

  state = {
    isShow: false
  };

  handleClickZoom = (zoom: number) => () => {
    const { map } = this.props;
    map.zoomTo(map.getZoom() + zoom);
  }

  // tslint:disable-next-line:no-console
  onDrawCreate = (e: any) => console.log('onDrawCreate', e);
  // tslint:disable-next-line:no-console
  onDrawUpdate = (e: any) => console.log('onDrawUpdate', e);
  // tslint:disable-next-line:no-console
  onDrawDelete = (e: any) => console.log('onDrawDelete', e);
  // tslint:disable-next-line:no-console
  onDrawSelectionChange = (e: any) => {
    // tslint:disable-next-line:no-console
    console.log(
      e,
      JSON.stringify(e.features, null, 2),
      this.draw.getSelectedIds()
      );
  };

  componentWillUnmount () {
    const { map } = this.props;
    if (!map || !map.getStyle() || !this.draw) {
      return;
    }
    map.removeControl(this.draw);
  }

  componentDidMount() {
    const { map } = this.props;

    this.draw = new MapboxDraw({
      modes: {
        ...(MapboxDraw as any).modes,
      },
      displayControlsDefault: false,
      styles: [
        {
          'id': 'gl-draw-line',
          'type': 'line',
          'filter': ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#D20C0C',
            'line-dasharray': [0.2, 2],
            'line-width': 2
          }
        },
        {
            'id': 'gl-draw-polygon-fill-inactive',
            'type': 'fill',
            'filter': ['all', ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static']
            ],
            'paint': {
                'fill-color': '#3bb2d0',
                'fill-outline-color': '#3bb2d0',
                'fill-opacity': 0.1
            }
        },
        {
            'id': 'gl-draw-polygon-fill-active',
            'type': 'fill',
            'filter': ['all', ['==', 'active', 'true'],
                ['==', '$type', 'Polygon']
            ],
            'paint': {
                'fill-color': '#fbb03b',
                'fill-outline-color': '#fbb03b',
                'fill-opacity': 0.1
            }
        },
        {
            'id': 'gl-draw-polygon-midpoint',
            'type': 'circle',
            'filter': ['all', ['==', '$type', 'Point'],
                ['==', 'meta', 'midpoint']
            ],
            'paint': {
                'circle-radius': 3,
                'circle-color': '#fbb03b'
            }
        },
        {
            'id': 'gl-draw-polygon-stroke-inactive',
            'type': 'line',
            'filter': ['all', ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static']
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#3bb2d0',
                'line-width': 2
            }
        },
        {
            'id': 'gl-draw-polygon-stroke-active',
            'type': 'line',
            'filter': ['all', ['==', 'active', 'true'],
                ['==', '$type', 'Polygon']
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fbb03b',
                'line-width': 2
            }
        },
        {
            'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
            'type': 'circle',
            'filter': ['all', ['==', 'meta', 'vertex'],
                ['==', '$type', 'Point'],
                ['!=', 'mode', 'static']
            ],
            'paint': {
                'circle-radius': 5,
                'circle-color': '#fff'
            }
        },
        {
            'id': 'gl-draw-polygon-and-line-vertex-inactive',
            'type': 'circle',
            'filter': ['all', ['==', 'meta', 'vertex'],
                ['==', '$type', 'Point'],
                ['!=', 'mode', 'static']
            ],
            'paint': {
                'circle-radius': 3,
                'circle-color': 'red'
            }
        },
        {
            'id': 'gl-draw-polygon-fill-static',
            'type': 'fill',
            'filter': ['all', ['==', 'mode', 'static'],
                ['==', '$type', 'Polygon']
            ],
            'paint': {
                'fill-color': '#404040',
                'fill-outline-color': '#404040',
                'fill-opacity': 0.1
            }
        },
        {
            'id': 'gl-draw-polygon-stroke-static',
            'type': 'line',
            'filter': ['all', ['==', 'mode', 'static'],
                ['==', '$type', 'Polygon']
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#404040',
                'line-width': 2
            }
        }
      ]
    
    });

    map.addControl(this.draw, 'bottom-right');

    // Hook draw events
    map.on('draw.create', this.onDrawCreate);
    map.on('draw.update', this.onDrawUpdate);
    map.on('draw.delete', this.onDrawDelete);
    map.on('draw.selectionchange', this.onDrawSelectionChange);

    this.draw.set({
      type: 'FeatureCollection',
      features: [{
        'id': '7bbaa9aeee4a9bc30285862eb8dedf55',
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'coordinates': [
            [
              [
                -0.2737821774908866,
                51.54937841280298
              ],
              [
                -0.22812025122365753,
                51.50666001324211
              ],
              [
                -0.18177167945034967,
                51.553007628660396
              ],
              [
                -0.2737821774908866,
                51.54937841280298
              ]
            ]
          ],
          'type': 'Polygon'
        }
      }, {
        'id': 'a44afaf37ed9435cae3e7eb11b51f4a3',
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'coordinates': [
            [
              [
                -0.29094831519395825,
                51.563680114916934
              ],
              [
                -0.22812025122365753,
                51.575203587209074
              ],
              [
                -0.29953138404047763,
                51.58907055967572
              ],
              [
                -0.33043043188604315,
                51.57221630078902
              ],
              [
                -0.33317701392056165,
                51.550018883696595
              ],
              [
                -0.29094831519395825,
                51.563680114916934
              ]
            ]
          ],
          'type': 'Polygon'
        }
      }]
    });

    // this.draw.changeMode('direct_select', { featureId: '7bbaa9aeee4a9bc30285862eb8dedf55'});

  }

  componentDidUpdate() {
    
    this.draw.set({
      type: 'FeatureCollection',
      features: [{
        'id': '7bbaa9aeee4a9bc30285862eb8dedf55',
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'coordinates': [
            [
              [
                -0.2737821774908866,
                51.54937841280298
              ],
              [
                -0.22812025122365753,
                51.50666001324211
              ],
              [
                -0.18177167945034967,
                51.553007628660396
              ],
              [
                -0.2737821774908866,
                51.54937841280298
              ]
            ]
          ],
          'type': 'Polygon'
        }
      }]
    });
  }
  // this.changeMode('simple_select');
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.controls}>
        <Button variant={'contained'} color={'primary'} onClick={this.handleClickZoom(1)}>
          +
        </Button>
        <Button variant={'contained'} color={'primary'} onClick={this.handleClickZoom(-1)}>
          -
        </Button>
        <Button 
          variant={'contained'} 
          color={'primary'} 
          onClick={() => this.draw && this.draw.changeMode('simple_select')}
        >
          simple_select
        </Button>
        <Button 
          variant={'contained'} 
          color={'primary'} 
          onClick={() => this.draw && this.draw.changeMode('draw_polygon')}
        >
          draw_polygon
        </Button>
        <Button 
          variant={'contained'} 
          color={'primary'} 
          onClick={() => this.draw && this.draw.trash()}
        >
          trash
        </Button>
        
      </div>
    );
  }
}

export default withStyles(styles)(MapboxDrawControls);