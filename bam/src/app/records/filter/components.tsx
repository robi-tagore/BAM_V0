import { RevisedButtonR } from "@/app/components";
import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { useRouter } from "next/navigation";

export function MiniRecord({ recordata }: { recordata: Partial<record> }) {
  recordata.date = new Date(recordata.date!);

  var annualPrice = 0;
  recordata.items?.forEach(({ price: { total } }) => {
    annualPrice += Number(total);
  });

  var route = useRouter();

  return (
    <div
      style={{
        width: "calc(100% - 6rem)",
        padding: "3rem",
        height: "fit-content",
        background: "white",
        borderRadius: "13px",
        position: "relative",
      }}
      className="mshadow"
    >
      <div style={{ position: "absolute", top: "2.25rem", right: "2.25rem" }}>
        <span
          style={{
            fontSize: "2.5rem",
            color:
              recordata.type == "outgoing"
                ? colorM("green-black-5", 0.6)
                : colorM("blue-black-5", 0.6),
          }}
          className="material-symbols-rounded"
        >
          {recordata.type == "outgoing"
            ? "shopping_cart_checkout"
            : ("add_business" as MaterialSymbol)}
        </span>
      </div>

      {recordata.id && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontSize: "24px" }}
            className="material-symbols-rounded"
          >
            {"unknown_document" as MaterialSymbol}
          </span>
          &nbsp;
          <h4 style={{ fontFamily: "Product Sans Bold" }}>{recordata.id}</h4>
        </div>
      )}

      {recordata.customerId && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontSize: "24px" }}
            className="material-symbols-rounded"
          >
            {"person_book" as MaterialSymbol}
          </span>
          &nbsp;
          <div
            style={{ display: "flex", alignItems: "start", cursor: "pointer" }}
            onClick={() => {
              route.push("/customers/view?customerid=" + recordata.customerId);
            }}
          >
            <h4
              style={{
                fontFamily: "Product Sans Bold",
                textDecoration: "underline",
              }}
            >
              {recordata.customerId}
            </h4>
            &nbsp;
            <span
              style={{ fontSize: "18px" }}
              className="material-symbols-rounded"
            >
              {"open_in_new" as MaterialSymbol}
            </span>
          </div>
        </div>
      )}

      <br />
      {recordata.date && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ fontSize: "24px" }}
              className="material-symbols-rounded"
            >
              {"calendar_month" as MaterialSymbol}
            </span>
            &nbsp;
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              {recordata.date.getDay()}-{recordata.date.getMonth() + 1}-
              {recordata.date.getFullYear()}
            </h5>
          </div>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{ fontSize: "24px" }}
              className="material-symbols-rounded"
            >
              {"watch" as MaterialSymbol}
            </span>
            &nbsp;
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              {recordata.date.getHours()}:{recordata.date.getMinutes()}
            </h5>
          </div>
        </div>
      )}

      {annualPrice != 0 && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ fontSize: "24px" }}
            className="material-symbols-rounded"
          >
            {"price_change" as MaterialSymbol}
          </span>
          &nbsp;
          <h5 style={{ fontFamily: "Product Sans Bold" }}>{annualPrice} Tk</h5>
        </div>
      )}

      {recordata.items && recordata.items.length > 0 && (
        <div>
          {recordata.items.map((d, i) => (
            <div style={{ margin: "1.5rem 0" }}>
              <hr
                style={{
                  height: "1px",
                  border: "none",
                  background: colorM("blue-black-10", 0.2),
                }}
              />{" "}
              <h4 style={{ fontFamily: "Product Sans Bold" }}>
                {d.product.name}
              </h4>
              &nbsp;
              <br />
              <h5 style={{ fontWeight: "400" }}>Model = {d.product.model}</h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>
                Quantity = {d.price.quantity} pc
              </h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>Each = {d.price.each} Tk</h5>
              <br />
              <h5 style={{ fontWeight: "400" }}>Total = {d.price.total} Tk</h5>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <RevisedButtonR
          radius="7px"
          spacingX=".5rem"
          // reverse={true}
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={() => {
            var ext =
              recordata.type == "outgoing"
                ? "&customerref=" + recordata.customerId
                : "";

            console.log(
              recordata.type,
              "/records/manage?edit=true&recordid=" + recordata.id + ext
            );

            route.push(
              "/records/manage?edit=true&recordid=" + recordata.id + ext
            );
          }}
          palate={[
            colorM("orange-white-10"),
            colorM("orange-black-6", 0.5),
            colorM("orange-black-0", 0.1),
          ]}
          icon="edit"
          text="Edit"
        ></RevisedButtonR>
        &nbsp;&nbsp;
        <RevisedButtonR
          radius="7px"
          spacingX=".5rem"
          // reverse={true}
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={() => {
            route.push("/records/delete?recordid=" + recordata.id);
          }}
          palate={[
            colorM("red-white-10"),
            colorM("red-black-6", 0.5),
            colorM("red-black-0", 0.1),
          ]}
          icon="delete_forever"
          text="Delete"
        ></RevisedButtonR>
        &nbsp;&nbsp;
        <RevisedButtonR
          radius="7px"
          spacingX=".5rem"
          // reverse={true}
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={() => {
            route.push("/records/view?recordid=" + recordata.id);
          }}
          palate={[
            colorM("green-white-10"),
            colorM("green-black-6", 0.5),
            colorM("green-black-0", 0.1),
          ]}
          icon="table_eye"
          text="View"
        ></RevisedButtonR>
        &nbsp;&nbsp;
      </div>
      <div style={{height:'0.75rem'}}></div>
      <div>
        <RevisedButtonR
          radius="7px"
          // spacingX=".5rem"
          // reverse={true}
          HWFs={["2rem", "auto", "12px"]}
          sinensisAct={() => {
            route.push("/payments/manage?recordref=" + recordata.id);
          }}
          palate={[
            colorM("blue-white-10"),
            colorM("blue-black-6", 0.5),
            colorM("blue-black-0", 0.1),
          ]}
          icon="price_check"
          text="Assign Payment"
        ></RevisedButtonR>
      </div>
    </div>
  );
}
