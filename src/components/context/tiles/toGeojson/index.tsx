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

export const lonLatToTile = (longitude: any, latitude: any, zoom: any) => {
    const numTiles = Math.pow(2, zoom);
    const xTile = Math.floor(((longitude + 180) / 360) * numTiles);
    const yTile = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * numTiles);
    return { xTile, yTile };
};