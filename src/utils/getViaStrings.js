import { to4326 } from './projection';

const getViaStrings = (geoJsonArray, mot, tracks) => {
  if (geoJsonArray.some((feat) => !feat)) {
    return [];
  }
  return geoJsonArray.reduce((result, feat, idx) => {
    let newHop;
    if (!feat.properties?.uid) {
      newHop = `${to4326(feat.geometry.coordinates).slice().reverse()}`;
    } else {
      newHop = `!${feat.properties?.uid}${
        tracks[idx] !== null ? `${tracks[idx] ? `$${tracks[idx]}` : ''}` : ''
      }`;
    }
    return [...result, newHop];
  }, []);
};

export default getViaStrings;
