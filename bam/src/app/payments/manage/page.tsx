"use client";

import { LoaderM } from "@/app/baseComponents";
import {
  RevisedButtonM,
  RevisedButtonR,
  RevisedInputJ,
} from "@/app/components";
import {
  _Push_Request__record,
  _Push_Response__record,
} from "@/app/records/api/push/route";
import { colorM } from "@/deps/color";
import { layout } from "@/deps/constants";
import { _collection } from "@/mTypes/databases";
import { MaterialSymbol } from "material-symbols";
import { useRouter, useSearchParams } from "next/navigation";
import { createRef, useEffect, useRef, useState } from "react";
import {
  _Push_Request__Payment,
  _Push_Response__Payment,
} from "../api/push/route";
import { Filter } from "mongodb";
import {
  _Pull_Request__Payment,
  _Pull_Response__Payment,
} from "../api/pull/route";
import { cookieM } from "@/deps/_functions";

function uniqueId() {
  return Date.now().toString() + Math.round(Math.random() * 1000).toString();
}


function UploadToDatabase({
  paymentData,
  oldId,
}: {
  paymentData?: Partial<payment>;
  oldId?: string;
}) {
  var router = useRouter();
  var [flexibleDiv, flexibleDivTo] = useState<JSX.Element>();

  function handleSumbitOfData() {
    var error: boolean = false;

    if (!paymentData) {
      error = true;
    } else if (
      !paymentData.recordId ||
      !paymentData.amount ||
      !paymentData.date ||
      !paymentData.id ||
      !paymentData.rechiever
    ) {
      error = true;
    }

    if (error) {
      flexibleDivTo(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <br />
          <br />
          <hr
            style={{
              height: "1px",
              border: "none",
              width: "100%",
              background: colorM("blue-black-10", 0.2),
            }}
          />
          <br />
          <br />
          <LoaderM
            HW={["13rem", "100%"]}
            size="48px"
            speed={1000}
            icons={["priority_high", "format_list_bulleted"]}
          ></LoaderM>
          <br />

          <h3 style={{ textAlign: "center" }}>Oops ! </h3>
          <h5 style={{ textAlign: "center" }}>
            Not All Fiels were provided Correctly <br />
            Please Fix the errors before trying again.
          </h5>
        </div>
      );
    } else {
      buttonContainerVisibilityTo(false);
      flexibleDivTo(
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <br />
          <br />
          <hr
            style={{
              height: "1px",
              border: "none",
              width: "100%",
              background: colorM("blue-black-10", 0.2),
            }}
          />
          <br />
          <br />
          <LoaderM
            HW={["13rem", "100%"]}
            size="48px"
            speed={1000}
            icons={["cloud", "flight"]}
          ></LoaderM>
          <br />

          <h3 style={{ textAlign: "center" }}>Uploading Data </h3>
          <h5 style={{ textAlign: "center" }}>
            All Payment Data is being pushed to Database. <br />
            Wait for confirmation.
          </h5>
        </div>
      );

      fetch("/payments/api/push", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          collection: "Payment" as _collection,
          data: paymentData,
          oldId: oldId,
        } as _Push_Request__Payment.core),
      }).then(
        async (d) => {
          var came: _Push_Response__Payment.core = await d.json();
          console.log("FJRM", came);

          if (came.status == "r") {
            flexibleDivTo(
              <div style={{ width: "100%" }}>
                <hr
                  style={{
                    height: "1px",
                    border: "none",
                    background: colorM("blue-black-10", 0.2),
                  }}
                />
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{ fontSize: "32px" }}
                    className="material-symbols-rounded"
                  >
                    {"bookmark_check" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    Payment Was Included
                  </h3>
                </div>
                <br />
                <h5>
                  The Payment was successfully included in database. Either
                  Updated or Inserted. No error was encoured while performing
                  the action. Programmatic variables are as follows,
                </h5>
                <br /> <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="material-symbols-rounded">
                    {"terminal" as MaterialSymbol}
                  </span>
                  <br />
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    Programmactic Details
                  </h3>
                </div>
                <h5>ObjectId : </h5>
                <h6
                  style={{
                    fontFamily: "Product Sans Bold",
                  }}
                >
                  &nbsp;&nbsp;{String(came.data[0])}
                </h6>
                <br />
                <h5>InsertId : </h5>
                <h6
                  style={{
                    fontFamily: "Product Sans Bold",
                  }}
                >
                  &nbsp;&nbsp;{String(came.data[1])}
                </h6>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                  }}
                >
                  <RevisedButtonR
                    sinensisAct={() => {
                      router.push("/payments");
                    }}
                    HWFs={["1.75rem", "auto", "12px"]}
                    palate={[
                      colorM("green-white-10"),

                      colorM("green-black-6", 0.4),
                      colorM("green-black-0", 0.1),
                    ]}
                    icon="open_in_browser"
                    text="Leave"
                    // reverse={true}
                    radius="100px"
                    spacingX=".75rem"
                  ></RevisedButtonR>
                  &nbsp;
                  <RevisedButtonR
                    sinensisAct={() => {
                      router.push("/payments/manage");
                      router.refresh();
                    }}
                    HWFs={["1.75rem", "auto", "12px"]}
                    palate={[
                      colorM("green-black-6", 0.4),

                      colorM("green-white-10"),

                      colorM("green-black-0", 0.1),
                    ]}
                    icon="attach_money"
                    text="Add One"
                    // reverse={true}
                    radius="100px"
                    spacingX=".75rem"
                  ></RevisedButtonR>
                </div>
              </div>
            );
          } else if (came.status == "m") {
            buttonContainerVisibilityTo(true);
            flexibleDivTo(
              <div>
                <hr
                  style={{
                    height: "1px",
                    border: "none",
                    background: colorM("blue-black-10", 0.2),
                  }}
                />
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{ fontSize: "32px" }}
                    className="material-symbols-rounded"
                  >
                    {"priority_high" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    An Error Was Occured
                  </h3>
                </div>
                <br />
                <h5>
                  Payment was'nt Included. An error was occured while running
                  the process. It may be the network issue, else there might be
                  something else. Try understanding the error from the below, or
                  contact the developer.
                </h5>
                <br /> <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="material-symbols-rounded">
                    {"terminal" as MaterialSymbol}
                  </span>
                  <br />
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    Programmactic Details
                  </h3>
                </div>
                <h5>Error </h5>
                <h6
                  style={{
                    fontFamily: "Product Sans Bold",
                  }}
                >
                  &nbsp;&nbsp;{came.data.fame}
                </h6>
                <br />
                <br />
                <br />
                <RevisedButtonR
                  HWFs={["1.75rem", "auto", "12px"]}
                  sinensisAct={() => {
                    router.refresh();
                  }}
                  palate={[
                    colorM("red-white-10"),
                    colorM("red-black-2"),
                    colorM("red-black-5", 0.1),
                  ]}
                  icon="refresh"
                  text="Try Again"
                ></RevisedButtonR>
              </div>
            );
          }
        },
        () => {}
      );
    }
  }

  var [buttonContainerVisibility, buttonContainerVisibilityTo] =
    useState<boolean>(true);
  return (
    <div>
      <div style={{ display: buttonContainerVisibility ? "block" : "none" }}>
        <RevisedButtonR
          radius="7px"
          // spacingX=".25rem"
          HWFs={["2.25rem", "auto", "14px"]}
          sinensisAct={handleSumbitOfData}
          palate={[
            colorM("green-black-2", 0.7),
            colorM("green-white-10"),
            colorM("green-black-0", 0.1),
          ]}
          icon="commit"
          text="Commit Changes"
        ></RevisedButtonR>
      </div>
      {flexibleDiv}
    </div>
  );
}

export default function ManagePayment() {
  var searchParams = useSearchParams();
  var dateAndTimeDataPortion = createRef<HTMLDivElement>();

  var recordRef = searchParams.get("recordref");
  var edit = searchParams.get("edit") == null ? false : true;
  var paymentId =
    searchParams.get("paymentid") == null
      ? undefined
      : searchParams.get("paymentid");

  var [paymentData, paymentDataTo] = useState<Partial<payment>>();
  var [showFetchingLoader, showFetchingLoaderTo] = useState<boolean>(edit);

  var [rechieverInputDiv, rechieverInputDivTo] = useState<JSX.Element>();

  var route = useRouter();

  useEffect(() => {
    const userCookie = cookieM(document?.cookie);
    if (userCookie.username == "" || !userCookie.username) {
      route.replace("/privilage");
    } else {
      rechieverInputDivTo(
        <div>
          <h5 style={{ fontFamily: "Product Sans Bold" }}>Rechiever</h5>
          <div style={{ height: ".75rem" }}></div>

          <RevisedInputJ
            HWFs={["2rem", "17rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.6)}
            text="Rechiever"
            generalColor={colorM("green-black-10", 0.25)}
            icon="person_alert"
            inpTracker={(inp) => {
              rechieverInp.current = inp;
            }}
            defaultsTo={userCookie.username}
          ></RevisedInputJ>
        </div>
      );
    }
  }, []);

  var [update, nowUpdate] = useState<number>(0);

  var [finalPaymentData, finalPaymentDataTo] = useState<{
    id?: string;
    amount?: string;
    recordId?: string;
    rechiever?: string;
    date?: Date;
  }>();

  var paymentIdInp = useRef<HTMLInputElement | null>();
  var moneyInp = useRef<HTMLInputElement | null>();
  var rechieverInp = useRef<HTMLInputElement | null>();
  var recordInp = useRef<HTMLInputElement | null>();

  var [dayInp, monthInp, yearInp, timeInp] = [
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
  ];

  var [existanceStatus, existanceStatusTo] = useState<
    boolean | "not exists" | "exists"
  >();

  useEffect(() => {
    document.querySelectorAll("input").forEach((i) => {
      i.addEventListener("keyup", () => {
        nowUpdate((prev) => prev + 1);
      });
    });
  }, []);

  useEffect(() => {
    if (paymentData?.id) {
      finalPaymentDataTo(paymentData);

      var nativeDate = new Date(paymentData.date!);
      paymentIdInp.current?.setAttribute("value", paymentData.id);
      moneyInp.current?.setAttribute("value", paymentData.amount!);
      rechieverInp.current?.setAttribute("value", paymentData.rechiever!);
      recordInp.current?.setAttribute("value", paymentData.recordId!);

      dayInp.current?.setAttribute("value", String(nativeDate.getDate()));
      monthInp.current?.setAttribute(
        "value",
        String(nativeDate.getMonth() + 1)
      );
      yearInp.current?.setAttribute("value", String(nativeDate.getFullYear()));
      timeInp.current?.setAttribute(
        "value",
        String(nativeDate.getHours()) + ":" + String(nativeDate.getMinutes())
      );
    }
  }, [paymentData]);

  useEffect(() => {
    var day: number = Number(dayInp.current?.value);
    var month: number = Number(monthInp.current?.value);
    var year: number = Number(yearInp.current?.value);

    var time: string = timeInp.current?.value!;

    var hours: number = Number(time.split(":")[0]);
    var minutes: number = Number(time.split(":")[1]);

    var jsDate = new Date(year, month - 1, day, hours, minutes);

    finalPaymentDataTo((prev) => ({
      ...prev,
      id: paymentIdInp.current?.value,
      amount: moneyInp.current?.value,
      recordId: recordInp.current?.value,
      rechiever: rechieverInp.current?.value,
      date: jsDate,
    }));
  }, [update]);

  useEffect(() => {
    if (!edit || !paymentId) return;
    fetch("/payments/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Payment",
        fields: [],
        query: { id: paymentId } as Filter<payment>,
      } as _Pull_Request__Payment.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Payment.core) => {
          if ((d.status = "r")) {
            paymentDataTo(d.data[0] as Partial<payment>);
            showFetchingLoaderTo(false);
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
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display:
            !showFetchingLoader &&
            ((paymentId && edit) || recordRef) &&
            existanceStatus != "not exists"
              ? "block"
              : "none",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: layout.availableSpace,
          }}
        >
          <br />
          <br />
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              // alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "4rem 3rem",
                minWidth: "calc(300px - 6rem)",
                height: "fit-content",
                background: "white",
                borderRadius: "13px",
              }}
              className="mshadow"
            >
              <h3>Automated Fields</h3>
              <div style={{ height: ".75rem" }}></div>
              <h5 style={{ width: "400px" }}>
                These fields are automatically generated by the browser. You may
                not need to put hands in this section, unless you are editing
                it. You may skip this section.
              </h5>
              <br />
              <br />

              <div>
                <h5 style={{ fontFamily: "Product Sans Bold" }}>
                  Record Referance
                </h5>
                <div style={{ height: ".75rem" }}></div>
                <RevisedInputJ
                  HWFs={["2rem", "13rem", "12px"]}
                  color={"blue-black-10"}
                  focusColor={colorM("green-black-10", 0.6)}
                  text="Record Id"
                  generalColor={colorM("green-black-10", 0.25)}
                  icon="text_fields_alt"
                  inpTracker={(inp) => {
                    recordInp.current = inp;
                  }}
                  defaultsTo={recordRef == null ? undefined : recordRef}
                ></RevisedInputJ>
              </div>

              <br />

              <div>
                <h5 style={{ fontFamily: "Product Sans Bold" }}>
                  Date and Time
                </h5>
                <div style={{ height: ".75rem" }}></div>

                <div>
                  <div style={{ display: "flex" }}>
                    <RevisedInputJ
                      HWFs={["2rem", "9rem", "12px"]}
                      color={"blue-black-10"}
                      focusColor={colorM("green-black-10", 0.25)}
                      text="Day"
                      generalColor={colorM("green-black-10", 0.3)}
                      icon="calendar_today"
                      inpTracker={(inp) => {
                        dayInp.current = inp;
                      }}
                      defaultsTo={new Date().getDate().toString()}
                    ></RevisedInputJ>
                    &nbsp;&nbsp;
                    <RevisedInputJ
                      HWFs={["2rem", "9rem", "12px"]}
                      color={"blue-black-10"}
                      focusColor={colorM("green-black-10", 0.25)}
                      text="Month"
                      generalColor={colorM("green-black-10", 0.3)}
                      icon="calendar_month"
                      inpTracker={(inp) => {
                        monthInp.current = inp;
                      }}
                      defaultsTo={(new Date().getMonth() + 1).toString()}
                    ></RevisedInputJ>
                    &nbsp;&nbsp;
                    <RevisedInputJ
                      HWFs={["2rem", "9rem", "12px"]}
                      color={"blue-black-10"}
                      focusColor={colorM("green-black-10", 0.25)}
                      text="Year"
                      generalColor={colorM("green-black-10", 0.3)}
                      icon="view_week"
                      inpTracker={(inp) => {
                        yearInp.current = inp;
                      }}
                      defaultsTo={new Date().getFullYear().toString()}
                    ></RevisedInputJ>
                    &nbsp;&nbsp;
                  </div>
                  <br />
                  <RevisedInputJ
                    HWFs={["2rem", "9rem", "12px"]}
                    color={"blue-black-10"}
                    focusColor={colorM("green-black-10", 0.25)}
                    text="Time"
                    generalColor={colorM("green-black-10", 0.3)}
                    icon="watch"
                    inpTracker={(inp) => {
                      timeInp.current = inp;
                    }}
                    defaultsTo={
                      String(new Date().getHours()) +
                      ":" +
                      String(new Date().getMinutes())
                    }
                  ></RevisedInputJ>
                </div>
              </div>

              <br />

              <div>
                {" "}
                <h5 style={{ fontFamily: "Product Sans Bold" }}>Payment Id</h5>
                <div style={{ height: ".75rem" }}></div>
                <div style={{ display: "flex" }}>
                  <RevisedInputJ
                    HWFs={["2rem", "13rem", "12px"]}
                    color={"blue-black-10"}
                    focusColor={colorM("green-black-10", 0.25)}
                    text={`Payment Id`}
                    generalColor={colorM("green-black-10", 0.3)}
                    icon="id_card"
                    inpTracker={(inp) => {
                      paymentIdInp.current = inp;
                    }}
                    defaultsTo={paymentId ?? paymentData?.id ?? uniqueId()}
                  ></RevisedInputJ>
                  &nbsp;
                  <RevisedButtonR
                    HWFs={["2rem", "auto", "12px"]}
                    radius="7px"
                    sinensisAct={() => {
                      paymentIdInp.current?.setAttribute("value", uniqueId());
                      // recordIdTo("1234567890");
                    }}
                    palate={[
                      colorM("green-black-6", 0.4),
                      colorM("green-white-10"),
                      colorM("green-black-0", 0.1),
                    ]}
                    icon="build"
                    text="Generate New"
                  ></RevisedButtonR>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "4rem 3rem",
                width: "calc(400px - 6rem)",
                height: "fit-content",
                background: "white",
                borderRadius: "13px",
                marginBottom: "3rem",
              }}
              className="mshadow"
            >
              <h3>Mannual Fields</h3>
              <div style={{ height: ".75rem" }}></div>
              <h5 style={{ fontWeight: "400" }}>
                Put these fields very carefully. These are sensetive datas.
                Specially the payment filed should be handled carefully.
              </h5>
              <br />
              <br />
              <div>
                <h5 style={{ fontFamily: "Product Sans Bold" }}>Money Added</h5>
                <div style={{ height: ".75rem" }}></div>
                <RevisedInputJ
                  HWFs={["2rem", "17rem", "12px"]}
                  color={"blue-black-10"}
                  focusColor={colorM("green-black-10", 0.6)}
                  text="Amount Of Money"
                  generalColor={colorM("green-black-10", 0.25)}
                  icon="money"
                  inpTracker={(inp) => {
                    moneyInp.current = inp;
                  }}
                  defaultsTo={paymentData?.amount}
                ></RevisedInputJ>
                <br />
                {rechieverInputDiv}

                <br />
                <div>
                  <UploadToDatabase
                    paymentData={finalPaymentData}
                    oldId={paymentId == null ? undefined : paymentId}
                  ></UploadToDatabase>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>

      <div
        style={{
          display:
            (!recordRef && !edit) ||
            (edit && !paymentId) ||
            (!edit && paymentId)
              ? "flex"
              : "none",
          width: "100%",
          height: layout.availableSpace,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["17rem", "auto"]}
          size="64px"
          speed={1000}
          icons={["lock", "back_hand"]}
        ></LoaderM>

        <h2 style={{ fontFamily: "Product Sans Bold" }}>Step Out!</h2>
        <div style={{ height: ".75rem" }}></div>
        <h3>This page can make sensetive changes !</h3>
        {/* <div style={{ height: ".25rem" }}></div> */}

        {!recordRef && !edit && <h3>Nothing said at all in Link</h3>}
        {edit && !paymentId && <h3>Edit Flag Without Payment Id</h3>}
        {!edit && paymentId && <h3>Payment Id Without Edit Flag</h3>}

        <br />
        <h5 style={{ width: "350px", textAlign: "center" }}>
          This page can make sensetive changes in the database, so it is
          unrecommanded to provide datas manually. <br />
          It is strongly recommanded to generate this page from Records Page.
        </h5>
      </div>

      <div
        style={{
          display: showFetchingLoader && paymentId && edit ? "block" : "none",
        }}
      >
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
            scaleEffect="1"
          ></LoaderM>

          <br />
          <h3>Fetching Payment</h3>
          <span>
            <h5>Payment with id &nbsp;</h5>
            <h5 style={{ fontWeight: "900" }}>{paymentId}</h5>
            <h5>&nbsp; is being fetched</h5>
          </span>
        </div>
      </div>

      <div
        style={{
          height: layout.availableSpace,
          width: "100%",
          display: existanceStatus == "not exists" ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["13rem", "13rem"]}
          size="56px"
          speed={1000}
          icons={["blur_off", "priority_high"]}
          scaleEffect="1.13"
        ></LoaderM>

        <h3>Payment was not found</h3>
        <br />

        <h5 style={{ textAlign: "center", width: "250px" }}>
          Payment with that id does'nt exist. It might not have been assigned
          yet, or may have been deleted, or mistyped. Try a different one.
        </h5>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
