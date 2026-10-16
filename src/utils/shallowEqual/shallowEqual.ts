function shallowEqual(
  first: Record<string | symbol, unknown>,
  second: Record<string | symbol, unknown>,
): boolean {
  const firstKeys: string[] = Object.keys(first);
  const secondKeys: string[] = Object.keys(second);
  console.log("++++++++++++");

  if (firstKeys.length !== secondKeys.length) {
    console.log(firstKeys, "!==", secondKeys);

    return false;
  }

  return firstKeys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(second, key) &&
      Object.is(first[key], second[key]),
  );
}

export default shallowEqual;
