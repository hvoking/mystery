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
	const { viewport, mapRef } = useMapbox();

	const [ tilesData, setTilesData ] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const { zoom, longitude, latitude } = viewport;
			const floorZoom = Math.floor(zoom);
		    const { xTile, yTile } = lonLatToTile(longitude, latitude, floorZoom);

			const promises = [];

			for (let x = xTile - 1; x <= xTile + 1; x++) {
				for (let y = yTile - 1; y <= yTile + 1; y++) {
				  const tempUrl = `
				    ${process.env.REACT_APP_API_URL}/
				    tiles
				    ?schema_name=layers
				    &style_name=${styleName}
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