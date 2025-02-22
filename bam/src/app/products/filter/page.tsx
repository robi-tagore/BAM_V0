"use client";

import { LoaderM } from "@/app/baseComponents";
import { RevisedButtonR, RevisedInputJ } from "@/app/components";
import { colorM } from "@/deps/color";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProductView } from "../components";
import { Filter } from "mongodb";
import { _collection } from "@/mTypes/databases";
import { MaterialSymbol } from "material-symbols";
import {
  _Pull_Request__Product,
  _Pull_Response__Product,
} from "../api/pull/route";

export default function FilterProduct() {
  var searchParam = useSearchParams();

  var actions = {
    edit: Boolean(searchParam.get("edit")) ?? false,
    delete: Boolean(searchParam.get("delete")) ?? false,
  };

  var [results, resultsTo] = useState<Partial<Product>[] | "loading">(
    "loading"
  );
  var [displayResults, displayResultsTo] = useState<JSX.Element>();
  var [predictions, predictionsTo] = useState<JSX.Element>();

  var [filterTitle, filterTitleTo] = useState<JSX.Element>(
    <>Select What Fields to Fetch</>
  );

  var [query, queryTo] = useState<{
    name: string;
    type: string;
    brand: string;
  }>({ name: "", type: "", brand: "" });

  var typeInp = useRef<HTMLInputElement | null>();
  var brandInp = useRef<HTMLInputElement | null>();
  var nameInp = useRef<HTMLInputElement | null>();

  type fieldM = {
    id: keyof Product;
    text: string;
    icon: MaterialSymbol;
    selected: boolean;
  };
  var fields: fieldM[] = [
    { text: "Name", id: "name", icon: "text_fields", selected: true },
    { text: "Type", id: "type", icon: "category", selected: true },
    { text: "Brand", id: "brand", icon: "brand_family", selected: false },
    {
      text: "Description",
      id: "description",
      icon: "text_fields_alt",
      selected: false,
    },
    { text: "Price", id: "price", icon: "money", selected: true },
    { text: "Models", id: "models", icon: "list_alt_add", selected: false },
  ];

  var [selectedM, selectedMTo] = useState<(keyof Product)[]>(
    fields
      .map((d) => d.id)
      .filter((m) =>
        (["name", "brand", "description"] as (keyof Product)[]).includes(m)
      )
  );

  var [fieldsDiv, fieldsDivTo] = useState<JSX.Element>();

  function SelectionFieldComp({ MRJ }: { MRJ: (keyof Product)[] }) {
    return (
      <>
        {fields.map((constructorField, indexSignature) => (
          <div key={indexSignature} style={{ marginLeft: ".75rem" }}>
            <RevisedButtonR
              HWFs={["1.75rem", "auto", "10px"]}
              // spacingX=".75rem"
              radius="7px"
              palate={
                MRJ.includes(constructorField.id)
                  ? [
                    colorM("green-black-10", 0.4),
                    colorM("green-white-10", 1),
                    colorM("green-white-10", 0),
                    ]
                  : [
                    colorM("green-white-10", 1),
                    colorM("green-black-10", 0.4),
                    colorM("green-white-10", 0),
                    ]
              }
              text={constructorField.text}
              icon={constructorField.icon}
              reverse={true}
              sinensisAct={() => {
                selectedMTo((prev) => {
                  if (prev.includes(constructorField.id)) {
                    prev = prev.filter((d) => d != constructorField.id);
                  } else {
                    prev = [...prev, constructorField.id];
                  }
                  return prev;
                });

                // resultsTo((results) =>
                //   (results as Partial<Product>[]).map((eachOne) => {
                //     var edited: any = {};
                //     Object.keys(eachOne).forEach((key) => {
                //       if (MRJ.includes(key as keyof Product)) {
                //         edited[key] = eachOne[key as keyof Product];
                //       }
                //     });
                //     console.log(edited);

                //     return edited;
                //   })
                // );

                // here
              }}
            ></RevisedButtonR>
          </div>
        ))}
      </>
    );
  }

  useEffect(() => {
    fieldsDivTo(SelectionFieldComp({ MRJ: selectedM }));
  }, [selectedM]);

  useEffect(() => {
    if (nameInp && brandInp && typeInp) {
      nameInp.current?.addEventListener("keyup", (e) => {
        queryTo((prev) => ({ ...prev, name: nameInp.current?.value ?? " " }));
      });
      brandInp.current?.addEventListener("keyup", (e) => {
        queryTo((prev) => ({ ...prev, brand: brandInp.current?.value ?? " " }));
      });
      typeInp.current?.addEventListener("keyup", (e) => {
        queryTo((prev) => ({ ...prev, type: typeInp.current?.value ?? " " }));
      });
    }
  }, [nameInp, brandInp, typeInp]);

  useEffect(() => {
    // var stringComb = "";
    // Object.values(query).forEach((d) => {
    //   stringComb += d;
    // });
    // stringComb = stringComb.replaceAll(" ", "");

    // if (stringComb == "") {
    //   return;
    // }

    resultsTo("loading");
    filterTitleTo(<>Fetching Results</>);
    fetch("/products/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Product",
        fields: selectedM,
        query: {
          $and: [
            { name: { $regex: query.name, $options: "i" } },
            { "brand.name": { $regex: query.brand, $options: "i" } },
            { "type.name": { $regex: query.type, $options: "i" } },
          ],
        } as Filter<Product>,
      } as _Pull_Request__Product.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Product.core) => {
          if ((d.status = "r")) {
            resultsTo(d.data);
            filterTitleTo(
              <span style={{ display: "flex", alignItems: "center" }}>
                <h3>{d.data.length}</h3> &nbsp;Results were Found
              </span>
            );
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, [query, selectedM.length]);

  useEffect(() => {
    if (results == "loading") {
      displayResultsTo(
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <br />
          <br /><br /><br />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="32px"
              speed={2000}
              scaleEffect="1.25"
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
            <LoaderM
              HW={["13rem", "100%"]}
              size="32px"
              speed={1000}
              scaleEffect="1.25"
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
            <LoaderM
              HW={["13rem", "100%"]}
              size="32px"
              speed={2000}
              scaleEffect="1.25"
              icons={["cloud", "cloudy_snowing"]}
            ></LoaderM>
          </div>
          <h3>Fetching Products</h3>
          <h5>Wait patiently until the results have queed</h5>
          <br /><br />
        </div>
      );
    } else if (results?.length == 0) {
      displayResultsTo(
        <div
          style={{
            width: "100%",
            padding: "5rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{ fontSize: "64px" }}
            className="material-symbols-rounded"
          >
            {"blur_off" as MaterialSymbol}
          </span>
          <br />
          <h3>No Results were Found !</h3>
          <div style={{ height: ".25rem" }}></div>
          <h5 style={{ fontWeight: "500", textAlign: "center" }}>
            Use a different keyword. Ignore spaces and special characters
            <br /> Try changing categories and brands.
          </h5>
        </div>
      );
    } else {
      displayResultsTo(
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: "2rem",
          }}
        >
          {results?.map((product, i) => (
            <div
              style={{
                borderRadius: "13px",
                background: colorM("red-white-10"),
                height: "fit-content",
                // outline:`1px solid ${colorM('blue-black-10',.3)}`
              }}
              key={i}
              className="mshadow"
              // className="rshadow"
            >
              <ProductView
                actions={actions}
                key={i}
                productData={product}
              ></ProductView>
            </div>
          ))}
        </div>
      );
    }
  }, [results]);

  return (
    <div style={{ height: "calc(100% - 4rem)", width: "100%" }}>
      <br />
      <br />
      <br />
      <h2 style={{ fontFamily: "Product Sans Bold" }}>
        {" "}
        {actions["delete"] && actions["edit"]
          ? "Filter, Edit or Delete"
          : actions["delete"]
          ? "Filter and Delete"
          : actions["edit"]
          ? "Filter and Edit"
          : "Explore Products"}
      </h2>
      <br />
      <br />

      <h5 style={{ width: "350px" }}>
        This page has been built with a view to help you find and filter a
        particular product. Use the filter below to experiance the filteration.
      </h5>
      <br />
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            padding: "2rem",
            width: "calc(40% - 4rem - 4rem)",
            borderRadius: "13px",
            // background: colorM("red-white-10"),
            outline: `1px dashed ${colorM("blue-black-10", 0.3)}`,
          }}
          // className="mshadow"
          className="rshadow"
        >
          <br />
          <h3>Keywords</h3>
          <br />
          <br />
          <h6>
            Remember the search fields are in or condition, that means any{" "}
            product will be included with matched at least one of the following.
          </h6>
          <br />
          <br />

          <RevisedInputJ
            HWFs={["2rem", "14rem", "14px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.2)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="filter_alt"
            inpTracker={(i) => {
              nameInp.current = i;
            }}
            text="Product Name"
          ></RevisedInputJ>

          <br />
        </div>

        <div
          style={{
            width: "calc(30% - 4rem)",
            // background: colorM("red-white-10"),
            outline: `1px dashed ${colorM("blue-black-10", 0.3)}`,

            padding: "2rem",
            borderRadius: "13px",
          }}
          // className="mshadow"
          className="rshadow"
        >
          <br />
          <h3>Select Category</h3>
          <br />
          <br />
          <h6>
            The Category associated with the Product. If not sure left it blank.
            Result will be indepent of the Category.
          </h6>
          <br />
          <br />
          <RevisedInputJ
            HWFs={["2rem", "13rem", "14px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.2)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="category"
            inpTracker={(i) => {
              typeInp.current = i;
            }}
            text="Product Type"
          ></RevisedInputJ>
        </div>
        <div
          style={{
            width: "calc(30% - 4rem)",
            // background: colorM("red-white-10"),
            outline: `1px dashed ${colorM("blue-black-10", 0.3)}`,

            padding: "2rem",
            borderRadius: "13px",
          }}
          // className="mshadow"
          className="rshadow"
        >
          <br />
          <h3>Select Brand</h3>
          <br />
          <br />
          <h6>
            Specify the Brand of your Product. It is optional. You me be able to
            filter products associated with the Brand.
          </h6>
          <br />
          <br />

          <RevisedInputJ
            HWFs={["2rem", "13rem", "14px"]}
            color={colorM("blue-black-10", 0.5)}
            focusColor={colorM("green-black-10", 0.2)}
            generalColor={colorM("green-black-10", 0.3)}
            icon="brand_family"
            inpTracker={(i) => {
              brandInp.current = i;
            }}
            text="Product Brand"
          ></RevisedInputJ>
        </div>

        {predictions}
      </div>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // flexDirection: "row-reverse",
          justifyContent: "space-between",
          position: "sticky",
          outline: "1px solid " + colorM("blue-black-10", 0.15),
          top: "1rem",
          borderRadius: "1px",
          zIndex: "4",
          backdropFilter: "blur(7px)",
          background: colorM("red-white-10", 0.5),
          padding: "0 .5rem 0 1rem",
        }}
      >
        {" "}
        <div>
          <h3>{filterTitle}</h3>
        </div>
        <div
          style={{
            display: "flex",
            height: "3rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {fieldsDiv}
        </div>
      </div>
      <br />
      <br />
      <div>{displayResults}</div>
      <br />
      <br />
    </div>
  );
}
