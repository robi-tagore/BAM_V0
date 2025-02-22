export function TabilizeOBJ_as_HTML_str_depracted({
  children,
  cellBorder = "1px solid #ccc",
  cellPadding = ".25rem 1rem",
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
  var uniqueId = Date.now() + Math.round(Math.random() * 10000);

  var splittedBorder = cellBorder.split(" ");
  var borderWidth = splittedBorder[0];
  var borderStyle = splittedBorder[1];
  var borderColor = splittedBorder[2];

  var styles = `
  <style>
  .table_container_${uniqueId} {
    display: grid;
    margin: ${tableMargin};
    grid-template-columns: max-content max-content;
  }

  .table_key_${uniqueId} {
    min-width:${widthM[0]};
    max-width:${widthM[1]};
    justify-content: ${keyAlignMent[0]};
    align-items: ${keyAlignMent[1]};
    text-align: ${keyAlignMent[1]};
    padding:${cellKeyPadding};
    border-bottom-width:0px !important;
    border-right-width:0px !important;
    }

  .table_value_${uniqueId} {
    min-width:${widthM[2]};
    max-width:${widthM[3]};
    justify-content: ${valAlignMent[0]};
    align-items:  ${valAlignMent[1]} ;
    text-align: ${valAlignMent[1]};
    padding: ${cellPadding};
    border-bottom-width:0px !important;
  }

  .table_cell_${uniqueId} {
    font-family: ${fontFamily};
    font-size: ${fontSize};
    color: ${color};
    display: flex;
    border-color: ${borderColor};
    border-style: ${borderStyle};
    word-break: "break-all";
    margin: ${cellMargin};
    border-width:${borderWidth}
}
</style>


  `;
  var mainFrame = `<div class="table_container_${uniqueId}">
      ${Object.entries(children)
        .flat()
        .map((entry, i, arr) => {
          return `
            <div
              key=${i}
              class="table_cell_${uniqueId} ${
            i % 2 == 0 ? `table_key_${uniqueId}` : `table_value_${uniqueId}`
          }"
              style="border-bottom-width: ${
                i >= arr.length - 2 ? borderWidth + " !important" : "0px"
              };"
            >
              ${entry}
            </div>
            `;
        })
        .join(" ")}
    </div>`;
  return `<div>` + styles + mainFrame + `</div>`;
}
export function TabilizeOBJ_as_HTML_str({
  children,
  cellBorder = "1px solid #ccc",
  cellPadding = ".25rem 1rem",
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
  var uniqueId = Date.now() + Math.round(Math.random() * 10000);

  var splittedBorder = cellBorder.split(" ");
  var borderWidth = splittedBorder[0];
  var borderStyle = splittedBorder[1];
  var borderColor = splittedBorder[2];

  var container_styles = `
    display: grid;
    margin: ${tableMargin};
    grid-template-columns: max-content max-content;
    width: 100%; 

  `

  var key_styles = `
    min-width:${widthM[0]};
    max-width:${widthM[1]};
    justify-content: ${keyAlignMent[0]};
    align-items: ${keyAlignMent[1]};
    text-align: ${keyAlignMent[1]};
    padding:${cellKeyPadding};
    border-bottom-width:0px !important;
    border-right-width:0px !important;
    `

  var val_styles = `
    min-width:${widthM[2]};
    max-width:${widthM[3]};
    justify-content: ${valAlignMent[0]};
    align-items:  ${valAlignMent[1]} ;
    text-align: ${valAlignMent[1]};
    padding: ${cellPadding};
    border-bottom-width:0px !important;
  `

  var cell_styles = `
    font-family: ${fontFamily};
    font-size: ${fontSize};
    color: ${color};
    display: flex;
    border-color: ${borderColor};
    border-style: ${borderStyle};
    word-break: break-all;
    margin: ${cellMargin};
    border-width:${borderWidth};
  `

  var mainFrame = `<div class='table_container' style="${container_styles}">
      ${Object.entries(children)
        .flat()
        .map((entry, i, arr) => {
          return `
            <div
              key=${i}
              style="
              ${cell_styles} 
              ${i % 2 == 0 ? `${key_styles}` : `${val_styles}`}
              border-bottom-width: ${
                i >= arr.length - 2 ? borderWidth + " !important" : "0px"
              };
              ">
              ${entry}
            </div>
            `;
        })
        .join(" ")}
    </div>`;
  return `<div>` + mainFrame + `</div>`;
}

export function Tabilize_as_HTML_str({
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
        selected = { ...selected, [k]: Tabilize_as_HTML_str({ children: v }) };
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
      table = TabilizeOBJ_as_HTML_str({
        children: selected,
        cellPadding: "0 .25rem",
        tableMargin: ".25rem 0",
        valAlignMent: ["start", "center"],
        cellMargin: "0",
        cellBorder: "1px solid #ccc",
        // widthM: ["auto", "auto"],
      });
    } else {
      table = TabilizeOBJ_as_HTML_str({
        children: selected,

        cellMargin: "0px",
        cellPadding: ".25rem 0",
        cellBorder: "1px solid #ddd",
        tableMargin: ".25rem 0",
        widthM: ["8rem", "13rem", "200px", "300px"],
        valAlignMent: ["center", "center"],
      });
    }
    return table;
  } else {
    return String(children);
  }
}

export function TabilizeM(data: any, title: any): string {
  return `

  <br /><br />
  <h2 style="font-family: monospace;">${title}</h2> <br />
  ${Tabilize_as_HTML_str({ children: data })}
  <h6 style="font-family: monospace;"}}>Date : ${new Date().toUTCString()}</h6>
  <br /><br />
  `;
}
