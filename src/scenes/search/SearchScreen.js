import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { List, Searchbar, Text } from "react-native-paper";

import { gql, useQuery } from "@apollo/client";

import {
  APP_ID,
  APP_KEY,
} from "@env";

import Loading from "../../components/atoms/Loading";
import SearchResult from "../../components/molecules/SearchResult";

const RECIPE_QUERY = gql`
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

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skipQuery, setSkipQuery] = useState(true);
  const { data, loading } = useQuery(RECIPE_QUERY, {
    variables: {
      appId: APP_ID,
      appKey: APP_KEY,
      q: searchQuery,
    },
    skip: skipQuery,
  });

  // const { search: { hits } } = data;

  return (
    <View>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onIconPress={() => setSkipQuery(false)}
      />
      {data && (
        <>
          {data.search.hits.length > 0 && (
            <FlatList
              data={data.search.hits}
              renderItem={({ item }) => <SearchResult recipe={item.recipe}/>}
              keyExtractor={(item, idx) => idx}
            />
          )}
        </>
      )}
    </View>
  );
};

export default SearchScreen;
