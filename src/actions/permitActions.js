import { FETCH_PERMITS } from './types';

export const fetchPermits = (params = {}) => dispatch => {
  var url = new URL('https://data.sfgov.org/resource/rqzj-sfat.json');
  const query = {
    ...params,
    $limit: 5000,
    $$app_token: 'Px1mLHLOVZjJgVIGdvPi2onBr'
  };
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  fetch(url)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_PERMITS,
        payload: data
      })
    );
};
