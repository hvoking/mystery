// Third party imports
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';

export const mvtToGeoJSON = (mvtArrayBuffer: ArrayBuffer, xTile: number, yTile: number, zoom: number) => {
  const pbf = new Protobuf(new Uint8Array(mvtArrayBuffer));
  const tile = new VectorTile(pbf);

  const geojson = {
    type: 'FeatureCollection',
    features: [] as any[],
  };

  Object.keys(tile.layers).forEach((layerName: any) => {
    const layer = tile.layers[layerName];

    for (let i = 0; i < layer.length; i++) {
      const feature = layer.feature(i).toGeoJSON(xTile, yTile, zoom);
      geojson.features.push(feature);
    }
  });

  return geojson;
};