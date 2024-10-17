// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { mvtToGeoJSON, lonLatToTile } from './toGeojson';

// Context imports
import { useStyles } from '../styles';
import { useMapbox } from '../mapbox';

const TilesContext: React.Context<any> = createContext(null)

export const useTiles = () => {
	return (
		useContext(TilesContext)
	)
}

export const TilesProvider = ({children}: any) => {
	const { styleName } = useStyles();
	const { viewport } = useMapbox();

	const [ tilesData, setTilesData ] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const { zoom, longitude, latitude } = viewport;
		    const { xTile, yTile } = lonLatToTile(longitude, latitude, zoom);

		    const floorZoom = Math.floor(zoom);

			const tempUrl = `
				${process.env.REACT_APP_API_URL}/
				tiles
				?schema_name=layers
				&style_name=${styleName}
				&z=${floorZoom}
				&x=${xTile}
				&y=${yTile}
			`;
		  	const url = tempUrl.replace(/\s/g, '');
		  	const res = await fetch(url);
		  	const receivedData = await res.arrayBuffer();
		  	const geojsonData: any = mvtToGeoJSON(receivedData, xTile, yTile, floorZoom);
            setTilesData(geojsonData);
		}
		fetchData();
	}, [ viewport, styleName ])

	return (
		<TilesContext.Provider value={{ tilesData }}>
			{children}
		</TilesContext.Provider>
	)
}

TilesContext.displayName = "TilesContext";