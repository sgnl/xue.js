
const maybe = (probability) => !!probability && Math.random() <= probability;
const randomBetween = (min, max) => min + Math.random() * ( max + 1 - min);

export {maybe, randomBetween};
