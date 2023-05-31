export const dbReply = (msg: string, reply?: any) => { // TEMP ANY
  if (reply) reply(msg);
  else console.log(msg);
}
