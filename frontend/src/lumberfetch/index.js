class FetchWithHandling {
  static headers() {
    return {
      'Content-Type': 'application/json',
    };
  }

  static isJSON(response) {
    // returns true if response is of type JSON
    const contentType = response.headers.get('content-type');

    return contentType && contentType.includes('application/json');
  }

  /**
   * @param {Response} response
   * @return {Promise}
   */
  static parseResponseBody(response) {
    if (this.isJSON(response)) {
      return response.json();
    }

    return response.text();
  }

  /**
   * @param {String} url
   * @param {Object?} params
   * @param {String} verb
   * @return {Promise}
   */
  static fetchWrapper(url, params, verb) {
    // for logging/debugging
    console.log(`${verb} ${url}`, params);

    // options are the complicated object of options that are passed in a fetch response
    // another benefit of abstracting this portion away
    let options = {
      method: verb,
      headers: Request.headers(),
    };

    if (params) {
      options.body = JSON.stringify(params);
    }

    let fetchResponse, fetchStatusCode, errorResponse;

    return fetch(url, options)
      .then(response => {
        fetchResponse = response;
        fetchStatusCode = response.status;

        // success, simply return promise of parsed response
        if (fetchStatusCode === 200 || fetchStatusCode === 201) {
          return Request.parseResponseBody(fetchResponse);
        } else {
          // throw errors if bad status
          return Request.parseResponseBody(response)
            .then(body => {
              errorResponse = body;
              throw new Error(
                `${url} failed status=${response.status} errorResponse=${errorResponse}`,
              );
            })
            .catch(() => {
              // catch error if parseResponseBody throws an error
              throw new Error(`${url} failed status=${response.status}`);
            });
        }
      })
      .catch(exception => {
        // catch JSE

        // give details on what the error was so it doesn't have to be deciphered up the call stack
        let errorType;
        if (!fetchResponse) {
          // no response at all
          errorType = 'NETWORK FAILURE';
        } else if (fetchStatusCode === 200) {
          errorType = 'PARSE RESPONSE FAILURE';
        } else {
          // generic error
          errorType = 'API CALL FAILURE';
        }

        // a meaningful error
        const errorDetail = {
          errorType,
          errorResponse,
          exception: exception.message,
          statusCode: fetchStatusCode,
        };

        return Promise.reject(errorDetail);
      });
  }
}

class FetchWithMiddleware {
  constructor(fetchFn) {
    this.middlewares = [];
    this.fetch = fetchFn;
  }

  registerMiddlewares(middlewares) {
    this.middlewares = middlewares;
  }

  applyMiddleAndAfterwares() {
    return async () => {
      const middlewares = [...this.middlewares];

      // chain the middlewares to our given "fetch"
      let fetchWithMiddleware = this.fetch;
      for (let i = middlewares.length - 1; i >= 0; --i) {
        fetchWithMiddleware = middlewares[i].bind(null, fetchWithMiddleware);
      }

      return fetchWithMiddleware;
    };
  }
}

class LumberFetch {
  constructor(fetchFn) {
    this.fetch = fetchFn;
  }

  static get(url) {
    return this.fetch(url, null, 'GET');
  }
  static post(url, params) {
    return this.fetch(url, params, 'POST');
  }
}

const fetchWithMiddleware = new FetchWithMiddleware(FetchWithHandling);
const lumberFetch = new LumberFetch(fetchWithMiddleware);

export default lumberFetch;
