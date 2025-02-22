"use client";

import { colorM } from "@/deps/color";

import { layout } from "@/deps/constants";
import { IconAndData } from "./customers/components";
import { RevisedButtonM, RevisedButtonR } from "./components";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  var [windowCookies, windowCookiesTo] = useState<string>();
  useEffect(() => {
    var coo: any = document.cookie;
    coo = (coo as string).replaceAll(" ", "");
    coo = coo == "" ? undefined : document.cookie;
    windowCookiesTo(coo);
  }, []);

  var route = useRouter();
  return (
    <div
      style={{
        height: layout.availableSpace,
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "3rem",
          borderRadius: "13px",
        }}
        className="mshadow"
      >
        <h1>Business Administration &nbsp;</h1>
        <br />
        <h3>A Sinensis Production (2)</h3>
        <br />
        <br />
        <h5 style={{ wordBreak: "break-all" }}>
          Business Administraton (BAm) is a ultimate solution for maintainance
          of medium sized business. It has been built to empower the
          administration of business. Multi user access allows you to work as a
          team.
          <br />
          <br />
          Fully Open Source and easy to use. Hazle free UI and sutable for
          medium size business. Features are as follows,
        </h5>
        <br />
        <br />

        <div
          style={{
            display: "grid",
            gridRowGap: ".25rem",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <IconAndData
            weightM="200"
            icon={"monitor"}
            data={<h4>Web App</h4>}
          ></IconAndData>
          <IconAndData
            weightM="200"
            icon={"router"}
            data={<h4>Offline</h4>}
          ></IconAndData>
          <IconAndData
            weightM="200"
            icon={"security"}
            data={<h4>Secured</h4>}
          ></IconAndData>
          <IconAndData
            weightM="200"
            icon={"sdk"}
            data={<h4>Customizeable</h4>}
          ></IconAndData>
          <IconAndData
            weightM="200"
            icon={"electric_bolt"}
            data={<h4>Fast</h4>}
          ></IconAndData>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <RevisedButtonR
            radius="7px"
            reverse={true}
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/credits");
            }}
            palate={[
              colorM("pink-white-10", 1),
              colorM("pink-black-2", 0.5),
              colorM("pink-black-0", 0.1),
            ]}
            icon="signature"
            text="View Credits"
          ></RevisedButtonR>
          &nbsp;&nbsp;&nbsp;
          <RevisedButtonR
            radius="7px"
            reverse={true}
            HWFs={["2rem", "auto", "12px"]}
            sinensisAct={() => {
              route.push("/learn");
            }}
            palate={[
              colorM("magenta-white-10", 1),
              colorM("magenta-black-2", 0.5),
              colorM("magenta-black-0", 0.1),
            ]}
            icon="developer_guide"
            text="Develpment Guides"
          ></RevisedButtonR>
          &nbsp;&nbsp;&nbsp;
          {!windowCookies && (
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("/privilage");
              }}
              palate={[
                colorM("green-white-10", 1),
                colorM("green-black-2", 0.7),
                colorM("green-black-0", 0.1),
              ]}
              icon="security"
              text="Sign In"
            ></RevisedButtonR>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div>
          {" "}
          <Image
            src={"/sinensisc.png"}
            alt="sinensis"
            width={350}
            height={350}
          ></Image>
        </div>
        <div style={{
          textAlign:'center'
        }}>
        <h2>Business Administration</h2><br />
        <h3>A Sinesnis Production (2)</h3>
        </div>
      </div>
    </div>
  );
}
