import { Env_M } from "@/envVar";
import { _database, _collection } from "@/mTypes/databases";
import { Filter, MongoClient, ObjectId, PropertyType, WithId } from "mongodb";
import { NextApiRequest, NextApiResponse, ResponseLimit } from "next";
import { Bodys, Subjects } from "./contents";
import { sendEmailM } from "./generalMailService";
import { cookies } from "next/headers";
import { getUser } from "@/app/sinensis";

export async function briefFor({
  customerId,
  email,
  paymentId,
  recordId,
}: {
  email?: string;
  customerId?: string;
  recordId?: string;
  paymentId?: string;
}) {
  function process_log(...data: any) {
    console.log(Date.now(), `customer service => `, ...data);
  }

  process_log(`has been created`);

  function outputUpdate() {
    process_log("customerId", customerId ?? ":(");
    process_log("email", email ?? ":(");
    process_log("paymentId", paymentId ?? ":(");
    process_log("recordId", recordId ?? ":(");
  }

  var subject = paymentId
    ? Subjects.payment
    : recordId
    ? Subjects.record
    : customerId
    ? Subjects.customer
    : Subjects.notice;

  var body = paymentId
    ? Bodys.payment
    : recordId
    ? Bodys.record
    : customerId
    ? Bodys.customer
    : Bodys.notice;

  var overAllData = {};

  process_log("subject was chosen to", subject);
  process_log("body was set to", body);

  outputUpdate();

  var extData: any;
  if (paymentId) {
    process_log(`paymentId was found`, paymentId, `fetching recordId`);

    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("Payment" as _collection);

    var query: any = { id: paymentId };

    var data = await collection.find(query).toArray();

    var results: record | any = data[0];
    extData = results;
    delete extData._id;

    overAllData = {...overAllData,"Payment Data":extData};
    recordId = (results as payment).recordId;

    process_log(`recordId was fetched`, recordId, `fetching customerId`);
  }

  outputUpdate();

  if (recordId) {
    process_log(`recordId was found`, recordId, `fetching customerId`);

    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("Record" as _collection);

    var query: any = { id: recordId };

    var data = await collection.find(query).toArray();

    var results: record | any = data[0];
    extData = results;
    delete extData._id;
    customerId = (results as record).customerId;

    overAllData = {...overAllData,"Record Data":extData};

    process_log(`custmerId was fetched`, customerId, `fetching email`);
  }

  outputUpdate();

  if (customerId) {
    process_log(`customerId was found`, customerId, `fetching email`);

    var client = new MongoClient(Env_M.MONGODB_CONNECTION_STRING);
    var collection = client
      .db(Env_M.DATABASE_NAME as _database)
      .collection("Customer" as _collection);

    var query: any = { uniqueIdentity: customerId };

    var data = await collection.find(query).toArray();

    var results: record | any = data[0];
    extData = results;
    delete extData._id;
    email = (results as Customer).virtualIdentity.email;

    overAllData = {...overAllData,"Customer Data":extData};

    process_log(`email was fetched`, email, `sending email`);
  }

  outputUpdate();

  var isSucceed = false;
  var status;
  if (email) {
    var attemptNumber = 0;

    while (true) {
      if (isSucceed || attemptNumber >= 5) {
        break;
      }
      process_log(`sending mail to client ${email}`);
      process_log(`@attempt : ${attemptNumber} `);

      status = await sendEmailM({
        from: Env_M.EDITION.FOR,
        to: email,
        subject: subject,
        body: body,
        ext: {
          data: overAllData,
          of: "customer",
          operation: "general invoice",
          status: "info",
          influencer: await getUser({}),
        },
        process: "customer copy => ",
      });

      process_log(`operation output ${status}`);

      if (status == "success") {
        isSucceed = true;
      } else {
        process_log(
          `a failed attempt, next count will be ${attemptNumber + 1}`
        );
      }
      attemptNumber = attemptNumber + 1;
    }
  }
  process_log(`Exiting process with ${isSucceed} && ${status}`);
}
