// App imports
import { Tiles } from './tiles';
import { Circle } from './circle';
import { Avatar } from './avatar';
import { Footprint } from './footprint';
import './styles.scss';

// Context imports
import { useMapbox } from '../../context/mapbox';
import { useEvents } from '../../context/events';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
  const { mapRef, basemap, viewport } = useMapbox();
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
        <Footprint/>
        <Avatar/>
      </Map>
    </div>
  );
}

Maps.displayName="Maps";