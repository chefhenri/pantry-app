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

/**
 * Get id of an item based on food label/name
 * @param label name of an item
 * @returns {string} food id
 */
export const getItemId = (label) => {
  return `item-${
    label
      .split("")
      .slice(0, 2)
      .map((char, idx) => label.charCodeAt(idx)).join("")
  }`;
};

/**
 * Get matching icon to amount inputted
 * @param amt amount
 * @returns {string} amount type
 */
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

/**
 * Returns amount in String form based on amount inputted
 * @param amt amount of an item
 * @returns {string} value of the amount inputted
 */
export const getAmtText = (amt) => {
  switch (amt) {
    case AMOUNT.NONE:
      return "None";
    case AMOUNT.OKAY:
      return "Okay";
    case AMOUNT.GOOD:
      return "Good";
  }
};

/**
 * Updates the amount of an item in the pantry on the application
 * @param id  id of food item being updated
 * @param amt new amount of the food item
 * @param items
 * @param update
 */
export const updateItemAmt = (id, amt, items, update) => {
  let item = items[id];

  update(({
    ...items,
    [item.id]: {
      label: item.label,
      amount: amt,
    },
  }));
};
