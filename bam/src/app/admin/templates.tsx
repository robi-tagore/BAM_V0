import { colorM } from "@/deps/color";
import { Env_M } from "@/envVar";
import { MaterialSymbol } from "material-symbols";
import { RevisedInputJ, RevisedButtonR } from "../components";
import { IconAndData } from "../customers/components";
import { createRef, useRef, useState } from "react";
import { _Push_Request__user, _Push_Response__user } from "./api/push/route";
import { LoaderM } from "../baseComponents";
import { user } from "./user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function EmailAlert() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span
        className="material-symbols-rounded"
        style={{ fontSize: "64px", color: colorM("red-black-1", 1) }}
      >
        {"zone_person_alert" as MaterialSymbol}
      </span>
      <br />
      <h3 style={{}}>Illegal Access Request !</h3>
      <div style={{ height: ".75rem" }}></div>

      <h5 style={{ width: "300px", textAlign: "center" }}>
        This page is only accessable for the administrators who are 1st class
        users. You must log in and the email should have
        <span>
          <h3 style={{ fontFamily: "Product Sans Bold" }}>
            &nbsp;Grade 1&nbsp;
          </h3>
        </span>
      </h5>
    </div>
  );
}

export function RechievePass({ success }: { success: () => void }) {
  var passInp = useRef<HTMLInputElement | null>();

  var [failureDiv, commentDivTo] = useState(<></>);

  return (
    <div
      style={{
        width: "350px",
        height: "fit-content",
        padding: "2rem",
        background: "white",
        borderRadius: "7px",
      }}
      className="mshadow"
    >
      <IconAndData
        data={<h3>Grant Access</h3>}
        icon="lock_person"
        size="32px"
        weightM="300"
      ></IconAndData>

      <div style={{ height: ".75rem" }}></div>
      <h5>
        This is a highly restricted page that requires complex authentication
        for access. This page can make sensitive changes in the database.
      </h5>

      <h5 style={{ fontWeight: "bold" }}>Be carefull to perform changes</h5>

      <br />
      <br />

      <div style={{ display: "flex" }}>
        <RevisedInputJ
          HWFs={["2rem", "16rem", "12px"]}
          color={"blue-black-10"}
          focusColor={colorM("red-black-10", 0.3)}
          text="Complex Pass Code"
          generalColor={colorM("red-black-10", 0.4)}
          icon="glyphs"
          inpTracker={(inp) => {
            passInp.current = inp;
          }}
        ></RevisedInputJ>
        &nbsp;&nbsp;&nbsp;
        <RevisedButtonR
          radius="7px"
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={() => {
            var providedPass = passInp.current?.value;
            if (providedPass == Env_M.ADMINISTRATIVE_PASSWORD) {
              commentDivTo(
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <hr
                      style={{
                        border: "none",
                        background: colorM("blue-black-10", 0.15),
                        height: "1px",
                      }}
                    />
                  </div>
                  <br />
                  <span
                    className="material-symbols-rounded"
                    style={{
                      fontSize: "48px",
                      color: colorM("green-black-2", 1),
                    }}
                  >
                    {"scuba_diving" as MaterialSymbol}
                  </span>
                  <br />
                  <h3 style={{}}>Passcode is Correct</h3>
                  <h5 style={{ width: "300px", textAlign: "center" }}>
                    The passcode you entered seems correct. You will be taken to
                    the right destination. Wait for it.
                  </h5>
                </div>
              );

              setTimeout(() => {
                success();
              }, 1000);
            } else {
              commentDivTo(
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <hr
                      style={{
                        border: "none",
                        background: colorM("blue-black-10", 0.15),
                        height: "1px",
                      }}
                    />
                  </div>
                  <br />
                  <span
                    className="material-symbols-rounded"
                    style={{
                      fontSize: "48px",
                      color: colorM("red-black-1", 1),
                    }}
                  >
                    {"error" as MaterialSymbol}
                  </span>
                  <br />
                  <h3 style={{}}>Incorrect Passcode !</h3>
                  <h5 style={{ width: "300px", textAlign: "center" }}>
                    This passcode seems wrong. Please provide a correct one. If
                    you don't know what the right code inform the developer.
                  </h5>
                </div>
              );
            }
          }}
          palate={[
            colorM("red-black-1", 1),
            colorM("red-white-10"),
            colorM("red-black-0", 0.1),
          ]}
          icon="hiking"
          text="Verify"
        ></RevisedButtonR>
      </div>
      <br />
      {failureDiv}
    </div>
  );
}

function AtLast({
  h3,
  h5,
  icons = ["cloud", "cloudy_snowing"],
  msg,
}: {
  icons: MaterialSymbol[];
  h3: string;
  h5: string;
  msg?: JSX.Element;
}) {
  return (
    <div
      style={{
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <br />
      <div style={{ width: "100%" }}>
        <hr
          style={{
            border: "none",
            background: colorM("blue-black-10", 0.15),
            height: "1px",
          }}
        />
      </div>
      <br />
      <LoaderM
        HW={["7rem", "13rem"]}
        size="32px"
        speed={1000}
        icons={icons}
        scaleEffect="1.13"
      ></LoaderM>

      <h3>{h3}</h3>
      <div style={{ height: ".75px" }}></div>
      <h5 style={{ width: "250px", textAlign: "center" }}>{h5}</h5>
      {msg ? (
        <>
          {msg} <br />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export function MiniUserView({
  data,
  route,
}: {
  data: Partial<user>;
  route: AppRouterInstance;
}) {
  async function handleUserUpdate() {
    operationStatTo(
      <AtLast
        h3="Commiting Changes"
        h5="The changes you have made is being saved to database wait for confirmation."
        icons={["cloud", "cloudy_snowing"]}
      ></AtLast>
    );
    var vals: string[] = [];
    inputsDiv.current
      ?.querySelectorAll("input")
      .forEach((i) => vals.push(i.value));
    var [email, grade, logged, username] = vals;

    var res = await (
      await fetch("/admin/api/push", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          data: {
            email: email,
            grade: grade,
            logged: logged,
            username: username,
          },
        } as _Push_Request__user.core),
      })
    ).json();

    var returned: _Push_Response__user.core = res;
    if (returned.status == "r") {
      operationStatTo(
        <AtLast
          h3="Successfully Saved"
          h5="Progress has been saved to database. Refresh the page to see the changes."
          icons={["data_table", "route"]}
        ></AtLast>
      );

      route.refresh();
    } else {
      operationStatTo(
        <AtLast
          h3="Oops"
          h5="Changes were'nt saved to database for an error. Below the error is written in brief. Try again to commit the changes"
          icons={["data_table", "route"]}
          msg={
            <div>
              <h5>Error Msg : </h5>
              <h5>{returned.data.fame}</h5>
              <br />
              <h5>Err : </h5> <h6>{returned.data.ilub}</h6>
            </div>
          }
        ></AtLast>
      );
    }

    console.log(returned);
  }

  var inputsDiv = createRef<HTMLInputElement>();
  var [operationStat, operationStatTo] = useState(<></>);
  return (
    <div
      style={{
        margin: "0 0 1rem 0",
        padding: "2rem",
        background: "white",
        borderRadius: "13px",
        height: "fit-content",
      }}
      className="mshadow"
    >
      <h3>{data.username}</h3> <br />
      <br />
      <div ref={inputsDiv}>
        {Object.entries(data).map(([key, val], i) => (
          <div key={i} style={{ margin: "0 0 .75rem 0" }}>
            <RevisedInputJ
              HWFs={["2rem", "16rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("red-black-10", 0.3)}
              text={key.toLocaleUpperCase()}
              generalColor={colorM("red-black-10", 0.4)}
              icon={
                (
                  [
                    "mail",
                    "light",
                    "person",
                    "desktop_windows",
                  ] as MaterialSymbol[]
                )[i]
              }
              inpTracker={(inp) => {
                // passInp.current = inp;
              }}
              defaultsTo={val as string}
            ></RevisedInputJ>
          </div>
        ))}
      </div>
      <div style={{ height: ".75rem" }}></div>
      <RevisedButtonR
        radius="7px"
        HWFs={["2rem", "auto", "12px"]}
        sinensisAct={handleUserUpdate}
        palate={[
          colorM("pink-white-10"),
          colorM("pink-black-0", 0.6),
          colorM("pink-black-0", 0.1),
        ]}
        icon="sync"
        text="Save Changes"
      ></RevisedButtonR>
      {operationStat}
    </div>
  );
}
