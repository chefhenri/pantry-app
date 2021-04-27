import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { Button, Searchbar } from "react-native-paper";

import { gql, useQuery } from "@apollo/client";

import {
  APP_ID,
  APP_KEY,
} from "@env";

import SearchResult from "../../components/molecules/SearchResult";
import Loading from "../../components/atoms/Loading";
import styles from "../../styles/search-screen.style";

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
  const [searching, setSearching] = useState(false);
  const [skipQuery, setSkipQuery] = useState(true);

  const { data, loading } = useQuery(RECIPE_QUERY, {
    variables: {
      appId: APP_ID,
      appKey: APP_KEY,
      q: searchQuery,
    },
    skip: skipQuery,
  });

  useEffect(() => {
    if (searchQuery === "") {
      setSearching(false);
      setSkipQuery(true);
    }
  }, [searchQuery]);

  if (loading) return (<Loading />);

  return (
    <SafeAreaView style={styles.searchWrapper}>
      {searching ? (
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onIconPress={() => setSkipQuery(false)}
        />
      ) : (
        <Button
          style={styles.searchButton}
          icon="feature-search-outline"
          mode="outlined"
          onPress={() => setSearching(true)}
        >search</Button>
      )}

      {data && (
        <>
          {data.search.hits.length > 0 && (
            <FlatList
              style={styles.resultsWrapper}
              data={data.search.hits}
              renderItem={({ item }) => <SearchResult recipe={item.recipe} />}
              keyExtractor={(item, idx) => idx}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
