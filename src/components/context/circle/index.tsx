// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';

// Third-party libraries
import * as turf from '@turf/turf';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const { viewport } = useMapbox();

	const latitude = viewport.latitude;
	const longitude = viewport.longitude;
	
	const [ circleRadius, setCircleRadius ] = useState(0.05);
	const [ markGeometries, setMarkGeometries ] = useState<any[]>([]);
	
	const circleGeometry: any = turf.circle([longitude, latitude], circleRadius);

	useEffect(() => {
		setMarkGeometries((prev) => [...prev, circleGeometry]);
	}, [ viewport ])
	    
	return (
		<CircleContext.Provider value={{ 
			circleGeometry,
			circleRadius, setCircleRadius,
			markGeometries
		}}>
			{children}
		</CircleContext.Provider>
	)
}

CircleContext.displayName = "CircleContext";