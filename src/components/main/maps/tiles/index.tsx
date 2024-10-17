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

	const transformStyles = (styles: any) => {
		return styles.map((style: any) => {
			const { "source-layer": sourceLayer, source, ...rest } = style;

			return {
				...rest,
				source: "vector-tiles"
			};
		});
	}
	const updatedStyles = transformStyles(styleData);

	const layers = updatedStyles.map((style: any, index: number) => {
		return (
			<Layer key={index} {...style}/>
		)
	});

	return (
		<>
		{tilesData && 
		<Source
			id="vector-tiles"
			type="geojson"
			data={tilesData}
		>
			{layers}
		</Source>}
		</>
	)
}

Tiles.displayName="Tiles"