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
	const tableSchema = "layers";
	const tableName = "jan";
	
	const { viewport } = useMapbox();

	const { zoom, longitude, latitude } = viewport;
	const floorZoom = Math.floor(zoom);

	const { xTile, yTile } = lonLatToTile(longitude, latitude, floorZoom)
	const [ tilesData, setTilesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const promises = [];
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					const x = xTile + dx;
					const y = yTile + dy;
					const url = `
						${process.env.REACT_APP_API_URL}/
						tiles
						?table_schema=${tableSchema}
						&table_name=${tableName}
						&z=${floorZoom}
						&x=${x}
						&y=${y}
					`.replace(/\s/g, '');

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
			setTilesData(mergedGeojsonData);
		}
		fetchData();
	}, [viewport]);

	return (
		<TilesContext.Provider value={{ tilesData }}>
			{children}
		</TilesContext.Provider>
	)
}

TilesContext.displayName = "TilesContext";