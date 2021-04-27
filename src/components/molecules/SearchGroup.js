import React, { useEffect, useState } from "react";
import { Button, Searchbar } from "react-native-paper";

const SearchGroup = ({ searchQuery, setSearchQuery, setSkipQuery }) => {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchQuery === "")
      setSearching(false);
  }, [searchQuery]);

  return (
    <>
      {searching ? (
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onIconPress={() => setSkipQuery(false)}
        />
      ) : (
        <Button
          icon="feature-search-outline"
          mode="outlined"
          onPress={() => setSearching(true)}
        >search</Button>
      )}
    </>
  );
};

export default SearchGroup;
