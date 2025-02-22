function fill(filler: string, length: number) {
  length = length <= 0 ? 1 : length;
  length = Math.round(length);
  return new Array(length).fill(filler).join("");
}

function S(availableSpace: number, character: string) {
  var charLength = character.length;
  var whiteSpace = availableSpace - charLength;

  if (whiteSpace % 2 != 0) {
    var before = (whiteSpace - 1) / 2;
    var after = whiteSpace - before;
  } else {
    var before = whiteSpace / 2;
    var after = whiteSpace / 2;
  }
  return fill(" ", before) + character + fill(" ", after);
}
var prettify = (forM: string, filler: string, spcae: number) => {
  var charLength = forM.length;
  var whiteSpace = spcae - charLength;

  forM = forM == "" ? "" : forM;

  if (whiteSpace % 2 != 0) {
    var before = (whiteSpace - 1) / 2;
    var after = whiteSpace - before;
  } else {
    var before = whiteSpace / 2;
    var after = whiteSpace / 2;
  }
  return fill(filler, before) + forM + fill(filler, after);
};

function parse(
  key: string,
  value: any,
  prefix: string,
  widths: [number, number]
) {
  var table = "";

  widths = widths ?? [20, 20];

  var width = widths[0] + widths[1];

  if (Array.isArray(value)) {
    var complexArray = false;
    Object.values(value).forEach((v: any) => {
      if (typeof v != "string") {
        complexArray = true;
      }
    });

    if (complexArray) {
      table += "\r\n";
      value.forEach((d, i, a) => {
        table +=
          prettify(`  ${i + 1} of ${a.length} ${key}  `, "-", width) + "\r\n";
        table += parse(key, d, " ", widths);

        if (i == a.length - 1) {
          table += fill("-", width) + "\r\n";
        }
      });
      table += "\r\n\r\n";
    } else {
      // table += fill('-',width)+'\r\n'
      // table += "\r\n" + prettify(` ${key} `, "_", width) + "\r\n";

      table +=
        " + " +
        prettify(key, " ", widths[0]) +
        "-" +
        prettify(value.join(", "), " ", widths[1] - 7) +
        " + " +
        "\r\n";
    }

    // });
  } else if (typeof value == "object") {
    if (prefix != "Base") {
      // table += fill('-',width)+'\r\n'
    }
    // table += "\r\n"+prettify(` ${key}`, "_", width) + "\r\n";

    Object.keys(value).forEach((_key, i, arr) => {
      var _value = value[_key as string];
      table += parse(_key as string, _value, key, widths);
    });
    // table += '\r\n'
  } else if (typeof value == "string") {
    if (prefix == "Overview") {
      // table += fill('-',width)+'\r\n'
      // table += "\r\n"+prettify(` ${key}`, "_", width) + "\r\n";
      table +=
        " + " +
        prettify(key + ``, " ", widths[0] - 0) +
        "-" +
        prettify(value, " ", widths[1] - 7) +
        " + " +
        "\r\n";
    } else {
      table +=
        " | " +
        prettify(key + ` (${prefix})`, " ", widths[0]) +
        "|" +
        prettify(value, " ", widths[1] - 7) +
        " | " +
        "\r\n";
    }
  }
  return table;
}

export function rose(
  key: string,
  value: any,
  prefix: string,
  widths: [number, number],
  title: string,
  conclusion: string
) {
  var parsed = parse(key, value, prefix, widths);

  return (
    "\r\n" +
    prettify(`${title}`, "_", widths[0] + widths[1]) +
    "\r\n" +
    " |" +
    prettify(``, " ", widths[0] + widths[1] - 4) +
    "| " +
    "\r\n" +
    parsed +
    " " +
    prettify(`${conclusion}`, "_", widths[0] + widths[1] - 2) +
    "\r\n"
  );
}
