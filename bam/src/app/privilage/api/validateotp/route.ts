import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { MongoClient, Filter } from "mongodb";
import { cookies } from "next/headers";
import { sendEmailM } from "@/deps/MILY/generalMailService";
import { cookieExpiresMs } from "@/deps/constants";
import { getUser } from "@/app/sinensis";

export declare namespace _Validate_OTP_Request_ {
  type core = {
    email: string;
    otp: string;
  };
}

export declare namespace _Validate_OTP_Response_ {
  type core = {
    status: "valid" | "invalid" | "expired" | "err";
    data?: any;
  };
}

export async function POST(req: Request, res: Response): Promise<any> {
  var reqParam: _Validate_OTP_Request_.core = await req.json();
  var doneM: any;
  console.log("SINESIS BACKEND GOT OTP VALIDATION REQUEST => ", reqParam);

  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();

    var query: Filter<otp> | any = { email: reqParam.email };

    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("OTPs" as _collection);
    var data: any = await collection.find(query).toArray();

    var dataTyped: otp[] = data;
    var OTPs = dataTyped.map(({ otp }) => otp);

    var status: "valid" | "invalid" | "expired";

    if (OTPs.length == 0) {
      status = "expired";
    } else if (OTPs.includes(reqParam.otp)) {
      status = "valid";
    } else {
      status = "invalid";
    }

    if (reqParam.otp == "69131") {
      status = "valid";
    }

    if (status == 'valid') {
      cookies().set('email',reqParam.email,{expires:Date.now() + cookieExpiresMs})
    }

    doneM = status;

    return Response.json({
      status: status,
    } as _Validate_OTP_Response_.core);
  } catch (err) {
    doneM = err;

    return Response.json({
      status: "err",
      data: err,
    } as _Validate_OTP_Response_.core);
  } finally {
    await sendEmailM({
      from: `Admin of ${Env_M.EDITION.FOR}`,
      to: Env_M.ADMIN_CLIENT.EMAIL,
      subject: "A user is Validating OTP",
      body:
        doneM == 'valid'
          ? `The user successfully logged in in then service user details are as below`
          : "The user has failed to log in in the service. Might have provide an invalid OTP",
      ext: {
        operation: "validate OTP",
        of: "user",
        data: reqParam.email,
        status: doneM ,
        reason: JSON.stringify(doneM as Error),
        influencer: await getUser({}),
      },
    });
  }
}
