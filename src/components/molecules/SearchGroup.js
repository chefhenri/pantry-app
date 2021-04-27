import React, { useEffect, useState } from "react";
import { Button, Searchbar } from "react-native-paper";

import styles from "../../styles/search-screen.style";

const SearchGroup = ({ searchQuery, setSearchQuery, setSkipQuery }) => {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      setSearching(false);
      setSkipQuery(true);
    }

    console.log(`Showing searchbar: ${searching}`, `Search query: ${searchQuery}`);
  }, [searchQuery]);

  // FIXME: searchbar/search button not properly toggled, searchbar disappears
  return (
    <>
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
    </>
  );
};

export default SearchGroup;
