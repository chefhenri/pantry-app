import React from "react";
import { Searchbar } from "react-native-paper";

import styles from "../../styles/styles.search-screen";

const SearchBar = ({ query, setQuery, loadQuery }) => {
  return (
    <Searchbar
      style={styles.searchbar}
      placeholder="Search"
      value={query}
      onIconPress={() => loadQuery()}
      onChangeText={text => setQuery(text)}
    />
  );
};

export default SearchBar;
