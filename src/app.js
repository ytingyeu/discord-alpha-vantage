import { getIntraDayData } from "./alphavantage";

getIntraDayData("msft").then(json => {
  console.log(json);
});
