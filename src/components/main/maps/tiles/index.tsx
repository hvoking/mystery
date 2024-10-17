// React imports
import { useState, useEffect } from 'react';

// Context imports
import { useTiles } from '../../../context/tiles';
import { useStyles } from '../../../context/styles';
import { useMapbox } from '../../../context/mapbox';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Tiles = () => {
	const { tilesData } = useTiles();
	const { styleData } = useStyles();

	const layers = styleData.map((style: any, index: number) => {
		return (
			<Layer key={index} {...style}/>
		)
	});
	
	return (
		<Source
			id="vector-tiles"
			type="geojson"
			data={tilesData}
		>
			{layers}
		</Source>
	)
}

Tiles.displayName="Tiles"