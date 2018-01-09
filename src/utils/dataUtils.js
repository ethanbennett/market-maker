export function convertData(number) {
  return number / 10 ** 18;
}

export function filterNaN(value) {
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
}

export default { convertData, filterNaN };
