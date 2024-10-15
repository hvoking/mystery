// Context imports
import { useCircle } from '../../../context/circle';

// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Mask = () => {
    const { markGeometries } = useCircle();

    const marksLayer: LayerProps = {
        id: 'mask-layer',
        type: 'fill',
        source: 'mask',
        paint: {
            'fill-color': 'rgb(204, 255, 41)',
            'fill-opacity': 0.2,
        },
    };

    const geojson = {
        type: 'FeatureCollection',
        features: markGeometries.map((geometry: any) => geometry)
    };

    return (
        <Source id="mask" type="geojson" data={geojson}>
            <Layer {...marksLayer} />
        </Source>
    );
};

Mask.displayName = "Mask";