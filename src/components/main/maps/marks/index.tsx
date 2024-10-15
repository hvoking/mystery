// Context imports
import { useCircle } from '../../../context/maps/circle';

// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const MarkedPolygons = () => {
    const { markGeometries } = useCircle();

    const marksLayer: LayerProps = {
        id: 'marks-layer',
        type: 'fill',
        source: 'marks',
        paint: {
            'fill-color': 'rgb(255, 0, 0)', // Different color for the marks
            'fill-opacity': 1,
        },
    };

    const geojson = {
        type: 'FeatureCollection',
        features: markGeometries.map((geometry: any) => ({
            type: 'Feature',
            geometry,
        })),
    };

    return (
        <Source id="marks" type="geojson" data={geojson}>
            <Layer {...marksLayer} />
        </Source>
    );
};

MarkedPolygons.displayName = "MarkedPolygons";