import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { sendEmailM } from "./generalMailService";

export async function otpMail({
  email,
  generatedOTP,
  ext,
  process
}: {
  email: string;
  generatedOTP: string;
  ext?:any;
  process?:string
}) : Promise<'success' | 'failure'> {
  

  process = process + " OTP Service => "

  function process_log(...data: any) {
    console.log(process,...data);
  }

  process_log(`### has been started`);

  var isSucceed = false;
  var status;
  var attemptNumber = 0;

  while (true) {
    if (isSucceed || attemptNumber >= 5) {
      break;
    }

    process_log(`sending mail to ${email}`);
    process_log(`@attempt : ${attemptNumber} `);

    status = await sendEmailM({
      from: Env_M.EDITION.FOR,
      to: email,
      subject: `${generatedOTP} is OTP for ${Env_M.EDITION.FOR}`,
      body: `Use the OTP (One Time Password) <h3>${generatedOTP}</h3> to log in to your account in ${Env_M.EDITION.FOR}. It will be valid for 2 minutes. Dont share this OTP with anyone during this period.  <br>  ${Env_M.EDITION.OF} <br> ${Env_M.EDITION.OF} <br> Business Administration <br> A Sinensis Production (2)`,
      ext: ext,
      process: process,
    });

    process_log(`ended with output ${status}`);

    if (status == "success") {
      isSucceed = true;
    } else {
      process_log(`a failed attempt, next attempt count will be ${attemptNumber + 1}`);
    }
    attemptNumber = attemptNumber + 1;
  }
  process_log(`Exiting process with ${isSucceed} && ${status}`);

  return status!
}
