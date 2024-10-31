// Context imports
import { MapboxProvider } from './mapbox';
import { StylesProvider } from './styles';
import { MaskProvider } from './mask';
import { FootprintProvider } from './footprint';
import { EventsProvider } from './events';
import { TilesProvider } from './tiles';

export const MainProvider = ({ children }: any) => {
	return (
		<MapboxProvider>
		<FootprintProvider>
		<EventsProvider>
		<StylesProvider>
		<TilesProvider>
		<MaskProvider>
			{children}
		</MaskProvider>
		</TilesProvider>
		</StylesProvider>
		</EventsProvider>
		</FootprintProvider>
    	</MapboxProvider>
	)
}

MainProvider.displayName="MainProvider";