import { colorM } from "@/deps/color";
import { OTPLength } from "@/deps/constants";
import { useEffect, useState } from "react";

export function DedicatedOTPInput({
  defaultsM,
  output,
}: {
  defaultsM?: string;
  output: (v: string) => void;
}) {
  var length = OTPLength;
  var inputs: Array<HTMLInputElement | null> = [];

  var [OTP, OTPto] = useState<string[]>(
    defaultsM ? defaultsM.split("") : new Array(length).fill("")
  );
  var [OTPM, updateOTP] = useState<number>(0);

  useEffect(() => {
    output(OTP.join(""));
  }, [OTPM, OTP]);

  

  useEffect(() => {
    if (defaultsM) {
      output(defaultsM);
    }
  }, [defaultsM]);

  return (
    <div style={{ display: "flex" }}>
      {new Array(length).fill(13).map((d, i) => (
        <input
          key={i}
          onKeyUp={async (ev) => {
            if ("1234567890".includes(ev.key)) {
              ev.currentTarget.value = ev.key;
              OTPto((prev) => {
                prev[i] = ev.key;
                return prev;
              });
              updateOTP((prev) => prev + 1);
            } else {
              ev.currentTarget.value = "";
            }
            if (ev.key == "Backspace") {
              inputs[(i - 1) % length]?.focus();
            } else {
              inputs[(i + 1) % length]?.focus();
            }
          }}
          ref={(elm) => {
            inputs.push(elm);
          }}
          style={{
            margin: "0 .5rem",
            fontSize: "24px",
            outline: "1px solid " + colorM("blue-black-10", 0.25),
            border: "none",
            padding: ".5rem .25rem",
            width: "2rem",
            textAlign: "center",
            borderRadius: "7px",
          }}
          defaultValue={defaultsM?.at(i)}
        ></input>
      ))}
    </div>
  );
}
