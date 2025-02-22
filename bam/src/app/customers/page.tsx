"use client";

import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";

import { useRouter } from "next/navigation";
import { createRef, useRef, useState } from "react";
import {
  RevisedButtonM,
  RevisedInputJ,
  RevisedButtonR,
  RevisedInputM,
} from "../components";
export default function CustomerPage() {
  var route = useRouter();
  var updateInp = useRef<HTMLInputElement | null>();
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <h2 style={{ fontFamily:'Product Sans Bold' }}>
        Explore, Add or Edit A Customer
      </h2>
      <br />
      <br />
      <h5>
        You can edit add or delete a customer from this page. <br />
        Switch to the Desired action then you will be redirected to the required
        page. <br /> If not sure what to do move to the Documentation.
        <br />
        Or Call The developer
      </h5>
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <RevisedButtonR
          radius="7px"
          // spacingX=".5rem"
          HWFs={["2rem", "auto", "14px"]}
          sinensisAct={() => {
            if (updateInp.current?.value.replaceAll(" ", "") != "") {
              // route.push(
              //   `products/manage?action=edit&productname=${updateInp.current?.value}`
              // );
            }
          }}
          palate={[
            colorM("red-white-10"),
            colorM("red-black-2", 0.5),
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
          sinensisAct={() => {
            if (updateInp.current?.value.replaceAll(" ", "") != "") {
              // route.push(
              //   `products/manage?action=edit&productname=${updateInp.current?.value}`
              // );
            }
          }}
          palate={[
            colorM("blue-white-10"),
            colorM("blue-black-2", 0.5),
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          className="mshadow"
          style={{
            background: colorM("blue-white-10", 1),
            height: "fit-content",
            borderRadius: "13px",
            padding: "3rem 2rem",
            width: "calc(340px - 4rem)",
            margin: "0 0 2rem 0",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="material-symbols-outlined">
              {"add_ad" as MaterialSymbol}{" "}
            </span>
            &nbsp; Add A Customer
          </h3>

          <br />
          <h5>
            Start by including a new customer in the database. The customer will
            be permanently included in the database. You can edit or customize
            the customer afterwards. Follow the steps. <br />
          </h5>
          <br />
          <br />
          <h6>
            Navigate to <i>'Add Customer'</i>
          </h6>
          <br />
          <br />
          <RevisedButtonR
            HWFs={["2rem", "auto", "12px"]}
            radius="8px"
            // spacingX=".5rem"
            sinensisAct={() => {
              route.push("/customers/manage?action=add");
            }}
            palate={[
              colorM("green-black-6", 0.5),
              colorM("green-white-10"),
              colorM("green-black-0", 0.5),
            ]}
            icon="add"
            text="Add New Customer"
          ></RevisedButtonR>
        </div>

        <div
          className="mshadow"
          style={{
            background: colorM("blue-white-10", 1),
            height: "fit-content",
            borderRadius: "13px",
            padding: "3rem 2rem",
            width: "calc(340px - 4rem)",
            margin: "0 0 2rem 0",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="material-symbols-outlined">
              {"edit" as MaterialSymbol}{" "}
            </span>
            &nbsp; Edit Customer
          </h3>
          <br />
          <h5>
            Edit credentials of an existing customer. Use the Unique Customer
            Identity, or the name instead. Any customization or edition will
            update the previous record. Existing properties will be updated but
            the customer id will remain same.
            <br />
            <br />{" "}
          </h5>

          <h6>
            Edit an <i> 'Existing Customer'</i>
            <br />
            <br />
          </h6>
          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.3)}
              text="Customer's Id"
              generalColor={colorM("green-black-10", 0.4)}
              icon="id_card"
              inpTracker={(inp) => {
                updateInp.current = inp;
              }}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                if (updateInp.current?.value.replaceAll(" ", "") != "") {
                  route.push(
                    `/customers/manage?action=edit&customerid=${updateInp.current?.value}`
                  );
                }
              }}
              palate={[
                colorM("orange-black-6", 0.5),
                colorM("orange-white-10"),
                colorM("orange-black-0", 0.1),
              ]}
              icon="reset_wrench"
              text="Edit"
            ></RevisedButtonR>
          </div>
        </div>

        <div
          className="mshadow"
          style={{
            background: colorM("blue-white-10", 1),
            height: "fit-content",
            borderRadius: "13px",
            padding: "3rem 2rem",
            width: "calc(340px - 4rem)",
            margin: "0 0 2rem 0",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="material-symbols-outlined">
              {"explore" as MaterialSymbol}{" "}
            </span>
            &nbsp; Explore Customers
          </h3>
          <br />
          <h5>
            Find Filter and Explore existing customers available in the
            database. See who are your customers. Search available customers and
            explore ins and outs of customers.
            <br />
          </h5>

          <br />
          <br />
          <RevisedButtonR
            radius="7px"
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/customers/filter");
            }}
            palate={[
              colorM("blue-black-6", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-0", 0.5),
            ]}
            icon="filter_alt"
            text="Existing Customers"
          ></RevisedButtonR>
        </div>

        <div
          className="mshadow"
          style={{
            background: colorM("blue-white-10", 1),
            height: "fit-content",
            borderRadius: "13px",
            padding: "3rem 2rem",
            width: "calc(340px - 4rem)",
            margin: "0 0 2rem 0",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="material-symbols-outlined">
              {"delete" as MaterialSymbol}{" "}
            </span>
            &nbsp; Delete a Customer
          </h3>
          <br />
          <h5>
            Remove a Customer entirely from the database. The Custmer will be
            erased but records assiciated with it like Products bought by him
            might have its reference. So be carefull deleting a product.
            <br />
            <br />{" "}
          </h5>

          <h6 style={{ color: colorM("red-white-4") }}>
            It is non recommanded to delete a customer !
          </h6>
          <br />
          <br />

          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("red-black-10", 0.3)}
              text="Customer's Identity"
              generalColor={colorM("red-black-10", 0.4)}
              icon="delete_forever"
              inpTracker={(inp) => {
                updateInp.current = inp;
              }}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                if (updateInp.current?.value.replaceAll(" ", "") != "") {
                  route.push(
                    `/customers/delete?productname=${updateInp.current?.value}`
                  );
                }
              }}
              palate={[
                colorM("red-black-6", 0.5),
                colorM("red-white-10"),
                colorM("red-black-0", 0.1),
              ]}
              icon="delete_forever"
              text="Delete"
            ></RevisedButtonR>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
