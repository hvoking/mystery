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
	const { viewport, mapRef, mapDimensions } = useMapbox();
	const { width, height } = mapDimensions;

	const { zoom, longitude, latitude } = viewport;
	const floorZoom = Math.floor(zoom);

	const tileSize = 256;
	const numTiles = Math.pow(2, floorZoom);

	const xTile = Math.floor(((longitude + 180) / 360) * numTiles);
	const yTile = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * numTiles);

	const tilesAcrossX = Math.ceil(width / tileSize);
	const tilesAcrossY = Math.ceil(height / (tileSize * Math.cos(latitude * Math.PI / 180)));

	const startX = xTile - Math.floor(tilesAcrossX / 2);
	const endX = xTile + Math.floor(tilesAcrossX / 2);
	const startY = yTile - Math.floor(tilesAcrossY / 2);
	const endY = yTile + Math.floor(tilesAcrossY / 2);

	const [ tilesData, setTilesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const promises = [];

			for (let x = startX; x <= endX; x++) {
	      		for (let y = startY; y <= endY; y++) {
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
				const xOffset = startX + (index % (endX - startX + 1));
				const yOffset = startY + Math.floor(index / (endX - startX + 1));
				return mvtToGeoJSON(buffer, xOffset, yOffset, floorZoom);
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