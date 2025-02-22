import { Env_M } from "@/envVar";
import { _database, _collection, complexPayment } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId, PropertyType, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse, ResponseLimit } from "next";

export declare namespace _ComplexPull_Request__Payment {
  type core = {
    fields: (keyof payment)[];
    query: {};
    customerId: string;
  };
}

export declare namespace _ComplexPull_Response__Payment {
  type core = {
    status: "m" | "r";
    data: complexPayment[];
  };
}

export async function POST(req: Request, res: Response) : Promise<any> {
  var reqParam: _ComplexPull_Request__Payment.core = await req.json();
  try {
    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);

    client = await client.connect();

    // step 1

    var recordCollection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("Record" as _collection);

    var relatedRecords = await recordCollection
      .find(
        { customerId: reqParam.customerId },
        {
          projection: ["id"] as (keyof record)[],
        }
      )
      .toArray();

    console.log("Sinensis DB fetched @relatedRecords ", relatedRecords);

    var complexPaymentList: complexPayment[] | any = [];

    relatedRecords.forEach(async (record) => {
      var recordId = (record as Partial<record>).id;
      var paymentCollection = client
        .db("RosaSinensis" as _database)
        .collection("Payment" as _collection);

      var relatedPayments = await paymentCollection
        .find(
          { recordId: recordId },
          reqParam.fields.length != 0 ?
          {
            projection: reqParam.fields as (keyof payment)[],
          } : {}
        )
        .toArray();

      console.log("Sinensis DB fetched @relatedPayments ", relatedPayments);

      relatedPayments = relatedPayments.map((d) => {
        var edited: any = d;
        delete edited._id;
        return { ...edited };
      });

      relatedPayments.forEach((payment) => {
        complexPaymentList.push({
          ...payment,
          customerId: reqParam.customerId,
        });
      });
    });

    console.log("Sinensis DB fetched @data ", complexPaymentList);

    return new Promise((m, j) => {
      setTimeout(() => {
        m(
          Response.json({
            data: complexPaymentList,
            status: "r",
          } as _ComplexPull_Response__Payment.core)
        );
      }, 1000);
    });

    // return Response.json({
    // data: complexPaymentList,
    //   status: "r",
    // } as _Response_Pull.core);
  } catch (err) {
    return Response.json({
      data: err,
      status: "m",
    } as _ComplexPull_Response__Payment.core);
  }
}
