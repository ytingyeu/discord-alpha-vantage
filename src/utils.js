import { getMockIntraData } from "./getMockIntraData";
import { getMockDailyData } from "./getMockDailyData";
import { DateTime } from "luxon";
import { getDailyData, getIntradayData } from "./alphaVantageOperations";

const getCurretPrice = async target => {
  // const intraData = getMockIntraData();
  // const dailyData = getMockDailyData();

  let intraData;
  let dailyData;

  await getIntradayData(target).then(data => {
    intraData = data;
  });
  await getDailyData(target).then(data => {
    dailyData = data;
  });

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
    now: parseFloat(lastIntervalClosing),
    yesterday: parseFloat(yesterdayClosing)
  };
};

export { getCurretPrice };
