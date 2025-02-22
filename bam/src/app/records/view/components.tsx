import { LoaderM } from "@/app/baseComponents";
import { RevisedButtonR } from "@/app/components";
import { IconAndData } from "@/app/customers/components";
import {
  _Pull_Request__Payment,
  _Pull_Response__Payment,
} from "@/app/payments/api/pull/route";
import { MiniPayment } from "@/app/payments/filter/components";
import { colorM } from "@/deps/color";
import { complexPayment } from "@/mTypes/databases";
import { MaterialSymbol } from "material-symbols";
import { Filter } from "mongodb";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function RecordPortion({
  recordData,
}: {
  recordData: Partial<record> | undefined;
}) {
  var route = useRouter();
  if (!recordData) return;
  recordData.date = new Date(recordData.date!);

  var annualPrice = 0;
  recordData.items?.forEach(({ price: { total } }) => {
    annualPrice += Number(total);
  });

  return (
    <div
      style={{
        width: "calc(100% - 6rem)",
        padding: "3rem",
        height: "fit-content",
        // background: "white",
        borderRadius: "13px",
        // position: "relative",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          // width: "calc(100% - 6rem)",
          padding: "2rem",
          height: "fit-content",
          background: "white",
          borderRadius: "13px",
          position: "relative",
        }}
        className="mshadow"
      >
        <h3>Record Details</h3>
        <br />
        <br />
        <div>
          <h5>Record Id : </h5> &nbsp;
          <h4 style={{ fontFamily: "Product Sans Bold" }}>{recordData.id}</h4>
          <br />
          <h5>Customer Id : </h5> &nbsp;
          <h4
            style={{
              fontFamily: "Product Sans Bold",
              textDecoration: "underline",
            }}
          >
            {recordData.customerId}
          </h4>
          &nbsp;
          <span
            style={{ fontSize: "18px", cursor: "pointer" }}
            className="material-symbols-rounded"
            onClick={() => {
              route.push("/customers/view?customerid=" + recordData.customerId);
            }}
          >
            {"open_in_new" as MaterialSymbol}
          </span>
        </div>
        <br />
        <div>
          <div style={{ display: "flex" }}>
            <IconAndData
              icon="calendar_month"
              data={
                <h5 style={{ fontFamily: "Product Sans Bold" }}>
                  {recordData.date.getDay()}-{recordData.date.getMonth() + 1}-
                  {recordData.date.getFullYear()}
                </h5>
              }
            ></IconAndData>
            <IconAndData
              icon="watch"
              data={
                <h5 style={{ fontFamily: "Product Sans Bold" }}>
                  {recordData.date.getHours()}:{recordData.date.getMinutes()}
                </h5>
              }
            ></IconAndData>
          </div>
        </div>
        <br />
        <div>
          <h5>Spent In Total : </h5> &nbsp;
          <h3 style={{ fontFamily: "Product Sans Bold" }}>{annualPrice}</h3>
        </div>

        <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
          <span
            style={{
              fontSize: "1.75rem",
              color:
                recordData.type == "outgoing"
                  ? colorM("green-black-5", 0.6)
                  : colorM("blue-black-5", 0.6),
            }}
            className="material-symbols-rounded"
          >
            {recordData.type == "outgoing"
              ? "shopping_cart_checkout"
              : ("add_business" as MaterialSymbol)}
          </span>
        </div>
      </div>

      <div>
        <h3>Products Bought</h3>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          {recordData.items?.map((d, i) => (
            <div
              key={i}
              style={{
                margin: "0 1.5rem 0 0 ",
                outline: "1px dashed " + colorM("blue-black-10", 0.25),
                padding: "1rem",
                borderRadius: "7px",
                background: colorM("red-white-10", 0.5),
              }}
            >
              <h4 style={{ fontFamily: "Product Sans Bold" }}>
                {d.product.name}
              </h4>
              &nbsp;
              <br />
              <h5 style={{ fontWeight: "400" }}>Model = {d.product.model}</h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>
                Quantity = {d.price.quantity} pc
              </h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>Each = {d.price.each} Tk</h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>Total = {d.price.total} Tk</h5>
            </div>
          ))}
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "fit-content",
            justifyContent: "space-between",
          }}
        >
          <RevisedButtonR
            radius="7px"
            spacingX=".5rem"
            // reverse={true}
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              var ext =
                recordData.type == "outgoing"
                  ? "&customerref=" + recordData.customerId
                  : "";

              route.push(
                "/records/manage?edit=true&recordid=" + recordData.id + ext
              );
            }}
            palate={[
              colorM("orange-white-10"),
              colorM("orange-black-6", 0.5),
              colorM("orange-black-0", 0.1),
            ]}
            // icon="edit"
            text="Edit This Record"
          ></RevisedButtonR>
          &nbsp;&nbsp;
          <RevisedButtonR
            radius="7px"
            spacingX=".5rem"
            // reverse={true}
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/records/delete?recordid=" + recordData.id);
            }}
            palate={[
              colorM("red-white-10"),
              colorM("red-black-6", 0.5),
              colorM("red-black-0", 0.1),
            ]}
            icon="delete_forever"
            text="Delete"
          ></RevisedButtonR>
          &nbsp;&nbsp;
          <RevisedButtonR
            radius="7px"
            // spacingX=".5rem"
            // reverse={true}
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/payments/manage?recordref=" + recordData.id);
            }}
            palate={[
              colorM("blue-white-10"),
              colorM("blue-black-6", 0.5),
              colorM("blue-black-0", 0.1),
            ]}
            icon="price_check"
            text="Assign Payment"
          ></RevisedButtonR>
        </div>
      </div>
    </div>
  );
}

export function PaymentPortion({
  recordId,
  paymentsForMily
}: {
  recordId?: string;
  paymentsForMily: (e: complexPayment[]) => void;
}) {
  var [paymentsDiv, paymentsDivTo] = useState<JSX.Element>(<></>);
  var [loaderDisplay, loaderDisplayTo] = useState<boolean>(true);

  var [payments, paymentsTo] = useState<Partial<record>[] | "not exists">();

  
  if (!recordId) return;

  useEffect(() => {
    if (payments == "not exists") {
      paymentsDivTo(
        <div
          style={{
            height: `calc(100vh - 8rem)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span
            className="material-symbols-rounded"
            style={{ fontSize: "64px" }}
          >
            {"no_meals" as MaterialSymbol}
          </span>
          <br />
          <h3>No Payment has mentioned this record</h3>
        </div>
      );
    } else {
      paymentsDivTo(
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h3 style={{ fontFamily: "Product Sans Bold" }}>
              Payments assigned with the Record
            </h3>
            <br />
            <br />

            <div
              style={{
                display: "flex",
                flexWrap:'wrap'
              }}
            >
              {payments?.map((d, i) => (
                <div key={i} style={{ margin: "0 1rem 0 0" }}>
                  <MiniPayment
                    hideRecordM={true}
                    payment={d}
                    view="block"
                    key={i}
                  ></MiniPayment>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      );
    }
  }, [payments]);

  useEffect(() => {
    fetch("/payments/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Payment",
        fields: [],
        query: { recordId: recordId } as Filter<payment>,
      } as _Pull_Request__Payment.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Payment.core) => {
          if ((d.status = "r")) {
            loaderDisplayTo(false);
            if (d.data.length == 0) {
              paymentsTo("not exists");
            } else {
              paymentsTo(d.data as Partial<payment>[]);
              paymentsForMily(d.data as complexPayment[])
            }
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: loaderDisplay ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <br />
        <br />

        <LoaderM HW={["13rem", "auto"]} size="48px" speed={1000}></LoaderM>
        <h4 style={{ fontFamily: "Product Sans Bold" }}>Fetching Payments</h4>
      </div>

      <div
        style={{
          width: "100%",
          display: !loaderDisplay ? "block" : "none",
        }}
      >
        {paymentsDiv}
      </div>
      <br />
      <br />
    </div>
  );
}
