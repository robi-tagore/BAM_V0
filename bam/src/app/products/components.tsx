"use client";

import { colorM } from "@/deps/color";
import { RevisedButtonR } from "../components";
import { useRouter } from "next/navigation";
import { BrandingM, ProductTypeM } from "./view/components";

export function ProductView({
  productData,
  actions,
}: {
  productData: Partial<Product>;
  actions: { delete: boolean; edit: boolean };
}) {
  var routeM = useRouter();

  return (
    <div
      style={{
        overflow: "auto",
        width: "calc(100% - 4rem)",
        padding: "4rem 2rem 2rem 2rem",
        height: "fit-content",
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
          <h6 style={{ fontWeight: "400", wordBreak: "break-all" }}>
            {productData.description.slice(0, 150)} . ...
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
        </div>
      )}
      {(productData.price || productData.models) && (
        <>
          <br />
        </>
      )}
      {productData.type && (
        <>
          <ProductTypeM
            type={productData.type}
            compact={true}
            descLength={13 * 7}
            styleM="dashed"
          ></ProductTypeM>
          <br />
        </>
      )}
      {productData.brand && (
        <>
          <BrandingM
            brand={productData.brand}
            compact={true}
            descLength={13 * 7}
            styleM="dashed"
          ></BrandingM>
          <br />
        </>
      )}
      <div style={{ display: "flex", marginTop: "1rem", flexWrap: "wrap" }}>
        <div style={{ margin: "0 .5rem 0 0" }}>
          <RevisedButtonR
            HWFs={["2.25rem", "auto", "14px"]}
            spacingX=".75rem"
            radius="7px"
            palate={[
              colorM("green-white-10", 1),

              colorM("green-black-6", 0.4),
              colorM("green-black-10", 0),
            ]}
            text={"View"}
            icon={"table_eye"}
            reverse={true}
            sinensisAct={() => {
              routeM.push("/products/view?productname=" + productData.name);
            }}
          ></RevisedButtonR>
        </div>
        {actions["delete"] && (
          <div style={{ margin: ".5rem .5rem 0 0" }}>
            <RevisedButtonR
              HWFs={["2.25rem", "auto", "14px"]}
              spacingX=".75rem"
              radius="7px"
              palate={[
                colorM("red-white-10", 1),

                colorM("red-black-6", 0.4),
                colorM("red-black-10", 0),
              ]}
              text={"Delete"}
              icon={"delete_forever"}
              reverse={true}
              sinensisAct={() => {}}
            ></RevisedButtonR>
          </div>
        )}
        {actions["edit"] && (
          <div style={{ margin: ".5rem .5rem 0 0" }}>
            <RevisedButtonR
              HWFs={["2.25rem", "auto", "14px"]}
              spacingX=".75rem"
              radius="7px"
              palate={[
                colorM("blue-white-10", 1),
                colorM("blue-black-6", 0.4),

                colorM("blue-black-10", 0),
              ]}
              text={"Edit"}
              icon={"edit"}
              reverse={true}
              sinensisAct={() => {
                routeM.push(
                  "/products/manage?action=edit&productname=" + productData.name
                );
              }}
            ></RevisedButtonR>
          </div>
        )}
      </div>
    </div>
  );
}
