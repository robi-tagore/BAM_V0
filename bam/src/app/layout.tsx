"use client";

import "@/fonts/declarations.css";
import "material-symbols";
import "./global.css";
import { colorM } from "@/deps/color";
import "@/fonts/declarations.css";
import { layout } from "@/deps/constants";
import { Menu } from "./coreComponents";
import { Env_M } from "@/envVar";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function pathToTitle(path: string) {
  if (path == "/") return Env_M.EDITION.FOR;

  var p1 = path.split("/");
  var p2 = p1.map((d) => {
    var fl = d[0] ?? "";
    d = d.replace(fl, fl.toUpperCase());
    return d;
  });

  if (p1.length > 1) {
    p2 = p2.reverse();
    var p3 = p2.join(" ");
  } else {
    var p3 = p2.join("|");
  }

  var p4 = p3 + " | " + Env_M.EDITION.FOR;
  return p4;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  var path = usePathname();
  var [pageTitle, pageTitleTo] = useState<string>(pathToTitle(path));
  useEffect(() => {
    pageTitleTo(pathToTitle(path));
  }, [path]);

  useEffect(() => {
    window.addEventListener("online", () => {
      offlineDisplayTo("none");
      onlineDisplayTo("flex");

      setTimeout(() => {
        onlineDisplayTo("none");
      }, 10000);
    });
    window.addEventListener("offline", () => {
      offlineDisplayTo("flex");
      onlineDisplayTo("none");
    });

    if (!navigator.onLine) {
      offlineDisplayTo("flex");
      onlineDisplayTo("none");
    }
  }, []);

  var [offlineDisplay, offlineDisplayTo] = useState<"flex" | "none">("none");
  var [onlineDisplay, onlineDisplayTo] = useState<"flex" | "none">("none");

  return (
    <html lang="en">
      <body
        className={``}
        style={{
          // background: colorM("blue-black-10", 0.035),
          background: colorM("blue-black-10", 0.025),

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: "10",
            width: "100%",
          }}
        >
          <div
            className="mshadow"
            style={{
              width: "100%",
              height: "2rem",
              display: offlineDisplay,
              background: colorM("red-white-9"),
              borderBottom: "1px solid " + colorM("red-white-5"),
              backdropFilter: "blur(100px)",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 0 .5rem 0",
            }}
          >
            <h5
              style={{ fontFamily: "monospace", color: colorM("red-black-3") }}
            >
              You are currently Offline ! Features like sending mails, commiting
              changes in the server, may not be possible. Runtime Errrs will
              occur.
            </h5>
          </div>
          <div
            className="mshadow"
            style={{
              width: "100%",
              height: "2rem",
              display: onlineDisplay,
              background: colorM("green-white-9"),
              borderBottom: "1px solid " + colorM("green-white-5"),
              backdropFilter: "blur(100px)",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 0 .5rem 0",
            }}
          >
            <h5
              style={{
                fontFamily: "monospace",
                color: colorM("green-black-3"),
              }}
            >
              Connection was Restored ! All Features are available now.
            </h5>
          </div>{" "}
        </div>

        <div
          style={{
            margin: "0rem 64px",
            width: "calc(100% - 2 * 64px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            position: "relative",
          }}
        >
          <div
            style={{
              width: "1180px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: layout.menu.height,
                position: "sticky",
                zIndex: "4",
                top: "1rem",
                width: "100%",
              }}
            >
              <Menu></Menu>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "calc(100% - 100px)",
              }}
            >
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
          </div>
          {/* <h6 style={{ position: "absolute", right: "1rem", bottom: "1rem" }}> {Env_M.EDITION.FOR}</h6> */}
        </div>
      </body>

      <title>{pageTitle}</title>
    </html>
  );
}
