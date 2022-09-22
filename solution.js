export const add = (...args) => {
  if (Boolean(args.length)) {
    let sum = 0;
    for (const arg of args) {
      if (typeof arg === "number") sum = sum + arg;
    }
    return sum;
  }
};
