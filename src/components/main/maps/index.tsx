// React imports
import { useCallback } from 'react';

// App imports
import { Base } from './base';
import { Tiles } from './tiles';
import { Circle } from './circle';
import { Avatar } from './avatar';
import { Mask } from './mask';
import './styles.scss';

// Context imports
import { useMapbox } from '../../context/mapbox';
import { useEvents } from '../../context/events';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
  const { mapRef, basemap, viewport, setViewport } = useMapbox();
  const { isDragging, onDragStart, onMouseMove, onDragEnd, onDblClick } = useEvents();

  return (
    <div className="map-wrapper">
      <Map
        ref={mapRef}
        mapStyle={basemap}
        initialViewState={viewport} 
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        doubleClickZoom={false}
        onDblClick={onDblClick}
        onMouseDown={onDragStart}
        onMouseMove={onMouseMove}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onMouseMove}
        onTouchEnd={onDragEnd}
        dragPan={!isDragging}
      >
        <Circle/>
        <Tiles/>
        <Base/>
        <Mask/>
        <Avatar/>
      </Map>
    </div>
  );
}

Maps.displayName="Maps";