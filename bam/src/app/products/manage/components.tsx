"use client";
import { colorM, colorMR } from "@/deps/color";

import React, { createRef, useEffect, useRef, useState } from "react";
import { DivExt, LoaderM } from "@/app/baseComponents";
import { MaterialSymbol } from "material-symbols";
import { useRouter } from "next/navigation";
import { Times } from "@/deps/constants";
import { RevisedInputR, RevisedInputJ, RevisedButtonR } from "@/app/components";
import {
  _Pull_Request__Product,
  _Pull_Response__Product,
} from "../api/pull/route";
import {
  _Push_Request_Product,
  _Push_Response_Product,
} from "../api/push/route";
import { Filter } from "mongodb";

export function SelectProductType({
  ended,
  productData,
}: {
  ended: (v: any) => void;
  productData: Partial<Product>;
}) {
  var [productTypeState, productTypeStateTo] =
    useState<Partial<productType>[]>();
  var ourInput = useRef<HTMLInputElement | null>();

  var [keyword, keywordTo] = useState<string>();

  useEffect(() => {
    if (productData.type) {
      ourInput.current?.focus();
      ourInput.current?.setAttribute("value", productData.type.name);
    }

    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "ProductType",
        fields: ["name", "TLI", "description"],
        query: {
          name: { $regex: keyword ?? "", $options: "i" },
        } as Filter<productType>,
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            console.log(d.data);

            productTypeStateTo(d.data as Partial<productType>[]);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, [keyword]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ width: "50%", marginRight: "3rem" }}>
        <span style={{ display: "flex", alignItems: "end" }}>
          <span className="material-symbols-outlined">
            {"category" as MaterialSymbol}
          </span>
          &nbsp;&nbsp; <h3>Product Type</h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Type'</i> is the type of the product. It will help you
          filter your products from larger scale of products. If you are'nt sure
          select the unknown option, You may edit and fix that later.
        </h5>
        <br />
        <br />
        <h6>Hint : It should'nt be blank</h6>
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("indigo-white-3")}
            text="Product Type"
            generalColor={colorM("indigo-black-9", 0.3)}
            icon="category"
            inpTracker={(inp) => {
              ourInput.current = inp;

              inp?.addEventListener("keyup", () => {
                keywordTo(ourInput.current?.value);
              });
            }}
          ></RevisedInputJ>
          <br />
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["2rem", "auto", "12px"]}
            radius="7px"
            sinensisAct={() => {
              var curVal = ourInput.current?.value;
              if (curVal && curVal.replaceAll(" ", "") != "") {
                var productType = productTypeState?.filter(
                  (d) => d.name == curVal
                )[0];

                if (productType != undefined) {
                  ended(productType);
                }
              }
            }}
            palate={[
              colorM("blue-black-6", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-0", 0.5),
            ]}
            icon="check"
            text="Select"
          ></RevisedButtonR>
        </div>
      </div>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            overflow: "auto",
          }}
        >
          {(() => {
            if (productTypeState == undefined) {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <LoaderM
                    HW={["10rem", "100%"]}
                    size="32px"
                    speed={Times.loaderSpeed.steps}
                    icons={["database", "cloud", "category", "cloud"]}
                    scaleEffect="1.13"
                  ></LoaderM>
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    Cateories Are Being Fetched
                  </h5>
                </div>
              );
            } else {
              return productTypeState.map((d, i) => (
                <DivExt
                  key={i}
                  style={{
                    general: {
                      color: "inherit",
                      cursor: "pointer",
                      width: "fit-content",
                      margin: ".1rem  0 0 0rem",
                    },
                    hover: {
                      color: colorM("blue-black-3", 1),
                      transform: "translateX(1rem)",
                    },

                    active: {},
                  }}
                  afterClick={() => {
                    if (ourInput.current) {
                      ourInput.current.focus();
                      ourInput.current.value = d.name!;
                    }
                  }}
                >
                  <span>
                    <h5 style={{ color: "inherit" }}>
                      {i}. {d.name}{" "}
                    </h5>
                    <h6 style={{ color: "inherit", fontSize: "xx-small" }}>
                      &nbsp;({d.TLI})
                    </h6>
                  </span>
                </DivExt>
              ));
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export function SelectProductBrand({
  ended,
  productData,
}: {
  ended: (v: any) => void;
  productData: Partial<Product>;
}) {
  var [productBrandState, productBrandStateTo] = useState<Partial<brand>[]>();
  var ourInput = useRef<HTMLInputElement | null>();
  var [keyword, keywordTo] = useState<string>();
  useEffect(() => {
    if (productData.brand) {
      ourInput.current?.focus();
      ourInput.current?.setAttribute("value", productData.brand.name);
    }

    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: ["name", "rating", "description", "website"] as (keyof brand)[],
        collection: "Brand",
        query: {
          name: { $regex: keyword ?? "", $options: "i" },
        } as Filter<brand>,
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            console.log(d.data);

            productBrandStateTo(d.data);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, [keyword]);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <div style={{ width: "50%", marginRight: "3rem" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span className="material-symbols-outlined">
            {"brand_family" as MaterialSymbol}
          </span>
          &nbsp;
          <h3>Product Brand</h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Brnad'</i> is the brand of your product. It classifies a
          product's brand or the manufacturer. It will help your customers
          understand the class of your product. If you are'nt sure select the
          unknown option, You may edit and fix that later.
        </h5>
        <br />
        <br />
        <h6>Hint : It should'nt be blank</h6>
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("indigo-white-3")}
            text="Product Brand"
            generalColor={colorM("indigo-black-9", 0.3)}
            icon="brand_family"
            inpTracker={(inp) => {
              ourInput.current = inp;
              keywordTo(ourInput.current?.value);
            }}
          ></RevisedInputJ>
          <br />
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["2rem", "13rem", "12px"]}
            radius="8px"
            sinensisAct={() => {
              var productBrand = productBrandState?.filter(
                (d) => (d.name = ourInput.current?.value)
              )[0];
              if (productBrand) {
                ended(productBrand);
              }
            }}
            palate={[
              colorM("blue-black-6", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-0", 0.5),
            ]}
            icon="check"
            text="Finalize"
          ></RevisedButtonR>
        </div>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            overflow: "auto",
            height: "100%",
            width: "100%",
          }}
        >
          {(() => {
            if (productBrandState == undefined) {
              return (
                <div
                  style={{
                    height: "100",
                    width: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <LoaderM
                    HW={["10rem", "100%"]}
                    size="32px"
                    speed={Times.loaderSpeed.steps}
                    icons={["database", "cloud", "brand_family", "cloud"]}
                    scaleEffect="1.13"
                  ></LoaderM>
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    Brands Are Being Fetched
                  </h5>
                </div>
              );
            } else {
              return productBrandState.map((d, i) => (
                <DivExt
                  key={i}
                  style={{
                    general: {
                      color: "inherit",
                      cursor: "pointer",
                      width: "fit-content",
                      margin: ".1rem  0 0 0rem",
                    },
                    hover: {
                      color: colorM("blue-black-3", 1),
                      transform: "translateX(1rem)",
                    },

                    active: {},
                  }}
                  afterClick={() => {
                    if (ourInput.current) {
                      ourInput.current.focus();
                      ourInput.current.value = d.name!;
                    }
                  }}
                >
                  <span>
                    <h5 style={{ color: "inherit" }}>
                      {i}. {d.name}{" "}
                    </h5>
                    <h6 style={{ color: "inherit", fontSize: "xx-small" }}>
                      &nbsp;({d.rating})
                    </h6>
                  </span>
                </DivExt>
              ));
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export function WriteProductName({
  ended,
  old,
  productData,
}: {
  ended: (v: any) => void;
  old?: string;
  productData: Partial<Product>;
}) {
  var ourInput = useRef<HTMLInputElement | null>();
  var [productListState, productListStateTo] =
    useState<Array<Partial<Product>>>();
  var [keyword, keywordTo] = useState<string>();
  var [invalid, invalidTo] = useState<boolean>(false);
  var productDiv = createRef<HTMLDivElement>();

  var [validityMsg, validityMsgTo] = useState<JSX.Element>();

  function Products({
    keyword,
    data,
  }: {
    keyword: string;
    data: Partial<Product>[] | undefined;
  }) {
    keyword = keyword ?? "";

    return (
      <div>
        {!data && (
          <div
            style={{
              height: "100",
              width: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["10rem", "100%"]}
              size="32px"
              speed={Times.loaderSpeed.steps}
              icons={["database", "cloud", "shopping_cart", "cloud"]}
              scaleEffect="1.13"
            ></LoaderM>
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              Products Are Being Fetched
            </h5>
          </div>
        )}
        <div ref={productDiv}>
          {data?.map((d, i) => {
            if (!d.name) {
              return;
            }

            var isMatched = new RegExp(keyword.toLowerCase()).test(
              d.name.toLocaleLowerCase()
            );

            if (!isMatched) {
              return;
            }
            return (
              <div key={i} style={{ height: "fit-content" }}>
                <div
                  style={{
                    // height: show ? "100%" : "0",
                    display: isMatched ? "block" : "none",
                    // opacity: show ? "100%" : "0",
                    marginTop: ".1rem",
                  }}
                >
                  <h5>
                    {i}. {d.name}
                  </h5>{" "}
                  <h6>({d.type?.name})</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (productData.name) {
      ourInput.current?.focus();
      ourInput.current?.setAttribute("value", productData.name);
    }
    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Product",
        fields: ["name", "type.name"],
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            if (old) {
              var dataNew = d.data?.filter(({ name }) => name != old);
            } else {
              var dataNew = d.data;
            }

            productListStateTo(dataNew);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });

    ourInput.current?.addEventListener("keyup", (e) => {
      var value = ourInput.current?.value;
      keywordTo(value);
    });
  }, []);

  useEffect(() => {
    invalidTo(false);

    if (productListState) {
      productListState.forEach(({ name }) => {
        if (
          name?.toLocaleLowerCase().replaceAll(" ", "") ==
          keyword?.toLocaleLowerCase().replaceAll(" ", "")
        ) {
          invalidTo(true);
        }
      });

      if (productDiv.current?.children.length == 0) {
        validityMsgTo(
          <div>
            <h3 style={{ fontFamily: "Product Sans Bold" }}>Great Name !</h3>
            <div style={{ height: ".25rem" }}></div>
            <h5>
              The Name is'nt closer to any other Product's Name, it's Super
              Unique. You may use it if its valid, have an eye on the button.
            </h5>
          </div>
        );
      } else {
        validityMsgTo(<></>);
      }
    }
  }, [keyword]);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <div style={{ width: "50%", marginRight: "3rem" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <span className="material-symbols-outlined">
            {"edit_document" as MaterialSymbol}
          </span>
          &nbsp; <h3>Name </h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Name'</i> is the unique name of your product. Its the main
          identification of your product. You may have 1 on 1 Produt name vs
          Product It's uneditable. Write it carefully.
        </h5>
        <br />
        <br />
        <h6>Hint : Make it unique, provide the brand name</h6>
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={
              invalid ? colorM("red-black-3") : colorM("green-black-10", 0.4)
            }
            text="Product Name"
            generalColor={
              invalid ? colorM("red-black-3") : colorM("green-black-10", 0.5)
            }
            icon="edit_document"
            inpTracker={(inp) => {
              ourInput.current = inp;
            }}
          ></RevisedInputJ>
          <br />
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["2rem", "13rem", "12px"]}
            radius="7px"
            sinensisAct={() => {
              if (
                !invalid &&
                ourInput.current?.value &&
                ourInput.current?.value.replaceAll(" ", "") != ""
              ) {
                ended(ourInput.current?.value);
              }
            }}
            palate={[
              invalid ? colorM("red-black-3") : colorM("blue-black-10", 0.5),
              colorM("blue-white-10"),
              invalid ? colorM("red-black-3") : colorM("blue-black-10", 0.1),
            ]}
            icon={!invalid ? "edit" : "error"}
            text={!invalid ? "Write" : "Oops"}
          ></RevisedButtonR>
        </div>
        <br />
        <div>
          {!keyword || keyword.length == 0 ? (
            ""
          ) : (
            <h5
              style={{
                color: invalid
                  ? colorM("red-black-2")
                  : colorM("green-black-2"),
              }}
            >
              {invalid ? "The name is already taken!" : "The name is valid"}
            </h5>
          )}
        </div>
      </div>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* <h6 style={{ fontFamily:'Product Sans Bold' }}>
          If empty, your Product name is unique.
        </h6>
        <br /> */}
        {/* <br />
        <h6>
          Here are some already listed Products in the database make sure that
          your current product name doesn'nt mactch any of these.
        </h6>
        <br /> */}
        <div style={{ overflow: "auto" }}>
          <Products data={productListState} keyword={keyword!}></Products>
          {validityMsg}
        </div>
      </div>
    </div>
  );
}

export function WriteProductDesc({
  ended,
  productData,
}: {
  ended: (v: any) => void;
  productData: Partial<Product>;
}) {
  var ourInput = useRef<HTMLTextAreaElement | null>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div style={{ width: "calc(50% - 3rem)" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <span className="material-symbols-outlined">
            {"description" as MaterialSymbol}
          </span>
          &nbsp; <h3>Description </h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Description'</i> is optional description, let you describe
          the prduct non briefly. It's a good practice to write product
          description. So be patient to write it.
        </h5>
        <br />
        <br />
        <h6>Hint : Describe the product in brief</h6>
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <br />
          <RevisedButtonR
            HWFs={["2rem", "13rem", "12px"]}
            radius="7px"
            sinensisAct={() => {
              if (ourInput.current && ourInput.current?.value != "") {
                ended(ourInput.current?.value);
              }
            }}
            palate={[
              colorM("blue-black-10", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-10", 0.1),
            ]}
            icon="edit"
            text="Finalize Description"
          ></RevisedButtonR>
        </div>
        <br />
        <div></div>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "50% ",
        }}
      >
        <br />
        <h4 style={{ fontFamily: "Product Sans Bold" }}>How to write</h4>
        <br />
        <h6>
          Try to include the color, weight, special features etc in the
          description, use bullets, icons and other decorative elements as
          needed.
        </h6>
        <br />
        <br />
        <RevisedInputR
          height="10rem"
          width="100%"
          color={"blue-black-10"}
          focusColor={colorM("blue-black-1")}
          text="Product Description"
          generalColor={colorM("indigo-black-9", 0.4)}
          icon="text_fields"
          inpTracker={(inp) => {
            ourInput.current = inp;
          }}
          defaultsTo={productData.description}
        ></RevisedInputR>
      </div>
    </div>
  );
}

// export function WriteProductModels({
//   ended,
//   productData,
// }: {
//   ended: (v: any) => void;
//   productData: Partial<Product>;
// }) {
//   var modelCountInp = useRef<HTMLInputElement | null>();

//   var [modelsCount, modelsCountTo] = useState<number>(1);
//   var [modelDiv, modelDivTo] = useState<JSX.Element>();

//   function Model({ index }: { index: number }) {
//     index++;
//     var [PropValPairCount, PropValPairCountTo] = useState<number>(1);
//     var [shadowElm, shadowElmTo] = useState<number[]>([]);

//     function PropVal({ subIndex }: { subIndex: number }) {
//       subIndex++;
//       return (
//         <div style={{ display: "flex", width: "100%", marginBottom: ".75rem" }}>
//           <RevisedInputJ
//             HWFs={["1.75rem", "50%", "12px"]}
//             color={"blue-black-10"}
//             focusColor={colorM("green-black-10", 0.2)}
//             text={`Property ${subIndex}`}
//             generalColor={colorM("green-black-10", 0.3)}
//             icon="key"
//             inpTracker={(inp) => {
//               // ourInput.current = inp;
//             }}
//           ></RevisedInputJ>
//           <span style={{ width: ".5rem" }}></span>
//           <RevisedInputJ
//             HWFs={["1.75rem", "50%", "12px"]}
//             color={"blue-black-10"}
//             focusColor={colorM("green-black-10", 0.2)}
//             text={`Value ${subIndex}`}
//             generalColor={colorM("green-black-10", 0.3)}
//             icon="text_fields"
//             inpTracker={(inp) => {
//               // ourInput.current = inp;
//             }}
//           ></RevisedInputJ>
//         </div>
//       );
//     }

//     useEffect(() => {
//       shadowElmTo(new Array(PropValPairCount).fill(13));
//     }, [PropValPairCount]);

//     return (
//       <div
//         style={{
//           outline: `1px dashed ${colorM("blue-black-10", 0.2)}`,
//           padding: "1rem 1rem",
//           borderRadius: "13px",
//           margin: "1rem 0 ",
//         }}
//       >
//         <h4 style={{ fontFamily: "Product Sans Bold" }}>Model {index}</h4>
//         <br />
//         <br />
//         <RevisedInputJ
//           HWFs={["2rem", "75%", "12px"]}
//           color={"blue-black-10"}
//           focusColor={colorM("green-black-10", 0.3)}
//           text="Model Id"
//           generalColor={colorM("green-black-10", 0.4)}
//           icon="id_card"
//           inpTracker={(inp) => {
//             // modelCountInp.current = inp;
//           }}
//         ></RevisedInputJ>
//         <br />
//         <h5>General Properties</h5>
//         <div style={{ height: ".75rem" }}></div>
//         <div>
//           {shadowElm.map((d, i) => (
//             <PropVal key={i} subIndex={i}></PropVal>
//           ))}
//         </div>
//         <div style={{ display: "flex" }}>
//           <RevisedButtonR
//             HWFs={["1.75rem", "auto", "12px"]}
//             radius="7px"
//             spacingX=".5rem"
//             sinensisAct={() => {
//               PropValPairCountTo((prev) => prev + 1);
//             }}
//             palate={[
//               colorM("green-black-6", 0.5),
//               colorM("green-white-10"),
//               colorM("green-black-0", 0.1),
//             ]}
//             icon="add"
//             text="Add More"
//           ></RevisedButtonR>
//           <span style={{ width: ".5rem" }}></span>
//           <RevisedButtonR
//             HWFs={["1.75rem", "auto", "12px"]}
//             radius="7px"
//             spacingX=".5rem"
//             sinensisAct={() => {
//               PropValPairCountTo((prev) => prev - 1);
//             }}
//             palate={[
//               colorM("red-black-6", 0.5),
//               colorM("red-white-10"),
//               colorM("red-black-0", 0.1),
//             ]}
//             icon="remove"
//             text="Remove"
//           ></RevisedButtonR>
//         </div>
//       </div>
//     );
//   }

//   var modelDivForData = createRef<HTMLDivElement>();
//   useEffect(() => {
//     modelDivTo(
//       <>
//         {new Array(modelsCount).fill(13).map((m, i) => (
//           <Model index={i} key={i}></Model>
//         ))}
//       </>
//     );
//   }, [modelsCount]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         height: "calc(100% + 2rem)",
//       }}
//     >
//       <div style={{ width: "calc(50% - 2rem)" }}>
//         <span style={{ display: "flex", alignItems: "center" }}>
//           {" "}
//           <span className="material-symbols-outlined">
//             {"list_alt" as MaterialSymbol}
//           </span>
//           &nbsp; <h3>Models </h3>
//         </span>
//         <br />
//         <br />
//         <h5>
//           <i>'Product Models'</i> will just store model information.You'll have
//           command over variations of your product, be careful not to provide
//           'Price' independently.
//         </h5>
//         <br />
//         <br />
//         <h6>Hint : Select number of Models then create.</h6>
//         <br />
//         <br />
//         <div style={{ display: "flex" }}>
//           <RevisedInputJ
//             HWFs={["2rem", "50%", "12px"]}
//             color={"blue-black-10"}
//             focusColor={colorM("green-black-10", 0.3)}
//             text="N Models"
//             generalColor={colorM("green-black-10", 0.4)}
//             icon="format_list_numbered"
//             inpTracker={(inp) => {
//               modelCountInp.current = inp;
//             }}
//           ></RevisedInputJ>
//           &nbsp;&nbsp;
//           <RevisedButtonR
//             HWFs={["2rem", "50%", "12px"]}
//             radius="7px"
//             sinensisAct={() => {
//               modelsCountTo(Number(modelCountInp.current?.value!));
//             }}
//             palate={[
//               colorM("blue-black-10", 0.5),
//               colorM("blue-white-10"),
//               colorM("blue-black-10", 0.1),
//             ]}
//             icon="rainy_light"
//             text="Generate"
//           ></RevisedButtonR>
//         </div>
//         <br /> <br />
//         <RevisedButtonR
//           HWFs={["2.25rem", "13rem", "12px"]}
//           radius="7px"
//           sinensisAct={() => {
//             var dataM: Object[] = [];

//             var models = modelDivForData.current?.children;

//             new Array(models?.length).fill(13).forEach((elem, index) => {
//               var model = models?.item(index);
//               var inputsWithModelId = model?.querySelectorAll("input");
//               var modelId = inputsWithModelId?.item(0).value;

//               var inputs: NodeListOf<HTMLInputElement> | any = [];

//               inputsWithModelId?.forEach((inp, i) => {
//                 if (i != 0) {
//                   inputs.push(inp);
//                 }
//               });

//               var data: Object = {};

//               var i = 0;
//               while (i < inputs!.length) {
//                 var key: string = inputs[i].value;
//                 var value = inputs[i + 1].value;

//                 if (key.replaceAll(" ", "") != "") {
//                   data = { ...data, [key]: value };
//                 }
//                 i += 2;
//               }
//               if (modelId?.replaceAll(" ", "") != "") {
//                 dataM.push({
//                   id: modelId,
//                   properties: data,
//                 } as Partial<Product>);
//               }
//             });

//             ended([...dataM, ...(productData.models ?? [])]);
//           }}
//           palate={[
//             colorM("green-black-4", 0.7),
//             colorM("blue-white-10"),
//             colorM("green-black-3", 0.1),
//           ]}
//           icon="list_alt_add"
//           text="Include These Models"
//         ></RevisedButtonR>
//       </div>

//       <div
//         style={{
//           height: "100%",
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           width: "50% ",
//         }}
//       >
//         <div style={{ overflowY: "auto", padding: ".25rem" }}>
//           <h4 style={{ fontFamily: "Product Sans Bold" }}>Write and Add</h4>
//           <br />
//           <h6>Don't create empty Prop Val Pairs.</h6>
//           <br />
//           <div ref={modelDivForData}>{modelDiv}</div>
//         </div>
//         <br />
//       </div>
//     </div>
//   );
// }

export function WriteProductModels({
  ended,
  productData,
}: {
  ended: (v: any) => void;
  productData: Partial<Product>;
}) {
  var [modelsM, modelsMTo] = useState<modelN[]>(
    productData.models ? productData.models : []
  );

  var [finalData, finalDataTo] = useState<modelN[]>(modelsM);

  function Model({ index, modelData }: { index: number; modelData: modelN }) {
    var [keyValComplex, keyValComplexTo] = useState<Object>(
      Object.keys(modelData.properties).length == 0
        ? { "property 0": "value 0" }
        : modelData.properties
    );

    var [save, saveNow] = useState<number>(0);

    var [propertyKeys, propertyKeysTo] = useState<string[]>(
      Object.keys(keyValComplex)
    );
    var [propertyValues, propertyValuesTo] = useState<string[]>(
      Object.values(keyValComplex)
    );
    var modelNameInp = useRef<HTMLInputElement | null>();

    useEffect(() => {
      var propObj = {};
      propertyKeys.forEach((key, iM) => {
        var keyM = propertyKeys[iM];
        var valM = propertyValues[iM];
        propObj = { ...propObj, [keyM]: valM };
      });

      finalDataTo((prev) => {
        prev[index] = {
          properties: propObj,
          id: modelNameInp.current?.value,
        } as modelN;
        return prev;
      });
    }, [
      propertyKeys,
      propertyValues,
      modelNameInp.current?.value,
      modelNameInp.current,
      modelNameInp,
      save,
    ]);

    function PropVal({
      subIndex,
      keyM,
      valueM,
    }: {
      subIndex: number;
      keyM?: string;
      valueM?: string;
    }) {
      return (
        <div style={{ display: "flex", width: "100%", marginBottom: ".75rem" }}>
          <RevisedInputJ
            HWFs={["1.75rem", "50%", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.2)}
            text={`Property ${subIndex}`}
            generalColor={colorM("green-black-10", 0.3)}
            icon="key"
            inpTracker={(inp) => {
              // ourInput.current = inp;
              inp?.addEventListener("keyup", (ev) => {
                propertyKeysTo((prev) => {
                  prev[subIndex] = inp.value;
                  return prev;
                });
              });
            }}
            defaultsTo={keyM}
          ></RevisedInputJ>
          <span style={{ width: ".5rem" }}></span>
          <RevisedInputJ
            HWFs={["1.75rem", "50%", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.2)}
            text={`Value ${subIndex}`}
            generalColor={colorM("green-black-10", 0.3)}
            icon="text_fields"
            inpTracker={(inp) => {
              // ourInput.current = inp;

              inp?.addEventListener("keyup", (ev) => {
                propertyValuesTo((prev) => {
                  prev[subIndex] = inp.value;
                  return prev;
                });
              });
            }}
            defaultsTo={valueM}
          ></RevisedInputJ>
        </div>
      );
    }

    return (
      <div
        style={{
          outline: `1px dashed ${colorM("blue-black-10", 0.2)}`,
          padding: "1rem 1rem",
          borderRadius: "13px",
          margin: "1rem 0 ",
          position: "relative",
        }}
      >
        <h4 style={{ fontFamily: "Product Sans Bold" }}>Model {index}</h4>
        <br />
        <br />
        <RevisedInputJ
          HWFs={["2rem", "75%", "12px"]}
          color={"blue-black-10"}
          focusColor={colorM("green-black-10", 0.3)}
          text="Model Id"
          generalColor={colorM("green-black-10", 0.4)}
          icon="id_card"
          inpTracker={(inp) => {
            modelNameInp.current = inp;
          }}
          defaultsTo={modelData?.id}
        ></RevisedInputJ>
        <br />
        <h5>General Properties</h5>
        <div style={{ height: ".75rem" }}></div>
        <div>
          {propertyKeys.map((d, i) => {
            var key = propertyKeys[i];
            var val = propertyValues[i];
            return (
              <PropVal key={i} subIndex={i} keyM={key} valueM={val}></PropVal>
            );
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <RevisedButtonR
            HWFs={["1.75rem", "auto", "12px"]}
            radius="7px"
            spacingX=".25rem"
            sinensisAct={() => {
              propertyKeysTo((prev) => {
                prev = [...prev, ""];
                return prev;
              });
              propertyValuesTo((prev) => {
                prev = [...prev, ""];
                return prev;
              });
            }}
            palate={[
              colorM("green-white-10"),

              colorM("green-black-6", 0.5),
              colorM("green-black-0", 0.1),
            ]}
            icon="add"
            text=""
          ></RevisedButtonR>
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["1.75rem", "auto", "12px"]}
            radius="7px"
            spacingX=".25rem"
            sinensisAct={() => {
              // PropValPairCountTo((prev) => prev - 1);
              propertyKeysTo((prev) => {
                prev = prev.filter((d, ind) => ind != prev.length - 1);
                return prev;
              });
              propertyValuesTo((prev) => {
                prev = prev.filter((d, ind) => ind != prev.length - 1);
                return prev;
              });
            }}
            palate={[
              colorM("red-white-10"),

              colorM("red-black-6", 0.5),
              colorM("red-black-0", 0.1),
            ]}
            icon="remove"
            text=""
          ></RevisedButtonR>{" "}
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["1.75rem", "auto", "10px"]}
            radius="7px"
            spacingX=".5rem"
            sinensisAct={() => {
              saveNow((prev) => prev + 1);
            }}
            palate={[
              colorM("pink-black-6", 0.5),
              colorM("pink-white-10"),
              colorM("pink-black-0", 0.1),
            ]}
            icon="sync"
            text="Save This"
          ></RevisedButtonR>
        </div>

        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <RevisedButtonR
            HWFs={["1.5rem", "auto", "12px"]}
            radius="7px"
            spacingX=".25rem"
            sinensisAct={() => {
              finalDataTo((prev) => {
                prev = prev.filter((d, i) => index != i);
                return prev;
              });
            }}
            palate={[
              colorM("red-white-10"),
              colorM("red-black-6", 0.5),
              colorM("red-black-0", 0.1),
            ]}
            icon="close"
            text=""
          ></RevisedButtonR>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "calc(100% + 3rem)",
      }}
    >
      <div style={{ width: "calc(50% - 2rem)" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {" "}
          <span className="material-symbols-outlined">
            {"list_alt" as MaterialSymbol}
          </span>
          &nbsp; <h3>Models </h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Models'</i> will just store model information.You'll have
          command over variations of your product, be careful not to provide
          'Price' independently.
        </h5>
        <br />
        <br />
        <h6>Hint : Select number of Models then create.</h6>
        <br />
        <br />
        {/* <div style={{ display: "flex" }}>
          <RevisedButtonR
            HWFs={["2rem", "50%", "12px"]}
            radius="7px"
            sinensisAct={() => {
              finalDataTo((prev) => {
                prev = [
                  ...prev,
                  { id: `Model!@#$%^&*()  ${prev.length}`, properties: {} },
                ];
                return prev;
              });
            }}
            palate={[
              colorM("blue-black-10", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-10", 0.1),
            ]}
            icon="list_alt_add"
            text="Add Model"
          ></RevisedButtonR>
          &nbsp;&nbsp;
          <RevisedButtonR
            HWFs={["2rem", "50%", "12px"]}
            radius="7px"
            sinensisAct={() => {
              finalDataTo((prev) => {
                prev = prev.filter((d, iM) => iM != prev.length - 1);
                return prev;
              });
            }}
            palate={[
              colorM("blue-black-10", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-10", 0.1),
            ]}
            icon="delete_sweep"
            text="Remove Last"
          ></RevisedButtonR>
        </div> */}
        <br /> <br />
        <RevisedButtonR
          HWFs={["2.25rem", "13rem", "12px"]}
          radius="7px"
          sinensisAct={() => {
            ended([...finalData]);
          }}
          palate={[
            colorM("green-black-4", 0.7),
            colorM("blue-white-10"),
            colorM("green-black-3", 0.1),
          ]}
          icon="list_alt_add"
          text="Include These Models"
        ></RevisedButtonR>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "50% ",
        }}
      >
        <div style={{ overflowY: "auto", padding: ".25rem" }}>
          <h4 style={{ fontFamily: "Product Sans Bold" }}>Write and Add</h4>
          <br />
          <h6>Don't create empty Prop Val Pairs.</h6>
          <br />
          <div>
            {finalData.map((modelC, modelIndex) => (
              <Model
                index={modelIndex}
                key={modelIndex}
                modelData={modelC}
              ></Model>
            ))}
          </div>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <RevisedButtonR
            HWFs={["2rem", "50%", "12px"]}
            radius="7px"
            sinensisAct={() => {
              finalDataTo((prev) => {
                prev = [
                  ...prev,
                  { id: `Model!@#$%^&*()  ${prev.length}`, properties: {} },
                ];
                return prev;
              });
            }}
            palate={[
              colorM("green-white-10"),
              colorM("green-black-7", 0.5),
              colorM("green-black-10", 0.1),
            ]}
            icon="list_alt_add"
            text="Add Model"
          ></RevisedButtonR>
          &nbsp;&nbsp;
          <RevisedButtonR
            HWFs={["2rem", "50%", "12px"]}
            radius="7px"
            sinensisAct={() => {
              finalDataTo((prev) => {
                prev = prev.filter((d, iM) => iM != prev.length - 1);
                return prev;
              });
            }}
            palate={[
              colorM("red-white-10"),
              colorM("red-black-7", 0.5),
              colorM("red-black-10", 0.1),
            ]}
            icon="delete_sweep"
            text="Remove Last"
          ></RevisedButtonR>
        </div>
      </div>
    </div>
  );
}
export function WriteProductPrice({
  ended,
  productData,
}: {
  ended: (v: any) => void;
  productData: Partial<Product>;
}) {
  var ourInput = useRef<HTMLInputElement | null>();

  useEffect(() => {
    if (productData.price) {
      ourInput.current?.focus();
      ourInput.current?.setAttribute("value", productData.price);
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <div style={{ width: "50%", marginRight: "3rem" }}>
        {/* <h2 style={{ fontFamily:'Product Sans Bold' }}>Step 1 : &nbsp;</h2> */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {" "}
          <span className="material-symbols-outlined">
            {"price_change" as MaterialSymbol}
          </span>
          &nbsp; <h3>Price </h3>
        </span>
        <br />
        <br />
        <h5>
          <i>'Product Price'</i> is the base price of your product excluding all
          kinds of discounts. It should be unchangeable.
        </h5>
        <br />
        <br />
        <h6>Hint : Be careful provding the price</h6>
        <br />
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-10", 0.4)}
            text="Product Price"
            generalColor={colorM("green-black-10", 0.5)}
            icon="price_change"
            inpTracker={(inp) => {
              ourInput.current = inp;
            }}
          ></RevisedInputJ>
          <br />
          <span style={{ width: ".5rem" }}></span>
          <RevisedButtonR
            HWFs={["2rem", "13rem", "12px"]}
            radius="7px"
            sinensisAct={() => {
              if (ourInput.current?.value != "" && ourInput.current?.value) {
                ended(ourInput.current?.value);
              }
            }}
            palate={[
              colorM("blue-black-10", 0.5),
              colorM("blue-white-10"),
              colorM("blue-black-10", 0.1),
            ]}
            icon="edit"
            text="Finalize"
          ></RevisedButtonR>
        </div>
        <br />
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h4 style={{ fontFamily: "Product Sans Bold" }}>A Great Fact !</h4>
        <br />
        <h6>
          About 75% of the development of the project was done at midnight. And
          it was started when Bangladesh was strugging against acrbaot
          government. The project got light of ending after Bangladesh got
          second independence. The power and kingdom was handed over to sir Dr
          Muhammad Younus.
        </h6>
        <br />
      </div>
    </div>
  );
}

export function UploadToDatabase({
  product,
  oldName,
}: {
  product: Partial<Product>;
  oldName?: string;
}) {
  var [resultDiv, resultDivTo] = useState<any>();

  useEffect(() => {
    resultDivTo(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span
          style={{ fontSize: "6rem" }}
          className="material-symbols-outlined"
        >
          {"data_table" as MaterialSymbol}
        </span>
        <br />
        <h4 style={{ fontFamily: "Product Sans Bold" }}>
          Push Data To Database
        </h4>
        <h5 style={{ textAlign: "center" }}>
          Browser has saved all data. Push them to Database to save them in
          server.
        </h5>
      </div>
    );
  }, []);

  var router = useRouter();
  var [processEnded, processEndedTo] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "calc(50% - 4rem)",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <h3 style={{ fontFamily: "Product Sans Bold" }}>Confirmation</h3>
          <br />
          <br />
          <h6 style={{ fontWeight: "600" }}>
            All 7 steps were successfully done. Please review the details,
            credentials and data on the right side. If everything seems ok,
            click the button below to make changes in the database.
          </h6>
          <br />
          <br />
          <h5 style={{ fontFamily: "Product Sans Bold" }}> {product.name}</h5>
          <br />
          <div style={{ height: ".25rem" }}></div>
          <h6>
            After you click the button a new Product will be created with this
            name. The name itself is unique, but an unique id will be created,
            you may store it manually.
          </h6>
          <br />
          <br />
          <br />
          <RevisedButtonR
            HWFs={["2.25rem", "13rem", "12px"]}
            radius="7px"
            sinensisAct={async () => {
              if (processEnded) return;
              processEndedTo(true);

              if (
                product.brand &&
                product.description &&
                product.description &&
                product.models &&
                product.name &&
                product.price &&
                product.type
              ) {
                resultDivTo(
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <LoaderM
                      HW={["10rem", "100%"]}
                      size="32px"
                      speed={Times.loaderSpeed.steps}
                      scaleEffect="1.13"
                      icons={["cloud", "flight"]}
                    ></LoaderM>
                    <h3>Making Changes in Database</h3>
                    <h5>Product Datas are being pushed to database.</h5>
                  </div>
                );
                fetch("/products/api/push", {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    collection: "Product",
                    data: product,
                    oldName: oldName,
                  } as _Push_Request_Product.core),
                }).then(
                  async (d) => {
                    var came: _Push_Response_Product.core = await d.json();
                    console.log("FJRM", came);

                    if (came.status == "r") {
                      resultDivTo(
                        <div>
                          <div style={{ width: "100%" }}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span
                                style={{ fontSize: "32px" }}
                                className="material-symbols-rounded"
                              >
                                {"bookmark_check" as MaterialSymbol}
                              </span>
                              &nbsp;
                              <h3 style={{ fontFamily: "Product Sans Bold" }}>
                                Product Was Included
                              </h3>
                            </div>
                            <br />
                            <h5>
                              The product was successfully included in database.
                              No error was encoured while performing the action.
                              Programmatic Credentials are as follows,
                            </h5>
                            <br /> <br />
                            <br />
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                                  router.push("/products");
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
                                  router.push("/products/manage?action=add");
                                  router.refresh();
                                }}
                                HWFs={["1.75rem", "auto", "12px"]}
                                palate={[
                                  colorM("green-black-6", 0.4),

                                  colorM("green-white-10"),

                                  colorM("green-black-0", 0.1),
                                ]}
                                icon="shopping_cart"
                                text="Add One"
                                // reverse={true}
                                radius="100px"
                                spacingX=".75rem"
                              ></RevisedButtonR>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (came.status == "m") {
                      processEndedTo(false);
                      resultDivTo(
                        <div>
                          <div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span
                                style={{ fontSize: "32px" }}
                                className="material-symbols-rounded"
                              >
                                {"priority_high" as MaterialSymbol}
                              </span>
                              &nbsp;
                              <h3 style={{ fontFamily: "Product Sans Bold" }}>
                                An Error Was Occured
                              </h3>
                            </div>
                            <br />
                            <h5>
                              Product was'nt Included. An error was occured
                              while running the process. It may be the network
                              issue, else there might be something else. Try
                              understanding the error from the below, or contact
                              the developer.
                            </h5>
                            <br /> <br />
                            <br />
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
                        </div>
                      );
                    }
                  },
                  () => {}
                );
              } else {
                resultDivTo(
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <LoaderM
                      HW={["13rem", "100%"]}
                      size="32px"
                      speed={1000}
                      icons={["priority_high", "format_list_bulleted"]}
                    ></LoaderM>
                    <br />

                    <h3 style={{ textAlign: "center" }}>Oops ! </h3>
                    <h5 style={{ textAlign: "center" }}>
                      Not All Fiels were provided Correctly <br />
                      Please Fix the errors before trying again.
                    </h5>
                  </div>
                );
              }
            }}
            palate={[
              colorM("green-black-5", 0.5),
              colorM("green-white-10"),
              colorM("green-black-10", 0.1),
            ]}
            icon="commit"
            text="Commit Changes"
          ></RevisedButtonR>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {resultDiv}
        </div>
      </div>
    </div>
  );
}

export function SuccessDialogue({
  icon,
  subtitle,
  title,
}: {
  icon: MaterialSymbol;
  title: string;
  subtitle: string;
}) {
  return (
    <span
      style={{
        fontFamily: "Product Sans Bold",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{ fontSize: "4rem", marginRight: "1rem", fontWeight: "200" }}
        className="material-symbols-rounded"
      >
        {icon as MaterialSymbol}
      </span>
      <div>
        <h5>{title}</h5>
        <br />
        <h3> {subtitle}</h3>
      </div>
    </span>
  );
}

export function AuxEdit({ ended }: { ended: (v: any) => void }) {
  var ourInput = useRef<HTMLInputElement | null>();
  var [productListState, productListStateTo] =
    useState<Array<Partial<Product>>>();
  var [keyword, keywordTo] = useState<string>();
  var [invalid, invalidTo] = useState<boolean>(false);
  var productDiv = createRef<HTMLDivElement>();
  var [validityMsg, validityMsgTo] = useState<JSX.Element>();

  var [editArramgements, editArramgementsTo] = useState<JSX.Element>();

  var [inputVisibility, inputVisibilityTo] = useState<"block" | "none">("none");
  function Products({
    keyword,
    data,
  }: {
    keyword: string;
    data: Partial<Product>[] | undefined;
  }) {
    keyword = keyword ?? "";

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "auto",
        }}
      >
        {!data && (
          <div
            style={{
              height: "100",
              width: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="32px"
              speed={Times.loaderSpeed.steps}
              icons={["database", "cloud", "shopping_cart", "cloud"]}
              scaleEffect="1.13"
            ></LoaderM>
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              Fetching Existing Product Data{" "}
            </h5>
          </div>
        )}
        <div ref={productDiv}>
          {data?.map((d, i) => {
            if (!d.name) {
              return;
            }

            var isMatched = new RegExp(keyword.toLowerCase()).test(
              d.name.toLocaleLowerCase()
            );

            if (!isMatched) {
              return;
            }
            return (
              <DivExt
                afterClick={() => {
                  editArramgementsTo(
                    <div>
                      <br />
                      <span
                        style={{
                          outline:
                            "1px dashed " + colorM("blue-black-10", 0.25),
                          borderRadius: "7px",
                          padding: ".25rem .5rem",
                          width: "fit-content",
                        }}
                      >
                        <h4 style={{ fontFamily: "Product Sans Bold" }}>
                          {d.name}
                        </h4>
                      </span>
                      <br />
                      <br />
                      <RevisedButtonR
                        sinensisAct={() => {
                          ended(d.name);
                        }}
                        HWFs={["2.25rem", "auto", "14px"]}
                        palate={[
                          colorM("green-white-10"),
                          colorM("green-black-6", 0.5),

                          colorM("green-black-0", 0.1),
                        ]}
                        icon="edit"
                        text="Edit Now"
                        // reverse={true}
                        radius="7px"
                        spacingX=".75rem"
                      ></RevisedButtonR>
                    </div>
                  );
                }}
                key={i}
                style={{
                  general: {
                    height: "fit-content",
                    width: "fit-content",
                    overflowX: "hidden",
                    cursor: "pointer",
                    transform: "TranslateX(0rem)",
                  },
                  hover: { transform: "TranslateX(1rem)" },
                  active: {},
                }}
                // style={{ height: "fit-content",cursor:'pointer' }}
              >
                <div
                  style={{
                    // height: show ? "100%" : "0",
                    display: isMatched ? "block" : "none",
                    // opacity: show ? "100%" : "0",
                    marginTop: ".1rem",
                  }}
                >
                  <h5>
                    {i}. {d.name}
                  </h5>{" "}
                  <h6>({d.type?.name})</h6>
                </div>
              </DivExt>
            );
          })}
        </div>

        {validityMsg}
      </div>
    );
  }

  useEffect(() => {
    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Product",
        fields: ["name", "type.name"],
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            productListStateTo(d.data);
            inputVisibilityTo("block");
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });

    ourInput.current?.addEventListener("keyup", (e) => {
      var value = ourInput.current?.value;
      keywordTo(value);
    });
  }, []);

  useEffect(() => {
    invalidTo(true);

    if (productListState) {
      productListState.forEach(({ name }) => {
        if (
          name?.toLocaleLowerCase().replaceAll(" ", "") ==
          keyword?.toLocaleLowerCase().replaceAll(" ", "")
        ) {
          invalidTo(false);
        }
      });

      if (productDiv.current?.children.length == 0) {
        validityMsgTo(
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "calc(100% - 2rem)",
            }}
          >
            <span
              style={{ fontSize: "32px" }}
              className="material-symbols-rounded"
            >
              {"running_with_errors" as MaterialSymbol}
            </span>
            <br />
            <h3
              style={{ fontFamily: "Product Sans Bold", textAlign: "center" }}
            >
              Not Found !
            </h3>
            <div style={{ height: ".25rem" }}></div>
            <h6
              style={{ fontFamily: "Product Sans Bold", textAlign: "center" }}
            >
              No Product was found associated with that name. Please try a
              different keyword.
            </h6>
          </div>
        );
      } else {
        validityMsgTo(<></>);
      }
    }
  }, [keyword]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {" "}
        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontSize: "32px" }}
            className="material-symbols-rounded"
          >
            {"edit" as MaterialSymbol}
          </span>{" "}
          <h3 style={{ fontFamily: "Product Sans Bold" }}>
            &nbsp;Edit a Product{" "}
          </h3>
        </span>
        <br />
        <h4 style={{ fontFamily: "Product Sans Bold" }}>
          Wait, Select and Edit
        </h4>
        <div style={{ height: ".25rem" }}></div>
        <span style={{ width: "90%" }}>
          <h6>
            Wait for the products to load. Use the searchbar to filter products
            among then. Then hit Edit to edit that completely. If you Edit a
            product it will be updated in the database
          </h6>
        </span>
        <br />
        <h6>Hint : Use the filter to filter among products.</h6>
        <br />
        {editArramgements}
      </div>

      <div
        style={{
          width: "calc(50% - 2rem)",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "4rem",
            width: "100%",
            display: inputVisibility,
          }}
        >
          <RevisedInputJ
            HWFs={["2rem", "13rem", "12px"]}
            color={"blue-black-10"}
            focusColor={colorM("green-black-3")}
            text="Search Product"
            generalColor={colorM("green-black-9", 0.3)}
            icon="search_insights"
            inpTracker={(inp) => {
              ourInput.current = inp;
            }}
          ></RevisedInputJ>
        </div>

        <div
          style={{
            height: "calc(100% - 4rem)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Products data={productListState} keyword={keyword!}></Products>
        </div>
      </div>
    </div>
  );
}
