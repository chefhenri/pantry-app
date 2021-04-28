import React from "react";

export const PantryContext = React.createContext({
  items: [],
  update: () => {
  },
});

export const getItemId = (label) => {
  return `item-${
    label
      .split("")
      .slice(0, 2)
      .map((char, idx) => label.charCodeAt(idx)).join("")
  }`;
};
