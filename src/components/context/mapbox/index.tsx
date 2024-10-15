// React imports
import { useState, useRef, useEffect, useContext, createContext } from 'react';

// App imports
import * as Locations from './locations';

const MapboxContext: React.Context<any> = createContext(null);

export const useMapbox = () => {
	return (
		useContext(MapboxContext)
	)
}

export const MapboxProvider = ({children}: any) => {
	const mapRef = useRef<any>();

	const [ basemap, setBasemap ] = useState("mapbox://styles/hvoking/clrwzn1jo015q01nl53664m2c");
	const [ viewport, setViewport ] = useState(Locations.holesov);

	useEffect(() => {
		mapRef.current?.flyTo({
			center: [ viewport.longitude, viewport.latitude ],
			zoom: viewport.zoom,
			duration: 3000, 
			essential: true,
		});
	}, [ viewport ]);

	return (
		<MapboxContext.Provider value={{
			mapRef,
			basemap, setBasemap,
			viewport, setViewport
		}}>
			{children}
		</MapboxContext.Provider>
	)
}

MapboxContext.displayName = "MapboxContext";