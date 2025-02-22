"use client";

import { colorM } from "@/deps/color";
import { RevisedButtonR } from "../../components";
import { RecordArrangements } from "./components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Filter } from "mongodb";
import { LoaderM } from "../../baseComponents";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../../customers/api/pull/route";

export default function RecordsPage() {
  var searchParams = useSearchParams();

  var edit = searchParams.get("edit");
  var oldRecordId =
    searchParams.get("recordid") == null
      ? undefined
      : searchParams.get("recordid");

  var [viewPort, viewPortTo] = useState<JSX.Element>(<></>);
  var [recordData, recordDataTo] = useState<Partial<record> | "not exists">();

  var customerRef: string | undefined =
    searchParams.get("customerref") ?? undefined;

  useEffect(() => {
    if (edit) {
      if (oldRecordId == null) {
        viewPortTo(
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "13rem"]}
              size="48px"
              speed={1000}
              icons={["blur_off", "priority_high"]}
              scaleEffect="1.13"
            ></LoaderM>

            <h3>Invalid Record Id</h3>

            <h5 style={{ textAlign: "center", width: "250px" }}>
              No Record Id was provided in the url. The url may have been typed
              manually, if so use the format <br />
              records?edit=true&recordid=| Record Id |
            </h5>
          </div>
        );
        return;
      }
      fetch("/records/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Record",
          fields: [],
          query: { id: oldRecordId } as Filter<RecordingState>,
        } as _Pull_Request__Customer.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Customer.core) => {
            if ((d.status = "r")) {
              if (d.data.length == 0) {
                recordDataTo("not exists");
              } else {
                recordDataTo(d.data[0] as Partial<record>);
              }
            } else if ((d.status = "m")) {
            }
          },
          (err) => {}
        );
      });
      viewPortTo(
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "13rem"]}
            size="48px"
            speed={1000}
            icons={["cloud", "unknown_document"]}
            scaleEffect="1.13"
          ></LoaderM>

          <h3>Fetching Record</h3>
          <span>
            <h5>The record with id</h5> &nbsp;
            <h4 style={{ fontFamily: "Product Sans Bold" }}>{oldRecordId}</h4>
            &nbsp;
            <h5>is being fetched.</h5>
          </span>
        </div>
      );
    } else {
      viewPortTo(
        <RecordArrangements customerIdPre={customerRef}></RecordArrangements>
      );
    }
  }, []);

  useEffect(() => {
    if (recordData) {
      if (recordData == "not exists") {
        viewPortTo(
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "13rem"]}
              size="48px"
              speed={1000}
              icons={["blur_off", "priority_high"]}
              scaleEffect="1.13"
            ></LoaderM>

            <h3>Record Not Found !</h3>

            <span>
              <h5>The record with id</h5>&nbsp;
              <h4 style={{ fontFamily: "Product Sans Bold" }}>{oldRecordId}</h4>
              &nbsp;
              <h5>was not found.</h5><br />
            </span>

            <h5 style={{width:"250px",textAlign:'center'}}>
                Requested Record does'nt exists. It might not have been listed
                yet, or the link may be typed manually.
              </h5>
          </div>
        );
      } else if (recordData.id) {
        console.log("updating with", recordData);
        viewPortTo(
          <RecordArrangements
            recordData={recordData}
            oldId={oldRecordId!}
            customerIdPre={customerRef}
          ></RecordArrangements>
        );
      }
    }
  }, [recordData]);

  return (
    <div style={{ width: "100%" }}>
      <br />
      <br />
      <br />
      <h2 style={{ fontFamily: "Product Sans Bold" }}>
        Add Edit or Create a Record
      </h2>
      <br />
      <br />
      <h5 style={{ width: "350px" }}>
        This page is built with a intention to let you add, edit or create a
        incoming record in database. The term record refers to a payment
        exchange in the service. <br />
        The incoming products are the main record candidates.
      </h5>

      <br />
      <br />
      <div style={{ display: "flex" }}>
        <RevisedButtonR
          radius="7px"
          // spacingX=".5rem"
          HWFs={["2rem", "auto", "14px"]}
          sinensisAct={() => {}}
          palate={[
            colorM("red-white-10"),
            colorM("red-black-6", 0.4),
            colorM("red-black-0", 0.1),
          ]}
          // icon="open_in_new"
          text="Documentation"
        ></RevisedButtonR>
        &nbsp;&nbsp;&nbsp;
        <RevisedButtonR
          radius="7px"
          reverse={true}
          HWFs={["2rem", "auto", "14px"]}
          sinensisAct={() => {}}
          palate={[
            colorM("blue-white-10"),
            colorM("blue-black-6", 0.4),
            colorM("blue-black-0", 0.1),
          ]}
          icon="call"
          text="Call Now"
        ></RevisedButtonR>
      </div>

      <br />
      <br />
      <hr
        style={{
          border: "none",
          background: colorM("blue-black-10", 0.15),
          height: "1px",
        }}
      />
      <br />

      <br />
      <br />
      {viewPort}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
