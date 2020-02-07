import axios from "axios";

import { alphavantageKey } from "./config";

const apiEndpoint = "https://www.alphavantage.co/query";

export async function getIntradayData(target) {
  const config = {
    params: {
      function: "TIME_SERIES_INTRADAY",
      symbol: target,
      interval: "1min",
      outputsize: "compact",
      apikey: alphavantageKey
    }
  };

  return await axios
    .get(apiEndpoint, config)
    .then(response => {
      return response["data"];
    })
    .catch(error => {
      throw error;
    });
}

export async function getDailyData(target) {
  const config = {
    params: {
      function: "TIME_SERIES_DAILY",
      symbol: target,
      outputsize: "compact",
      apikey: alphavantageKey
    }
  };

  return await axios
    .get(apiEndpoint, config)
    .then(response => {
      return response["data"];
    })
    .catch(error => {
      throw error;
    });
}
