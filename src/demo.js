import stock from "stock-ticker-symbol";
import { getCurretPrice } from "./utils";
import "core-js/stable"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";

const target = "vt";
let replyMessage="";

getCurretPrice(target)
  .then(data => {
    let change = (data.now - data.yesterday).toFixed(2);
    let changePercent = ((change / data.yesterday) * 100).toFixed(2);

    if (change >= 0) {
      change = "+" + change;
      changePercent = "+" + changePercent;
    }

    const name = stock.lookup(target);

    replyMessage = `${name}    USD ${data.now}    ${change} (${changePercent}%)`;
  })
  .catch(error => {
    replyMessage = error;
  })
  .finally(() => {
    // Then we delete the command message (sneaky, right?). The catch just ignores the error
    //message.delete().catch(() => {});
    // And we get the bot to say the thing:
    console.log(replyMessage);
  });
