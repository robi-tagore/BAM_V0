"use client";
import { colorM } from "@/deps/color";
import { useSearchParams } from "next/navigation";
import { CustomerView, IconAndData } from "../components";
import { RevisedButtonR, RevisedInputJ } from "@/app/components";
import {
  GeneralSearch,
  PhysicalAddressSearch,
  VirtualAddressSearch,
} from "./components";
import { useEffect, useState } from "react";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { Filter } from "mongodb";
import { LoaderM } from "@/app/baseComponents";
import { MaterialSymbol } from "material-symbols";

export default function FilterCustomers({}: {}) {
  var searchParams = useSearchParams();
  var permittedActions = [
    searchParams.get("delete") ? "delete" : "",
    searchParams.get("edit") ? "edit" : "",
  ];

  var [filterComment, filterCommentTo] = useState<JSX.Element>(
    <>Start Filtering Customers</>
  );

  var [customerList, customerListTo] = useState<Partial<Customer>[]>();
  var [resultsDiv, resultsDivTo] = useState<JSX.Element>();

  var [selectedFields, selectedFieldsTo] = useState<(keyof Customer)[]>([
    "name",
    "uniqueIdentity",
    // "virtualIdentity",
    "physicalIdentity",
  ]);

  function handleM() {
    var inputs = document.querySelectorAll("input");
    var allIn: string[] = [];
    inputs.forEach((d) => allIn.push(d.value));
    var [id, name, phone, email, address] = allIn;

    filterCommentTo(<>Customers are being filtered</>);

    resultsDivTo(
      <div>
        <br />
        <br />
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {[1, 2, 1].map((d, i) => (
            <LoaderM
              key={i}
              HW={["26rem", "100%"]}
              size="48px"
              speed={d * 1000}
              scaleEffect="1.25"
              icons={[
                // "data_table",
                "humidity_high",
                // "data_table",
                "humidity_mid",
                // "data_table",
                "humidity_low",
              ]}
            ></LoaderM>
          ))}
        </div>
      </div>
    );

    fetch("/customers/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Customer",
        fields: selectedFields,
        query: {
          $and: [
            {
              $or: [{ uniqueIdentity: { $regex: id, $options: "i" } }],
            },
            {
              $or: [
                { "virtualIdentity.email": { $regex: email, $options: "i" } },
              ],
            },

            {
              $or: [
                { "name.first": { $regex: name, $options: "i" } },
                { "name.last": { $regex: name, $options: "i" } },
                { "name.surname": { $regex: name, $options: "i" } },
              ],
            },

            {
              $or: [
                {
                  "virtualIdentity.phoneNumber": {
                    $regex: phone,
                    $options: "i",
                  },
                },
                {
                  "virtualIdentity.emergencyNumber": {
                    $regex: phone,
                    $options: "i",
                  },
                },
              ],
            },

            {
              $or: [{ physicalIdentity: { $regex: address, $options: "i" } }],
            },
          ],
        } as Filter<Customer>,
      } as _Pull_Request__Customer.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Customer.core) => {
          if ((d.status = "r")) {
            customerListTo(d.data);
          } else if ((d.status = "m")) {
            customerListTo(d.data);
          }
        },
        (err) => {
          // j(err);
        }
      );
    });
  }

  var consProps: {
    fieldId: keyof Customer;
    icon: MaterialSymbol;
    text: string;
  }[] = [
    { fieldId: "name", icon: "text_fields_alt", text: "General Details" },
    {
      fieldId: "physicalIdentity",
      icon: "my_location",
      text: "Physical Address",
    },
    { fieldId: "virtualIdentity", icon: "cloud", text: "Virtual Identity" },
    { fieldId: "uniqueIdentity", icon: "id_card", text: "Unique Id" },
  ];

  function SelectionFieldComp({ fields }: { fields: (keyof Customer)[] }) {
    return (
      <>
        {consProps.map((constructorField, indexSignature) => (
          <div key={indexSignature} style={{ marginRight: ".75rem" }}>
            <RevisedButtonR
              HWFs={["1.75rem", "auto", "10px"]}
              // spacingX=".5rem"
              radius="7px"
              palate={
                !fields.includes(constructorField.fieldId)
                  ? [
                      colorM("green-white-10", 1),
                      colorM("green-black-10", 0.4),
                      colorM("green-white-10", 0),
                    ]
                  : [
                      colorM("green-black-10", 0.4),
                      colorM("green-white-10", 1),
                      colorM("green-white-10", 0),
                    ]
              }
              text={constructorField.text}
              icon={constructorField.icon}
              reverse={true}
              sinensisAct={() => {
                selectedFieldsTo((prev) => {
                  if (prev.includes(constructorField.fieldId)) {
                    prev = prev.filter((d) => d != constructorField.fieldId);
                  } else {
                    prev = [...prev, constructorField.fieldId];
                  }
                  return prev;
                });
              }}
            ></RevisedButtonR>
          </div>
        ))}
      </>
    );
  }

  useEffect(() => {
    if (customerList) {
      if (customerList.length != 0) {
        filterCommentTo(
          <span style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ fontFamily: "Product Sans Bold" }}>
              {customerList.length}
            </h3>
            &nbsp;
            <h4>Customers were found</h4>
          </span>
        );
        resultsDivTo(
          <div
            style={{
              width: "100%",
              display: "grid",
              gridGap: "3rem",
              gridTemplateColumns: "1fr 1fr 1fr ",
            }}
          >
            {customerList.map((d, i) => (
              <div key={i}>
                <CustomerView
                  actions={{ delete: true, edit: true, view: true }}
                  customerData={d}
                ></CustomerView>
              </div>
            ))}
          </div>
        );
      } else {
        resultsDivTo(
          <div
            style={{
              width: "100%",
              padding: "5rem 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span
              style={{ fontSize: "64px" }}
              className="material-symbols-rounded"
            >
              {"no_accounts" as MaterialSymbol}
            </span>
            <br />
            <h3 style={{ fontFamily: "Product Sans Bold" }}>
              No Customer were Found !
            </h3>
            <div style={{ height: ".25rem" }}></div>
            <h5 style={{ fontWeight: "100", textAlign: "center" }}>
              Try changing the fields, Remember all the fields are in and
              condition. <br />
              So the results here will have to match all the fields.
              <br /> Try changing categories and brands.
            </h5>
          </div>
        );
        filterCommentTo(
          <span style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ fontFamily: "Product Sans Bold" }}>No Customers</h3>
            &nbsp;
            <h4>were found</h4>
          </span>
        );
      }
    }
  }, [customerList]);

  useEffect(() => {
    handleM();
  }, [selectedFields]);

  return (
    <div
      style={{
        width: "100%",
        // outline: "1px solid grey",

        padding: "6rem  0",
      }}
    >
      <h2 style={{ fontFamily: "Product Sans Bold" }}>
        {permittedActions.includes("delete") &&
        permittedActions.includes("edit")
          ? "Filter, Edit and Delete"
          : permittedActions.includes("delete")
          ? "Filter and Delete"
          : permittedActions.includes("edit")
          ? "Filter and Edit"
          : "Filter and Explore"}
      </h2>
      <br />
      <br />
      <h5 style={{ width: "350px" }}>
        You can filter Customers from desired query using this page. Remember
        the inputs are in and condition. Which means customers matching all the
        datas will be included. Its better if you type and filter.{" "}
      </h5>
      <br />
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {<GeneralSearch></GeneralSearch>}
        {<VirtualAddressSearch></VirtualAddressSearch>}
        {<PhysicalAddressSearch></PhysicalAddressSearch>}
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          position: "sticky",
          outline: "1px solid " + colorM("blue-black-10", 0.15),
          top: "1rem",
          borderRadius: "1px",
          zIndex: "4",
          backdropFilter: "blur(7px)",
          background: colorM("red-white-10", 0.5),
          padding: ".5rem 1rem",
        }}
      >
        <RevisedButtonR
          radius="7px"
          // spacingX=".25rem"
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={handleM}
          palate={[
            colorM("green-black-4", 0.7),
            colorM("green-white-10"),
            colorM("green-black-0", 0.1),
          ]}
          icon="filter_alt"
          text="Filter Customers"
        ></RevisedButtonR>

        <div style={{ display: "flex" }}>
          <SelectionFieldComp fields={selectedFields}></SelectionFieldComp>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h3 style={{ fontFamily: "Product Sans Bold" }}>{filterComment}</h3>{" "}
      <hr
        style={{
          height: "1px",
          border: "none",
          background: colorM("blue-black-10", 0.2),
        }}
      />
      <br />
      <div>{resultsDiv}</div>
    </div>
  );
}
