function queryStringify(data) {
  let res = "?";
  Object.entries(data).forEach(([key, value]) => {
    res += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
  });
  return res.slice(0, -1);
}

export default queryStringify;
