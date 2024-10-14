// Context imports
import { GeoProvider } from './geo';
import { MapsProvider } from './maps';

export const MainProvider = ({ children }: any) => {
	return (
		<GeoProvider>
		<MapsProvider>
			{children}
		</MapsProvider>
    	</GeoProvider>
	)
}

MainProvider.displayName="MainProvider";