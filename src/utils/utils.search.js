import { gql } from "@apollo/client";

import {
  APP_ID,
  APP_KEY,
} from "@env";

export const RECIPE_QUERY = gql`
    query search($appId:String!, $appKey:String!, $q:String!) {
        search(appId:$appId, appKey:$appKey, q:$q, from:0, to:9) {
            hits {
                recipe {
                    uri,
                    label,
                    image,
                    yield,
                    calories,
                }
            }
        }
    }
`;

export const auth = { appId: APP_ID, appKey: APP_KEY };
