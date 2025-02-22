"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { Filter } from "mongodb";
import { LoaderM } from "@/app/baseComponents";
import { layout } from "@/deps/constants";
import {
  CustomerPortion,
  MILYs,
  PaymentPortion,
  RecordPortion,
} from "./components";
import { complexPayment } from "@/mTypes/databases";
import { colorM } from "@/deps/color";

export default function ViewCustomer({}: {}) {
  var searchParams = useSearchParams();
  var customerId = searchParams.get("customerid");

  var [customerData, customerDataTo] = useState<Partial<Customer>>();
  var [noCust, noCustTo] = useState<boolean>();

  var [showLoader, showLoaderTo] = useState<boolean>(true);

  useEffect(() => {
    if (!customerId) {
      return;
    }

    fetch("/customers/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Customer",
        fields: [],
        query: {
          uniqueIdentity: customerId,
        } as Filter<Customer>,
      } as _Pull_Request__Customer.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Customer.core) => {
          if ((d.status = "r")) {
            showLoaderTo(false);
            if (d.data.length == 0) {
              noCustTo(true);
            } else {
              customerDataTo(d.data[0] as Partial<Customer>);
              noCustTo(false);
            }

            console.log(d.data[0]);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  var [recordFM, recordFMTo] = useState<record[]>();
  var [paymentFM, paymentFMTo] = useState<complexPayment[]>();

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              display: showLoader ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height:layout.availableSpace
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="64px"
              speed={1000}
              icons={[
                "hourglass",
                "hourglass_bottom",
                "hourglass_top",
                "hourglass_top",
                "hourglass_bottom",
                "hourglass",
              ]}
            ></LoaderM>
            <br />
            <br />
            <h3>Fething General Details</h3>
            <span>
              <h5>Customer with id &nbsp;</h5>
              <h5 style={{ fontWeight: "900" }}>{customerId}</h5>
              <h5>&nbsp; is being fetched</h5>
            </span>
            <br />
          </div>

          <div
            style={{
              height: layout.availableSpace,
              width: "100%",
              display: noCust ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="64px"
              speed={1000}
              icons={["blur_off", "directory_sync"]}
            ></LoaderM>
            <br />
            <br />
            <h3 style={{ fontWeight: "900" }}>Not Found !</h3>
            <br />
            <h6 style={{ fontWeight: "500", textAlign: "center" }}>
              No Customer has that customer Id. Try editing the url. <br />
              Or be redirected from filter page.
            </h6>
          </div>

          <div>
            <br /><br /><br />
            <CustomerPortion
              customerData={customerData}
              shouldDisplay={
                customerData != undefined && !noCust && !showLoader
              }
            ></CustomerPortion>
          </div>

          <div
            style={{
              height: "100%",
              width: "100%",
              display: !customerId ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="64px"
              speed={1000}
              icons={["blur_off", "restart_alt"]}
            ></LoaderM>
            <br />
            <br />
            <h3 style={{ fontWeight: "900" }}>No Customer Id !</h3>
            <br />
            <h6 style={{ fontWeight: "400", textAlign: "center" }}>
              URL has'nt any Valid Customer Id. <br />
              You may have typed the URL manually. <br />
              If so use format{" "}
              <span style={{ fontWeight: "900" }}>
                /customers/manage/customerid=| Customer Id |
              </span>
            </h6>
          </div>
        </div>

        <div style={{ width: "fit-content",margin:'0 0 0 2rem' }}>
          <PaymentPortion
            paidM={(n) => {
              paymentFMTo(n);
            }}
            customerId={customerId!}
          ></PaymentPortion>
        </div>
      </div>
      <div style={{ width: "100%", overflow: "auto" }}>
        {
          <RecordPortion
            boughtM={(n) => {
              recordFMTo(n);
            }}
            customerId={customerId!}
          ></RecordPortion>
        }
      </div>

      {recordFM && paymentFM && (
        <div>
          
          <br />
          <h2>Summary Of Payments</h2>
          <hr
            style={{
              border: "none",
              background: colorM("blue-black-10", 0.15),
              height: "1px",
            }}
          />{" "}
          <br />
          <br />
          <MILYs payments={paymentFM} records={recordFM}></MILYs>
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
