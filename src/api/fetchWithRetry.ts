import HTTPTransport from "./HTTPTransport";

const HTTP = new HTTPTransport();

function fetchWithRetry(url, options) {
  let { retries, method } = options;

  method = method.toLowerString();

  function handleError(error) {
    retries--;
    if (retries <= 0)
      throw new Error(
        `Request error: tried ${retries} times. Last error: ${error}`,
      );

    return HTTP[method](url, options).catch(handleError);
  }
  return HTTP[method](url, options).catch(handleError);
}

export default fetchWithRetry;
