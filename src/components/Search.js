import React from "react";
import { StyleSheet } from "react-native";

import RelayEnv from "./api/RelayEnv";

// const singleRecipeQuery = gql`
//     query search($appId:String!, $appKey:String!) {
//         search(appId:$appId, appKey:$appKey, q:"Chicken", from:0, to:1) {
//             hits {
//                 recipe {
//                     label,
//                     yield,
//                     calories
//                 }
//             }
//         }
//     }
// `

// const preloadedQuery = loadQuery(RelayEnv, singleRecipeQuery, {
//   "appId": process.env.APP_ID,
//   "appKey": process.env.APP_KEY
// })

// TODO: Refactor to use Relay
// const Search = ({ title, preloadedQuery }): Node => {
//   const data = usePreloadedQuery(singleRecipeQuery, preloadedQuery)
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         {title}
//       </Text>
//       <Text>{data.search.hits.recipe.label}</Text>
//     </View>
//   );
// };

// const SearchRoot = ({title}) => {
//   return (
//     <RelayEnvironmentProvider environment={RelayEnv}>
//       <Suspense fallback={'Loading...'}>
//         <Search title={title} preloadedQuery={preloadedQuery}/>
//       </Suspense>
//     </RelayEnvironmentProvider>
//   );
// };

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  input: {
    fontSize: 18,
    fontWeight: "400",
    height: 40,
    width: 250,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    paddingVertical: 24,
  },
});

// export default SearchRoot;
export default class SearchRoot {
}
