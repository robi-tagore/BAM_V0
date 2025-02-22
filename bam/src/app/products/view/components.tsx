import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";

export function Rating({
  rating,
  icon,
  size,
}: {
  rating: string;
  icon: MaterialSymbol[];
  size: string;
}) {
  var ratingFull = Number(rating.split(".")[0]);
  var ratingHalf = Number(rating.split(".")[1]) >= 5 ? true : false;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {new Array(ratingFull).fill(13).map((e, i) => (
        <span
          key={i}
          style={{ fontSize: size }}
          className="material-symbols-sharp"
        >
          {icon[0]}
        </span>
      ))}
      {ratingHalf && (
        <span style={{ fontSize: size }} className="material-symbols-outlined">
          {icon[1]}
        </span>
      )}
    </div>
  );
}

export function BrandingM({
  brand,
  styleM,
  descLength,
  compact,
}: {
  brand: brand;
  styleM?: "float" | "dashed";
  descLength?: number;
  compact?: boolean;
}) {
  styleM = styleM ?? "float";
  compact = compact ?? false;
  return (
    <div
      className={styleM == "float" ? "mshadow" : ""}
      style={{
        outline:
          styleM == "dashed"
            ? `1px dashed ${colorM("red-black-10", 0.25)}`
            : "none",
        background: styleM == "float" ? colorM("blue-white-10") : "intitial",
        padding: "1rem",
        borderRadius: "13px",
        width: "calc(100% - 2rem)",
      }}
    >
      {!compact && (
        <>
          <h6>Branding</h6> <br />
          <br />
        </>
      )}
      <h4 style={{ fontFamily: "Product Sans Bold" }}>
        {brand.name}&nbsp;
      </h4>{" "}
      <h6>{brand.rating}</h6>
      <h6 style={{ float: "right" }}>
        <Rating
          icon={["star_rate", "star_rate_half"]}
          rating={brand.rating!}
          size="20px"
        ></Rating>{" "}
      </h6>
      <div style={{ height: ".25rem" }}></div>
      <i>
        <h6>{brand.website}</h6>
      </i>
      <div style={{ height: ".5rem" }}></div>
      <h6>{brand.description.slice(0, descLength)}</h6>
      <div style={{ height: ".5rem" }}></div>
    </div>
  );
}

export function ProductTypeM({
  type,
  styleM,
  descLength,
  compact,
}: {
  type: productType;
  styleM?: "float" | "dashed";
  descLength?: number;
  compact?: boolean;
}) {
  styleM = styleM ?? "float";
  compact = compact ?? false
  return (
    <div
      className={styleM == "float" ? "mshadow" : ""}
      style={{
        outline:
          styleM == "dashed"
            ? `1px dashed ${colorM("red-black-10", 0.25)}`
            : "none",
        background: styleM == "float" ? colorM("blue-white-10") : "intitial",
        padding: "1rem",
        borderRadius: "13px",
        width: "calc(100% - 2rem)",
        height: "fit-content",
      }}
    >
      {!compact && (
        <>
          <h6>Product Type</h6>
          <br />
          <br />
        </>
      )}
      <h5 style={{ fontFamily: "Product Sans Bold" }}>{type.name}&nbsp;</h5>{" "}
      <h6 style={{ float: "right" }}>
        <i> Category</i>
      </h6>
      <div style={{ height: ".5rem" }}></div>
      <h6>{type.description.slice(0, descLength)}</h6>
      <div style={{ height: ".5rem" }}></div>
      <h6>Qualified TLI &nbsp;</h6>
      <h5 style={{ fontFamily: "Product Sans Bold" }}>{type.TLI}</h5>
    </div>
  );
}
