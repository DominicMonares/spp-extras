import { Reply } from "../types";

export const send = (msg: string, reply?: Reply) => {
  if (reply) reply('account-wide', msg);
  else console.log(msg);
}
