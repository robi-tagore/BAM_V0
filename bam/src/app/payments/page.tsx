"use client";

import { colorM } from "@/deps/color";
import Link from "next/link";
import { RevisedButtonR, RevisedInputJ } from "../components";
import { MaterialSymbol } from "material-symbols";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function PaymentPage({}: {}) {
  var route = useRouter();
  var recordIdInp = useRef<HTMLInputElement | null>();
  var paymentIdInp = useRef<HTMLInputElement | null>();
  var deleteIdInp = useRef<HTMLInputElement | null>();

  return (
    <div
      style={{
        width: "100%",
        // outline: "1px solid grey",

        padding: "6rem  0",
      }}
    >
      <h2 style={{ fontFamily: "Product Sans Bold" }}>
        Filter, Edit, Delete Or Explore Payments
      </h2>
      <br />
      <br />
      <h5 style={{ width: "350px" }}>
        Welcome to Payments Page. Payments are the Transictions made by a
        customer assigned to a record. Use this page to quickly navigate between
        the sub services related to payments.
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
              {"route" as MaterialSymbol}{" "}
            </span>
            &nbsp; Assign A Payment
          </h3>

          <br />
          <h5>
            Start by including a new payment in the database, using a specific
            record id. Use the unique id linked with the record to assign a
            payment.
            <br />
          </h5>
          <br />
          <br />
          <h6>
            <i>Copy Paste</i> the record id from records' page.
          </h6>
          <br />
          <br />
          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.3)}
              text="Record Id"
              generalColor={colorM("green-black-10", 0.4)}
              icon="unknown_document"
              inpTracker={(inp) => {
                recordIdInp.current = inp;
              }}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedButtonR
              HWFs={["2rem", "auto", "12px"]}
              radius="8px"
              // spacingX=".5rem"
              sinensisAct={() => {
                route.push(
                  "/payments/manage?recordref=" + recordIdInp.current?.value
                );
              }}
              palate={[
                colorM("green-black-6", 0.5),
                colorM("green-white-10"),
                colorM("green-black-0", 0.5),
              ]}
              icon="nest_true_radiant"
              text="Assign"
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
              {"edit" as MaterialSymbol}{" "}
            </span>
            &nbsp; Edit A Payment
          </h3>
          <br />
          <h5>
            Edit an existing payment using the payment id. The previous payment
            will not be removed but will be edited with the changes. <br />
            But it may be vurnerable.
            <br />
            <br />{" "}
          </h5>

          <h6>
            Edit an <i> 'Existing Payment'</i>
            <br />
            <br />
          </h6>
          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.3)}
              text="Payment Id"
              generalColor={colorM("green-black-10", 0.4)}
              icon="credit_card"
              inpTracker={(inp) => {
                paymentIdInp.current = inp;
              }}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                if (paymentIdInp.current?.value.replaceAll(" ", "") != "") {
                  route.push(
                    "/payments/manage?edit=true&paymentid=" +
                      paymentIdInp.current?.value
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
            &nbsp; Explore Payments
          </h3>
          <br />
          <h5>
            Find Filter and Explore the payments made till now. You may use the
            filter to filter among payments. Find the desired payment linked with any record.
            <br />
          </h5>

          <br />
          <br />
          <RevisedButtonR
            radius="7px"
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/payments/filter");
            }}
            palate={[
              colorM("blue-black-6", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-0", 0.5),
            ]}
            icon="filter_alt"
            text="Filter Now"
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
            &nbsp; Delete a Payment
          </h3>
          <br />
          <h5>
            Remove a Payment entirely from the database. The Payment will be
            erased but records, customers associated with have it's mention. So be carefull deleting a product.
            <br />
            <br />{" "}
          </h5>

          <h6 style={{ color: colorM("red-white-4") }}>
            It is non recommanded to delete a payment !
          </h6>
          <br />
          <br />

          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("red-black-10", 0.3)}
              text="Payment Id"
              generalColor={colorM("red-black-10", 0.4)}
              icon="credit_card"
              inpTracker={(inp) => {
                deleteIdInp.current = inp;
              }}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                if (deleteIdInp.current?.value.replaceAll(" ", "") != "") {
                  route.push(
                    '/payments/delete?paymentid=' + deleteIdInp.current?.value
                  );
                }
              }}
              palate={[
                colorM("red-black-6", 0.5),
                colorM("red-white-10"),
                colorM("red-black-0", 0.1),
              ]}
              icon="delete_sweep"
              text="Delete"
            ></RevisedButtonR>
          </div>
        </div>
      </div>
    </div>
  );
}
