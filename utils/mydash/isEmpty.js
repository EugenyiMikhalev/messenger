function isEmpty(value) {
  switch (typeof value) {
    case "boolean":
      return true;
    case "number":
      return true;
    case "string":
      if (value === "") return true;
    case "bigint":
      if (value === 0) return true;
    case "undefined":
      return true;
    case "object":
      if (value === null) return true;
      if (Object.keys(value).length === 0) return true;
      if (Array.isArray(value) && value.length) return true;
      if (value instanceof Map && value.size === 0) return true;
      if (value instanceof Set && value.size === 0) return true;
    default:
      return false;
  }
}

console.log(typeof 42.2);
