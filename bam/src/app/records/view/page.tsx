"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  _Pull_Request__record,
  _Pull_Response__record,
} from "../api/pull/route";
import { Filter } from "mongodb";
import { LoaderM } from "@/app/baseComponents";
import { RevisedButtonR } from "@/app/components";
import { colorM } from "@/deps/color";
import { MiniRecord } from "@/app/records/filter/components";
import { layout } from "@/deps/constants";
import { MaterialSymbol } from "material-symbols";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "@/app/customers/api/pull/route";
import {
  _Pull_Request__Payment,
  _Pull_Response__Payment,
} from "@/app/payments/api/pull/route";
import { MiniPayment } from "@/app/payments/filter/components";
import { availableMemory } from "process";
import { IconAndData } from "@/app/customers/components";
import { PaymentPortion, RecordPortion } from "./components";
import { MILYs } from "@/app/customers/view/components";
import { complexPayment } from "@/mTypes/databases";

export default function ViewRecord({}: {}) {
  var searchParams = useSearchParams();
  var recordId = searchParams.get("recordid");

  var route = useRouter();

  var [recordData, recordDataTo] = useState<Partial<record>>();

  var [showNoRecordIdMsg, showNoRecordIdMsgTo] = useState<boolean>(false);
  var [recordLoaderView, recordLoaderViewTo] = useState<boolean>(true);

  var [notExists, notExistsTo] = useState<boolean>();

  var [complexPaymentList, complexPaymentListTo] = useState<complexPayment[]>();

  useEffect(() => {
    if (!recordId) {
      showNoRecordIdMsgTo(true);

      setTimeout(() => {
        route.push("/records/filter");
      }, 5000);

      return;
    }

    fetch("/records/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Record",
        fields: [],
        query: {
          id: recordId,
        } as Filter<record>,
      } as _Pull_Request__record.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__record.core) => {
          if ((d.status = "r")) {
            recordDataTo(d.data[0] as Partial<record>);
            recordLoaderViewTo(false);
            console.log(d.data[0]);

            if (d.data.length == 0) {
              notExistsTo(true);
            }
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        // display: "flex",
        // justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: "100%",
          display:
            !recordLoaderView && !showNoRecordIdMsg && !notExists
              ? "block"
              : "none",
        }}
      >
        <br />
        <br />
        <RecordPortion recordData={recordData}></RecordPortion>
      </div>

      <div
        style={{
          width: "100%",
          height: layout.availableSpace,
          padding: "5rem 0",
          display: notExists ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "64px" }} className="material-symbols-rounded">
          {"no_meals" as MaterialSymbol}
        </span>
        <br />
        <h3 style={{  }}>No Record was Found !</h3>
        <div style={{ height: ".25rem" }}></div>
        <h5 style={{ fontWeight: "400", textAlign: "center" }}>
          You may have manually Typed the link. If so use the format <br />
          /records/view?recordid=| record Id |
        </h5>
      </div>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: showNoRecordIdMsg ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["13rem", "100%"]}
          size="48px"
          speed={1000}
          icons={["blur_off", "restart_alt"]}
        ></LoaderM>
        <br />
        <br />
        <h3 style={{  }}>No Record Id !</h3>
        <br />
        <h6 style={{ fontWeight: "100", textAlign: "center" }}>
          URL has'nt any Valid Record Id. <br />
          You may have typed the URL manually. <br />
          If so use format{" "}
          <span style={{  }}>
            /records/manage/recordid=| Record Id |
          </span>
        </h6>
      </div>

      <div
        style={{
          height: layout.availableSpace,
          width: "100%",
          display: recordLoaderView && !showNoRecordIdMsg ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["13rem", "100%"]}
          size="48px"
          speed={1000}
          icons={["cloud", "unknown_document"]}
        ></LoaderM>
        <br />
        <br /> <h3>Fetching Record</h3>
        <span>
          <h5>Record with id</h5>&nbsp;
          <h4 style={{ fontFamily: "Product Sans Bold" }}>{recordId}</h4>&nbsp;
          <h5>is being fetchced</h5>
        </span>{" "}
        <br />
      </div>

      <div style={{ width: "100%", display: recordData ? "block" : "none" }}>
      <hr
          style={{
            display: complexPaymentList && recordData ? "block" : "none",
            border: "none",
            background: colorM("blue-black-10", 0.15),
            height: "1px",
          }}
        />{" "} <br />
        <PaymentPortion
          recordId={recordId == null ? undefined : recordId}
          paymentsForMily={(p) => {
            complexPaymentListTo(p);
          }}
        ></PaymentPortion>
      </div>

      <div>
        <hr
          style={{
            display: complexPaymentList && recordData ? "block" : "none",
            border: "none",
            background: colorM("blue-black-10", 0.15),
            height: "1px",
          }}
        />{" "}
        <br />
        <br />
        <MILYs
          payments={complexPaymentList}
          records={[recordData as record]}
          onflex={true}
        ></MILYs>
        <br />
        <br />
      </div>
    </div>
  );
}
