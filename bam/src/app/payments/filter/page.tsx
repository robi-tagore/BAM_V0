"use client";

import { RevisedInputJ } from "@/app/components";
import { colorM } from "@/deps/color";
import { useSearchParams } from "next/navigation";
import { createRef, useEffect, useRef, useState } from "react";
import {
  _Pull_Request__Payment,
  _Pull_Response__Payment,
} from "../api/pull/route";
import { Filter } from "mongodb";
import { ListOrBlock, MiniPayment } from "./components";
import { IconAndData } from "@/app/customers/components";
import { LoaderM } from "@/app/baseComponents";
import { MaterialSymbol } from "material-symbols";

export default function FilterRecordsPage() {
  var searchParams = useSearchParams();
  var recordId = searchParams.get("recordid");

  var inputsDiv = createRef<HTMLDivElement>();

  var [update, nowUpdate] = useState<number>(0);

  var [resultViewType, resultViewTypeTo] = useState<"list" | "block">("list");

  var [paymentList, paymentListTo] = useState<Partial<payment>[]>();
  var [paymentLoaderView, paymentLoaderViewTo] = useState<boolean>();
  var [noResults, noResultsTo] = useState<boolean>();
  var [keyword, keywordTo] = useState<{
    id: string;
    recordId: string;
    upDate: Date;
    downDate: Date;
    rechiever: string;
  }>();

  useEffect(() => {
    document.querySelectorAll("input").forEach((inpM) => {
      inpM.addEventListener("keyup", () => {
        nowUpdate((prev) => prev + 1);
      });
    });
  }, []);

  useEffect(() => {
    noResultsTo(undefined);
    paymentLoaderViewTo(true);

    var inpVals: string[] = [];

    inputsDiv.current?.querySelectorAll("input").forEach((inp) => {
      inpVals.push(inp.value);
    });

    var paymentId = inpVals[0];
    var recordId = inpVals[1];
    var rechiever = inpVals[2];

    var upDate = new Date(
      Number(inpVals[5]),
      Number(inpVals[4]) - 1,
      Number(inpVals[3]),
      Number(inpVals[6].split(":")[0]),
      Number(inpVals[6].split(":")[1])
    );
    var downDate = new Date(
      Number(inpVals[5 + 4]),
      Number(inpVals[4 + 4]) - 1,
      Number(inpVals[3 + 4]),
      Number(inpVals[6 + 4].split(":")[0]),
      Number(inpVals[6 + 4].split(":")[1])
    );

    keywordTo({
      id: paymentId,
      recordId: recordId,
      upDate: upDate,
      downDate: downDate,
      rechiever: rechiever,
    });
  }, [update]);

  useEffect(() => {
    var query = {
      $and: [
        keyword?.id
          ? {
              $or: [{ id: { $regex: keyword?.id, $options: "i" } }],
            }
          : {},
        keyword?.recordId
          ? {
              $or: [{ recordId: { $regex: keyword?.recordId, $options: "i" } }],
            }
          : {},
        keyword?.rechiever
          ? {
              $or: [
                { rechiever: { $regex: keyword?.rechiever, $options: "i" } },
              ],
            }
          : {},
        {
          $or: [{ date: { $lte: keyword?.upDate, $gte: keyword?.downDate } }],
        },
      ],
    } as Filter<payment>;

    fetch("/payments/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Payment",
        fields: [],
        query: query,
      } as _Pull_Request__Payment.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Payment.core) => {
          if ((d.status = "r")) {
            paymentListTo(d.data as Partial<payment>[]);
            paymentLoaderViewTo(false);

            if (d.data.length == 0) {
              noResultsTo(true);
              paymentLoaderViewTo(false);
            } else {
              noResultsTo(false);
            }
          } else if ((d.status = "m")) {
            // resultsTo(d.data);
          }
        },
        (err) => {
          // j(err);
        }
      );
    });
  }, [keyword]);

  return (
    <div
      style={{
        width: "100%",
        // outline: "1px solid grey",

        padding: "6rem  0",
      }}
    >
      <h2 style={{ fontFamily: "Product Sans Bold" }}>
        Filter And Explore Payments
      </h2>
      <br />
      <br />
      <h5 style={{ width: "350px" }}>
        You can view existing Payments from desired query using this page.
        Remember the inputs are in 'and' (&&) condition. Which means records
        matching all the datas will be included. Its better if you type and
        filter.{" "}
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

      <div ref={inputsDiv} style={{ display: "flex" }}>
        <div>
          <h3>General Details</h3>
          <br />
          <br />
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text={`Payment Id`}
            generalColor={colorM("green-black-10", 0.3)}
            icon="id_card"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
            // defaultsTo={recordId}
          ></RevisedInputJ>
          <br />
          <RevisedInputJ
            HWFs={["2rem", "17rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text="Assigned Record Id"
            generalColor={colorM("green-black-10", 0.3)}
            icon="unknown_document"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
            defaultsTo={recordId == null ? undefined : recordId}
          ></RevisedInputJ>
          <br />
          <RevisedInputJ
            HWFs={["2rem", "21rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text="Rechiever"
            generalColor={colorM("green-black-10", 0.3)}
            icon="person"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
          ></RevisedInputJ>
        </div>

        <div style={{ width: "7rem" }}></div>
        <div>
          <h3>Date Range</h3>
          <br />
          <br />
          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Day"
              generalColor={colorM("green-black-10", 0.3)}
              icon="calendar_today"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={new Date().getDate().toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Month"
              generalColor={colorM("green-black-10", 0.3)}
              icon="calendar_month"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={(new Date().getMonth() + 1).toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Year"
              generalColor={colorM("green-black-10", 0.3)}
              icon="view_week"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={new Date().getFullYear().toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Time"
              generalColor={colorM("green-black-10", 0.3)}
              icon="watch"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={
                String(new Date().getHours()) +
                ":" +
                String(new Date().getMinutes())
              }
            ></RevisedInputJ>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Day"
              generalColor={colorM("green-black-10", 0.3)}
              icon="calendar_today"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={new Date().getDate().toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Month"
              generalColor={colorM("green-black-10", 0.3)}
              icon="calendar_month"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={(new Date().getMonth() + 1 - 1).toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Year"
              generalColor={colorM("green-black-10", 0.3)}
              icon="view_week"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={new Date().getFullYear().toString()}
            ></RevisedInputJ>
            &nbsp;&nbsp;
            <RevisedInputJ
              HWFs={["2rem", "7rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text="Time"
              generalColor={colorM("green-black-10", 0.3)}
              icon="watch"
              inpTracker={(inp) => {
                // recordIdInp.current = inp;
              }}
              defaultsTo={
                String(new Date().getHours()) +
                ":" +
                String(new Date().getMinutes())
              }
            ></RevisedInputJ>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          width: "100%",
          display: !paymentLoaderView && !noResults ? "block" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3>Results Will Be Appearing Here</h3>
          <ListOrBlock
            flicked={(e) => {
              resultViewTypeTo(e);
            }}
          ></ListOrBlock>
        </div>
        <br />
        <br />

        <div
          style={{
            display: resultViewType == "list" ? "block" : "flex",
            flexWrap: "wrap",
          }}
        >
          {paymentList?.map((d, i) => (
            <MiniPayment
              view={resultViewType}
              payment={d}
              key={i}
            ></MiniPayment>
          ))}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: paymentLoaderView ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <LoaderM
            HW={["13rem", "100%"]}
            size="48px"
            speed={2000}
            scaleEffect="1"
            icons={[
              "battery_0_bar",
              "battery_1_bar",
              "battery_2_bar",
              "battery_3_bar",
              "battery_4_bar",
              "battery_5_bar",
              "battery_6_bar",

              "battery_6_bar",
              "battery_5_bar",
              "battery_4_bar",
              "battery_3_bar",
              "battery_2_bar",
              "battery_1_bar",
              "battery_0_bar",
            ]}
          ></LoaderM>
          <LoaderM
            HW={["13rem", "100%"]}
            size="48px"
            speed={1000}
            scaleEffect="1"
            icons={[
              "battery_0_bar",
              "battery_0_bar",
              "battery_1_bar",
              "battery_1_bar",
              "battery_2_bar",
              "battery_2_bar",
              "battery_3_bar",
              "battery_3_bar",
              "battery_4_bar",
              "battery_4_bar",
              "battery_5_bar",
              "battery_5_bar",
              "battery_6_bar",
              "battery_6_bar",

              "battery_6_bar",
              "battery_6_bar",
              "battery_5_bar",
              "battery_5_bar",
              "battery_4_bar",
              "battery_4_bar",
              "battery_3_bar",
              "battery_3_bar",
              "battery_2_bar",
              "battery_2_bar",
              "battery_1_bar",
              "battery_1_bar",
              "battery_0_bar",
              "battery_0_bar",
            ]}
          ></LoaderM>
          <LoaderM
            HW={["13rem", "100%"]}
            size="48px"
            speed={2000}
            scaleEffect="1"
            icons={[
              "battery_0_bar",
              "battery_1_bar",
              "battery_2_bar",
              "battery_3_bar",
              "battery_4_bar",
              "battery_5_bar",
              "battery_6_bar",

              "battery_6_bar",
              "battery_5_bar",
              "battery_4_bar",
              "battery_3_bar",
              "battery_2_bar",
              "battery_1_bar",
              "battery_0_bar",
            ]}
          ></LoaderM>
        </div>

        <br />
        <h3>Payments Are Being Fetched</h3>
        <h5>
          Results are being fetchd from server. Wait patiently untill response
          is rechieved.
        </h5>
        <br />
      </div>

      <div
        style={{
          width: "100%",
          padding: "5rem 0",
          display: noResults ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "64px" }} className="material-symbols-rounded">
          {"no_meals" as MaterialSymbol}
        </span>
        <br />
        <h3 style={{fontFamily:"Product Sans Bold" }}>No Results were Found !</h3>
        <div style={{ height: ".25rem" }}></div>
        <h5 style={{ fontWeight: "400", textAlign: "center" }}>
          Use a different keyword. Ignore spaces and special characters
          <br /> Try changing Payment Id and Rechiever.
        </h5>
      </div>
    </div>
  );
}
