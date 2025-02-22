"use client";
import { colorM } from "@/deps/color";
import { useEffect, useState } from "react";
import {
  AuxEdit,
  SelectProductBrand,
  SelectProductType,
  SuccessDialogue,
  UploadToDatabase,
  WriteProductDesc,
  WriteProductModels,
  WriteProductName,
  WriteProductPrice,
} from "./components";
import { MaterialSymbol } from "material-symbols";
import { layout, Times } from "@/deps/constants";
import { useSearchParams } from "next/navigation";
import { RevisedButtonR } from "@/app/components";
import { LoaderM } from "@/app/baseComponents";
import {
  _Pull_Request__Product,
  _Pull_Response__Product,
} from "../api/pull/route";
import { BrandingM, ProductTypeM } from "../view/components";

export default function AddNewProduct() {
  var searchParam = useSearchParams();
  var action: "edit" | "add" | any = searchParam.get("action") ?? "add";

  var [productData, productDataTo] = useState<Partial<Product>>({});
  var [step, stepTo] = useState(action == "edit" ? 0 : 1);
  var [stepDiv, stepDivTo] = useState<JSX.Element>();
  var [old, oldTo] = useState<string | undefined>();

  function makeUpdateFixture(productName: string) {
    oldTo(productName);
    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Product",
        fields: [],
        query: { name: productName },
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            if (Object.keys(d.data).length == 0) {
              stepTo(0);
              // throw new Error(" No product was found")
            } else {
              productDataTo((prev) => ({
                prev,
                ...(d.data[0] as Partial<Product>),
              }));
              stepTo(1);
            }
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }

  useEffect(() => {
    var pName = searchParam.get("productname");
    if (pName) {
      oldTo(pName);
      makeUpdateFixture(pName);
    }
  }, []);

  useEffect(() => {
    if (step == 0) {
      stepDivTo(
        <AuxEdit
          ended={(productName) => {
            makeUpdateFixture(productName);
          }}
        ></AuxEdit>
      );
    } else if (step == 1) {
      stepDivTo(
        <SelectProductType
          productData={productData}
          ended={(v) => {
            productDataTo((prev) => ({ ...prev, type: v }));
            stepTo(2);
          }}
        />
      );
    } else if (step == 2) {
      stepDivTo(
        <SuccessDialogue
          icon="category"
          title="Step 1 completed"
          subtitle={`Product Type set to ${productData.type?.name}`}
        />
      );
      setTimeout(() => {
        stepDivTo(
          <SelectProductBrand
            productData={productData}
            ended={(v) => {
              productDataTo((prev) => ({ ...prev, brand: v }));
              stepTo(3);
            }}
          />
        );
      }, Times.stayFor.steps);
    } else if (step == 3) {
      stepDivTo(
        <SuccessDialogue
          icon="brand_family"
          title="Step 2 completed"
          subtitle={`Brand set to ${productData.brand?.name}`}
        />
      );

      setTimeout(() => {
        stepDivTo(
          <WriteProductName
            productData={productData}
            ended={(v) => {
              productDataTo((prev) => ({ ...prev, name: v }));
              stepTo(4);
            }}
            old={old}
          />
        );
      }, Times.stayFor.steps);
    } else if (step == 4) {
      stepDivTo(
        <SuccessDialogue
          icon="edit_document"
          title="Step 3 was completed"
          subtitle={`Product Name set to ${productData.name}`}
        />
      );
      setTimeout(() => {
        stepDivTo(
          <WriteProductDesc
            productData={productData}
            ended={(v) => {
              productDataTo((prev) => ({ ...prev, description: v }));
              stepTo(5);
            }}
          ></WriteProductDesc>
        );
      }, Times.stayFor.steps);
    } else if (step == 5) {
      stepDivTo(
        <SuccessDialogue
          icon="text_fields"
          title="Step 4 was completed"
          subtitle={`Product Description set to ${(
            productData.description ?? ""
          ).slice(0, 25)} ...`}
        />
      );

      setTimeout(() => {
        stepDivTo(
          <WriteProductModels
            productData={productData}
            ended={(v) => {
              productDataTo((prev) => ({ ...prev, models: v }));
              stepTo(6);
            }}
          ></WriteProductModels>
        );
      }, Times.stayFor.steps);
    } else if (step == 6) {
      stepDivTo(
        <SuccessDialogue
          icon="list_alt"
          title="Step 6 was completed"
          subtitle={`${productData.models?.length} Models were Added`}
        />
      );
      setTimeout(() => {
        stepDivTo(
          <WriteProductPrice
            productData={productData}
            ended={(v) => {
              productDataTo((prev) => ({ ...prev, price: v }));
              stepTo(7);
            }}
          ></WriteProductPrice>
        );
      }, Times.stayFor.steps);
    } else if (step == 7) {
      stepDivTo(
        <SuccessDialogue
          icon="price_change"
          title="Step 7 was completed"
          subtitle={`Product Price was set to ${productData.price}`}
        />
      );

      setTimeout(() => {
        stepDivTo(
          <UploadToDatabase
            oldName={old}
            product={productData as Product}
          ></UploadToDatabase>
        );
      }, Times.stayFor.steps);
    }
  }, [step]);

  var [displayDiv, displayDivTo] = useState<JSX.Element>();

  useEffect(() => {
    var icons: MaterialSymbol[] = [
      "category",
      "brand_family",
      "edit_document",
      "text_fields",
      "list_alt",
      "price_change",
      "sentiment_excited",
    ];

    if (Object.keys(productData).length == 0) {
      displayDivTo(
        <div
          style={{
            height: "100",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              margin: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span
              style={{ fontSize: "64px" }}
              className="material-symbols-outlined"
            >
              {action == "edit"
                ? ("cloud" as MaterialSymbol)
                : ("data_info_alert" as MaterialSymbol)}
            </span>
            <br />
            <h4 style={{ fontFamily: "Product Sans Bold" }}>
              {action == "edit" ? "Fetching Product" : "No Data To Show !"}
            </h4>
            <div style={{ height: ".25rem" }}></div>
            <h5 style={{ fontWeight: "400", textAlign: "center" }}>
              {action == "edit"
                ? "Browser is Fetching existing data from database. Wait to view existing state."
                : "Add Data to Load Preview. As soon as you confirm or enter a data will appear here. Your may recheck them."}
            </h5>
          </div>
        </div>
      );
      return;
    }
    displayDivTo(
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <LoaderM
          HW={["15rem", "100%"]}
          size="48px"
          speed={Times.loaderSpeed.preview}
          icons={[icons[step - 1], "network_intelligence_history"]}
        ></LoaderM>
        <h3>Updating</h3>
      </div>
    );

    setTimeout(() => {
      displayDivTo(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {productData && (
            <div
              style={{
                overflow: "auto",
                height: "calc(100% - 8rem)",
                width: "calc(100% - 4rem)",
                padding: "2rem",
              }}
            >
              {productData.name && (
                <div>
                  <h3>{productData.name}</h3>
                  <br />
                  <br />
                  <br />
                </div>
              )}
              {productData.description && (
                <div>
                  <h6 style={{ fontWeight: "500", wordBreak: "break-all" }}>
                    {productData.description.slice(0, 250)} . ...
                  </h6>
                  <br />
                  <br />
                </div>
              )}{" "}
              {productData.price && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    {productData.price} Tk{" "}
                  </h5>
                  &nbsp;
                  <h5>was Base Price</h5>
                </div>
              )}
              {productData.models && (
                <div>
                  <h5 style={{ fontFamily: "Product Sans Bold" }}>
                    {productData.models.length} Models{" "}
                  </h5>
                  &nbsp;
                  <h5>were added</h5>
                  <br />
                  <br />
                  <br />
                </div>
              )}
              {productData.type && (
                <ProductTypeM
                  type={productData.type}
                  styleM="dashed"
                  descLength={13 * 13}
                  compact={true}
                ></ProductTypeM>
              )}
              <br />
              {productData.brand && (
                <BrandingM
                  brand={productData.brand}
                  styleM="dashed"
                  descLength={13 * 13}
                  compact={true}
                ></BrandingM>
              )}
            </div>
          )}
        </div>
      );
    }, Times.stayFor.previewLoader);
  }, [productData]);
  return (
    <div
      style={{
        width: "100%",
        height: layout.availableSpace,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem 0",
        }}
      >
        <div style={{ display: "flex", float: "left" }}>
          {step > 1 && (
            <>
              <RevisedButtonR
                HWFs={["1.75rem", "auto", "12px"]}
                palate={[
                  colorM("red-white-10"),

                  colorM("red-black-6", 0.4),
                  colorM("red-black-0", 0.1),
                ]}
                text={"Go To Step " + (step - 1)}
                reverse={true}
                radius="7px"
                spacingX=".75rem"
                sinensisAct={() => {
                  stepTo((prev) => prev - 1);
                }}
              ></RevisedButtonR>
              &nbsp;&nbsp;
            </>
          )}{" "}
          {step < 7 && (
            <RevisedButtonR
              HWFs={["1.75rem", "auto", "12px"]}
              palate={[
                colorM("blue-white-10"),

                colorM("blue-black-6", 0.4),
                colorM("blue-black-0", 0.1),
              ]}
              text={"Go To Step " + (step + 1)}
              radius="7px"
              spacingX=".75rem"
              sinensisAct={() => {
                stepTo((prev) => prev + 1);
              }}
            ></RevisedButtonR>
          )}
        </div>
        <br />
      </div>

      <div
        style={{
          width: "100%",
          height: "calc(100% - 8rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="mshadow"
          style={{
            width: "calc(60% - 4rem )",
            height: "calc(100% - 6rem)",
            background: colorM("red-white-10"),
            padding: "3rem 4rem",

            borderRadius: "13px",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {stepDiv}
          </div>
        </div>

        <div
          className="mshadow"
          style={{
            width: "calc(40% - 6rem)",
            height: "100%",
            background: colorM("red-white-10"),
            borderRadius: "13px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {displayDiv}
          </div>
        </div>
      </div>
    </div>
  );
}
