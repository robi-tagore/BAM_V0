import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { MongoClient, ObjectId, PropertyType } from "mongodb";
import { NextApiRequest, NextApiResponse, ResponseLimit } from "next";

export declare namespace _Pull_Request__Product {
  type core = {
    collection: _collection;
    fields: (keyof productType | keyof brand | keyof Product)[];
    query?: object;
  };
}

export declare namespace _Pull_Response__Product {
  type core = {
    status: "m" | "r";
    data: Partial<productType | brand | Product>[];
  };
}

export async function POST(req: Request, res: Response): Promise<any> {
  var reqParam: _Pull_Request__Product.core = await req.json();
  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection(reqParam.collection as _collection);
    var data = await collection
      .find(
        reqParam.query??{},
        reqParam.fields.length != 0
          ? {
              projection: reqParam.fields,
            }
          : {}
      )
      .toArray();

    data = data.map((d) => {
      var edited: any = d;
      delete edited._id;
      return { ...edited };
    });

    return new Promise((m, j) => {
      setTimeout(() => {
        m(
          Response.json({
            data: data,
            status: "r",
          } as _Pull_Response__Product.core)
        );
      }, 10000);
    });

    // return Response.json({
    //   data: data,
    //   status: "r",
    // } as _Response_Pull.core);
  } catch (err) {
    return Response.json({ data: err, status: "m" } as _Pull_Response__Product.core);
  }
}
