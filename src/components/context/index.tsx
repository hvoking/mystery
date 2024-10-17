// Context imports
import { MapboxProvider } from './mapbox';
import { StylesProvider } from './styles';
import { MaskProvider } from './mask';
import { CircleProvider } from './circle';
import { EventsProvider } from './events';
import { TilesProvider } from './tiles';

export const MainProvider = ({ children }: any) => {
	return (
		<MapboxProvider>
		<CircleProvider>
		<EventsProvider>
		<StylesProvider>
		<TilesProvider>
		<MaskProvider>
			{children}
		</MaskProvider>
		</TilesProvider>
		</StylesProvider>
		</EventsProvider>
		</CircleProvider>
    	</MapboxProvider>
	)
}

MainProvider.displayName="MainProvider";