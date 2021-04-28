import React from "react";

export const AMOUNT = {
  NONE: "none",
  OKAY: "okay",
  GOOD: "good",
};
export const AMOUNT_ICON = {
  NONE: "border-none-variant",
  OKAY: "arrow-collapse-down",
  GOOD: "arrow-collapse-up",
};

export const PantryContext = React.createContext({
  items: {},
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

export const getAmtIcon = (amt) => {
  switch (amt) {
    case "none":
      return AMOUNT_ICON.NONE;
    case "okay":
      return AMOUNT_ICON.OKAY;
    case "good":
      return AMOUNT_ICON.GOOD;
  }
};

export const updateItemAmt = (id, amt, items, update) => {
  let item = items[id]

  update(({
    ...items,
    [item.id]: {
      label: item.label,
      amount: amt
    }
  }))
};
