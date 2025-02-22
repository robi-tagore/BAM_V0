"use client";

import { useSearchParams } from "next/navigation";
import {
  GeneralFields,
  PhysicalAddress,
  UniqueIdValidation,
  UploadToDatabase,
  VirtualAddress,
} from "./components";
import { useEffect, useState } from "react";
import { CustomerView } from "../components";
import { LoaderM } from "@/app/baseComponents";
import { colorM } from "@/deps/color";
import { Filter } from "mongodb";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { layout } from "@/deps/constants";

function CustomerForm({
  oldCred,
  oldId,
}: {
  oldCred: Partial<Customer>;
  oldId?: string;
}) {
  var [previewWindow, previewWindowTo] = useState<JSX.Element>();
  var [customerData, customerDataTo] = useState<Partial<Customer>>(oldCred);

  useEffect(() => {
    if (customerData) {
      previewWindowTo(
        <CustomerView customerData={customerData}></CustomerView>
      );
    }
  }, [customerData]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "4rem",
        justifyContent: "space-evenly",
      }}
    >
      <div
        className="mshadow"
        style={{
          width: "400px",
          background: "white",
          height: "fit-content",
          padding: "0 3rem",
          borderRadius: "13px",
        }}
      >
        <br />
        <br />
        {
          <GeneralFields
            onDone={(latest) => {
              customerDataTo((prev) => ({
                ...prev,
                name: { ...prev.name, ...latest },
              }));
              console.log(latest, "of", customerData);
            }}
            customerData={customerData}
          ></GeneralFields>
        }
        <br />
        <br />
        <hr
          style={{
            height: "1px",
            border: "none",
            background: colorM("blue-black-10", 0.2),
          }}
        />
        <br />
        <br />
        {
          <PhysicalAddress
            onDone={(latest) => {
              console.log(latest);

              customerDataTo((prev) => {
                return { ...prev, physicalIdentity: latest };
              });
            }}
            customerData={customerData}
          ></PhysicalAddress>
        }
        <br />
        <hr
          style={{
            height: "1px",
            border: "none",
            background: colorM("blue-black-10", 0.2),
          }}
        />
        <br />
        <br />
        {
          <VirtualAddress
            onDone={(latest) => {
              console.log('VA changest to',latest);
              
              customerDataTo((prev) => ({
                ...prev,
                virtualIdentity: { ...prev.virtualIdentity, ...latest },
              }));
            }}
            customerData={customerData}
          ></VirtualAddress>
        }
        <br />
      </div>

      <div
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "start",
        }}
      >
        <UploadToDatabase
          customerData={customerData as Customer}
          oldId={oldId}
        ></UploadToDatabase>{" "}
        <h4>
          <br />
          <br />
          <br />
        </h4>
        {previewWindow}
      </div>
    </div>
  );
}

export default function ManageCustomers() {
  var param = useSearchParams();
  var action: "add" | "edit";

  action = (param.get("action") as "add" | "edit") ?? "add";
  var oldId = param.get("customerid") ?? undefined;

  var [flexM, flexMTo] = useState<JSX.Element>(<></>);
  var [customerData, customerDataTo] = useState<Partial<Customer>>();

  var [existanceStatus, existanceStatusTo] = useState<
    "exists" | "not exists"
  >();

  useEffect(() => {
    if (action == "edit") {
      flexMTo(
        <div
          style={{
            height: layout.availableSpace,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "13rem"]}
            size="56px"
            speed={1000}
            icons={[
              "hourglass",
              "hourglass_bottom",
              "hourglass_top",
              "hourglass_top",
              "hourglass_bottom",
              "hourglass",
            ]}
            scaleEffect="1.13"
          ></LoaderM>

          <h2 style={{ fontFamily:'Product Sans Bold' }}>{oldId}</h2>
          <br />
          <h3 style={{ fontFamily:'Product Sans Bold' }}>Fetching Customer</h3>
          <br />
          {/* {oldId && (
            <span>
              <h4>Finding Customer with ID </h4>&nbsp;
              <h2 style={{ fontFamily:'Product Sans Bold' }}>{oldId}</h2>
            </span>
          )} */}
          <h5 style={{ textAlign: "center", width: "250px" }}>
            Wait Patiently Untill the response has achieved. It may take a few
            seconds. Dont leave untill the confirmation has revhieved.
          </h5>
        </div>
      );

      fetch("/customers/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Customer",
          fields: [
            "name",
            "physicalIdentity",
            "uniqueIdentity",
            "virtualIdentity",
          ],
          query: { uniqueIdentity: oldId } as Filter<Customer>,
        } as _Pull_Request__Customer.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Customer.core) => {
            if ((d.status = "r")) {
              customerDataTo(d.data[0] as Partial<Customer>);
              if (d.data.length == 0) {
                existanceStatusTo("not exists");
              } else {
                existanceStatusTo("exists");
              }
            } else if ((d.status = "m")) {
            }
          },
          (err) => {}
        );
      });
    } else {
      flexMTo(
        <div
          style={{
            height: layout.availableSpace,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UniqueIdValidation
            oldId={oldId}
            success={(uniqueId) => {
              customerDataTo((prev) => ({ ...prev, uniqueIdentity: uniqueId }));
              flexMTo(
                <CustomerForm
                  oldCred={{ ...customerData, uniqueIdentity: uniqueId }}
                ></CustomerForm>
              );
            }}
          ></UniqueIdValidation>
        </div>
      );
    }
  }, []);

  useEffect(() => {
    if (action == "edit") {
      if (customerData) {
        flexMTo(
          <CustomerForm oldId={oldId} oldCred={customerData}></CustomerForm>
        );
      }
    }
    console.log(customerData);
    
  }, [customerData]);

  useEffect(() => {
    if (existanceStatus && existanceStatus == "not exists") {
      console.log(existanceStatus);
      flexMTo(
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
            size="56px"
            speed={1000}
            icons={["sentiment_dissatisfied", "hand_gesture"]}
            scaleEffect="1.13"
          ></LoaderM>

          <h2 style={{ fontFamily:'Product Sans Bold' }}>Oops ! </h2>
          <br />
          <h3 style={{ fontFamily:'Product Sans Bold' }}>{oldId} was not found</h3>
          <br />

          <h5 style={{ textAlign: "center", width: "250px" }}>
            Requested customer is'nt available right now. It might not have been
            listed yet, or may have been deleted. Try again after with a
            different product id.
          </h5>
        </div>
      );
    }
  }, [existanceStatus]);

  return (
    <div
      style={{
        width: "100%",
        // padding: "4rem 0",
      }}
    >
      {flexM}
      <br />
    </div>
  );
}
