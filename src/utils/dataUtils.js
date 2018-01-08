export function filterNaN(value) {
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
}

export default filterNaN;
