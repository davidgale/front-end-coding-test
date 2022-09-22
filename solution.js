export const add = (...args) => {
  if (Boolean(args.length)) {
    let sum = 0;
    for (const arg of args) {
      if (typeof arg === "number") sum = sum + arg;
    }
    return sum;
  }
};

export const listToObject = (objectsArray) => {
  let result = {};
  objectsArray.forEach((object) => {
    const { name, value } = object;
    const clonedValue =
      typeof value === "object" && !Array.isArray(value) && value !== null
        ? { ...value }
        : value;
    result = {
      ...result,
      [`${name}`]: clonedValue,
    };
  });
  return result;
};

export const objectToList = (object) => {
  let result = [];
  for (const [name, value] of Object.entries(object)) {
    const clonedValue =
      typeof value === "object" && !Array.isArray(value) && value !== null
        ? { ...value }
        : value;
    result = [...result, { name, value: clonedValue }];
  }
  return result;
};
