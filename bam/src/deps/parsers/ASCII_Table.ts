import CliTable3 from "cli-table3";

export function ASCII_Table(M: object | Array<any> | string | undefined) {
  if (!M) return ''

  var table = new CliTable3({});

  if (typeof M == "string") {
    return M.replaceAll(" ",'');
  } 
  if (typeof M == "object" && !Array.isArray(M)) {
    Object.entries(M).forEach(([keyM, valM]) => {
      if (typeof valM == "string") {
        return table.push([keyM, valM]);
      } else {
        return table.push([keyM, ASCII_Table(valM)]);
      }
    });
  } else if(Array.isArray(M)) {
    M.forEach((v, i) => {
      var edited = ASCII_Table(v);
      table.push([i, edited]);
    });
  } else {
    return String(M)
  }
  return table.toString();
}
