import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Loading from "./Loading";

import { APP_ID, APP_KEY } from "@env";

const RECIPE_QUERY = gql`
    query search($appId:String!, $appKey:String!) {
        search(appId:$appId, appKey:$appKey, q:"Chicken", from:0, to:4) {
            hits {
                recipe {
                    uri,
                    label,
                    yield,
                    calories,
                }
            }
        }
    }
`;

const SearchResult = ({ recipe }) => {
  return (
    <View>
      <Text>
        Label: {recipe.hasOwnProperty("label") && recipe.label}
        Calories: {recipe.hasOwnProperty("calories") && recipe.calories}
        Yield: {recipe.hasOwnProperty("yield") && recipe.yield}
      </Text>
    </View>
  );
};

const SearchView = () => {
  const { data, loading } = useQuery(RECIPE_QUERY, {
    variables: {
      appId: APP_ID,
      appKey: APP_KEY,
    },
  });

  if (loading)
    return <Loading />;

  const { search: { hits } } = data;

  if (hits.length === 0) {
    return (
      <View>
        <Text>
          No results
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={hits}
        renderItem={({ item }) => (
          <SearchResult recipe={item.recipe}/>
        )}
        keyExtractor={(item, idx) => idx}
      />
    </SafeAreaView>
  );
};

export default SearchView;
