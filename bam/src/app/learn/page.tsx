"use client";

import { layout } from "@/deps/constants";
import { IconAndData } from "../customers/components";
import { colorM } from "@/deps/color";
import { RevisedButtonR } from "../components";
import { useRouter } from "next/navigation";

export default function Learn() {
  var route = useRouter();

  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        padding: "4rem 0",
      }}
    >
      <div>
        <div style={{ display:'flex', flexDirection:'column-reverse' }}>
          <div style={{width: "400px"}}>
            <h2>References</h2>
            <br />
            <h5>
              This page has been built to refer the insider technologies used to
              build this software. Junior coders may be able to know about the
              frameoworks and modules, needed to build a full stack web app :) .
            </h5>
          </div>
          <br />
          <div>
            <h1>Business Administration &nbsp;</h1>
            <br />
            <h3>A Sinensis Production (2)</h3>
          </div>
        </div>

        <br />
        <br />
        <h2>Coding Dependencies</h2>
        <br />
        <hr
          style={{
            border: "none",
            background: colorM("blue-black-10", 0.15),
            height: "1px",
          }}
        />
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "2rem",
          }}
        >
          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Nodejs</h2>{" "}
            <h3>(Primary Language)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>Nodejs</span> or
              server side js has been used as the primary programming language.
              It is one of the most versatile programming language of the web.
              It has been used with{" "}
              <span style={{ fontFamily: "Product Sans Bold" }}>
                Typescript &nbsp;
              </span>
              to featurize type annotions.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://nodejs.org");
              }}
              palate={[
                colorM("magenta-white-10", 1),
                colorM("magenta-black-2", 0.8),
                colorM("magenta-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Nodejs Homepage"
            ></RevisedButtonR>
          </div>

          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Next.js</h2>{" "}
            <h3>(Framework)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>Nextjs </span>
              is a
              <span style={{ fontFamily: "Product Sans Bold" }}>
                &nbsp;React &nbsp;
              </span>
              framework for building full-stack web applications. You use React
              Components to build user interfaces, and Next.js for additional
              features and optimizations. Next.js can help you build
              interactive, dynamic, and fast React applications.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://www.nextjs.org");
              }}
              palate={[
                colorM("orange-white-10", 1),
                colorM("orange-black-2", 0.8),
                colorM("orange-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Next.js Homepage"
            ></RevisedButtonR>
          </div>

          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Mongodb</h2>{" "}
            <h3>(Database)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>Mongodb </span>
              has been used as the database of Business Administration. Mongodb
              is a json based db system, the most popular non-relational
              database system. It allows you to perform database management
              featuring JSON (Javascript Object Notation). Please note
              <span style={{ fontFamily: "Product Sans Bold" }}>
                &nbsp;Mongose &nbsp;
              </span>
              was not used.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://nodejs.com");
              }}
              palate={[
                colorM("rose-white-10", 1),
                colorM("rose-black-2", 0.8),
                colorM("rose-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Mongodb Homepage"
            ></RevisedButtonR>
          </div>

          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>React.js</h2>{" "}
            <h3>(Library)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>React </span>
              is a JavaScript library for building user interfaces. It combined
              with
              <span style={{ fontFamily: "Product Sans Bold" }}>
                &nbsp;JSX &nbsp;
              </span>{" "}
              allows you create DOM Elements in js environment.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://reactjs.org");
              }}
              palate={[
                colorM("rose-white-10", 1),
                colorM("rose-black-2", 0.8),
                colorM("rose-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="React Homepage"
            ></RevisedButtonR>
          </div>
        </div>

        <br />
        <br />
        <h2>Other Dependencies</h2>
        <br />
        <hr
          style={{
            border: "none",
            background: colorM("blue-black-10", 0.15),
            height: "1px",
          }}
        />
        <br />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "2rem",
          }}
        >
          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Github</h2>{" "}
            <h3>(Primary Hosting)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>Github</span> is
              the most popular web hoting provider, allows you host cloud apps
              and enhance version control. The codes of the data is hosted in
              github. It allows you deploy your app realtime.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://github.com");
              }}
              palate={[
                colorM("green-white-10", 1),
                colorM("green-black-2", 0.8),
                colorM("green-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Github Homepage"
            ></RevisedButtonR>
          </div>

          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Vercel</h2>{" "}
            <h3>(Deployer)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>Vercel </span>a
              popular platform to deploy web applications built with nextjs. As
              it is a nextjs project. The deployment is handled by vercel.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://www.vercel.org");
              }}
              palate={[
                colorM("orange-white-10", 1),
                colorM("orange-black-2", 0.8),
                colorM("orange-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Next.js Homepage"
            ></RevisedButtonR>
          </div>

          <div
            style={{
              width: "calc(100% - 4rem)",
              height: "fit-content",
              padding: "2rem",
              background: "white",
              borderRadius: "7px",
              margin: "1rem 1rem 0 0",
            }}
            className="mshadow"
          >
            <h2 style={{ fontFamily: "Product Sans Bold" }}>Alpha.net ?</h2>{" "}
            <h3>(Domain Provider)</h3>
            <br />
            <br />
            <h5>
              <span style={{ fontFamily: "Product Sans Bold" }}>
                Alpha.net?{" "}
              </span>
              is a popular domain and hosting provider in Bangladessh. The
              domain name has been bought from alphanet, at a cost of 2000 /
              year. The 24 / 7 enhanced customer service allows you maintain
              your services at cheap cost.
            </h5>
            <br />
            <br />
            <RevisedButtonR
              radius="7px"
              reverse={true}
              HWFs={["2rem", "auto", "12px"]}
              sinensisAct={() => {
                route.push("https://alpha.net.bd");
              }}
              palate={[
                colorM("rose-white-10", 1),
                colorM("rose-black-2", 0.8),
                colorM("rose-black-0", 0.1),
              ]}
              icon="developer_guide"
              text="Mongodb Homepage"
            ></RevisedButtonR>
          </div>
        </div>
      </div>
    </div>
  );
}
