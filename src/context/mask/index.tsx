// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useMapbox } from '../mapbox';
import { signal } from '@preact/signals-react';

const MaskContext: React.Context<any> = createContext(null)

export const useMask = () => {
    return (
        useContext(MaskContext)
    )
}

export const MaskProvider = ({children}: any) => {
    const { mapRef } = useMapbox();

    const mapFeatures = signal<any>(null);
    const map = mapRef.current;

    mapFeatures.value = map ? map.queryRenderedFeatures({layer: 'raster-style'}) : [];

    return (
        <MaskContext.Provider value={{ mapFeatures }}>
            {children}
        </MaskContext.Provider>
    )
}

MaskContext.displayName = "MaskContext";