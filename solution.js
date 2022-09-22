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

export const deserialize = (serializedObject) => {
  let headerProperty;
  let result = [];
  let obj = {};

  for (const [key, value] of Object.entries(serializedObject)) {
    const indexMatch = key.match(/\d{1}(?=(_))/gi);
    if (indexMatch == null) {
      obj = {
        ...obj,
        [`${key}`]: value,
      };
      continue;
    }
    const index = Number(indexMatch[0]);

    headerProperty = key.match(/\w{1,}(?=([0-9]_))/gi)[0];

    const objectProperty = key.match(/(?<=([0-9]_))\w{1,}/gi)[0];

    if (typeof value !== "object") {
      if (value.toString().match(/t:\d{13}/g)) {
        const [year, month, dateTime] = new Date(
          Number(value.match(/\d{1,13}/gi)[0])
        )
          .toISOString()
          .split("-");
        const providedDate = dateTime.match(/^\d{2}/gi)[0];
        const formattedDate = [providedDate, month, year].join("/");
        result[index] = {
          ...result[index],
          [`${objectProperty}`]: formattedDate,
        };
      } else {
        result[index] = { ...result[index], [`${objectProperty}`]: value };
      }
    }

    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      result[index] = {
        ...result[index],
        [`${objectProperty}`]: deserialize(value),
      };
    }
  }

  obj = {
    ...obj,
    [`${headerProperty}`]: result,
  };
  return obj;
};
