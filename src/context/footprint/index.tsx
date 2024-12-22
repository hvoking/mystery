// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';

// Third-party libraries
import * as turf from '@turf/turf';

const FootprintContext: React.Context<any> = createContext(null);

export const useFootprint = () => {
	return (
		useContext(FootprintContext)
	)
}

export const FootprintProvider = ({children}: any) => {
	const { viewport } = useMapbox();
	const { latitude, longitude } = viewport;
	const center = [ longitude, latitude ];

	const [ circleRadius, setCircleRadius ] = useState(0.05);
	const [ footprintData, setFootprintData ] = useState<any[]>([]);
	
	const circleGeometry: any = turf.circle(center, circleRadius);

	useEffect(() => {
		setFootprintData((prev) => [...prev, circleGeometry]);
	}, [ viewport ])
	    
	return (
		<FootprintContext.Provider value={{ 
			circleGeometry,
			circleRadius, setCircleRadius,
			footprintData
		}}>
			{children}
		</FootprintContext.Provider>
	)
}

FootprintContext.displayName = "FootprintContext";