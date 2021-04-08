import axios from "axios";

const BASE_URL = "https://api.edamam.com/search";

// Get the first recipe from the query results
export const getRecipe = async (appId, appKey, query) => {
  return axios.get(BASE_URL, {
    params: {
      "app_id": appId,
      "app_key": appKey,
      q: query,
      from: 0,
      to: 1,
    },
  }).then(res => res.data);
};

// Get the first 10 results from the query results
export const getRecipes = async (appId, appKey, query) => {
  return axios.get(BASE_URL, {
    params: {
      "app_id": appId,
      "app_key": appKey,
      q: query,
      from: 0,
      to: 9,
    },
  }).then(res => res.data);
};
