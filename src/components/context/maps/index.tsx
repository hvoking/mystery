// Context imports
import { StylesProvider } from './styles';
import { MaskProvider } from './mask';
import { CircleProvider } from './circle';
import { EventsProvider } from './events';

export const MapsProvider = ({ children }: any) => {
	return (
		<CircleProvider>
		<EventsProvider>
		<StylesProvider>
		<MaskProvider>
			{children}
		</MaskProvider>
		</StylesProvider>
		</EventsProvider>
		</CircleProvider>
	)
}

MapsProvider.displayName="MapsProvider";