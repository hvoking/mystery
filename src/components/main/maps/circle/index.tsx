// Context imports
import { useCircle } from '../../../context/maps/circle';

// Third party imports
import { Source, Layer, LayerProps } from 'react-map-gl';

export const Circle = () => {
    const { circleGeometry } = useCircle();

    const circleLayer: LayerProps = {
        id: 'layer-mask',
        type: 'fill',
        source: 'polygon',
        paint: {
            "fill-color": "rgb(126, 126, 132)",
            "fill-opacity": 0.2
        }
    };

    return (
        <Source 
            id="polygon" 
            type="geojson" 
            data={circleGeometry}
        >
            <Layer {...circleLayer}/>
        </Source>
    );
};

Circle.displayName = "Circle";