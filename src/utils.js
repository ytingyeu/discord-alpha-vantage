// import { getMockIntraData } from "./getMockIntraData";
// import { getMockDailyData } from "./getMockDailyData";
import { DateTime } from "luxon";
import { getDailyData, getIntradayData } from "./alphaVantageOperations";

const getCurretPrice = async target => {
  // const intraData = getMockIntraData();
  // const dailyData = getMockDailyData();

  let intraData;
  let dailyData;

  await Promise.all([getIntradayData(target), getDailyData(target)])
    .then(data => {
      intraData = data[0];
      dailyData = data[1];

      console.log(dailyData)
    })
    .catch(error => {
      throw new Error(error);
    });

  // await getIntradayData(target)
  //   .then(data => {
  //     if (data["Error Message"]) {
  //       throw new Error();
  //     }
  //     intraData = data;
  //   })
  //   .catch(error => {
  //     throw error;
  //   });

  // await getDailyData(target)
  //   .then(data => {
  //     if (data["Error Message"]) {
  //       throw new Error();
  //     }
  //     dailyData = data;
  //   })
  //   .catch(error => {
  //     throw error;
  //   });

  let lastIntervalClosing;

  let yesterday = DateTime.local()
    .minus({ days: 1 })
    .setZone("America/New_York")
    .toISODate();

  if (dailyData["Meta Data"]["3. Last Refreshed"] === yesterday) {
    yesterday = DateTime.fromISO(yesterday)
      .minus({ days: 1 })
      .setZone("America/New_York")
      .toISODate();
  }

  const yesterdayClosing =
    dailyData["Time Series (Daily)"][yesterday]["4. close"];

  for (const prop in intraData["Time Series (1min)"]) {
    lastIntervalClosing = intraData["Time Series (1min)"][prop]["4. close"];
    break;
  }

  return {
    now: parseFloat(lastIntervalClosing).toFixed(2),
    yesterday: parseFloat(yesterdayClosing).toFixed(2)
  };
};

export { getCurretPrice };
