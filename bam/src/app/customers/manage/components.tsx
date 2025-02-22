import { LoaderM } from "@/app/baseComponents";
import {
  RevisedButtonM,
  RevisedButtonR,
  RevisedInputJ,
} from "@/app/components";
import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { Filter } from "mongodb";
import {
  _Push_Request__Customer,
  _Push_Response__Customer,
} from "../api/push/route";
import { useRouter } from "next/navigation";
import { IconAndData } from "../components";

export function GeneralFields({
  onDone,
  customerData,
}: {
  onDone: (e: { first?: string; last?: string; surname?: string }) => void;
  customerData?: Partial<Customer>;
}) {
  var firstInp = useRef<HTMLInputElement | null>();
  var lastInp = useRef<HTMLInputElement | null>();
  var surInp = useRef<HTMLInputElement | null>();

  var [output, outputTo] = useState<{
    first?: string;
    last?: string;
    surname?: string;
  }>();

  useEffect(() => {
    firstInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({ ...prev, first: firstInp.current?.value! }));
    });
    lastInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({ ...prev, last: lastInp.current?.value! }));
    });
    surInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({ ...prev, surname: surInp.current?.value! }));
    });
  }, []);

  useEffect(() => {
    if (output) {
      onDone(output);
    }
  }, [output]);

  return (
    <div
      //   className="mshadow"
      style={{
        height: "fit-content",
        // padding: "3rem 2rem",
        borderRadius: "13px",
        width: "calc(100% - 0rem)",
        // background: colorM("red-white-10"),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
            {"list_alt" as MaterialSymbol}
          </span>
          &nbsp;
          <h3 style={{ fontFamily: "Product Sans Regular" }}>General Fields</h3>
        </div>
      </div>

      <br />
      <h5>
        This field includes general infos, specially the identitcal qualities of
        a customer. Each field is required. Fill each of the Fields then, view
        them in the sidebar of the right. If everything seems right click
        confirm.
      </h5>
      <br />
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "11rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="text_ad"
            defaultsTo={customerData?.name?.first}
            inpTracker={(i) => {
              firstInp.current = i;
            }}
            text="First Name"
          ></RevisedInputJ>
        </div>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "11rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="text_ad"
            defaultsTo={customerData?.name?.last}
            inpTracker={(i) => {
              lastInp.current = i;
            }}
            text="Last Name"
          ></RevisedInputJ>
        </div>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "17rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="text_ad"
            defaultsTo={customerData?.name?.surname}
            inpTracker={(i) => {
              surInp.current = i;
            }}
            text="Surname"
          ></RevisedInputJ>
        </div>
      </div>
    </div>
  );
}

export function PhysicalAddress({
  onDone,
  customerData,
}: {
  onDone: (e: string[]) => void;
  customerData?: Partial<Customer>;
}) {
  var [addressDiv, addressDivTo] = useState<JSX.Element>();

  var [addresses, addressesTo] = useState<string[]>(
    customerData?.physicalIdentity ?? new Array(1).fill("address line 0")
  );

  useLayoutEffect(() => {
    addressDivTo(
      <>
        {addresses.map((d, i) => {
          return (
            <div key={i} style={{ margin: "1rem 1rem 0 0" }}>
              <RevisedInputJ
                HWFs={["2rem", "10rem", "12px"]}
                color={colorM("blue-black-10", 0.5)}
                focusColor={colorM("green-black-10", 0.7)}
                generalColor={colorM("green-black-10", 0.3)}
                icon="location_on"
                defaultsTo={d}
                inpTracker={(inp) => {
                  // inp?.setAttribute("value", d ?? "");
                  inp?.addEventListener("keyup", (e) => {
                    addressesTo((prev) => {
                      prev[i] = inp.value;
                      return prev;
                    });
                    onDone(addresses);
                  });
                }}
                text={`Line ${i}`}
              ></RevisedInputJ>
            </div>
          );
        })}
      </>
    );
    onDone(addresses);
  }, [addresses.length]);

  return (
    <div
      //   className="mshadow"
      style={{
        // padding: "2rem",
        borderRadius: "13px",
        width: "100%",
        // background: colorM("red-white-10"),
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
            {"location_away" as MaterialSymbol}
          </span>
          &nbsp;
          <h3 style={{ fontFamily: "Product Sans Regular" }}>
            Physical Indentity
          </h3>
        </div>
      </div>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            height: "100%",
          }}
        >
          <br />
          <h5>
            Line 1,2,3 .. n is the depth of your addresses. It is typically,
            city, state, zip. In our scenario. <i>Level 1</i> is Moddhopara,{" "}
            <i>Level 2</i> is Uttar Tiagaccha, <i>Level 3</i> is Bhatgram, Or
            You may use it in your own direction.
          </h5>

          <div style={{ height: "1rem" }}></div>
          <br />
        </div>

        <div
          style={{
            height: "100%",
            // overflow: "auto",
            // padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "fit-content",
          }}
        >
          <div>{addressDiv}</div>
          <h3>
            <br />
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <RevisedButtonR
              radius="7px"
              // spacingX=".25rem"
              HWFs={["1.75rem", "auto", "12px"]}
              sinensisAct={() => {
                addressesTo((prev) => {
                  // prev.push("new line");
                  prev = [...prev, "address line " + prev.length];

                  return prev;
                });
              }}
              palate={[
                colorM("green-black-6", 0.45),
                colorM("green-white-10"),
                colorM("green-black-0", 0.1),
              ]}
              // icon="add_location_alt"
              text="Add Line"
            ></RevisedButtonR>
            &nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              // spacingX=".25rem"
              HWFs={["1.75rem", "auto", "12px"]}
              sinensisAct={() => {
                addressesTo((prev) => {
                  prev = prev.filter((d, i) => i != prev.length - 1);

                  return prev;
                });
              }}
              palate={[
                colorM("red-white-10"),

                colorM("red-black-6", 0.45),
                colorM("red-black-0", 0.1),
              ]}
              // icon="auto_delete"
              text="Remove Line"
            ></RevisedButtonR>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VirtualAddress({
  onDone,
  customerData,
}: {
  onDone: (e: {
    phoneNumber?: string;
    emergencyNumber?: string;
    email?: string;
  }) => void;
  customerData?: Partial<Customer>;
}) {
  var phoneInp = useRef<HTMLInputElement | null>();
  var phoneEmInp = useRef<HTMLInputElement | null>();
  var emailInp = useRef<HTMLInputElement | null>();

  var [output, outputTo] = useState<{
    phoneNumber?: string;
    emergencyNumber?: string;
    email?: string;
  }>();

  useEffect(() => {
    phoneInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({ ...prev, phoneNumber: phoneInp.current?.value! }));
    });
    phoneEmInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({
        ...prev,
        emergencyNumber: phoneEmInp.current?.value!,
      }));
    });
    emailInp.current?.addEventListener("keyup", (e) => {
      outputTo((prev) => ({ ...prev, email: emailInp.current?.value! }));
    });
  }, []);

  useEffect(() => {
    if (output) {
      onDone(output);
    }
  }, [output]);

  return (
    <div
      //   className="mshadow"
      style={{
        height: "fit-content",
        // padding: "3rem 2rem",
        borderRadius: "13px",
        width: "calc(100% - 0rem)",
        // background: colorM("red-white-10"),
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
          {"cloud" as MaterialSymbol}
        </span>
        &nbsp;
        <h3 style={{ fontFamily: "Product Sans Regular" }}>Virtual Address</h3>
      </div>
      <br />
      <h5>
        These are the addreses that will require you to contact the customer
        virtually. Be carefull to add. Cause these are the main fields that you
        will use to contact.
      </h5>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "11rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="call"
            defaultsTo={customerData?.virtualIdentity?.phoneNumber}
            inpTracker={(i) => {
              phoneInp.current = i;
            }}
            text="Phone Number"
          ></RevisedInputJ>
        </div>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "11rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="call_quality"
            defaultsTo={customerData?.virtualIdentity?.emergencyNumber}
            inpTracker={(i) => {
              phoneEmInp.current = i;
            }}
            text="Emergency Number"
          ></RevisedInputJ>
        </div>
        <div style={{ margin: "1rem 1rem 0 0" }}>
          <RevisedInputJ
            HWFs={["2rem", "18rem", "12px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.7)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="mark_email_read"
            defaultsTo={customerData?.virtualIdentity?.email}
            inpTracker={(i) => {
              emailInp.current = i;
            }}
            text="Email"
          ></RevisedInputJ>
        </div>
      </div>
      <br />
    </div>
  );
}

export function UploadToDatabase({
  customerData,
  oldId,
}: {
  customerData: Customer;
  oldId?: string;
}) {
  var [flexibleDiv, flexibleDivTo] = useState<JSX.Element>();
  var router = useRouter();

  function handleSumbitOfData() {
    var error: boolean = false;

    if (!customerData) {
      error = true;
    } else if (
      !customerData.name ||
      !customerData.physicalIdentity ||
      !customerData.virtualIdentity
    ) {
      error = true;
    } else if (
      !customerData.name.first ||
      customerData.name.first.replaceAll(" ", "") == "" ||
      !customerData.name.last ||
      customerData.name.last.replaceAll(" ", "") == "" ||
      !customerData.name.surname ||
      customerData.name.surname.replaceAll(" ", "") == "" ||
      customerData.physicalIdentity.length < 3 ||
      !customerData.virtualIdentity.email ||
      customerData.virtualIdentity.email == "" ||
      !customerData.virtualIdentity.phoneNumber ||
      customerData.virtualIdentity.phoneNumber == "" ||
      !customerData.virtualIdentity.emergencyNumber ||
      customerData.virtualIdentity.emergencyNumber == ""
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

          <h3>Fields Are Missing ! </h3>
          <h5 style={{ textAlign: "center", width: "250px" }}>
            There may be an error. Please Provide all fields before trying
            again.
          </h5>
        </div>
      );
    } else {
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

          <h3>Uploading Data </h3>
          <h5 style={{ textAlign: "center", width: "250px" }}>
            All Data of Customer is being pushed to Database. Wait for
            confirmation.
          </h5>
        </div>
      );

      fetch("/customers/api/push", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          collection: "Customer",
          data: customerData,
          oldId: oldId,
        } as _Push_Request__Customer.core),
      }).then(
        async (d) => {
          var came: _Push_Response__Customer.core = await d.json();
          console.log("FJRM", came);

          if (came.status == "r") {
            flexibleDivTo(
              <div style={{ width: "100%" }}>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{ fontSize: "32px" }}
                    className="material-symbols-rounded"
                  >
                    {"bookmark_check" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3>Customer Was Included</h3>
                </div>
                <br />
                <h5>
                  The Customer was successfully included in database. No error
                  was encoured while performing the action. Programmatic
                  variables are as follows,
                </h5>
                <br /> <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
                    {"terminal" as MaterialSymbol}
                  </span>
                  <br />
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Regular" }}>
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
                      router.push("/customers");
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
                      router.push("/customers/manage/action=add");
                      router.refresh();
                    }}
                    HWFs={["1.75rem", "auto", "12px"]}
                    palate={[
                      colorM("green-black-6", 0.4),

                      colorM("green-white-10"),

                      colorM("green-black-0", 0.1),
                    ]}
                    icon="person_add"
                    text="Add One"
                    // reverse={true}
                    radius="100px"
                    spacingX=".75rem"
                  ></RevisedButtonR>
                </div>
              </div>
            );
          } else if (came.status == "m") {
            // processEndedTo(false)
            flexibleDivTo(
              <div>
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{ fontSize: "32px" }}
                    className="material-symbols-rounded"
                  >
                    {"priority_high" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Regular" }}>
                    An Error Was Occured
                  </h3>
                </div>
                <br />
                <h5>
                  Customer was'nt Included. An error was occured while running
                  the process. It may be the network issue, else there might be
                  something else. Try understanding the error from the below, or
                  contact the developer.
                </h5>
                <br /> <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
                    {"terminal" as MaterialSymbol}
                  </span>
                  <br />
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Regular" }}>
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

  return (
    <div
      className="mshadow"
      style={{
        width: "calc(100% - 4rem)",
        padding: "2rem",
        margin: "0 0 2rem  0",
        borderRadius: "13px",
        background: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="material-symbols-rounded" style={{fontSize:'32px',fontWeight:'300'}}>
          {"done_all" as MaterialSymbol}
        </span>
        &nbsp;
        <h3>Confirmation</h3>
      </div>
      <br />
      <h5>
        If you are sure about the data inserted before. Click the button below
        to include changes in the database. Be sure to include all fields in the
        form. If any data seems missing the process will proceed anyway. But
        it's not recomanded.
      </h5>
      <br />
      <br />

      <br />
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
      {flexibleDiv}
    </div>
  );
}

export function UniqueIdValidation({
  success,
  oldId,
}: {
  success: (validId: string) => void;
  oldId?: string;
}) {
  var [dynamicCont, dynamicContTo] = useState<JSX.Element>(
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
        padding: "2rem 0",
        borderRadius: "13px",
      }}
      className="mshadow"
    >
      <LoaderM
        icons={["keyboard", "keyboard_external_input"]}
        HW={["13rem", "auto"]}
        size="48px"
        speed={1000}
      ></LoaderM>
      <h3>Type and Validate</h3>
      <h5>Type to validate the uniqueness of the Identity.</h5>
    </div>
  );

  var [isValid, isValidTo] = useState<boolean>();
  var [keyword, keywordTo] = useState<string>();

  var idInp = useRef<HTMLInputElement | null>();
  useEffect(() => {
    if (!keyword) {
      return;
    }

    isValidTo(undefined);

    dynamicContTo(
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          padding: "2rem 0",
          borderRadius: "13px",
        }}
        className="mshadow"
      >
        <LoaderM
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
          HW={["13rem", "auto"]}
          size="48px"
          speed={750}
        ></LoaderM>
        <h3 style={{ fontFamily: "Product Sans Regular" }}>Veryfiying</h3>
        <h5>Wait for the verification process to end.</h5>
      </div>
    );

    fetch("/customers/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Customer",
        fields: ["uniqueIdentity"],
        query: { uniqueIdentity: keyword } as Filter<Customer>,
      } as _Pull_Request__Customer.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Customer.core) => {
          if ((d.status = "r")) {
            isValidTo(d.data.filter((id) => id != oldId).length == 0);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, [keyword]);

  useEffect(() => {
    if (isValid == undefined) {
      return;
    }
    if (isValid) {
      dynamicContTo(
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "white",
            padding: "2rem 0",
            borderRadius: "13px",
          }}
          className="mshadow"
        >
          <LoaderM
            icons={["celebration", "data_check"]}
            HW={["13rem", "auto"]}
            size="48px"
            speed={1000}
          ></LoaderM>
          <h3 style={{ fontFamily: "Product Sans Regular" }}>Valid</h3>
          <h5>The Id is unique. Use it.</h5>
        </div>
      );
    } else {
      dynamicContTo(
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "white",
            padding: "2rem 0",
            borderRadius: "13px",
          }}
          className="mshadow"
        >
          <LoaderM
            icons={["sentiment_dissatisfied", "thumb_down"]}
            HW={["13rem", "auto"]}
            size="48px"
            speed={1000}
          ></LoaderM>
          <h3 style={{ fontFamily: "Product Sans Regular" }}>Oops !</h3>
          <h5>The Id is not unique. Try another one</h5>
        </div>
      );
    }
  }, [isValid]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: "calc(450px - 4rem)",
          padding: "2rem",
          borderRadius: "13px",
          background: "white",
        }}
        className="mshadow cy"
      >
        <div
          style={{
            height: "fit-content",
            borderRadius: "13px",
            width: "calc(100% - 0rem)",
          }}
        >
          <IconAndData
            data={
              <h3 style={{ fontFamily: "Product Sans Regular" }}>
                Unique Identity
              </h3>
            }
            icon="id_card"
            size="32px"
            weightM="200"
          ></IconAndData>

          <br />
          <h5>
            This is the Unique Identity of the Customer. This typically should
            be a number but string can also be used. You may use it as Customer
            Number, or as Customer Identity. It is the one unique field a
            customer will have.
          </h5>
          <br />
          <br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <RevisedInputJ
              HWFs={["2rem", "auto", "12px"]}
              color={colorM("blue-black-10", 0.5)}
              focusColor={colorM("green-black-10", 0.7)}
              generalColor={colorM("green-black-10", 0.3)}
              icon="id_card"
              inpTracker={(i) => {
                idInp.current = i;
                i?.addEventListener("keyup", () => {
                  keywordTo(i?.value);
                });
              }}
              text="Unique Identity"
            ></RevisedInputJ>
            &nbsp;&nbsp;&nbsp;
            <RevisedButtonR
              radius="7px"
              // spacingX=".25rem"
              HWFs={["2rem", "auto", "14px"]}
              sinensisAct={() => {
                // keywordTo(idInp.current?.value)
                if (isValid) {
                  success(idInp.current?.value!);
                }
              }}
              palate={[
                colorM("green-black-6", 0.45),
                colorM("green-white-10"),
                colorM("green-black-0", 0.1),
              ]}
              // icon="add_location_alt"
              text="Finalize"
            ></RevisedButtonR>
          </div>
        </div>
      </div>

      <div style={{ width: "350px" }}>{dynamicCont}</div>
    </div>
  );
}
