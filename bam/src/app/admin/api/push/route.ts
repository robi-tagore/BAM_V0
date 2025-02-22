import { briefFor } from "@/deps/MILY/mailToCustomer";
import { sendEmailM } from "@/deps/MILY/generalMailService";
import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { getUser } from "@/app/sinensis";
import { user } from "../../user";

export declare namespace _Push_Request__user {
  type core = {
    data: user;
  };
}

export declare namespace _Push_Response__user {
  type core = { status: "m" | "r"; data: [ObjectId, ObjectId] | any };
}

export async function POST(req: Request, res: Response) {
  var reqParam: _Push_Request__user.core = await req.json();
  var doneM: any;

  console.log("SINESIS BACKEND GOT PUSH REQUEST => ", reqParam);

  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("User" as _collection);

    var operationId: ObjectId | null;
    var docId: ObjectId | undefined;

    await collection.deleteOne({ email: reqParam.data.email });

    operationId = (await collection.insertOne(reqParam.data)).insertedId;

    docId = (await collection.findOne({ email: reqParam.data.email }))?._id;

    return Response.json({
      data: [operationId, docId],
      status: "r",
    } as _Push_Response__user.core);
  } catch (err) {
    doneM = err;

    return Response.json({
      data: { fame: (err as Error).message, ilub: err },
      status: "m",
    } as _Push_Response__user.core);
  } finally {
    delete (reqParam.data as any)._id;

    await sendEmailM({
      from: `Admin of ${Env_M.EDITION.FOR}`,
      to: Env_M.ADMIN_CLIENT.EMAIL,
      subject: "A User was Included",
      body: `A new user was added or updated in the database. Please reiew the data`,
      ext: {
        operation: "add|update",
        of: "user",
        data: reqParam.data,
        influencer: await getUser({}),
        status: doneM == true ? "success" : "failure",
        reason: JSON.stringify(doneM as Error),
      },
    });
  }
}
