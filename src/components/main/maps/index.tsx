// React imports
import { useCallback } from 'react';

// App imports
import { Tiles } from './tiles';
import { Circle } from './circle';
import { Avatar } from './avatar';
import './styles.scss';

// Context imports
import { useGeo } from '../../context/geo';
import { useEvents } from '../../context/maps/events';

// Third-party imports
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Maps = () => {
  const { mapRef, basemap, viewport, setViewport } = useGeo();
  const { isDragging, onDragStart, onMouseMove, onDragEnd } = useEvents();

  const onDblClick = useCallback((e: any) => {
    const lng = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setViewport((prev: any) => ({...prev, longitude: lng, latitude: lat }));
  }, []); 

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
        <Avatar/>
      </Map>
    </div>
  );
}

Maps.displayName="Maps";