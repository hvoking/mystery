// Third party imports
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';

export const mvtToGeoJSON = (mvtArrayBuffer: ArrayBuffer, xTile: number, yTile: number, zoom: number) => {
  const pbf = new Protobuf(new Uint8Array(mvtArrayBuffer));
  const tile = new VectorTile(pbf);

  const layerName = 'default';
  const geojson = {
    type: 'FeatureCollection',
    features: [] as any[],
  };

  if (tile.layers[layerName]) {
    const currentLayer = tile.layers[layerName];
    const layerLength = currentLayer.length
    for (let i = 0; i < layerLength; i++) {
      const feature = currentLayer.feature(i)
      const geojsonFeature = feature.toGeoJSON(xTile, yTile, zoom);
      geojson.features.push(geojsonFeature);
    }
  }
  return geojson;
};

export const lonLatToTile = (lng: any, lat: any, zoom: any) => {
  const tileCount = Math.pow(2, Math.floor(zoom));
  const xTile = Math.floor(((lng + 180) / 360) * tileCount);
  const yTile = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * tileCount);
  return { xTile, yTile };
};