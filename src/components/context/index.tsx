// Context imports
import { MapboxProvider } from './mapbox';
import { StylesProvider } from './styles';
import { MaskProvider } from './mask';
import { CircleProvider } from './circle';
import { EventsProvider } from './events';

export const MainProvider = ({ children }: any) => {
	return (
		<MapboxProvider>
		<CircleProvider>
		<EventsProvider>
		<StylesProvider>
		<MaskProvider>
			{children}
		</MaskProvider>
		</StylesProvider>
		</EventsProvider>
		</CircleProvider>
    	</MapboxProvider>
	)
}

MainProvider.displayName="MainProvider";