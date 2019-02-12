export let measures = {
  "bottle": 1,
  "bouquet": 2,
  "can": 3,
  "container": 4,
  "cube": 5,
  "cup": 6,
  "dash": 7,
  "drop": 8,
  "fill": 9,
  "float": 10,
  "gallon": 11,
  "leaf": 12,
  "liter": 13,
  "ml": 14,
  "oz": 15,
  "packet": 16,
  "part": 17,
  "pinch": 18,
  "pint": 19,
  "qt": 20,
  "rinse": 21,
  "scoop": 22,
  "shot": 23,
  "slice": 24,
  "small can": 25,
  "sprig": 26,
  "squeeze": 27,
  "tbsp": 28,
  "top": 29,
  "tsp": 30,
  "twist": 31,
  "wedge": 32,
  "whole": 33
};

measures = Object.keys(measures).map((measurement) => ({value: measures[measurement], label: measurement}));

export default measures;
