import { Colors } from "react-native-paper";
import { Auth } from "aws-amplify";

export const DESTINATIONS = [
  { name: "Pantry", color: Colors.amber400, icon: "food" },
  { name: "Search", color: Colors.blue400, icon: "feature-search" },
  { name: "Transcribe", color: Colors.red400, icon: "microphone" },
];

export const signOut = async () => {
  Auth.signOut({ global: true })
    .then(() => console.log("Signed out"))
    .catch((err) => console.log("Error signing out", err));
};
