'use client'
import { renderToStaticMarkup } from "react-dom/server";

function Tabilize({
  children,

  cellBorder = "1px solid #ccc",
  cellPadding = "0 0",
  cellMargin = "1px",
  valAlignMent = ["start", "center"],
  tableMargin = "0 0",
  fontFamily = "monospace",
  keyAlignMent = ["center", "center"],
  fontSize = "14px",
  color = "#333",
  cellKeyPadding = ".25rem 1rem",
  widthM = ["initial", "initial", "initial", "initial"],
}: {
  children: Object;

  cellBorder?: string;
  cellPadding?: string;
  cellMargin?: string;
  cellKeyPadding?: string;
  valAlignMent?: [string, string];
  keyAlignMent?: [string, string];
  tableMargin?: string;
  fontFamily?: string;
  fontSize?: string;
  color?: string;
  widthM?: [string, string, string, string];
}) {
  widthM = widthM ?? ["initial", "initial"];

  var splittedBorder = cellBorder.split(" ");
  var borderWidth = splittedBorder[0];
  var borderStyle = splittedBorder[1];
  var borderColor = splittedBorder[2];
  var Frame = (
    <div
      style={{
        display: "grid",
        // gridTemplateColumns: "repeat(2, minmax(50px, max-content))",
        margin: tableMargin,
        gridTemplateColumns: "repeat(2, max-content)",
      }}
    >
      {Object.entries(children)
        .flat()
        .map((entry, i, arr) => {
          return (
            <span
              style={{
                fontFamily: fontFamily,
                fontSize: fontSize,
                color: color,
                display: "flex",

                ...(i % 2 == 0
                  ? { minWidth: widthM[0], maxWidth: widthM[1] }
                  : { minWidth: widthM[2], maxWidth: widthM[3] }),

                // width: i % 2 == 0 ? widthM[0] : widthM[1],
                justifyContent: i % 2 == 0 ? keyAlignMent[0] : valAlignMent[0],
                alignItems: i % 2 == 0 ? keyAlignMent[1] : valAlignMent[1],
                borderColor: borderColor,
                borderStyle: borderStyle,
                wordBreak: "break-all",
                textAlign: (i % 2 == 0
                  ? keyAlignMent[1]
                  : valAlignMent[1]) as "center",

                borderWidth: [
                  borderWidth,
                  borderWidth,
                  i == arr.length - 1 || i == arr.length - 2 ? borderWidth : 0,
                  i % 2 == 0 ? borderWidth : 0,
                ].join(" "),
                padding: i % 2 == 0 ? cellKeyPadding : cellPadding,
                margin: cellMargin,
              }}
              key={i}
            >
              {entry}
            </span>
          );
        })}
    </div>
  );
  return Frame;
}

export function Frame({
  children,
}: {
  children: Object | string;
}): JSX.Element | string {

  if (children == null) {
    return ''
  }
  if (typeof children == "string") {
    return children;
  } else if (typeof children == "object") {
    var selected = {};

    Object.entries(children).forEach(([k, v], i) => {
      if (typeof v == "string") {
        selected = { ...selected, [k]: v };
      } else {
        selected = { ...selected, [k]: <Frame>{v}</Frame> };
      }
    });

    var isComplexTable = false;

    Object.values(selected).forEach((v) => {
      if (typeof v != "string") {
        isComplexTable = true;
      }
    });

    if (isComplexTable) {
      return (
        <Tabilize
          cellPadding="0 .25rem"
          tableMargin=".25rem 0"
          valAlignMent={["start", "center"]}
          cellMargin="0"
          cellBorder="1px solid #ccc"
        >
          {selected}
        </Tabilize>
      );
    } else {
      return (
        <Tabilize
          cellMargin="0px"
          cellPadding=".25rem 0"
          cellBorder="1px solid #ddd"
          tableMargin=".25rem 0"
          widthM={["8rem", "13rem", "200px", "300px"]}
          valAlignMent={["center", "center"]}
        >
          {selected}
        </Tabilize>
      );
    }
  } else {
    return String(children)
  }
}

export function Docify({ children, title }: { children: Object; title: string }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <h3 style={{ fontFamily: "monospace" }}>{title}</h3> <br />
        <h6 style={{ fontFamily: "monospace" }}>{new Date().toUTCString()}</h6>
      </div>
      <Frame>{children}</Frame>
    </div>
  );
}

export function stringifyDoc(doc: any, title: string) {
  return renderToStaticMarkup(Docify({children:doc,title:title}))
}
