/* jshint ignore:start */

import axios from "axios";
import { settings } from "../constans";

const main = (baseURL, responseParser) => {
  const client = axios.create({
    baseURL: settings.BASE_API_URL,
    json: true,
  });

  client.apiBaseUrl = baseURL;

  client.interceptors.request.use((config) => {
    return config;
  });
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        return Promise.reject(error.response);
      }
      return Promise.reject(error.response);
    }
  );

  return {
    http: async (request) =>
      await http(
        client,
        request,
        responseParser ? responseParser : (response) => response.data
      ),
  };
};

const http = async (
  client,
  { method, resource, data, headers },
  responseParser
) => {
  let options = Object.assign(
    {
      method,
      url: client.apiBaseUrl + resource,
      headers,
    },
    method == "post" || method == "put"
      ? {
          data,
        }
      : {
          params: data,
        }
  );

  const response = await client(options);
  return responseParser(response);
};

export default {
  main,
};

/* jshint ignore:end */
