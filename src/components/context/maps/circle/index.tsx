// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// Context imports
import { useGeo } from '../../geo';

const CircleContext: React.Context<any> = createContext(null);

export const useCircle = () => {
	return (
		useContext(CircleContext)
	)
}

export const CircleProvider = ({children}: any) => {
	const { viewport } = useGeo();

	const latitude = viewport.latitude;
	const longitude = viewport.longitude;
	
	const [ circleRadius, setCircleRadius ] = useState(0.05);
	const [ markGeometries, setMarkGeometries ] = useState<any[]>([]);
	
	const createCircle = (lng: any, lat: any, radiusInKm: any, points: any) => {
	    if(!points) points = 16;

	    const distanceX = radiusInKm / (111.320 * Math.cos(lat * Math.PI / 180));
	    const distanceY = radiusInKm / 110.574;

	    let theta, x, y;
	    const ret = [];

	    for(let i=0; i<points; i++) {
	        theta = (i / points) * (2 * Math.PI);
	        x = distanceX * Math.cos(theta);
	        y = distanceY * Math.sin(theta);

	        ret.push([lng + x, lat + y]);
	    }
	    ret.push(ret[0]);

	    return {
	        "type": "Polygon",
	        "coordinates": [ret]
	    };
	};

	const circleGeometry: any = createCircle(longitude, latitude, circleRadius, 16);

	useEffect(() => {
		const newMark = circleGeometry;
		setMarkGeometries((prev) => [...prev, newMark]);
	}, [ circleGeometry ])
	    
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