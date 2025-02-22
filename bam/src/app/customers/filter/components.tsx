import { RevisedButtonR, RevisedInputJ } from "@/app/components";
import { colorM } from "@/deps/color";
import { IconAndData } from "../components";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { Filter } from "mongodb";
import { LoaderM } from "@/app/baseComponents";
import { MaterialSymbol } from "material-symbols";

export function GeneralSearch() {
  var [predections, predectionsTo] = useState<JSX.Element>();
  var [keyword, keywordTo] = useState<{ of: "name" | "id"; val: string }>({
    of: "name",
    val: "",
  });

  var predictionDivHeight = "230px";

  async function getPred({
    of,
    keyword,
  }: {
    of: "id" | "name";
    keyword: string;
  }): Promise<any[]> {
    return new Promise(async (m, j) => {
      var fields: (keyof Customer)[] | any =
        of == "id"
          ? ["uniqueIdentity"]
          : ["name.first", "name.last", "name.surname"];

      var query: Filter<Customer> =
        of == "id"
          ? {
              uniqueIdentity: { $regex: keyword,$options:'i' },
            }
          : {
              $or: [
                { "name.first": { $regex: keyword,$options:'i' } },
                { "name.last": { $regex: keyword,$options:'i' } },
                { "name.surname": { $regex: keyword,$options:'i' } },
              ],
            };

      fetch("/customers/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Customer",
          fields: fields,
          query: query,
        } as _Pull_Request__Customer.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Customer.core) => {
            if ((d.status = "r")) {
              if (of == "id") {
                m(d.data.map((d) => d.uniqueIdentity));
              } else if (of == "name") {
                console.log(d.data,'MMMMM');
                
                var onlyData = d.data.map((d) => [
                  d.name?.first,
                  d.name?.last,
                  d.name?.surname,
                ]);
                var combined: any[] = [];
                onlyData.forEach((d) => {
                  combined = [...combined, ...d];
                });

                m(combined);
              }
            } else if ((d.status = "m")) {
              j(d.data);
            }
          },
          (err) => {
            j(err);
          }
        );
      });
    });
  }

  function FormPredictions({ predections }: { predections: Array<string> }) {
    return (
      <div
        style={{
          width: "calc(100% - 2rem)",
          height: "calc(230px - 2rem)",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {predections.length != 0 && (
          <h6>
            Related to your Search <br />
            <br />
          </h6>
        )}
        <br />
        <div style={{ overflow: "auto" }}>
          {predections.map((e, i) => (
            <>
              {e && e.replaceAll(" ", "") != "" && (
                <span key={i}>
                  <h5>
                    {i}. {e}
                  </h5>{" "}
                  <br />
                </span>
              )}
            </>
          ))}
        </div>
        {predections.length == 0 && (
          <div className="cy">
            <span className="material-symbols-rounded">
              {"sentiment_dissatisfied" as MaterialSymbol}
            </span>
            <h5>&nbsp; No match was Found</h5>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (keyword.val.replaceAll(" ", "") == "") return;
    predectionsTo(
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: predictionDivHeight,
        }}
      >
        <LoaderM HW={["100px", "auto"]} size="32px" speed={250}></LoaderM>
      </div>
    );

    getPred({ keyword: keyword?.val, of: keyword?.of }).then(
      (d) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <FormPredictions predections={d}></FormPredictions>
          </div>
        );
      },
      (err) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <h5>Err occured while fetching Preditctions</h5>
          </div>
        );
      }
    );
  }, [keyword.val.length]);

  var [predectionsDisplay, predectionsDisplayTo] = useState("none");

  return (
    <div
      style={{
        width: "calc(320px - 4rem)",
        height: "max-content",
        borderRadius: "13px",
        // outline: "1px solid " + colorM("blue-black-10", 0.3),
        background: "white",
        padding: "2rem 2rem",
      }}
      className="mshadow"
      onMouseLeave={() => {
        predectionsDisplayTo("none");
      }}
      onMouseEnter={() => {
        predectionsDisplayTo("block");
      }}
    >
      <IconAndData
        data={<h4 style={{ fontFamily: "Product Sans Bold" }}>General Info</h4>}
        icon="page_info"
        size="20px"
      ></IconAndData>
      <br />
      <RevisedInputJ
        HWFs={["2rem", "11rem", "12px"]}
        color={colorM("blue-black-10", 0.5)}
        focusColor={colorM("green-black-10", 0.5)}
        generalColor={colorM("green-black-10", 0.3)}
        icon="id_card"
        inpTracker={(i) => {
          i?.addEventListener("keyup", () => {
            if (i.value.replaceAll(" ", "") != "") {
              setTimeout(() => {
                keywordTo({ of: "id", val: i.value });
              }, 500);
            }
          });
        }}
        text="Unique Identity"
      ></RevisedInputJ>

      <div style={{ height: ".75rem" }}></div>
      <RevisedInputJ
        HWFs={["2rem", "auto", "12px"]}
        color={colorM("blue-black-10", 0.5)}
        focusColor={colorM("green-black-10", 0.5)}
        generalColor={colorM("green-black-10", 0.3)}
        icon="text_fields"
        inpTracker={(i) => {
          i?.addEventListener("keyup", () => {
            if (i.value.replaceAll(" ", "") != "") {
              setTimeout(() => {
                keywordTo({ of: "name", val: i.value });
              }, 500);
            }
          });
        }}
        text="First, Last or Surname"
      ></RevisedInputJ>

      <div style={{ height: ".75rem" }}></div>
      <div style={{ display: predectionsDisplay }}>{predections}</div>
    </div>
  );
}

export function VirtualAddressSearch() {
  var [predections, predectionsTo] = useState<JSX.Element>();
  var [keyword, keywordTo] = useState<{ of: "email" | "phone"; val: string }>({
    of: "email",
    val: "",
  });

  var predictionDivHeight = "230px";

  async function getPred({
    of,
    keyword,
  }: {
    of: "email" | "phone";
    keyword: string;
  }): Promise<any[]> {
    return new Promise(async (m, j) => {
      var fields: (keyof Customer)[] | any =
        of == "email"
          ? ["virtualIdentity.email"]
          : ["virtualIdentity.phoneNumber", "virtualIdentity.emergencyNumber"];

      var query: Filter<Customer> =
        of == "email"
          ? {
              "virtualIdentity.email": { $regex: keyword,$options:'i' },
            }
          : {
              $or: [
                { "virtualIdentity.phoneNumber": { $regex: keyword,$options:'i' } },
                { "virtualIdentity.emergencyNumber": { $regex: keyword,$options:'i' } },
              ],
            };

      fetch("/customers/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Customer",
          fields: fields,
          query: query as Filter<Customer>,
        } as _Pull_Request__Customer.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Customer.core) => {
            if ((d.status = "r")) {
              if (of == "email") {
                m(d.data.map((d) => d.virtualIdentity?.email));
              } else if (of == "phone") {
                var onlyData = d.data.map((d) => [
                  d.virtualIdentity?.phoneNumber,
                  d.virtualIdentity?.emergencyNumber,
                ]);
                var combined: any[] = [];
                onlyData.forEach((d) => {
                  combined = [...combined, ...d];
                });

                m(combined);
              }
            } else if ((d.status = "m")) {
              j(d.data);
            }
          },
          (err) => {
            j(err);
          }
        );
      });
    });
  }

  function FormPredictions({ predections }: { predections: Array<string> }) {
    return (
      <div
        style={{
          width: "calc(100% - 2rem)",
          height: "calc(230px - 2rem)",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {predections.length != 0 && (
          <h6>
            Related to your Search <br />
            <br />
          </h6>
        )}
        <br />
        <div style={{ overflow: "auto" }}>
          {predections.map(
            (e, i) =>
              e &&
              e.replaceAll(" ", "") != "" && (
                <span key={i}>
                  <h5>
                    {i}. {e}
                  </h5>{" "}
                  <br />
                </span>
              )
          )}
        </div>
        {predections.length == 0 && (
          <div className="cy">
            <span className="material-symbols-rounded">
              {"sentiment_dissatisfied" as MaterialSymbol}
            </span>
            <h5>&nbsp; No match was Found</h5>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (keyword.val.replaceAll(" ", "") == "") return;
    predectionsTo(
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: predictionDivHeight,
        }}
      >
        <LoaderM HW={["100px", "auto"]} size="32px" speed={250}></LoaderM>
      </div>
    );

    getPred({ keyword: keyword?.val, of: keyword?.of }).then(
      (d) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <FormPredictions predections={d}></FormPredictions>
          </div>
        );
      },
      (err) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <h5>Err occured while fetching Preditctions</h5>
          </div>
        );
      }
    );
  }, [keyword.val.length]);

  var [predectionsDisplay, predectionsDisplayTo] = useState("none");

  return (
    <div
      style={{
        width: "calc(320px - 4rem)",
        height: "max-content",
        borderRadius: "13px",
        // outline: "1px solid " + colorM("blue-black-10", 0.3),
        background: "white",
        padding: "2rem 2rem",
      }}
      className="mshadow"
      onMouseLeave={() => {
        predectionsDisplayTo("none");
      }}
      onMouseEnter={() => {
        predectionsDisplayTo("block");
      }}
    >
      <IconAndData
        data={
          <h4 style={{ fontFamily: "Product Sans Bold" }}>Virtual Identity</h4>
        }
        icon="cloud"
        size="20px"
      ></IconAndData>
      <br />

      <RevisedInputJ
        HWFs={["2rem", "11rem", "12px"]}
        color={colorM("blue-black-10", 0.5)}
        focusColor={colorM("green-black-10", 0.5)}
        generalColor={colorM("green-black-10", 0.3)}
        icon="call"
        inpTracker={(i) => {
          i?.addEventListener("keyup", () => {
            if (i.value.replaceAll(" ", "") != "") {
              setTimeout(() => {
                keywordTo({ of: "phone", val: i.value });
              }, 500);
            }
          });
        }}
        text="Any Phone Number"
      ></RevisedInputJ>

      <div style={{ height: ".75rem" }}></div>
      <RevisedInputJ
        HWFs={["2rem", "auto", "12px"]}
        color={colorM("blue-black-10", 0.5)}
        focusColor={colorM("green-black-10", 0.5)}
        generalColor={colorM("green-black-10", 0.3)}
        icon="mark_email_read"
        inpTracker={(i) => {
          i?.addEventListener("keyup", () => {
            if (i.value.replaceAll(" ", "") != "") {
              setTimeout(() => {
                keywordTo({ of: "email", val: i.value });
              }, 500);
            }
          });
        }}
        text="Email Address"
      ></RevisedInputJ>

      <br />
      <div style={{ display: predectionsDisplay }}>{predections}</div>
    </div>
  );
}

export function PhysicalAddressSearch() {
  var [predections, predectionsTo] = useState<JSX.Element>();
  var [keyword, keywordTo] = useState<string>("");

  var predictionDivHeight = "230px";

  async function getPred({ keyword }: { keyword: string }): Promise<any[]> {
    return new Promise(async (m, j) => {
      fetch("/customers/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Customer",
          fields: ["physicalIdentity"],
          query: { physicalIdentity: { $regex: keyword } } as Filter<Customer>,
        } as _Pull_Request__Customer.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Customer.core) => {
            if ((d.status = "r")) {
              m(d.data.map((d) => d.physicalIdentity?.join(" ")));
            } else if ((d.status = "m")) {
              j(d.data);
            }
          },
          (err) => {
            j(err);
          }
        );
      });
    });
  }

  function FormPredictions({ predections }: { predections: Array<string> }) {
    return (
      <div
        style={{
          width: "calc(100% - 2rem)",
          height: "calc(230px - 2rem)",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {predections.length != 0 && (
          <h6>
            Related to your Search <br />
            <br />
          </h6>
        )}
        <br />
        <div style={{ overflow: "auto" }}>
          {predections.map(
            (e, i) =>
              e &&
              e.replaceAll(" ", "") != "" && (
                <span key={i}>
                  <h5>
                    {i}. {e}
                  </h5>{" "}
                  <br />
                  <br />
                </span>
              )
          )}
        </div>
        {predections.length == 0 && (
          <div className="cy">
            <span className="material-symbols-rounded">
              {"sentiment_dissatisfied" as MaterialSymbol}
            </span>
            <h5>&nbsp; No match was Found</h5>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (keyword.replaceAll(" ", "") == "") return;
    predectionsTo(
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: predictionDivHeight,
        }}
      >
        <LoaderM HW={["100px", "auto"]} size="32px" speed={250}></LoaderM>
      </div>
    );

    getPred({ keyword: keyword }).then(
      (d) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <FormPredictions predections={d}></FormPredictions>
          </div>
        );
      },
      (err) => {
        predectionsTo(
          <div style={{ height: predictionDivHeight }}>
            <h5>Err occured while fetching Preditctions</h5>
          </div>
        );
      }
    );
  }, [keyword]);

  var [predectionsDisplay, predectionsDisplayTo] = useState("none");

  return (
    <div
      style={{
        width: "calc(320px - 4rem)",
        height: "max-content",
        borderRadius: "13px",
        // outline: "1px solid " + colorM("blue-black-10", 0.3),
        background: "white",
        padding: "2rem 2rem",
      }}
      className="mshadow"
      onMouseLeave={() => {
        predectionsDisplayTo("none");
      }}
      onMouseEnter={() => {
        predectionsDisplayTo("block");
      }}
    >
      <IconAndData
        data={
          <h4 style={{ fontFamily: "Product Sans Bold" }}>Physical Address</h4>
        }
        icon="location_searching"
        size="20px"
      ></IconAndData>
      <br />
      <RevisedInputJ
        HWFs={["2rem", "auto", "12px"]}
        color={colorM("blue-black-10", 0.5)}
        focusColor={colorM("green-black-10", 0.5)}
        generalColor={colorM("green-black-10", 0.3)}
        icon="text_fields"
        inpTracker={(i) => {
          i?.addEventListener("keyup", () => {
            if (i.value.replaceAll(" ", "") != "") {
              setTimeout(() => {
                keywordTo(i.value);
              }, 500);
            }
          });
        }}
        text="Adress Line"
      ></RevisedInputJ>

      <div style={{ height: ".75rem" }}></div>
      <div style={{ display: predectionsDisplay }}>{predections}</div>
    </div>
  );
}
