"use client";

import { LoaderM } from "@/app/baseComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { colorM } from "@/deps/color";
import { BrandingM, ProductTypeM } from "./components";
import { RevisedButtonR } from "@/app/components";
import { Filter } from "mongodb";
import {
  _Pull_Request__Product,
  _Pull_Response__Product,
} from "../api/pull/route";
import { layout } from "@/deps/constants";
import { IconAndData } from "@/app/customers/components";
import { MiniRecord } from "@/app/records/filter/components";

function RecordsM({ records }: { records?: Partial<record>[] }) {
  if (!records) return;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {records?.map((d, i) => (
        <div key={i} style={{ margin: "2rem 2rem 0 0 " }}>
          <MiniRecord recordata={d}></MiniRecord>
        </div>
      ))}
    </div>
  );
}

interface stock {
  model: string;
  count: number;
}

function ProductViewSelf({ productData }: { productData?: Partial<Product> }) {
  if (!productData) return;

  var [recordLoaderView, recordLoaderViewTo] = useState<boolean>(true);
  var [recordList, recordListTo] = useState<Partial<record>[]>();

  var [notExists, notExistsTo] = useState<boolean>();

  var [moneyIn, moneyInTo] = useState(0);
  var [moneyOut, moneyOutTo] = useState(0);

  var [quantityIn, quantityInTo] = useState(0);
  var [quantityOut, quantityOutTo] = useState(0);

  useEffect(() => {
    if (!recordList) return;

    recordList
      .map(({ items, type }) =>
        items
          ?.filter(({ product: { name } }) => name == productData.name)
          .map(({ product: { name }, price: { quantity, total } }) => {
            return { name, type, quantity, total };
          })
      )
      .flat(1)
      .forEach((m) => {
        if (m?.type == "incoming") {
          moneyInTo((prev) => prev + Number(m.total));
          quantityInTo((prev) => prev + Number(m.quantity));
        } else if (m?.type == "outgoing") {
          moneyOutTo((prev) => prev + Number(m.total));
          quantityOutTo((prev) => prev + Number(m.quantity));
        }
      });
  }, [recordList]);

  useEffect(() => {
    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Record",
        fields: [],
        query: {
          "items.product.name": productData.name,
        } as Filter<record>,
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            recordListTo(d.data as Partial<record>[]);
            recordLoaderViewTo(false);
            if (!d.data[0]) {
              notExistsTo(true);
              recordLoaderViewTo(false);
            }
            console.log(d.data[0]);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  var route = useRouter();
  return (
    <div>
      <br />
      <br />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              padding: "2rem",
              background: colorM("blue-white-10"),
              borderRadius: "13px",
              width: "fit-content",
              height: "fit-content",
              // outline: "1px dashed " + colorM("blue-black-10", 0.3),
            }}
            className="mshadow"
          >
            <h5>General Details</h5>
            <br />
            <br />
            <h3 style={{ fontFamily: "Product Sans Bold" }}>
              {productData.name}
            </h3>
            <div style={{ height: ".25rem" }}></div>
            <div style={{ width: "26rem" }}>
              <h5 style={{ lineHeight: "1.25" }}>{productData.description}</h5>
            </div>
            <br />
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              {productData.models?.length} Models
            </h5>
            &nbsp;&nbsp;&nbsp;
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              {productData.price} Tk
            </h5>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <RevisedButtonR
                HWFs={["2rem", "auto", "12px"]}
                spacingX=".75rem"
                radius="7px"
                palate={[
                  colorM("green-white-10", 1),
                  colorM("green-black-6", 0.4),

                  colorM("green-black-10", 0),
                ]}
                text={"Edit This Product"}
                icon={"edit"}
                reverse={true}
                sinensisAct={() => {
                  route.push(
                    "/products/manage/?action=edit&productname=" +
                      productData!.name
                  );
                }}
              ></RevisedButtonR>{" "}
              &nbsp;&nbsp;&nbsp;
              <RevisedButtonR
                HWFs={["2rem", "auto", "12px"]}
                spacingX=".75rem"
                radius="7px"
                palate={[
                  colorM("red-white-10", 1),
                  colorM("red-black-6", 0.4),

                  colorM("red-black-10", 0),
                ]}
                text={"Delete This Forever"}
                icon={"delete_forever"}
                reverse={true}
                sinensisAct={() => {
                  route.push(
                    "/products/delete?productname=" + productData.name
                  );
                }}
              ></RevisedButtonR>
            </div>
          </div>

          <br />

          <div style={{ display: recordList ? "block" : "none" }}>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <IconAndData
                data={
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    {quantityIn - quantityOut} left
                  </h5>
                }
                icon="shopping_bag"
                size="28px"
                weightM="100"
              ></IconAndData>
              &nbsp;&nbsp;
              <IconAndData
                data={<h5 style={{ fontFamily: "Proxima" }}>{moneyIn}</h5>}
                icon="arrow_downward_alt"
                size="32px"
                weightM="100"
              ></IconAndData>
              &nbsp;&nbsp;
              <IconAndData
                data={<h5 style={{ fontFamily: "Proxima" }}>{moneyOut}</h5>}
                icon="arrow_upward_alt"
                size="32px"
                weightM="100"
              ></IconAndData>
              &nbsp;&nbsp;
              <IconAndData
                data={
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    {moneyOut - moneyIn}
                  </h5>
                }
                icon={moneyOut - moneyIn > 0 ? "trending_up" : "trending_down"}
                size="32px"
                weightM="100"
              ></IconAndData>
              &nbsp;&nbsp;
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <IconAndData
                data={
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    Total Profit :{" "}
                    {(moneyOut / quantityOut - moneyIn / quantityIn) *
                      quantityOut}
                  </h5>
                }
                icon={
                  (moneyOut / quantityOut - moneyIn / quantityIn) *
                    quantityOut >
                  0
                    ? "moving"
                    : "warning"
                }
                size="24px"
                weightM="300"
              ></IconAndData>
              &nbsp;&nbsp;
              <IconAndData
                data={
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    Average Profit :{" "}
                    {moneyOut / quantityOut - moneyIn / quantityIn}
                  </h5>
                }
                icon={
                  (moneyOut / quantityOut - moneyIn / quantityIn) *
                    quantityOut >
                  0
                    ? "moving"
                    : "warning"
                }
                size="24px"
                weightM="300"
              ></IconAndData>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "350px",
            }}
          >
            <BrandingM brand={productData.brand!}></BrandingM>
            <br />
            <ProductTypeM type={productData.type!}></ProductTypeM>
          </div>
        </div>
      </div>{" "}
      <br />
      <hr
        style={{
          border: "none",
          background: colorM("blue-black-10", 0.15),
          height: "1px",
        }}
      />
      <br />
      <br />
      <div
        style={{
          borderRadius: "13px",
          width: "fit-content",
        }}
      >
        <IconAndData
          data={<h3>All Available Models ({productData.models?.length})</h3>}
          icon="format_list_bulleted"
          size="32px"
          weightM="100"
        ></IconAndData>

        <br />

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {productData.models?.map((model, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                margin: "1rem 1rem 0 0",
                outline: "1px dashed " + colorM("blue-black-10", 0.25),
                borderRadius: "7px",
                background: colorM("red-white-10", 0.6),
                width: "200px",
              }}
              // className="mshadow"
            >
              <IconAndData
                data={
                  <h4 style={{ fontFamily: "Product Sans Bold" }}>
                    {model.id}
                  </h4>
                }
                icon="contextual_token"
              ></IconAndData>
              <br />
              {new Array(Object.keys(model.properties).length)
                .fill(13)
                .map((d, index) => {
                  var prop = Object.keys(model.properties)[index];
                  var val = Object.values(model.properties)[index];

                  return (
                    <div key={index} style={{}}>
                      <h5 style={{ textTransform: "capitalize" }}>
                        {prop} ~ &nbsp;
                      </h5>
                      <h5
                        style={{
                          textTransform: "uppercase",
                          fontFamily: "Product Sans Bold",
                        }}
                      >
                        {(val as String).slice(0, 15)}
                      </h5>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <hr
        style={{
          border: "none",
          background: colorM("blue-black-10", 0.15),
          height: "1px",
        }}
      />
      <br />
      <br />
      <IconAndData
        data={<h3>Records Assigned With this Product &nbsp;</h3>}
        icon="unknown_document"
        size="28px"
      ></IconAndData>
      <br />
      <div style={{ width: "100%" }}>
        <div
          style={{
            height: layout.availableSpace,
            display: recordLoaderView ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "100%"]}
            size="52px"
            speed={1000}
            icons={["cloud", "unknown_document"]}
          ></LoaderM>
          <br />
          <br />
          <h3>Fetching Records</h3>
          <span>
            <h5>Records of product named </h5>&nbsp;
            <h4 style={{ fontFamily: "Product Sans Bold" }}>
              {productData.name}
            </h4>
            &nbsp;
            <h5>is being fetched</h5>
          </span>{" "}
          <br />
        </div>

        <div
          style={{
            display: !recordLoaderView ? "block" : "none",
          }}
        >
          <RecordsM records={recordList}></RecordsM>
        </div>

        {notExists && (
          <div
            style={{
              height: layout.availableSpace,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="52px"
              speed={1000}
              icons={["blur_off", "directory_sync"]}
            ></LoaderM>
            <br />
            <br />
            <h3 style={{ fontFamily: "Product Sans Bold" }}>Not Found !</h3>

            <h5
              style={{ fontWeight: "500", width: "250px", textAlign: "center" }}
            >
              No Record was found associated with this Product
            </h5>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default function ViewPage() {
  var params = useSearchParams();
  var productName = params.get("productname");
  var route = useRouter();
  var [productData, productDataTo] = useState<Partial<Product>>();
  var [productViewPort, productViewPortTo] = useState<JSX.Element>(<></>);

  var [productLoaderView, productLoaderViewTo] = useState<boolean>(true);
  var [notExists, notExistsTo] = useState<boolean>();

  useEffect(() => {
    if (!productName) {
      setTimeout(() => {
        route.push("/products/filter");
      }, 5000);
      return;
    }

    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Product",
        fields: [],
        query: {
          name: productName,
        } as Filter<Document>,
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            productDataTo(d.data[0] as Partial<Product>);

            if (!d.data[0]) {
              notExistsTo(true);
              productLoaderViewTo(false);
            }
            console.log(d.data[0]);
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  useEffect(() => {
    if (productData) {
      productLoaderViewTo(false);
    }
  }, [productData]);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          height: layout.availableSpace,
          display: productName && productLoaderView ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["13rem", "100%"]}
          size="52px"
          speed={1000}
          icons={["cloud", "shopping_cart"]}
        ></LoaderM>
        <br />
        <br />
        <h3>Fetching Product</h3>
        <span>
          <h5>Product </h5>&nbsp;
          <h4 style={{ fontFamily: "Product Sans Bold" }}>{productName}</h4>
          &nbsp;
          <h5>is being fetched</h5>
        </span>
        <br />
      </div>

      <div
        style={{
          height: layout.availableSpace,
          width: "100%",
          display: !productName ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <LoaderM
          HW={["13rem", "100%"]}
          size="52px"
          speed={1000}
          icons={["blur_off", "priority_high"]}
        ></LoaderM>
        <br />
        <br />
        <h3 style={{ fontFamily: "Product Sans Bold" }}>No Product Name !</h3>
        <br />
        <h5 style={{ fontWeight: "400", textAlign: "center" }}>
          URL has'nt any Product Name. <br />
          You may have typed the URL manually. <br />
          If so use format{" "}
          <span style={{ fontFamily: "Product Sans Bold" }}>
            /products/manage/name=| Product Name |
          </span>
        </h5>
      </div>

      {notExists == true && (
        <div
          style={{
            height: layout.availableSpace,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "100%"]}
            size="52px"
            speed={1000}
            icons={["blur_off", "directory_sync"]}
          ></LoaderM>
          <br />
          <br />
          <h3 style={{ fontFamily: "Product Sans Bold" }}>Not Found !</h3>

          <h5
            style={{ fontWeight: "500", width: "250px", textAlign: "center" }}
          >
            No Product was found with that name. The Link may have been typed
            manually. Try with a differnet name.
          </h5>
        </div>
      )}

      <div
        style={{
          display:
            productName && productLoaderView && !notExists ? "none" : "block",
        }}
      >
        <ProductViewSelf productData={productData}></ProductViewSelf>
      </div>
    </div>
  );
}
