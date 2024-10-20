// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { mvtToGeoJSON } from './toGeojson';

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

	const { zoom, longitude, latitude } = viewport;
	const floorZoom = Math.floor(zoom);

	const numTiles = Math.pow(2, floorZoom);
	const xTile = Math.floor(((longitude + 180) / 360) * numTiles);
	const yTile = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * numTiles);

	const [ tilesData, setTilesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const promises = [];

			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					const x = xTile + dx;
					const y = yTile + dy;
				  const tempUrl = `
				    ${process.env.REACT_APP_API_URL}/
				    tiles
				    ?table_schema=layers
				    &table_name=${styleName}
				    &z=${floorZoom}
				    &x=${x}
				    &y=${y}
				  `.replace(/\s/g, '');
				  
				  promises.push(fetch(tempUrl).then(res => res.arrayBuffer()));
				}
			}
		  	const tileBuffers = await Promise.all(promises);

		  	const geojsonDataArray = tileBuffers.map((buffer: any, index: any) => {
				const x = xTile + (index % 3) - 1;
				const y = yTile + Math.floor(index / 3) - 1;
				return mvtToGeoJSON(buffer, x, y, floorZoom);
		    });

	  	    const mergedGeojsonData = {
				type: 'FeatureCollection',
				features: geojsonDataArray.flatMap(geojson => geojson.features),
			};
			setTilesData(mergedGeojsonData);
		}
		fetchData();
	}, [viewport, styleName]);

	return (
		<TilesContext.Provider value={{ tilesData }}>
			{children}
		</TilesContext.Provider>
	)
}

TilesContext.displayName = "TilesContext";