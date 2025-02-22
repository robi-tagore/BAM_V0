"use client";

import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { useRouter } from "next/navigation";
import { layout } from "@/deps/constants";
import { useEffect, useState } from "react";
import {
  _Cookie_Request_,
  _Cookie_Response_,
} from "./privilage/api/cookie/route";
import { cookieM } from "@/deps/_functions";

export function Menu() {
  var route = useRouter();

  var [username, usernameTo] = useState<string>();
  useEffect(() => {
    const userCookie = cookieM(document?.cookie).username;
    usernameTo(userCookie);
  }, []);

  return (
    <div
      className="menu"
      style={{
        width: `100%`,
        height: layout.menu.height,
        background: colorM("pink-white-10", 0.7),
        backdropFilter: "blur(13px)",
        boxShadow: "0px 0px 3px rgba(155,155,155,.25)",
        borderRadius: "130px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",
      }}
    >
      <div
        className="cy hoverEffect"
        style={{
          position: "absolute",
          outline: "1px solid " + colorM("blue-black-10", 0.1),
          borderRadius: "70px",
          left: ".75rem",
          padding:username ? '0 1rem 0 .5rem' : ''
        }}
      >
        {/* <a href="/privilage"> */}
        <span
          onClick={() => {
            route.push("/privilage");
          }}
          className="material-symbols-rounded"
          style={{
            // background: colorM("pink-white-4", 0.8),
            // color: colorM("pink-white-10"),

            padding: ".25rem",
            fontSize: "24px",
            fontWeight: "100",
            // marginRight: ".5rem",
          }}
        >
          {/* {!username || username == 'Anonymous' ? "thread_unread" as MaterialSymbol : "lock_open_right" as MaterialSymbol} */}
          {!username
            ? ("thread_unread" as MaterialSymbol)
            : ("lock_open_right" as MaterialSymbol)}
        </span>
        {/* </a> */}
        <h5 style={{ fontFamily: "Product Sans Regular"}} className="">
          {username}
        </h5>{" "}
      </div>

      <div
        className="cy"
        style={{
          position: "absolute",
          right: ".75rem",
          display: "flex",
        }}
      >
        {/* <a href="/learn"> */}
        <div className="hoverEffectM">
          <span
            onClick={() => {
              route.push("/learn");
            }}
            className="material-symbols-sharp"
            style={{
              borderRadius: "100px",
              padding: ".25rem",
              fontSize: "24px",
              fontWeight: "200",
            }}
          >
            {"terminal" as MaterialSymbol}
          </span>
        </div>
        {/* </a> */}

        {/* <a href="/credits"> */}
        <div className="hoverEffectM">
          <span
            onClick={() => {
              route.push("/admin");
            }}
            className="material-symbols-sharp"
            style={{
              borderRadius: "100px",
              padding: ".25rem",
              fontSize: "24px",
              fontWeight: "200",
            }}
          >
            {"admin_panel_settings" as MaterialSymbol}
          </span>
        </div>
        {/* </a> */}

        {/* <a href="/credits"> */}
        <div className="hoverEffectM">
          <span
            onClick={() => {
              route.push("/");
            }}
            className="material-symbols-sharp"
            style={{
              borderRadius: "100px",
              padding: ".25rem",
              fontSize: "24px",
              fontWeight: "200",
            }}
          >
            {"home" as MaterialSymbol}
          </span>
        </div>
        {/* </a> */}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        {/* <a href="/products"> */}
        <div
          className="menuItem"
          onClick={() => {
            route.push("/products");
          }}
        >
          <h5 className="hoverEffect">Products</h5>
        </div>
        {/* </a> */}
        {/* <a href="/customers"> */}
        <div
          className="menuItem"
          onClick={() => {
            route.push("/customers");
          }}
        >
          <h5 className="hoverEffect">Customers</h5>
        </div>
        {/* </a> */}
        {/* <a href="/records"> */}
        <div
          className="menuItem"
          onClick={() => {
            route.push("/records");
          }}
        >
          <h5 className="hoverEffect">Records</h5>
        </div>
        {/* </a> */}
        {/* <a href="/payments"> */}
        <div
          className="menuItem"
          onClick={() => {
            route.push("/payments");
          }}
        >
          <h5 className="hoverEffect">Payments</h5>
        </div>
        {/* </a> */}
        {/* <a href="/privilage"> */}
        <div
          className="menuItem"
          onClick={() => {
            route.push("/privilage");
          }}
        >
          <h5 className="hoverEffect">Privilage</h5>
        </div>
        {/* </a> */}
      </div>
    </div>
  );
}
