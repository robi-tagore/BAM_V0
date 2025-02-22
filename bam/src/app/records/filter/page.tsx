"use client";

import { colorM } from "@/deps/color";
import { useSearchParams } from "next/navigation";
import { RevisedButtonR, RevisedInputJ } from "../../components";
import { DivExt, LoaderM } from "@/app/baseComponents";
import { MaterialSymbol } from "material-symbols";
import { useState, useEffect, createRef } from "react";
import { Filter } from "mongodb";
import {
  _Pull_Request__record,
  _Pull_Response__record,
} from "../api/pull/route";
import { MiniRecord } from "./components";

function RecordTypes({ selectionM }: { selectionM: (e: string[]) => void }) {
  var options: { icon: MaterialSymbol; id: "incoming" | "outgoing" }[] = [
    { icon: "add_business", id: "incoming" },
    { icon: "shopping_cart_checkout", id: "outgoing" },
  ];

  var [currentFocuses, currentFocusesTo] = useState<string[]>([
    "incoming",
    "outgoing",
  ]);
  var [viewPort, viewPortTo] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (typeof selectionM == "function") {
      selectionM(currentFocuses);
    }

    viewPortTo(<></>);
    setTimeout(() => {
      viewPortTo(
        <>
          {options.map(({ icon, id }, i) => (
            <DivExt
              key={i}
              afterClick={() => {
                currentFocusesTo((prev) => {
                  if (prev?.includes(id)) {
                    prev = prev.filter((d) => d != id);
                  } else {
                    prev = [...prev, id];
                  }
                  return prev;
                });
              }}
              style={{
                general: {
                  transitionDuration: "0ms",
                  padding: ".75rem",
                  margin: "0 1rem 0 0 ",
                  outlineStyle: !currentFocuses.includes(id)
                    ? "dashed"
                    : "solid",
                  borderRadius: "8px",
                  cursor: "pointer",
                  outlineWidth: !currentFocuses.includes(id) ? "1px" : "3px",

                  color: !currentFocuses.includes(id)
                    ? colorM("blue-black-10", 0.1)
                    : colorM("green-black-6", 0.5),
                  outlineColor: !currentFocuses.includes(id)
                    ? colorM("blue-black-10", 0.1)
                    : colorM("green-black-6", 0.5),
                },
                hover: {
                  outlineColor: colorM("blue-black-10", 0.25),
                  color: colorM("blue-black-10", 0.25),
                },
                active: {},
              }}
            >
              <span
                style={{
                  transitionDuration: "0ms",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    transitionDuration: "0ms",

                    fontSize: "32px",
                    color: "inherit",
                    background: "transparent",
                  }}
                  className="material-symbols-rounded"
                >
                  {icon}
                </span>
                <h3
                  style={{
                    transitionDuration: "0ms",

                    // marginTop: ".5rem",
                    color: "inherit",
                    background: "transparent",
                  }}
                >
                  {/* {texts[0]} */}
                </h3>
              </span>
            </DivExt>
          ))}
        </>
      );
    }, 1);
  }, [currentFocuses]);

  return <div style={{ width: "100%", display: "flex" }}>{viewPort}</div>;
}

export default function filterRecordPage() {
  var searchParams = useSearchParams();
  var permittedActions = [
    searchParams.get("delete") ? "delete" : "",
    searchParams.get("edit") ? "edit" : "",
  ];

  var inputsDiv = createRef<HTMLDivElement>();
  var [update, nowUpdate] = useState<number>(0);
  var [keyword, keywordTo] = useState<{
    recordId: string;
    customerId: string;
    productName: string;
    upDate: Date;
    downDate: Date;
    recordTypes: string;
  }>();

  var [recordTypesList, recordTypesListTo] = useState<string[]>([]);
  var [resultsDiv, resultsDivTo] = useState<JSX.Element>(<></>);
  var [results, resultsTo] = useState<Partial<record>[]>();

  useEffect(() => {
    if (inputsDiv.current) {
      inputsDiv.current.querySelectorAll("input").forEach((inp) => {
        inp.addEventListener("keyup", (e) => {
          nowUpdate((prev) => prev + 1);
        });
      });
    }
  }, []);

  useEffect(() => {
    var inpVals: string[] = [];

    inputsDiv.current?.querySelectorAll("input").forEach((inp) => {
      inpVals.push(inp.value);
    });

    var recordId = inpVals[0];
    var productName = inpVals[1];
    var customerId = inpVals[2];

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

    var recordTypesBase = recordTypesList;

    var recordTypes =
      recordTypesBase.includes("incoming") &&
      recordTypesBase.includes("outgoing")
        ? ""
        : recordTypesBase.includes("incoming")
        ? "incoming"
        : "outgoing";

    keywordTo({
      recordId: recordId,
      productName: productName,
      customerId: customerId,
      upDate: upDate,
      downDate: downDate,
      recordTypes: recordTypes,
    });
  }, [update, recordTypesList, recordTypesList.length]);

  useEffect(() => {
    if (!keyword) {
      return;
    }

    resultsDivTo(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          <LoaderM
            HW={["13rem", "100%"]}
            size="38px"
            speed={2000}
            scaleEffect="1.25"
            icons={["partly_cloudy_day", "partly_cloudy_night"]}
          ></LoaderM>
          <LoaderM
            HW={["13rem", "100%"]}
            size="38px"
            speed={1000}
            scaleEffect="1.25"
            icons={["partly_cloudy_day", "partly_cloudy_night"]}
          ></LoaderM>
          <LoaderM
            HW={["13rem", "100%"]}
            size="38px"
            speed={2000}
            scaleEffect="1.25"
            icons={["partly_cloudy_day", "partly_cloudy_night"]}
          ></LoaderM>
        </div>
        <br />
        <h3>Fetching Records</h3>
        <h5>Filtering the query and bringing them</h5>
      </div>
    );

    console.log(keyword);

    var query = {
      $and: [
        keyword?.recordId
          ? {
              $or: [{ id: { $regex: keyword?.recordId } }],
            }
          : {},
        keyword?.customerId
          ? {
              $or: [{ customerId: { $regex: keyword?.customerId } }],
            }
          : {},
        {
          $or: [{ date: { $lte: keyword?.upDate, $gte: keyword?.downDate } }],
        },
        keyword.recordTypes
          ? {
              $or: [{ type: keyword?.recordTypes }],
            }
          : {},
        keyword.productName
          ? {
              $or: [
                { "items.product.name": { $regex: keyword?.productName } },
                { "items.product.model": { $regex: keyword?.productName } },
              ],
            }
          : {},
      ],
    } as Filter<record>;

    console.log(query);

    filterCommentTo(<h3>Filtering Records</h3>)

    fetch("/records/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Record",
        fields: [],
        query: query,
      } as _Pull_Request__record.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__record.core) => {
          if ((d.status = "r")) {
            resultsTo(d.data as Partial<record>[]);
            filterCommentTo(
              <>
                <h3>Found</h3>{" "}
                <h2 style={{ fontFamily: "Product Sans Bold" }}>
                  {d.data.length}
                </h2>
                <h3>&nbsp;Records</h3>
              </>
            );
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

  useEffect(() => {
    console.log(results);

    resultsDivTo(
      <div
        style={{
          display: "grid",
          rowGap: "2rem",
          columnGap: "2rem",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {results?.map((d, i) => (
          <MiniRecord key={i} recordata={d}></MiniRecord>
        ))}
      </div>
    );
  }, [results]);

  var [filterComment, filterCommentTo] = useState<JSX.Element>(<></>);

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
        You can filter Records from desired query using this page. Remember the
        inputs are in and condition. Which means records matching all the datas
        will be included. Its better if you type and filter.{" "}
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
          display: "grid",
          width: "100%",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "3rem",
        }}
        ref={inputsDiv}
      >
        <div>
          <h3>Record Id</h3>
          <br />
          <br />
          <RevisedInputJ
            HWFs={["2rem", "10rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text={`Record Id`}
            generalColor={colorM("green-black-10", 0.3)}
            icon="id_card"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
            // defaultsTo={recordId}
          ></RevisedInputJ>
          <br />
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text="Products"
            generalColor={colorM("green-black-10", 0.3)}
            icon="garden_cart"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
            // defaultsTo={
            //   recordData?.date
            //     ? String(new Date(recordData?.date)?.getHours()) + ":" +
            //       String(new Date(recordData?.date)?.getMinutes())
            //     : String(new Date().getHours()) +
            //       ":" +
            //       String(new Date().getMinutes())
            // }
          ></RevisedInputJ>
          <br />
          <RevisedInputJ
            HWFs={["2rem", "16rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.25)}
            text="Customers"
            generalColor={colorM("green-black-10", 0.3)}
            icon="person_search"
            inpTracker={(inp) => {
              // recordIdInp.current = inp;
            }}
            // defaultsTo={
            //   recordData?.date
            //     ? String(new Date(recordData?.date)?.getHours()) + ":" +
            //       String(new Date(recordData?.date)?.getMinutes())
            //     : String(new Date().getHours()) +
            //       ":" +
            //       String(new Date().getMinutes())
            // }
          ></RevisedInputJ>
        </div>

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

        <div>
          <h3>Record Type</h3>
          <br />
          <br />
          <RecordTypes
            selectionM={(v) => {
              recordTypesListTo(v);
            }}
          ></RecordTypes>
        </div>
      </div>
      <br />
      <hr
        style={{
          height: "1px",
          border: "none",
          background: colorM("blue-black-10", 0.2),
        }}
      />
      <br />
      <div>{filterComment}</div>
      <br />
      <br />

      <div
        style={{
          width: "100%",
          padding: "5rem 0",
          display: results?.length == 0 ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <br />
        <br />
        <br />
        <span style={{ fontSize: "64px" }} className="material-symbols-rounded">
          {"blur_off" as MaterialSymbol}
        </span>
        <br />
        <h3>No Results were Found !</h3>
        <div style={{ height: ".25rem" }}></div>
        <h5 style={{ fontWeight: "500", textAlign: "center" }}>
          Use a different keyword. Ignore spaces and special characters
          <br /> Try changing categories and brands.
        </h5>
      </div>

      <div
        style={{
          display: results?.length != 0 ? "block" : "none",
        }}
      >
        {resultsDiv}
      </div>
    </div>
  );
}
