import axios from "axios";

import { alphavantageKey } from "./config";

const apiEndpoint = "https://www.alphavantage.co/query";

export async function getIntraDayData(target) {
  const config = {
    params: {
      function: "TIME_SERIES_INTRADAY",
      symbol: target,
      interval: "30min",
      outputsize: "compact",
      apikey: alphavantageKey
    }
  };

  let json = await axios
    .get(apiEndpoint, config)
    .then(response => {
      // console.log(response["data"]);
      return response["data"];
    })
    .catch(error => {
      throw error;
    });

    console.log(json)

}
