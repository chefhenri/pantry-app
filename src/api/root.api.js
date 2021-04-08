import axios from "axios";
import { BASE_URL, APP_ID, APP_KEY } from "@env";

// Get the first recipe from the query results
export const getRecipe = async (query) => {
  return axios.get(BASE_URL, {
    params: {
      "app_id": APP_ID,
      "app_key": APP_KEY,
      q: query,
      from: 0,
      to: 1,
    },
  }).then(res => {
    console.log(res.data['hits'][0]['recipe']['label']);
    return res.data['hits'][0]['recipe']['label'];
  });
};
