export function OBJ_to_oldFashionedTable({
  children,
  cellBorder = "1px solid #ccc",
  cellPadding = ".25rem 1rem",
  cellMargin = "1px",
  valAlignMent = ["start", "center"],
  tableMargin = "0 0",
  fontFamily = "monospace",
  keyAlignMent = ["center", "center"],
  fontSize = "16px",
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
  var uniqueId = Date.now() + Math.round(Math.random() * 10000);

  var splittedBorder = cellBorder.split(" ");
  var borderWidth = splittedBorder[0];
  var borderStyle = splittedBorder[1];
  var borderColor = splittedBorder[2];

  var container_styles = `
    margin: ${tableMargin};
  `;

  var key_styles = `
    min-width:${widthM[0]};
    max-width:${widthM[1]};
    justify-content: ${keyAlignMent[0]};
    align-items: ${keyAlignMent[1]};
    text-align: ${keyAlignMent[1]};
    padding:${cellKeyPadding};
    border-bottom-width:0px !important;
    border-right-width:0px !important;
    `;

  var val_styles = `
    min-width:${widthM[2]};
    max-width:${widthM[3]};
    justify-content: ${valAlignMent[0]};
    align-items:  ${valAlignMent[1]} ;
    text-align: ${valAlignMent[1]};
    padding: ${cellPadding};
    border-bottom-width:0px !important;
  `;

  var cell_styles = `
    font-family: ${fontFamily};
    font-size: ${fontSize};
    color: ${color};
    border-color: ${borderColor};
    border-style: ${borderStyle};
    margin: ${cellMargin};
    border-width:${borderWidth};
  `;

  var mainFrame = `<table class='table_container' style="${container_styles}">
    
  ${Object.entries(children)
    .map(([key_,value_], i, arr) => {
      return `
            <tr key=${i}>

              <td style="
              ${cell_styles} 
              ${key_styles}
              border-bottom-width: ${
                i >= arr.length - 1 ? borderWidth + " !important" : "0px"
              };
              ">${key_}</td>
              <td style="
              ${cell_styles} 
              ${val_styles}
              border-bottom-width: ${
                i >= arr.length - 1 ? borderWidth + " !important" : "0px"
              };
              ">${value_}</td>
              
            </tr>
            `;
    })
    .join(" ")}

        </table>`;
  return mainFrame;
}

export function Any_to_oldFashionedTable({
  children,
}: {
  children: Object | string;
}): string {
  if (children == null) {
    return "";
  }
  if (typeof children == "string") {
    return children;
  } else if (typeof children == "object") {
    var selected = {};

    Object.entries(children).forEach(([k, v], i) => {
      if (typeof v == "string") {
        selected = { ...selected, [k]: v };
      } else {
        selected = { ...selected, [k]: Any_to_oldFashionedTable({ children: v }) };
      }
    });

    var isComplexTable = false;

    Object.values(selected).forEach((v) => {
      if ((v as string).split("table_container").length > 1) {
        isComplexTable = true;
      }
    });

    var table = "";

    if (isComplexTable) {
      table = OBJ_to_oldFashionedTable({
        children: selected,
        cellPadding: "0 .25rem",
        tableMargin: ".25rem 0",
        valAlignMent: ["start", "center"],
        cellMargin: "0",
        cellBorder: "1px solid #ccc",
        // widthM: ["auto", "auto"],
      });
    } else {
      table = OBJ_to_oldFashionedTable({
        children: selected,

        cellMargin: "0px",
        cellPadding: ".25rem",
        cellBorder: "1px solid #ddd",
        tableMargin: ".25rem 0",
        widthM: ["fit-content", "13rem", "200px", "300px"],
        valAlignMent: ["center", "center"],
      });
    }
    return table;
  } else {
    return String(children);
  }
}

export function Titled_oldFashionedTable(data: any, title: any): string {
  return `

  <br /><br />
  <h2 style="font-family: monospace;">${title}</h2> <br />
  ${Any_to_oldFashionedTable({ children: data })}
  <h5 style="font-family: monospace;"}}>Date : ${new Date().toUTCString()}</h5>
  <br /><br />
  `;
}
