import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { MongoClient, ObjectId, PropertyType } from "mongodb";
import { user } from "../../user";

export declare namespace _Pull_Response__user {
  type core = {
    status: "m" | "r";
    data: Partial<user>[];
  };
}

export async function POST(req: any, res: any ) {
  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING,{
      serverSelectionTimeoutMS:1000
    });

    client = await client.connect();
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("User" as _collection);
    var data = await collection.find().toArray();

    data = data.map((d) => {
      var edited: any = d;
      delete edited._id;
      return { ...edited };
    });    
    
    // return new Promise((m, j) => {
    //   setTimeout(() => {
    //     m(
    //       Response.json({
    //         data: data,
    //         status: "r",
    //       } as _Pull_Response__user.core)
    //     );
    //   }, 1000);
    // });

    return Response.json({
      data: data,
      status: "r",
    } as _Pull_Response__user.core);
  } catch (err) {
    return Response.json({
      data: err,
      status: "m",
    } as _Pull_Response__user.core);
  }
}
