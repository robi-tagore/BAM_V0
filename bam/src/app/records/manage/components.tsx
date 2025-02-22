import { colorM } from "@/deps/color";
import {
  RevisedButtonM,
  RevisedButtonR,
  RevisedInputJ,
} from "../../components";
import {
  createRef,
  CSSProperties,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Filter } from "mongodb";
import {
  _Pull_Request__Product,
  _Pull_Response__Product,
} from "../../products/api/pull/route";
import { MaterialSymbol } from "material-symbols";
import { DivExt, LoaderM } from "../../baseComponents";
import {
  _Pull_Request__record,
  _Pull_Response__record,
} from "../api/pull/route";
import {
  _Push_Request__record,
  _Push_Response__record,
} from "../api/push/route";
import { _collection } from "@/mTypes/databases";

function uniqueId() {
  return Date.now().toString() + Math.round(Math.random() * 1000).toString();
}

export function UploadToDatabase({
  recordData,
  oldId,
}: {
  recordData: Partial<record>;
  oldId?: string;
}) {
  var [flexibleDiv, flexibleDivTo] = useState<JSX.Element>();
  var router = useRouter();

  function handleSumbitOfData() {
    var error: boolean = false;

    if (!recordData) {
      error = true;
    } else if (
      !recordData.date ||
      !recordData.id ||
      !recordData.items ||
      recordData.items.length == 0
    ) {
      error = true;
    }

    recordData.items?.forEach((d) => {
      if (
        !d.price.each ||
        d.price.each.replaceAll(" ", "") == "" ||
        !d.price.quantity ||
        d.price.quantity.replaceAll(" ", "") == "" ||
        !d.price.total ||
        d.price.total.replaceAll(" ", "") == "" ||
        !d.product.name ||
        d.product.name.replaceAll(" ", "") == "" ||
        !d.product.model ||
        d.product.model.replaceAll(" ", "") == ""
      ) {
        error = true;
      }
    });

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
            icons={[
              "priority_high",
              "format_list_bulleted",
            ]}
          ></LoaderM>
          <br />

          <h3 style={{ textAlign: "center" }}>
            Oops !{" "}
          </h3>
          <h5 style={{ textAlign: "center" }}>
            Not All Fiels were provided Correctly <br />
            Please Fix the errors before trying again.
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
            icons={[
              "cloud",
              "flight",
            ]}
          ></LoaderM>
          <br />

          <h3 style={{ textAlign: "center" }}>
            Uploading Data{" "}
          </h3>
          <h5 style={{ textAlign: "center" }}>
            All Record Datas are being pushed to Database. <br />
            Wait for confirmation.
          </h5>
        </div>
      );

      fetch("/records/api/push", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          collection: "Record" as _collection,
          data: recordData,
          oldRecordId: oldId,
        } as _Push_Request__record.core),
      }).then(
        async (d) => {
          var came: _Push_Response__record.core = await d.json();
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
                  <span style={{fontSize:'32px'}} className="material-symbols-rounded">
                    {"bookmark_check" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    Record Was Included
                  </h3>
                </div>
                <br />
                <h5>
                  The Record was successfully included in database. Either Updated or Inserted. No error
                  was encoured while performing the action. Programmatic
                  variables are as follows,
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
                      router.push("/records");
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
                      router.push("/records/manage");
                      router.refresh();
                    }}
                    HWFs={["1.75rem", "auto", "12px"]}
                    palate={[
                      colorM("green-black-6", 0.4),

                      colorM("green-white-10"),

                      colorM("green-black-0", 0.1),
                    ]}
                    icon="add_card"
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
                  <span style={{fontSize:'32px'}} className="material-symbols-rounded">
                    {"priority_high" as MaterialSymbol}
                  </span>
                  &nbsp;
                  <h3 style={{ fontFamily: "Product Sans Bold" }}>
                    An Error Was Occured
                  </h3>
                </div>
                <br />
                <h5>
                  Record was'nt Included. An error was occured while running
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
                HWFs={['1.75rem','auto','12px']}
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
      style={{
        background: "white",
        width: "calc(450px - 6rem)",
        height: "fit-content",
        padding: "3rem",
        borderRadius: "13px",
      }}
      className="mshadow"
    >
      <h3>Finalize Record</h3>
      <br />
      <br />
      <h5>
        If your are sure that all the data above are correct enough to get
        included in the database, click the button below to commit changes in
        the server.
      </h5>
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

function RecordTypes({
  selectionM,
  prevRecordType,
}: {
  selectionM: (e: "incoming" | "outgoing") => void;
  prevRecordType: "incoming" | "outgoing";
}) {
  var options: { icon: MaterialSymbol; texts: string[] }[] = [
    { icon: "add_business", texts: ["incoming"] },
    { icon: "shopping_cart_checkout", texts: ["outgoing"] },
  ];

  var [currentFocusIndex, currentFocusIndexTo] = useState<number>(
    prevRecordType == "incoming" ? 0 : 1
  );

  var [viewPort, viewPortTo] = useState<JSX.Element>(<></>);

  useEffect(() => {
    viewPortTo(<></>);
    setTimeout(() => {
      viewPortTo(
        <>
          {options.map(({ icon, texts }, i) => (
            <DivExt
              key={i}
              afterClick={() => {
                currentFocusIndexTo(i);

                if (typeof selectionM == "function") {
                  selectionM(texts[0] as "incoming" | "outgoing");
                }
              }}
              style={{
                general: {
                  transitionDuration: "0ms",
                  padding: "1rem",
                  margin: "0 1rem 0 0 ",
                  outlineStyle: currentFocusIndex != i ? "dashed" : "solid",
                  borderRadius: "8px",
                  cursor: "pointer",
                  outlineWidth: currentFocusIndex != i ? "1px" : "3px",

                  color:
                    currentFocusIndex != i
                      ? colorM("blue-black-10", 0.1)
                      : colorM("green-black-6", 0.4),
                  outlineColor:
                    currentFocusIndex != i
                      ? colorM("blue-black-10", 0.1)
                      : colorM("green-black-6", 0.4),
                },
                hover: {
                  outlineColor: colorM("blue-black-10", 0.25),
                  color: colorM("blue-black-10", 0.25),
                },
                active: {},
              }}
            >
              <span
                style={{
                  transitionDuration: "0ms",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    transitionDuration: "0ms",

                    fontSize: "48px",
                    color: "inherit",
                    background: "transparent",
                  }}
                  className="material-symbols-rounded"
                >
                  {icon}
                </span>
                <h3
                  style={{
                    transitionDuration: "0ms",

                    // marginTop: ".5rem",
                    color: "inherit",
                    background: "transparent",
                  }}
                >
                  {/* {texts[0]} */}
                </h3>
              </span>
            </DivExt>
          ))}
        </>
      );
    }, 1);
  }, [currentFocusIndex]);

  return <div style={{ width: "100%", display: "flex" }}>{viewPort}</div>;
}

export function RecordArrangements({
  oldId,
  recordData,
  customerIdPre,
}: {
  oldId?: string;
  recordData?: Partial<record>;
  customerIdPre?: string;
}) {
  var [recordDataFinal, recordDataFinalTo] =
    useState<Partial<record | undefined>>(recordData);

  var [recordId, recordIdTo] = useState<string>(oldId ?? uniqueId());

  var [update, nowUpdate] = useState<number>(0);

  var [customerId, customerIdTo] = useState<string | undefined>(
    customerIdPre ?? recordData?.customerId
  );
  var customerIdInp = useRef<HTMLInputElement | null>();

  var recordIdInp = useRef<HTMLInputElement | null>();
  var [productList, productListTo] = useState<
    {
      product: { name: string; model: string };
      price: { each?: string; total?: string; quantity?: string };
    }[]
  >(
    recordData?.items ?? [
      {
        price: {},
        product: { model: "", name: "" },
      },
    ]
  );

  var [recordType, recordTypeTo] = useState<"incoming" | "outgoing">(
    customerIdPre ? "outgoing" : recordData?.type ?? "incoming"
  );

  var [producListDiv, producListDivTo] = useState<JSX.Element>(<></>);
  var [customerIdArrangementVisibility, customerIdArrangementVisibilityTo] =
    useState<"flex" | "none">(recordType == "outgoing" ? "flex" : "none");

  useEffect(() => {
    if (recordType == "outgoing") {
      customerIdArrangementVisibilityTo("flex");
    } else if (recordType == "incoming") {
      customerIdArrangementVisibilityTo("none");
    }
  }, [recordType]);

  async function getPred({
    keyword,
    of,
    productName,
  }: {
    keyword: string;
    of: "name" | "model";
    productName?: string;
  }): Promise<any[]> {
    if (of == "name") {
      var fields = ["name"];
      var query = { name: { $regex: keyword } } as Filter<Product>;
    } else if (of == "model") {
      var fields = ["models.id"];
      var query = {
        name: { $regex: productName },
        // "models.name": { $regex: keyword },
      } as Filter<Product>;
    }
    return new Promise(async (m, j) => {
      fetch("/products/api/pull", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: "Product",
          fields: fields,
          query: query,
        } as _Pull_Request__Product.core),
      }).then(async (d) => {
        d.json().then(
          (d: _Pull_Response__Product.core) => {
            if ((d.status = "r")) {
              if (of == "model") {
                if (d.data.length == 0) {
                  m([]);
                } else {
                  var models = (d.data as Partial<Product>[])[0].models;
                  var modelNames = models?.map((d) => d.id);
                  m(modelNames ?? []);
                }
              } else if (of == "name") {
                var names = (d.data as Partial<Product>[]).map((d) => d.name);
                m(names);
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

  function FormPredictions({
    predections,
    modelNameInp,
    productNameInp,
    of,
  }: {
    predections?: Array<string>;
    productNameInp: HTMLInputElement;
    modelNameInp: HTMLInputElement;
    of: "name" | "model";
  }) {
    if (!predections) {
      return (
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
          <span
            className="material-symbols-rounded"
            style={{ fontSize: "64px" }}
          >
            {"keyboard" as MaterialSymbol}
          </span>
          <h5>Type To Load Predections</h5>
        </div>
      );
    }
    return (
      <div
        style={{
          width: "100% ",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {predections.length != 0 && (
          <h5 style={{ fontFamily: "Product Sans Bold" }}>
            Select One <br />
            <br />
          </h5>
        )}
        <br />

        <div style={{ overflow: "auto", widows: "100%" }}>
          {predections.map((e, i) => (
            <DivExt
              afterClick={() => {
                if (of == "name") {
                  productNameInp.focus();
                  productNameInp.value = e;
                } else if (of == "model") {
                  modelNameInp.focus();
                  modelNameInp.value = e;
                }
              }}
              key={i}
              style={{
                general: {
                  width: "fit-content",
                  margin: ".1rem 0 0 0",
                  transform: "translateX(0rem)",
                  cursor: "pointer",
                },
                hover: { transform: "translateX(.25rem)" },
                active: {},
              }}
            >
              <h5 style={{ width: "fit-content" }}>
                {i}. {e}
              </h5>
            </DivExt>
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

  function NewProduct({
    product: { model, name },
    price: { each, total, quantity },
    id,
  }: {
    product: { name: string; model: string };
    price: { each?: string; total?: string; quantity?: string };
    id: string | number;
  }) {
    var [preds, predsTo] = useState<string[]>();
    var [keyword, keywordTo] = useState<{
      of: "name" | "model";
      val: string;
      productName?: string;
    }>();

    var [predictionsDiv, predictionsDivTo] = useState<JSX.Element>();
    var productNameInp = useRef<HTMLInputElement | null>();
    var modelNameInp = useRef<HTMLInputElement | null>();
    var quantityInp = useRef<HTMLInputElement | null>();

    var eachPriceInp = useRef<HTMLInputElement | null>();
    var totalPriceInp = useRef<HTMLInputElement | null>();

    useEffect(() => {
      if (!keyword) {
        return;
      }

      predictionsDivTo(
        <div
          style={{
            padding: "1rem 0",
            height: "calc(100% - 2rem)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoaderM HW={["10rem", "auto"]} size="48px" speed={250}></LoaderM>
        </div>
      );

      getPred({
        keyword: keyword?.val!,
        of: keyword?.of!,
        productName: keyword?.productName,
      }).then((m) => {
        predsTo(m);
      });
    }, [keyword?.val]);

    useEffect(() => {
      if (modelNameInp.current) {
        modelNameInp.current.addEventListener("focus", () => {
          if (productNameInp.current?.value != "") {
            keywordTo({
              of: "model",
              val: "",
              productName: productNameInp.current?.value,
            });
          }
        });
      }
    }, [modelNameInp]);

    useEffect(() => {
      if (productNameInp.current) {
        productNameInp.current.addEventListener("focus", () => {
          keywordTo({
            of: "name",
            val: "",
            productName: productNameInp.current?.value,
          });
        });
      }
    }, [productNameInp]);

    useEffect(() => {
      predictionsDivTo(
        <FormPredictions
          of={keyword?.of!}
          productNameInp={productNameInp.current!}
          modelNameInp={modelNameInp.current!}
          predections={preds}
        ></FormPredictions>
      );
    }, [preds]);

    var [calculations, calculationsTo] = useState<JSX.Element>(
      <div style={{ display: "flex", alignItems: "center" }}>
        <RevisedInputJ
          HWFs={["1.75rem", "9rem", "10px"]}
          color={"blue-black-10"}
          focusColor={colorM("green-black-10", 0.6)}
          text="Price (each)"
          generalColor={colorM("green-black-10", 0.25)}
          icon="format_list_numbered"
          inpTracker={(inp) => {
            eachPriceInp.current = inp;
            inp?.addEventListener("keyup", () => {
              nowUpdate((prev) => prev + 1);
              // productList![Number(id)].price.each = inp?.value!;

              var totalPrice =
                Number(inp.value) * Number(quantityInp.current?.value);

              totalPriceInp.current?.setAttribute(
                "value",
                totalPrice.toString()
              );
              productListTo((prev) => {
                prev![Number(id)].price.each = eachPriceInp.current?.value;
                prev![Number(id)].price.total = totalPriceInp.current?.value;
                return prev;
              });
            });
          }}
          defaultsTo={each ?? "13"}
        ></RevisedInputJ>
        &nbsp;&nbsp;<h3 style={{ fontWeight: "100" }}>|</h3>&nbsp;&nbsp;
        <RevisedInputJ
          HWFs={["1.75rem", "9rem", "10px"]}
          color={"blue-black-10"}
          focusColor={colorM("green-black-10", 0.6)}
          text="Total Price"
          generalColor={colorM("green-black-10", 0.25)}
          icon="numbers"
          inpTracker={(inp) => {
            totalPriceInp.current = inp;
            inp?.addEventListener("keyup", () => {
              nowUpdate((prev) => prev + 1);
              // productList![Number(id)].price.total = inp?.value!;

              var eachPrice =
                Number(quantityInp.current?.value) / Number(inp.value);
              eachPriceInp.current?.setAttribute(
                "value",
                eachPrice.toPrecision(2).toString()
              );

              productListTo((prev) => {
                prev![Number(id)].price.total = totalPriceInp.current?.value;
                prev![Number(id)].price.each = eachPriceInp.current?.value;

                return prev;
              });
            });
          }}
          defaultsTo={total ?? "169"}
        ></RevisedInputJ>
      </div>
    );

    return (
      <div
        style={{
          width: "calc(100% - 3rem)",
          padding: "2rem 0rem 2rem 3rem",
          background: "white",
          borderRadius: "13px",
          marginBottom: "1rem",
          position: "relative",
        }}
        className="mshadow"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ width: "50%" }}>
            <div>
              <h5
                style={{
                  fontFamily: "Product Sans Bold",
                }}
              >
                Product Specification
              </h5>

              <div style={{ height: ".75rem" }}></div>
              <RevisedInputJ
                HWFs={["1.75rem", "9rem", "10px"]}
                color={"blue-black-10"}
                focusColor={colorM("green-black-10", 0.6)}
                text="Product Name"
                generalColor={colorM("green-black-10", 0.25)}
                icon="text_fields_alt"
                inpTracker={(inp) => {
                  productNameInp.current = inp;

                  inp?.addEventListener("keyup", () => {
                    nowUpdate((prev) => prev + 1);
                    productListTo((prev) => {
                      prev![Number(id)].product.name =
                        productNameInp.current?.value!;
                      return prev;
                    });
                    setTimeout(() => {
                      keywordTo({
                        of: "name",
                        val: productNameInp.current?.value!,
                      });
                    }, 1000);
                  });
                }}
                defaultsTo={name}
              ></RevisedInputJ>
              <div style={{ height: ".75rem" }}></div>
              <RevisedInputJ
                HWFs={["1.75rem", "15rem", "10px"]}
                color={"blue-black-10"}
                focusColor={colorM("green-black-10", 0.6)}
                text="Product Model"
                generalColor={colorM("green-black-10", 0.25)}
                icon="view_array"
                inpTracker={(inp) => {
                  // recordIdInp.current = inp;
                  modelNameInp.current = inp;
                  inp?.addEventListener("keyup", () => {
                    nowUpdate((prev) => prev + 1);
                    productListTo((prev) => {
                      prev![Number(id)].product.model =
                        modelNameInp.current?.value!;
                      return prev;
                    });
                    // productList![Number(id)].product.model = inp?.value!;
                    setTimeout(() => {
                      keywordTo({
                        of: "model",
                        val: inp.value,
                        productName: productNameInp.current?.value,
                      });
                    }, 1000);
                  });
                }}
                defaultsTo={model}
              ></RevisedInputJ>
            </div>
            <br />
            <div>
              <h5
                style={{
                  fontFamily: "Product Sans Bold",
                }}
              >
                Pricings & Quantity
              </h5>

              <div style={{ height: ".75rem" }}></div>

              <div style={{ display: "flex" }}>
                <RevisedInputJ
                  HWFs={["1.75rem", "7rem", "10px"]}
                  color={"blue-black-10"}
                  focusColor={colorM("green-black-10", 0.6)}
                  text="Quantity"
                  generalColor={colorM("green-black-10", 0.25)}
                  icon="shopping_bag"
                  inpTracker={(inp) => {
                    quantityInp.current = inp;
                    inp?.addEventListener("keyup", () => {
                      nowUpdate((prev) => prev + 1);
                      // productList![Number(id)].price.total = inp?.value!;
                      productListTo((prev) => {
                        prev![Number(id)].price.quantity =
                          quantityInp.current?.value;
                        return prev;
                      });
                    });
                  }}
                  defaultsTo={quantity ?? "13"}
                ></RevisedInputJ>
                &nbsp;&nbsp;&nbsp;
                <RevisedButtonR
                  HWFs={["1.75rem", "auto", "12px"]}
                  radius="7px"
                  // spacingX=".25rem"
                  sinensisAct={() => {
                    var m: any;
                    calculationsTo((prev) => {
                      m = prev;
                      return <div>{prev}</div>;
                    });

                    setTimeout(() => {
                      calculationsTo(m);
                    }, 2000);
                  }}
                  palate={[
                    colorM("orange-white-10"),
                    colorM("orange-black-2", 0.7),
                    colorM("orange-black-0", 0.1),
                  ]}
                  icon="reset_focus"
                  text="Clear"
                ></RevisedButtonR>
              </div>
              <div style={{ height: ".75rem" }}></div>
              {calculations}
              <div style={{ height: "1.75rem" }}></div>

              <div style={{ display: "flex", left: "1rem", bottom: "1rem" }}>
                <RevisedButtonR
                  HWFs={["2rem", "auto", "12px"]}
                  radius="7px"
                  // spacingX=".25rem"
                  reverse={true}
                  sinensisAct={() => {
                    nowUpdate((prev) => prev + 1);
                    productListTo((prev) => {
                      prev[Number(id)] = {
                        product: {
                          name: productNameInp.current?.value!,
                          model: modelNameInp.current?.value!,
                        },
                        price: {
                          each: eachPriceInp.current?.value,
                          total: totalPriceInp.current?.value,
                          quantity: quantityInp.current?.value,
                        },
                      };

                      return prev;
                    });
                  }}
                  palate={[
                    colorM("blue-black-6", 0.4),
                    colorM("blue-white-10"),
                    colorM("blue-black-0", 0.1),
                  ]}
                  icon="sync_saved_locally"
                  text="Save"
                ></RevisedButtonR>
                &nbsp;&nbsp;&nbsp;
                <RevisedButtonR
                  HWFs={["2rem", "auto", "12px"]}
                  radius="7px"
                  // spacingX=".25rem"
                  reverse={true}
                  sinensisAct={() => {
                    productListTo((prev) => {
                      prev = prev?.filter((d, i) => i != id);
                      return prev;
                    });
                  }}
                  palate={[
                    colorM("yellow-black-6", 0.4),
                    colorM("yellow-white-10"),
                    colorM("yellow-black-0", 0.1),
                  ]}
                  icon="delete_sweep"
                  text={"Delete"}
                ></RevisedButtonR>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "calc(45% - 1rem)",
              height: "13rem",
            }}
          >
            {predictionsDiv}
          </div>
          <br />
        </div>
      </div>
    );
  }

  useEffect(() => {
    producListDivTo(
      <>
        {productList?.map((prod, ind) => (
          <NewProduct
            key={ind}
            id={ind}
            price={prod.price}
            product={prod.product}
          ></NewProduct>
        ))}
      </>
    );
  }, [productList?.length]);

  var dateAndTimeDataPortion = createRef<HTMLDivElement>();

  useEffect(() => {
    var jsDate: Date;
    if (dateAndTimeDataPortion.current) {
      var dateAndTimeInps: string[] = [];
      dateAndTimeDataPortion.current.querySelectorAll("input").forEach((d) => {
        dateAndTimeInps.push(d.value);
      });

      var day = Number(dateAndTimeInps[0]);
      var month = Number(dateAndTimeInps[1]);
      var year = Number(dateAndTimeInps[2]);

      var time = dateAndTimeInps[3];
      var hours = Number(time.split(":")[0]);
      var minutes = Number(time.split(":")[1]);

      jsDate = new Date(year, month - 1, day, hours, minutes);
    }

    recordDataFinalTo((prev) => ({
      ...prev,
      date: jsDate,
      id: recordIdInp.current?.value,
      items: productList,
      customerId: customerIdInp.current?.value,
      type: recordType,
    }));
  }, [update]);

  useEffect(() => {
    document.querySelectorAll("input").forEach((i) => {
      i.addEventListener("keyup", () => {
        nowUpdate((prev) => prev + 1);
      });
    });
  }, []);

  return (
    <div
      style={{
        width: "calc(100% - 0rem)",
        borderRadius: "13px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
      }}
    >
      <div>
        <div
          style={{
            background: "white",
            width: "calc(450px - 6rem)",
            height: "fit-content",
            padding: "3rem",
            borderRadius: "13px",
          }}
          className="mshadow"
        >
          <h3>General Info</h3>
          <br />
          <br />
          <h5>
            These are the Product Independent Data of a new record. This portion
            is automatically generated by the browser. You mignt not need to
            edit this portion. Put hand in this portion while editing a record
            or including historical records.
          </h5>
          <br />
          <br />
          <h5 style={{ fontFamily: "Product Sans Bold"}}>
            Unique Credentials
          </h5>
          <div style={{ height: ".75rem" }}></div>

          <div style={{ display: "flex" }}>
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.25)}
              text={`Record Id`}
              generalColor={colorM("green-black-10", 0.3)}
              icon="id_card"
              inpTracker={(inp) => {
                recordIdInp.current = inp;
              }}
              defaultsTo={recordId}
            ></RevisedInputJ>
            &nbsp;
            <RevisedButtonR
              HWFs={["2rem", "auto", "12px"]}
              radius="7px"
              sinensisAct={() => {
                recordIdInp.current?.setAttribute("value", uniqueId());
                // recordIdTo("1234567890");
                nowUpdate((prev) => prev + 1);
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
          <br />
          <div ref={dateAndTimeDataPortion}>
            <h5
              style={{ fontFamily: "Product Sans Bold" }}
            >
              Date and Time
            </h5>
            <div style={{ height: ".75rem" }}></div>

            <div style={{ display: "flex" }}>
              <RevisedInputJ
                HWFs={["2rem", "9rem", "12px"]}
                color={"blue-black-10"}
                focusColor={colorM("green-black-10", 0.25)}
                text="Day"
                generalColor={colorM("green-black-10", 0.3)}
                icon="calendar_today"
                inpTracker={(inp) => {
                  // recordIdInp.current = inp;
                }}
                defaultsTo={
                  recordData?.date
                    ? String(new Date(recordData?.date)?.getDay())
                    : new Date().getDate().toString()
                }
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
                  // recordIdInp.current = inp;
                }}
                defaultsTo={
                  recordData?.date
                    ? String(new Date(recordData?.date)?.getMonth() + 1)
                    : (new Date().getMonth() + 1).toString()
                }
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
                  // recordIdInp.current = inp;
                }}
                defaultsTo={
                  recordData?.date
                    ? String(new Date(recordData?.date)?.getFullYear())
                    : new Date().getFullYear().toString()
                }
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
                // recordIdInp.current = inp;
              }}
              defaultsTo={
                recordData?.date
                  ? String(new Date(recordData?.date)?.getHours()) +
                    ":" +
                    String(new Date(recordData?.date)?.getMinutes())
                  : String(new Date().getHours()) +
                    ":" +
                    String(new Date().getMinutes())
              }
            ></RevisedInputJ>
          </div>
        </div>
        <br />
        <br />

        <UploadToDatabase
          recordData={recordDataFinal!}
          oldId={oldId}
        ></UploadToDatabase>
      </div>
      <div style={{ width: "600px" }}>
        <div
          style={{
            width: "calc(100% - 4rem)",
            padding: "2rem",
            background: "white",
            borderRadius: "13px",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="mshadow"
        >
          <div style={{ width: "250px" }}>
            <h3> Record Specifications</h3>
            <br />
            <br />
            <h6>
              This portion determines whether the record is a incoming product
              record or outgoing product record. If product is arrived at the
              store, you may choose. Record Type to incoming else you have to
              choose outgoing
            </h6>
            <br />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              <RecordTypes
                prevRecordType={recordType}
                selectionM={(recordType) => {
                  nowUpdate((prev) => prev + 1);
                  recordTypeTo(recordType);
                }}
              ></RecordTypes>
            }
          </div>
        </div>

        <div
          style={{
            background: "white",
            width: "calc(100% - 6rem)",
            height: "fit-content",
            padding: "3rem",
            borderRadius: "13px",
            margin: "2rem 0 0 0",
            display: customerIdArrangementVisibility,
            justifyContent: "space-between",
          }}
          className="mshadow"
        >
          <div style={{ width: "calc(50% - 2rem)" }}>
            <h3>Customer Selection</h3>
            <br />
            <br />
            <h6>
              Paste the Customer Id here. But that might be risky. <br />
              <br />
              If not sure about what customer is buying the product. Switch to
              the filter Page.
            </h6>
            <br />
            <br />
            <RevisedInputJ
              HWFs={["2rem", "13rem", "12px"]}
              color={"blue-black-10"}
              focusColor={colorM("green-black-10", 0.6)}
              text="Customer Identity"
              generalColor={colorM("green-black-10", 0.3)}
              icon="id_card"
              inpTracker={(inp) => {
                customerIdInp.current = inp;
                inp?.addEventListener("keyup", () => {
                  nowUpdate((prev) => prev + 1);
                  customerIdTo(customerIdInp.current?.value);
                });
              }}
              defaultsTo={customerIdPre ?? recordData?.customerId}
            ></RevisedInputJ>
          </div>

          <div style={{ width: "50%" }}>
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
              <span
                style={{ fontSize: "48px" }}
                className="material-symbols-rounded"
              >
                {"filter_alt" as MaterialSymbol}
              </span>

              <div style={{ height: ".5rem" }}></div>
              <h6 style={{ width: "50%", textAlign: "center" }}>
                It is recommanded to Load this page from
              </h6>
              <a href="/customers/filter">
                <h5 style={{ fontFamily:'Product Sans Bold' }}>
                  {" "}
                  <i>filter customers page </i>
                </h5>
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />

        {producListDiv}

        <br />
        <br />
        <div style={{ display: "flex", padding: "0 1rem" }}>
          <div
            style={{
              padding: "0rem",
              background: "white",
              borderRadius: "13px",
            }}
            className="mshadow"
          >
            <RevisedButtonR
              HWFs={["2rem", "auto", "12px"]}
              radius="7px"
              sinensisAct={() => {
                nowUpdate((prev) => prev + 1);
                productListTo((prev) => [
                  ...(prev ?? []),
                  {
                    price: {},
                    product: { model: "", name: "" },
                  },
                ]);
              }}
              palate={[
                colorM("green-black-6", 0.6),
                colorM("green-white-10"),

                colorM("green-black-0", 0.1),
              ]}
              icon="add_card"
              text="Add New Product"
            ></RevisedButtonR>
          </div>
          &nbsp;&nbsp;
          <div
            style={{
              padding: "0rem",
              background: "white",
              borderRadius: "13px",
            }}
            className="mshadow"
          >
            <RevisedButtonR
              HWFs={["2rem", "auto", "12px"]}
              radius="7px"
              sinensisAct={() => {
                nowUpdate((prev) => prev + 1);
                productListTo((prev) => {
                  prev = prev?.filter((d, i) => i != productList?.length! - 1);
                  return prev;
                });
              }}
              palate={[
                colorM("red-black-6", 0.5),
                colorM("red-white-10"),

                colorM("red-black-0", 0.1),
              ]}
              icon="remove"
              text="Remove Last"
            ></RevisedButtonR>
          </div>
        </div>
      </div>
    </div>
  );
}
