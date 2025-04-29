export const sum = (...values: number[]) => {
  return [...values].reduce((acc, number) => {
    acc += number;
    return acc;
  }, 0);
};

export const formatNumberWithComma = (number: number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
