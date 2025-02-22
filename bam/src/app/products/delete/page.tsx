"use client";

import { LoaderM } from "@/app/baseComponents";
import { layout } from "@/deps/constants";
import { MaterialSymbol } from "material-symbols";
import { useSearchParams } from "next/navigation";

export default function DeleteProduct() {
  var param = useSearchParams();
  var productName = param.get("productname");

  return (
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
        HW={["13rem", "13rem"]}
        size="64px"
        speed={1000}
        icons={["front_hand", "warning"]}
        // scaleEffect="1.25"
      ></LoaderM>

      <h3 style={{ fontFamily:'Product Sans Bold' }}>Action Not Permitted !</h3>
      <br />
      {productName && (
        <span>
          <h4>Attempt to Delete</h4>&nbsp;
          <h3 style={{ fontFamily:'Product Sans Bold' }}>{productName}</h3>
        </span>
      )}
      <br />
      <h5 style={{ textAlign: "center" }}>
        It is not Recomanded to delete a product. <br />
        You may not need to delete a product. <i> Try editing it.</i> Let it be
        in database. <br />
      </h5>
      <br />
      <h6>This Page is left blank by the author.</h6>
    </div>
  );
}
