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
	const { getTilesUrl } = useStyles();
	
	const { viewport } = useMapbox();

	const { zoom, longitude, latitude } = viewport;
	const floorZoom = Math.floor(zoom);

	const { xTile, yTile } = lonLatToTile(longitude, latitude, floorZoom)
	
	const fetchTiles = async (tableSchema: any, tableName: any) => {
		const promises = [];
		
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				const x = xTile + dx;
				const y = yTile + dy;
				const url = getTilesUrl(tableSchema, tableName, x, y, floorZoom);
				promises.push(fetch(url).then(res => res.arrayBuffer()));
			}
		}
	  	const tileBuffers = await Promise.all(promises);

	  	const geojsonDataArray = tileBuffers.map((buffer: any, index: any) => {
			const xOffset = xTile + (index % 3) - 1;
			const yOffset = yTile + Math.floor(index / 3) - 1;
			return mvtToGeoJSON(buffer, xOffset, yOffset, floorZoom);
	    });

  	    const mergedGeojsonData = {
			type: 'FeatureCollection',
			features: geojsonDataArray.flatMap(geojson => geojson.features),
		};

		return mergedGeojsonData;
	}
		

	return (
		<TilesContext.Provider value={{ fetchTiles }}>
			{children}
		</TilesContext.Provider>
	)
}

TilesContext.displayName = "TilesContext";