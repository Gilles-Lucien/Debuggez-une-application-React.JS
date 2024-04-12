// Correction applied : The getMonth method on the Date object returned a zero-based month number, but the MONTHS object is using one-based keys. So, to fix this, I changed the keys in the MONTHS object to be zero-based.
export const MONTHS = {
  0: "janvier",
  1: "février",
  2: "mars",
  3: "avril",
  4: "mai",
  5: "juin",
  6: "juillet",
  7: "août",
  8: "septembre",
  9: "octobre",
  10: "novembre",
  11: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth()];
