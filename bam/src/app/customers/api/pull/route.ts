

import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId, PropertyType, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse, ResponseLimit } from "next";

export declare namespace _Pull_Request__Customer {
  type core = {
    collection: _collection ;
    fields: (keyof Customer)[];
    query?: Object;
  };
}

export declare namespace _Pull_Response__Customer {
  type core = {
    status: "m" | "r";
    data: Partial<Customer>[];
  };
}

export async function POST(req: Request, res: Response): Promise<any> {
  var reqParam: _Pull_Request__Customer.core = await req.json();
  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    console.log(Env_M.DATABASE_NAME,Env_M.MONGODB_CONNECTION_STRING);
    

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

    console.log('Sinensis DB fetched @data ',data);
    

    return new Promise((m, j) => {
      setTimeout(() => {
        m(
          Response.json({
            data: data,
            status: "r",
          } as _Pull_Response__Customer.core)
        );
      }, 1000);
    });

    // return Response.json({
    //   data: data,
    //   status: "r",
    // } as _Response_Pull.core);
  } catch (err) {
    return Response.json({ data: err, status: "m" } as _Pull_Response__Customer.core);
  }
}
