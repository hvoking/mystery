import { useState, useEffect } from 'react';

// Context imports
import { useTiles } from 'context/tiles';
import { useStyles } from 'context/styles';
import { useMapbox } from 'context/mapbox';

// Third party imports
import { Source, Layer } from 'react-map-gl';

const tableSchema = "layers";
const tableName = "jan";

export const Tiles = () => {
	const { fetchTiles } = useTiles();
	const { fetchData } = useStyles();
	const { viewport } = useMapbox();

	const [ styleData, setStyleData ] = useState<any[]>([]);
	const [ tilesData, setTilesData ] = useState<any>(null);

    useEffect(() => {
    	const loadData = async () => {
			const data = await fetchData('', tableName);
			setStyleData(data);
		}
		loadData();
	}, []);

	useEffect(() => {
    	const loadData = async () => {
			const tiles = await fetchTiles(tableSchema, tableName);
			setTilesData(tiles);
		}
		loadData();
	}, [ viewport ]);

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