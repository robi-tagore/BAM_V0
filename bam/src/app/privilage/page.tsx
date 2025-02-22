"use client";

import { colorM } from "@/deps/color";
import { cookieExpiresMs, layout } from "@/deps/constants";
import { RevisedInputJ, RevisedButtonR } from "../components";
import { IconAndData } from "../customers/components";
import { LoaderM } from "../baseComponents";
import { createRef, useEffect, useRef, useState } from "react";
import { DedicatedOTPInput } from "./components";
import {
  _Create_OTP_Request_,
  _Create_OTP_Response_,
} from "./api/createotp/route";
import {
  _Validate_OTP_Request_,
  _Validate_OTP_Response_,
} from "./api/validateotp/route";
import { _Cookie_Request_, _Cookie_Response_ } from "./api/cookie/route";
import { useRouter } from "next/navigation";
import { _Pull_Response__user } from "../admin/api/pull/route";
import { user } from "../admin/user";
import { cookieM } from "@/deps/_functions";

export default function PrivilagePage() {
  var emailInp = useRef<HTMLInputElement | null>();

  var [providedEmail, providedEmailTo] = useState<string>();
  var [sessionData, sessionDataTo] = useState<user>();

  var [OTP, OTPto] = useState<string>();

  useEffect(() => {
    const userCookie = cookieM(document?.cookie).email;
    providedEmailTo(userCookie);
  }, []);

  useEffect(() => {
    if (emailInp) {
      emailInp.current?.addEventListener("keyup", () => {
        providedEmailTo(emailInp.current?.value);
      });
    }
  }, [emailInp]);

  var [pastedContent, pastedContentTo] = useState<string>();
  var otpDiv = createRef<HTMLDivElement>();

  useEffect(() => {
    // window.onchange= async () => {
    //   pastedContentTo(await navigator.clipboard.readText())
    // }
  }, []);

  var [sendingRequestDisplay, sendingRequestDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [emailNotExistsDisplay, emailNotExistsDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [checkInboxDisplay, checkInboxDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [internalErrorDisplay, internalErrorDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [validationFieldDisplay, validationFieldDisplayTo] = useState<
    "block" | "none"
  >("none");

  var [validatingOTP, validatingOTPTo] = useState<"flex" | "none">("none");

  var [OTPValidDisplay, OTPValidDisplayTo] = useState<"flex" | "none">("none");

  var [OTPInvalidDisplay, OTPInvalidDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [OTPExpiredDisplay, OTPExpiredDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [validationErrorDisplay, validationErrorDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [alreadyLoggedInDisplay, alreadyLoggedInDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [notLoggedInDisplay, notLoggedInDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [loadingLoggedState, loadingLoggedStateTo] = useState<"flex" | "none">(
    "flex"
  );

  var [suspendingDisplay, suspendingDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [suspendedDisplay, suspendedDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [notSuspendedDisplay, notSuspendedDisplayTo] = useState<"flex" | "none">(
    "none"
  );

  var [fetchingPermittedUserDisplay, fetchingPermittedUserDisplayTo] = useState<
    "flex" | "none"
  >("none");

  var [rechieveEmailDisplay, rechieveEmailDisplayTo] = useState<
    "block" | "none"
  >("block");

  var [sessionSecured, sessionSecuredTo] = useState<"flex" | "none">("none");
  var route = useRouter();

  var [permittedUsers, permittedUsersTo] = useState<Partial<user>[]>();

  async function handleSendCode() {
    sendingRequestDisplayTo("none");
    emailNotExistsDisplayTo("none");
    checkInboxDisplayTo("none");
    internalErrorDisplayTo("none");
    validationFieldDisplayTo("none");

    var requestedEmail = emailInp.current?.value;
    if (!requestedEmail || requestedEmail.replaceAll(" ", "") == "") return;

    fetchingPermittedUserDisplayTo("flex");

    var reqM = await (
      await fetch("/admin/api/pull", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      })
    ).json();

    var permittedOnes = (reqM as _Pull_Response__user.core).data;
    fetchingPermittedUserDisplayTo("none");
    permittedUsersTo(permittedOnes);

    if (!permittedOnes.map(({ email }) => email).includes(requestedEmail)) {
      emailNotExistsDisplayTo("flex");
      sendingRequestDisplayTo("none");
      return;
    }

    sendingRequestDisplayTo("flex");

    var req = await (
      await fetch("/privilage/api/createotp", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: requestedEmail,
        } satisfies _Create_OTP_Request_.core),
      })
    ).json();

    var res: _Create_OTP_Response_.core = req;

    if (res.status == "success") {
      checkInboxDisplayTo("flex");
      sendingRequestDisplayTo("none");

      setTimeout(() => {
        rechieveEmailDisplayTo("none");
        validationFieldDisplayTo("block");
      }, 5000);
    } else if (res.status == "failure") {
      internalErrorDisplayTo("flex");
      sendingRequestDisplayTo("none");
    }
  }

  async function validateOTP() {
    var requestedEmail = emailInp.current?.value;
    var requestedOTP = OTP;
    if (!requestedOTP || requestedOTP.replaceAll(" ", "").length < 5) {
      return;
    }

    OTPInvalidDisplayTo("none");
    OTPValidDisplayTo("none");
    validationErrorDisplayTo("none");
    OTPExpiredDisplayTo("none");
    sessionSecuredTo("none");

    validatingOTPTo("flex");
    console.log(requestedEmail, requestedOTP);

    var req = await (
      await fetch("/privilage/api/validateotp", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: requestedEmail!,
          otp: requestedOTP,
        } satisfies _Validate_OTP_Request_.core),
      })
    ).json();

    validatingOTPTo("none");

    var res: _Validate_OTP_Response_.core = req;

    if (res.status == "invalid") {
      OTPInvalidDisplayTo("flex");
    } else if (res.status == "valid") {
      OTPValidDisplayTo("flex");
      buildSession();
    } else if (res.status == "err") {
      validationErrorDisplayTo("flex");
    } else if (res.status == "expired") {
      OTPExpiredDisplayTo("flex");
    }
  }

  async function buildSession() {
    var emailM = providedEmail;

    var user = permittedUsers!.filter(({ email }) => emailM == email)[0];

    var cookieLife = cookieExpiresMs + Date.now();
    var req = await (
      await fetch("/privilage/api/cookie", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          action: "set",
          cookies: [
            { name: "email", value: emailM!, expires: cookieLife },
            { name: "username", value: user.username!, expires: cookieLife },
            { name: "logged", value: "in", expires: cookieLife },
            { name: "grade", value: user.grade!, expires: cookieLife },
          ],
        } satisfies _Cookie_Request_.core),
      })
    ).json();

    var res: _Cookie_Response_.core = req;

    if (res.status == "success") {
      var email = res.data.filter(({ name }) => name == "email")[0].value;
      var username = res.data.filter(({ name }) => name == "username")[0].value;
      var logged = res.data.filter(({ name }) => name == "logged")[0].value;
      var grade = res.data.filter(({ name }) => name == "grade")[0].value;
      sessionDataTo({
        email: email,
        username: username,
        logged: logged,
        grade: grade,
      });

      OTPValidDisplayTo("none");
      sessionSecuredTo("flex");

      setTimeout(() => {
        route.refresh();
        // route.push('/')
      }, 1000);
    }
  }

  async function handleSessionSuspend() {
    suspendingDisplayTo("flex");
    var req = await (
      await fetch("/privilage/api/cookie", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          names: ["email", "grade", "username", "logged"],
        } satisfies _Cookie_Request_.core),
      })
    ).json();

    suspendingDisplayTo("none");

    var res: _Cookie_Response_.core = req;

    if (!res) {
      notSuspendedDisplayTo("flex");
    }

    suspendedDisplayTo("none");
    if (res.status == "success") {
      suspendedDisplayTo("flex");
    } else if (res.status == "failure") {
      suspendedDisplayTo("flex");
    }

    route.refresh();
  }

  useEffect(() => {
    fetch("/privilage/api/cookie", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        action: "get",
        names: ["logged", "email", "grade", "username"],
      } satisfies _Cookie_Request_.core),
    }).then(
      async (cookie) => {
        var cookieM: _Cookie_Response_.core = await cookie.json();

        if (cookieM) {
          var loggedIn: boolean = false;

          if (cookieM.data[0] == null) {
            loggedIn = false;
          } else if (cookieM.data[0].value == "out") {
            loggedIn = false;
          } else if (cookieM.data[0].value == "in") {
            loggedIn = true;
          }

          loadingLoggedStateTo("none");

          if (loggedIn) {
            alreadyLoggedInDisplayTo("flex");
            sessionDataTo({
              email: cookieM.data.filter((e) => e.name == "email")[0].value,
              username: cookieM.data.filter((e) => e.name == "username")[0]
                .value,
              grade: cookieM.data.filter((e) => e.name == "grade")[0].value,
              logged: cookieM.data.filter((e) => e.name == "logged")[0].value,
            });
          }
          if (!loggedIn) {
            notLoggedInDisplayTo("flex");
          }
        }
      },
      () => {}
    );
  }, []);

  return (
    <div>
      <div
        style={{
          height: layout.availableSpace,
          display: notLoggedInDisplay,
          justifyContent: "center",
          alignItems: "center",
          margin: "1.5rem 0 0 0",
        }}
      >
        <div
          style={{
            display: rechieveEmailDisplay,
            padding: "2rem",
            borderRadius: "13px",
            background: "white",
            width: "350px",
          }}
          className="mshadow"
        >
          <div>
            <IconAndData
              data={<h3>Provide Email</h3>}
              icon="shield_lock"
              size="32px"
            ></IconAndData>

            <div style={{ height: ".75rem" }}></div>
            <h5>
              Note This service is a restricted service. Which means the
              administrative emails will work. If you are a admisnister of the
              service you may be able to log in, it might be useless to try to
              log in.
            </h5>

            <br />
            <br />

            <div style={{ display: "flex" }}>
              <RevisedInputJ
                HWFs={["2rem", "13rem", "12px"]}
                color={"blue-black-10"}
                focusColor={colorM("red-black-10", 0.3)}
                text="Email or Pass"
                generalColor={colorM("red-black-10", 0.4)}
                icon="alternate_email"
                inpTracker={(inp) => {
                  emailInp.current = inp;
                }}
              ></RevisedInputJ>
              &nbsp;&nbsp;&nbsp;
              <RevisedButtonR
                radius="7px"
                HWFs={["2rem", "auto", "12px"]}
                sinensisAct={handleSendCode}
                palate={[
                  colorM("pink-black-1", 0.6),
                  colorM("pink-white-10"),
                  colorM("pink-black-0", 0.1),
                ]}
                icon="mark_unread_chat_alt"
                text="Rechieve Code"
              ></RevisedButtonR>
            </div>
          </div>

          <div
            style={{
              display: sendingRequestDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
            <h3>Sending Request</h3>
            <h5 style={{ textAlign: "center" }}>
              Request has been sent for email verification. Wait for the
              confirmation of email being sent.
            </h5>
          </div>

          <div
            style={{
              display: emailNotExistsDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["priority_high", "blur_off"]}
            ></LoaderM>
            <h3>Illegal Access Request !</h3>
            <h5 style={{ textAlign: "center" }}>
              The email you are using does'nt exists in administrative email
              list.
            </h5>
          </div>

          <div
            style={{
              display: fetchingPermittedUserDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["security", "cloud"]}
            ></LoaderM>
            <h3>Checking Permission</h3>
            <h5 style={{ textAlign: "center" }}>
              Your email has been sent to server to check if you have
              administrative rights to log in to the service. If passed mail
              will be sent.
            </h5>
          </div>

          <div
            style={{
              display: checkInboxDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["mark_email_read", "mark_email_unread"]}
            ></LoaderM>
            <h3>Email sent !</h3>
            <h5 style={{ textAlign: "center" }}>
              Check Your inbox for the email. If not there check spam. It will
              be valid for 5 minutes.
            </h5>
          </div>

          <div
            style={{
              display: internalErrorDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["priority_high", "sync"]}
            ></LoaderM>
            <h3>Email not sent !</h3>
            <h5 style={{ textAlign: "center" }}>
              An Internal error has occured while sending email. Try again after
              some time.
            </h5>
          </div>
        </div>

        <div
          style={{
            display: validationFieldDisplay,
            padding: "2rem",
            borderRadius: "13px",
            background: "white",
            width: "350px",
            margin: "0 0 0 2rem",
          }}
          className="mshadow"
        >
          <div>
            <IconAndData
              data={<h3>Copy and Paste</h3>}
              icon="content_paste"
            ></IconAndData>
            <br />
            <h5>Open email at </h5>&nbsp;
            <h4 style={{ fontFamily: "Product Sans Bold" }}>
              {providedEmail}.
            </h4>
            &nbsp;
            <h5>
              Then paste or type the code in the field below. Check the spam
              folder too. If not found try again after sometime.
            </h5>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <div ref={otpDiv}>
                <DedicatedOTPInput
                  output={(str) => {
                    OTPto(str);
                  }}
                  defaultsM={pastedContent}
                ></DedicatedOTPInput>
              </div>
              &nbsp;&nbsp;&nbsp;
              <RevisedButtonR
                radius="7px"
                HWFs={["3rem", "auto", "12px"]}
                spacingX=".5rem"
                sinensisAct={async () => {
                  var clipboarded = await navigator.clipboard.readText();
                  pastedContentTo(clipboarded);
                }}
                palate={[
                  colorM("orange-white-10"),

                  colorM("orange-black-1", 0.9),
                  colorM("orange-white-0", 0.1),
                ]}
                icon="content_paste_go"
                text=""
              ></RevisedButtonR>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <RevisedButtonR
                radius="7px"
                HWFs={["2rem", "auto", "12px"]}
                // spacingX=".5rem"
                sinensisAct={async () => {}}
                palate={[
                  colorM("blue-black-3", 0.7),
                  colorM("blue-white-10"),
                  colorM("blue-white-0", 0.1),
                ]}
                icon="markdown_paste"
                text="Enable Auto Pasting"
              ></RevisedButtonR>
              &nbsp;&nbsp;&nbsp;
              <RevisedButtonR
                radius="7px"
                HWFs={["2rem", "auto", "12px"]}
                // spacingX=".5rem"
                sinensisAct={validateOTP}
                palate={[
                  colorM("green-black-3", 0.7),
                  colorM("green-white-10"),
                  colorM("green-white-0", 0.1),
                ]}
                icon="cloudy_snowing"
                text="Validate OTP"
              ></RevisedButtonR>
            </div>
            <br />
          </div>

          <div
            style={{
              display: validatingOTP,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["cloud", "flight"]}
            ></LoaderM>
            <h3>Validating OTP</h3>
            <h5 style={{ textAlign: "center" }}>
              Please wait while the OTP is being validated. Wait for the
              response
            </h5>
          </div>

          <div
            style={{
              display: OTPInvalidDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["priority_high", "sync"]}
            ></LoaderM>
            <h3>Invalid OTP !</h3>
            <h5 style={{ textAlign: "center" }}>
              The OTP you provided seems invalid. Please try again ! Check the
              inbox carefully.
            </h5>
          </div>

          <div
            style={{
              display: OTPValidDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["favorite", "partly_cloudy_day"]}
            ></LoaderM>
            <h3>Please Wait !</h3>
            <h5 style={{ textAlign: "center" }}>
              You are authenticated. The OTP is correct, creating session.
            </h5>
          </div>

          <div
            style={{
              display: validationErrorDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["priority_high", "no_meals"]}
            ></LoaderM>
            <h3>Error Validating OTP</h3>
            <h5 style={{ textAlign: "center" }}>
              An Error occured while validating OTP. Check console or try again
              after sometime.
            </h5>
          </div>

          <div
            style={{
              display: OTPExpiredDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["priority_high", "sync"]}
            ></LoaderM>
            <h3>OTP Expired</h3>
            <h5 style={{ textAlign: "center" }}>
              The provided OTP has expired. You have to try again. Reload
              Repeat.
            </h5>
          </div>

          <div
            style={{
              display: sessionSecured,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />
            </div>
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["handshake", "cloud"]}
            ></LoaderM>
            <span>
              <h3>Welcome </h3>&nbsp;
              <h3
                style={{
                  fontFamily: "Product Sans Bold",
                  textTransform: "capitalize",
                }}
              >
                {sessionData?.username}
              </h3>
            </span>
            <h5 style={{ textAlign: "center" }}>
              The connection is secured. You are now authenticated and Logged
              In. Session created successfully. Refresh And Enjoy.
            </h5>
          </div>
        </div>
      </div>

      <div
        style={{
          display: loadingLoggedState,
          height: layout.availableSpace,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <br />
          <LoaderM
            HW={["13rem", "auto"]}
            size="32px"
            speed={1000}
            icons={["cloud", "cloudy_snowing"]}
          ></LoaderM>
          <h3>Please Wait</h3>
          <h5 style={{ textAlign: "center" }}>
            Session Info is being loaded. Fetching your credentials and
            allowance. <br />
            Wait Patiently untill response is rechieved.
          </h5>
        </div>
      </div>

      <div
        style={{
          display: alreadyLoggedInDisplay,
          height: layout.availableSpace,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "block",
            width: "400px",
            padding: "2rem",
            background: "white",
            borderRadius: "7px",
          }}
          className="mshadow"
        >
          <div>
            {/* <h2>Hello</h2> &nbsp; */}
            <h2 style={{ fontFamily: "Product Sans Bold" }}>
              {sessionData?.username}
            </h2>
            <div style={{ height: ".75rem" }}></div>
            <h5 style={{ fontFamily: "Proxima" }}>
              You are already logged in as <b>{sessionData?.username}</b>. Your
              session credentials are as follows. Your session will
              automatically be logged out after 5 minutes of login. You may need
              to log in again.
            </h5>
            <br />
            <br />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ margin: ".25rem 1rem  0 0 " }}>
                <IconAndData
                  weightM="200"
                  icon="id_card"
                  data={<h4>{sessionData?.username}</h4>}
                ></IconAndData>
              </div>{" "}
              <div style={{ margin: ".25rem 1rem  0 0 " }}>
                <IconAndData
                  weightM="200"
                  icon="deployed_code"
                  data={<h4>{sessionData?.grade}</h4>}
                ></IconAndData>
              </div>
              <div style={{ margin: ".25rem 1rem  0 0 " }}>
                <IconAndData
                  weightM="200"
                  icon="mark_email_read"
                  data={<h4>{sessionData?.email}</h4>}
                ></IconAndData>
              </div>
              <div style={{ margin: ".25rem 1rem  0 0 " }}>
                <IconAndData
                  weightM="200"
                  icon="verified"
                  data={<h4>Logged In</h4>}
                ></IconAndData>
              </div>
            </div>
            <br />
            <div>
              <RevisedButtonR
                radius="7px"
                HWFs={["2.25rem", "auto", "14px"]}
                sinensisAct={handleSessionSuspend}
                palate={[
                  colorM("red-white-10"),
                  colorM("red-black-1", 1),
                  colorM("red-black-0", 0.1),
                ]}
                icon="follow_the_signs"
                text="Leave Session"
              ></RevisedButtonR>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "300px",
            display: (
              suspendedDisplay +
              suspendedDisplay +
              notLoggedInDisplay
            ).includes("flex")
              ? "flex"
              : "none",
            marginLeft: "3rem",
            background: "white",
            padding: "2rem",
            borderRadius: "7px",
          }}
          className="mshadow"
        >
          <div
            style={{
              display: suspendingDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
            <h3>Please Wait</h3>
            <h5 style={{ textAlign: "center" }}>
              Suspending and logging out from the account, wait for confirmation
              of being logged out.
            </h5>
          </div>
          <div
            style={{
              display: suspendedDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["bookmark_check", "favorite"]}
            ></LoaderM>
            <h3>Suspended !</h3>
            <h5 style={{ textAlign: "center" }}>
              Successfully logged out from the account. You may not be able to
              use administrative features.
            </h5>
          </div>
          <div
            style={{
              display: notSuspendedDisplay,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <br />
            <LoaderM
              HW={["7rem", "auto"]}
              size="32px"
              speed={1000}
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
            <h3>Oops !</h3>
            <h5 style={{ textAlign: "center" }}>
              Some error has occured while logging out from the account. Try
              again after sometime.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
