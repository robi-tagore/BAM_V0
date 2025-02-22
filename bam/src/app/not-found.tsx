import { colorM } from "@/deps/color";
import { layout } from "@/deps/constants";
import { MaterialSymbol } from "material-symbols";

export default function Not_Found() {
  return (
    <div
      style={{
        height: layout.availableSpace,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: "64px",color:colorM('red-black-3',.8) }}>
        {"bus_alert" as MaterialSymbol}
      </span>
      <br />
      <h3>Wrong Route !</h3>
      <h5 style={{ width: "300px",textAlign:'center' }}>
        The requested url (typed or redirected to) does not contain any page on
        the server. If the url is typed manually, type carefully.
      </h5>
    </div>
  );
}
