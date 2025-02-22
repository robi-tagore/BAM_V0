import { OTPLength } from "@/deps/constants";
import { sendEmailM } from "@/deps/MILY/generalMailService";
import { otpMail } from "@/deps/MILY/otp";
import { Env_M } from "@/envVar";
import { _collection, _database } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId, PropertyType, WithId } from "mongodb";

export declare namespace _Create_OTP_Request_ {
  type core = {
    email: string;
  };
}

export declare namespace _Create_OTP_Response_ {
  type core = {
    status: "success" | "failure";
    err?: any;
  };
}

function generateOTP(length: number) {
  return (Math.random() * Math.random() * 13169)
    .toString()
    .replaceAll(".", "")
    .slice(0, length);
}

export async function POST(req: Request, res: Response): Promise<any> {
  var reqParam: _Create_OTP_Request_.core = await req.json();
  var doneM: any;
  console.log("SINESIS BACKEND GOT OTP CRATION REQUEST => ", reqParam);

  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();

    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("OTPs" as _collection);

    var status: "success" | "failure";

    var generatedOTP = generateOTP(OTPLength);
    await collection.insertOne({
      email: reqParam.email,
      otp: generatedOTP,
    } as otp);

    setTimeout(() => {
      collection.deleteOne({ email: reqParam.email });
    }, 1000 * 60 * 2);

    var status = await otpMail({
      email: reqParam.email,
      generatedOTP: generatedOTP,
      process: Date.now()+ ' => ',
    });
    doneM = true;

    return Response.json({
      status: status,
    } as _Create_OTP_Response_.core);
  } catch (err) {
    doneM = err;
    return Response.json({
      status: "failure",
      data: err,
    } as _Create_OTP_Response_.core);
  } finally {
    await sendEmailM({
      from: `Admin of ${Env_M.EDITION.FOR}`,
      to: Env_M.ADMIN_CLIENT.EMAIL,
      subject: "OTP for a user has been created.",
      body: `A new user is has attempted to login in the service. Please review the data.`,
      ext: {
        operation: "create OTP",
        of: "user",
        data: reqParam.email,
        status: doneM == true ? "success" : "failure",
        reason: doneM as Error,
      },
    });
  }
}
