export function cookieM(cookie: string): { [key: string]: string } {
  if (cookie.length == 0) {
    return {};
  }

  var base = cookie.split(";");
  var base1 = base.map((d) => d.split("="));
  var base2 = {};
  base1.forEach(([key, val, ...rest]) => {
    key = key.replaceAll(" ", "");
    val = val.replaceAll("%20", " ").replaceAll('%40','@');
    base2 = { ...base2, [key]: val };
  });
  return base2;
}
