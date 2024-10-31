// Context imports
import { useFootprint } from '../../../context/footprint';

// Third-party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Footprint = () => {
    const { footprintData } = useFootprint();

    const marksLayer: LayerProps = {
        id: 'footprint-layer',
        type: 'fill',
        source: 'footprint',
        paint: {
            'fill-color': 'rgb(204, 255, 41)',
            'fill-opacity': 0.2,
        },
    };

    const geojson = {
        type: 'FeatureCollection',
        features: footprintData.map((geometry: any) => geometry)
    };

    return (
        <Source id="footprint" type="geojson" data={geojson}>
            <Layer {...marksLayer} />
        </Source>
    );
};

Footprint.displayName = "Footprint";