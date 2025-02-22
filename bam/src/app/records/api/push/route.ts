import { briefFor } from "@/deps/MILY/mailToCustomer";
import { sendEmailM } from "@/deps/MILY/generalMailService";
import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { getUser } from "@/app/sinensis";

export declare namespace _Push_Request__record {
  type core = {
    collection: Extract<_collection, "record">;
    data: record;
    oldRecordId?: string;
  };
}

export declare namespace _Push_Response__record {
  type core = { status: "m" | "r"; data: [ObjectId, ObjectId] | any };
}

export async function POST(req: Request, res: Response): Promise<any> {
  var reqParam: _Push_Request__record.core = await req.json();
  var doneM: any;

  console.log("SINESIS BACKEND GOT PUSH REQUEST => ", reqParam);

  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection(reqParam.collection as _collection);

    var operationId: ObjectId | null;
    var docId: ObjectId | undefined;

    if (!reqParam.oldRecordId) {
      await collection.deleteOne({ id: reqParam.data.id });

      operationId = (await collection.insertOne(reqParam.data)).insertedId;
      docId = (
        await collection.findOne({ id: reqParam.data.id }, { projection: [] })
      )?._id;
    } else {
      operationId = (
        await collection.updateOne(
          { id: reqParam.oldRecordId },
          { $set: reqParam.data }
        )
      ).upsertedId;

      docId = (
        await collection.findOne({ id: reqParam.data.id }, { projection: [] })
      )?._id;
    }

    return Response.json({
      data: [operationId, docId],
      status: "r",
    } as _Push_Response__record.core);
  } catch (err) {
    doneM = err;

    return Response.json({
      data: { fame: (err as Error).message, ilub: err },
      status: "m",
    } as _Push_Response__record.core);
  } finally {
    delete (reqParam.data as any)._id
    await sendEmailM({
      from: `Admin of ${Env_M.EDITION.FOR}`,
      to: Env_M.ADMIN_CLIENT.EMAIL,
      subject: "A Record was Included",
      body: `A new record was added or updated in the database. Please reiew`,
      ext: {
        operation: "add|update",
        of: "record",
        data: reqParam.data,
        influencer: await getUser({}),
        status: doneM == true ? "success" : "failure",
        reason: JSON.stringify(doneM as Error),
      },
    });
    await briefFor({recordId:reqParam.data.id})
  }
}
