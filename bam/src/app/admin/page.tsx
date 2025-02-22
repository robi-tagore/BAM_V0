"use client";

import { colorM } from "@/deps/color";
import { RevisedButtonR, RevisedInputJ } from "../components";
import { IconAndData } from "../customers/components";
import { layout } from "@/deps/constants";
import { Env_M } from "@/envVar";
import { use, useEffect, useState } from "react";
import { EmailAlert, MiniUserView, RechievePass } from "./templates";
import { LoaderM } from "../baseComponents";
import { _Pull_Response__user } from "./api/pull/route";
import { user } from "./user";
import { cookieM } from "@/deps/_functions";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  var [mainContent, mainContentTo] = useState(<></>);
  var [allUsers, allUsersTo] = useState<Partial<user>[]>();

  var [fetcherDisplay, fetcherDisplayTo] = useState<"flex" | "none">("none");
  var [genrealGreet, genrealGreetTo] = useState<"block" | "none">("none");

  console.log(Env_M);

  async function bringUserData() {
    mainContentTo(<></>);
    fetcherDisplayTo("flex");

    var res = await (
      await fetch("/admin/api/pull", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      })
    ).json();

    var users = (res as _Pull_Response__user.core).data;

    fetcherDisplayTo("none");
    allUsersTo([
      ...users,
      {
        email: "user@domain.com",
        grade: "0",
        logged: "out",
        username: "New Username",
      },
    ]);
    genrealGreetTo("block");
  }

  useEffect(() => {
    console.log(cookieM(document.cookie).grade);
    userNameTo(cookieM(document.cookie).username)
    if (!cookieM(document.cookie).grade || (Number(cookieM(document.cookie).grade) > 1)) {
      mainContentTo(<EmailAlert></EmailAlert>);
    } else {
      mainContentTo(<RechievePass success={bringUserData}></RechievePass>);
    }
  }, []);

  var [userName,userNameTo] = useState<string>()

  var route = useRouter()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: layout.availableSpace,
        flexDirection: "column",
      }}
    >
      <div>{mainContent}</div>

      <div
        style={{
          display: fetcherDisplay,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "13rem"]}
            size="32px"
            speed={1000}
            icons={["cloud", "cloudy_snowing"]}
            scaleEffect="1.13"
          ></LoaderM>

          <h3>Fetching All Users</h3>
          <div style={{ height: ".75px" }}></div>
          <h5 style={{ width: "300px", textAlign: "center" }}>
            Request has been sent to the server to bring all users. Wait
            Patiently for the results to load.
          </h5>
        </div>
      </div>

      <div
        style={{
          display: genrealGreet,
          width: "100%",
        }}
      >
        <br />
        <br />
        <br />
        <h1>Welcome&nbsp;</h1>
        <h1 style={{ fontFamily: "Product Sans Bold" }}>
          {userName}
        </h1>
        <br />
        <h2>Edit or Create a User</h2>
        <br />
        <br />
        <br />
        <div style={{ width: "100%" }}>
          {/* <h3>Users Associated With Your Service</h3> */}
          <hr
            style={{
              border: "none",
              background: colorM("blue-black-10", 0.15),
              height: "1px",
            }}
          />
          <br />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridGap: "2rem",
        }}
      >
        {allUsers?.map((user, i) => (
          <MiniUserView route={route} data={user} key={i}></MiniUserView>
        ))}
        <br />
        <br />
      </div>
    </div>
  );
}
