export const send = (msg: string, reply?: any) => { // TEMP ANY
  if (reply) reply('account-wide', msg);
  else console.log(msg);
}