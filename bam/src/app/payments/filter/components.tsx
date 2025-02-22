import { RevisedButtonR } from "@/app/components";
import { IconAndData } from "@/app/customers/components";
import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function MiniPayment({
  payment,
  view,
  hideRecordM,
}: {
  payment: Partial<payment>;
  view: "list" | "block";
  hideRecordM?: boolean;
}) {
  var route = useRouter();
  payment.date = new Date(payment.date!);
  hideRecordM = hideRecordM ?? false;
  return (
    <div
      style={{
        display: view == "list" ? "flex" : "block",
        background: colorM("blue-white-10", 0.75),
        outline: "1px dashed " + colorM("blue-black-10", 0.25),
        margin: view == "list" ? "0 0 1rem 0" : "0 1rem 1rem 0",
        padding: view == "list" ? ".75rem .75rem" : '1rem',
        ...(view == "block" ? {minWidth:'200px'} : {}),
        borderRadius: "7px",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: view == "list" ? "calc(100% - 1.5rem)" : "fit-content",
      }}
      className="rshadow"
    >
      <IconAndData
      weightM="200"
        data={<h5>{payment.id}</h5>}
        icon="receipt"
        size="24px"
      ></IconAndData>

      <IconAndData
      weightM="200"
        data={
          <h5 style={{ fontFamily: "Product Sans Bold" }}>
            {payment.date?.toUTCString().replace(":00 GMT", " ")}
          </h5>
        }
        size="24px"
        icon="calendar_month"
      ></IconAndData>

      <IconAndData
      weightM="200"
        data={<h5>{payment.recordId}</h5>}
        size="24px"
        icon="unknown_document"
      ></IconAndData>
      <IconAndData
      weightM="200"
        data={<h5>{payment.rechiever}</h5>}
        size="24px"
        icon="person"
      ></IconAndData>
      <IconAndData
      weightM="200"
        data={
          <h5 style={{ width: "6rem", fontFamily: "Product Sans Bold" }}>
            {payment.amount}
          </h5>
        }
        size="24px"
        icon="currency_exchange"
      ></IconAndData>

      <div
        style={{
          display: "flex",
          margin: view == "list" ? "0 .25rem" : ".75rem 0 0 0",
        }}
      >
        <RevisedButtonR
          HWFs={["1.75rem", "auto", "12px"]}
          radius="7px"
          spacingX=".75rem"
          sinensisAct={() => {
            route.push("/payments/manage?edit=true&paymentid=" + payment.id);
          }}
          palate={[
            colorM("green-white-10"),
            colorM("green-black-6", 0.4),
            colorM("green-black-0", 0.1),
          ]}
          // icon="edit"
          text="Edit"
        ></RevisedButtonR>
        &nbsp;&nbsp;&nbsp;
        <div style={{ display: hideRecordM ? "none" : "block" }}>
          <RevisedButtonR
            HWFs={["1.75rem", "auto", "12px"]}
            radius="7px"
            spacingX=".75rem"
            sinensisAct={() => {
              route.push("/payments/manage?edit=true&paymentid=" + payment.id);
            }}
            palate={[
              colorM("orange-white-10"),
              colorM("orange-black-6", 0.4),
              colorM("orange-black-0", 0.1),
            ]}
            // icon="table_eye"
            text="View"
          ></RevisedButtonR>
        
        </div>
        &nbsp;&nbsp;&nbsp;<RevisedButtonR
          HWFs={["1.75rem", "auto", "10px"]}
          radius="7px"
          spacingX=".5rem"
          sinensisAct={() => {
            route.push("/records/view?recordid=" + payment.recordId);
          }}
          palate={[
            colorM("purple-white-10"),
            colorM("purple-black-6", 0.4),
            colorM("purple-black-0", 0.1),
          ]}
          // icon="edit"
          text="View Record"
        ></RevisedButtonR>
      </div>
    </div>
  );
}

export function ListOrBlock({
  flicked,
}: {
  flicked: (v: "block" | "list") => void;
}) {
  var [focused, focusedTo] = useState<"block" | "list">("list");

  useEffect(() => {
    flicked(focused);
  }, [focused]);

  return (
    <div style={{ display: "flex" }}>
      {(
        [
          ["grid_view", "block"],
          ["lists", "list"],
        ] as Array<[MaterialSymbol, "block" | "list"]>
      ).map((d) => (
        <div
          onClick={() => {
            focusedTo(d[1]);
          }}
          style={{
            margin: "0 0 0 .5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: ".5rem",
            cursor: "pointer",
            borderRadius:'7px',
            background:
              focused == d[1] ? colorM("blue-black-10", 0.4) : "transparent",
            color:
              focused == d[1] ? colorM("blue-white-10", 1) : colorM("blue-black-10", .6),
          }}
        >
          <span
            style={{ fontSize: "24px",color:'inherit' }}
            className="material-symbols-rounded"
          >
            {d[0] as MaterialSymbol}
          </span>
        </div>
      ))}
    </div>
  );
}
