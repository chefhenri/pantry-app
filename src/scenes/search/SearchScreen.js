import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";

import {
  APP_ID,
  APP_KEY
} from '@env';

import Loading from "../../components/Loading";

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

const SearchScreen = ({ navigation }) => {
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
    <View>
      <FlatList
        data={hits}
        renderItem={({ item }) => <SearchResult recipe={item.recipe} />}
        keyExtractor={(item, idx) => idx}
      />
      <Button
        title="Go Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default SearchScreen;
