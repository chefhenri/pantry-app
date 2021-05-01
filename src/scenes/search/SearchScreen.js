import React, { useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { useLazyQuery } from "@apollo/client";

import { RECIPE_QUERY } from "../../utils/search.utils";
import styles from "../../styles/search.styles";
import SearchResult from "../../components/molecules/SearchResult";
import Loading from "../../components/atoms/Loading";
import SearchBar from "../../components/atoms/SearchBar";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loadSearchQuery, { called, loading, data }] = useLazyQuery(RECIPE_QUERY);

  if (called && loading) return (<Loading />);

  // TODO: Add snackbar status for saving recipe
  return (
    <SafeAreaView style={styles.searchWrapper}>
      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        loadQuery={loadSearchQuery}
      />
      {called && (
        <FlatList
          style={styles.resultsWrapper}
          data={data.search.hits}
          renderItem={({ item }) => <SearchResult recipe={item.recipe} />}
          keyExtractor={(item, idx) => idx}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
