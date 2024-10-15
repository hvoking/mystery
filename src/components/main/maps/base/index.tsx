// Context imports
import { useMask } from '../../../context/mask';

// Third party imports
import { Source, Layer } from 'react-map-gl';
import * as turf from '@turf/turf';

export const Base = () => {
	const { existingGeojson } = useMask();

	const data = turf.featureCollection(existingGeojson);

	const layer: any = {
	    id: 'base-layer',
	    type: 'fill',
	    source: 'base',
	    paint: {
	        "fill-color": "rgb(126, 126, 132)",
	        "fill-opacity": 0.2
	    }
	};

	return (
		<Source 
			id="base" 
			type="geojson" 
			data={data}
		>
			<Layer {...layer}/>
		</Source>
	)
}

Base.displayName="Base"