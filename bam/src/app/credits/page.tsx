import { layout } from "@/deps/constants";

export default function Credits() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: layout.availableSpace,
      }}
    >
      <div>
        {/* <div>
          <h1>Business Administration</h1>
          <br />
          <h3>a Sinensis Production</h3>
        </div> */}
        <span>
          {/* <text style={{ fontSize: "3rem" }}>Developed by </text>{" "} */}
          
          <text style={{ fontSize: "1.5rem",fontFamily:"Playfair" }}>coded by &nbsp;</text>
          <text style={{ fontSize: "3rem" }}>Rahman Rajon</text><br />
        </span>
        <br />
      </div>
    </div>
  );
}
