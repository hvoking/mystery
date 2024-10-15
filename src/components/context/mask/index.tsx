// React imports
import { useState, useEffect, useMemo, useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';

const MaskContext: React.Context<any> = createContext(null)

export const useMask = () => {
	return (
		useContext(MaskContext)
	)
}

export const MaskProvider = ({children}: any) => {
	const { mapRef } = useMapbox();

	const [ mapFeatures, setMapFeatures ] = useState([]);
	const [ activeFeatures, setActiveFeatures ] = useState(false);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		const onData = (e: any) => e.tile && setActiveFeatures((prev) => !prev);
	    map.on('data', onData);

	    return () => {
	    	map.off('data', onData)
	    };
	}, [ mapRef.current ]);

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;
		const features = map.queryRenderedFeatures();
		setMapFeatures(features);
	}, [ activeFeatures, mapRef.current ]);

	const existingGeojson = useMemo(() => {
	    return mapFeatures.filter((item: any) => {
	        if (item.source === 'raster-style') {
	            const featureGeometry = item.geometry;
	            return featureGeometry;
	        }
	    	return false
	    });
	}, [ mapFeatures ]);

	return (
		<MaskContext.Provider value={{ existingGeojson }}>
			{children}
		</MaskContext.Provider>
	)
}

MaskContext.displayName = "MaskContext";