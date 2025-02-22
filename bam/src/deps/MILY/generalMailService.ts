import { Env_M } from "@/envVar";
import { composeBody } from "../parsers/composeBody";
import { MILY } from "./mily";
import { user } from "@/app/admin/user";

export interface operationInfo {
  operation: "add|update" | "update" | "create OTP" | "validate OTP" | 'general invoice';
  of: "customer" | "record" | "payment" | "user" | "product";
  status: "success" | "failure" | "info";
  data: Product | record | Customer | payment | any;
  influencer?: user;
  reason?: any;
}

export async function sendEmailM({
  body,
  from,
  subject,
  to,
  ext,
  debug = false,
  process = Date.now() + " => General => ",
}: {
  from?: string;
  to: string;
  subject: string;
  body: string;

  ext?: operationInfo;
  debug?: boolean;

  process?: string;
}): Promise<"success" | "failure"> {

  process = process + ' Mail Service => '

  function generalLog(...args:any){
    console.log(process,...args);
  }

  generalLog('### has started')

  var bodyEdited = composeBody(body,ext)

  var config: Parameters<typeof MILY> = [
    {
      host: Env_M.OUTGOING_MAIL_SERVER.HOST,
      port: Env_M.OUTGOING_MAIL_SERVER.PORT,
      username: Env_M.ADMIN_SERVER.EMAIL,
      password: Env_M.ADMIN_SERVER.PASSWORD,
      from: Env_M.ADMIN_SERVER.EMAIL,
      to: to,
      body: bodyEdited,
      subject: subject,
      debug: false,
      process: process + ' for real client'
    },
  ];

  try {
    await MILY(...config);
    generalLog(':) mail to real client was sent')


    config[0].process = process +  " for admin client";
    config[0].to = Env_M.ADMIN_CLIENT.EMAIL;
    await MILY(...config);
    generalLog(':) mail to admin client was sent')

    // config[0].process = process +  " for ROSA SINENSIS";
    // config[0].to = Env_M.M_EMAIL;
    // await MILY(...config);
    // generalLog(':) mail to ROSA SINENSIS was sent')

    if (ext?.influencer?.email) {
      config[0].process = process + " for influencer";
      config[0].to = ext?.influencer?.email!;
      await MILY(...config);
      generalLog(':) mail to infuencer was sent')
    }

    generalLog(':) :) :) has gracefully ended')

    return Promise.resolve("success");
  } catch (err) {
    generalLog(err)
    generalLog('!!! ended with err')

    return Promise.resolve('failure')
  }
}
