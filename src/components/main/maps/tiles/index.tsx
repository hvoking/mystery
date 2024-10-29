import { useState, useEffect } from 'react';

// Context imports
import { useTiles } from '../../../context/tiles';
import { useStyles } from '../../../context/styles';

// Third party imports
import { Source, Layer } from 'react-map-gl';

export const Tiles = () => {
	const { tilesData } = useTiles();
	const { fetchData } = useStyles();
	const [ styleData, setStyleData ] = useState<any[]>([]);

	const tableName = "jan";

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData('', tableName);
			setStyleData(data);
		}
		loadData();
	}, []);

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