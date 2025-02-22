import { colorM, colorMR } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { InputM, InputR, ButtonM } from "./baseComponents";

export function RevisedInputM({
  text,
  generalColor,
  focusColor,
  color,
  icon,
  inpTracker,
}: {
  text: string;
  focusColor: string;
  generalColor: string;
  color: colorMR;
  icon: MaterialSymbol;
  inpTracker: (inp: HTMLInputElement | null) => void;
}) {
  return (
    <InputM
      height="2.25rem"
      width="300px"
      icon={icon}
      outline={`1px solid ${generalColor}`}
      outlineAfter={`1px dashed ${focusColor}`}
      text={text}
      iconColor={generalColor}
      iconColorAfter={focusColor}
      color={colorM(color, 0.5)}
      colorAfter={colorM(color, 0.7)}
      fontSize="14px"
      borderRadius="8px"
      backgroundColor={"transparent"}
      placeholderColor={generalColor}
      placeholderColorAfter={focusColor}
      placeholderFont="Product Sans Regular, 100"
      inp={(inp) => {
        if (typeof inpTracker === "function") {
          inpTracker(inp);
        }
      }}
    ></InputM>
  );
}

export function RevisedInputR({
  text,
  generalColor,
  focusColor,
  color,
  icon,
  height,
  width,
  inpTracker,
  defaultsTo,
}: {
  text: string;
  focusColor: string;
  generalColor: string;
  color: colorMR;
  icon: MaterialSymbol;
  height: string;
  width: string;
  inpTracker: (inp: HTMLTextAreaElement | null) => void;
  defaultsTo?: string;
}) {
  return (
    <InputR
      defaultsTo={defaultsTo}
      mrj="14px"
      spacing="1rem"
      height={height}
      width={width}
      icon={icon}
      outline={`1px solid ${generalColor}`}
      outlineAfter={`1px dashed ${focusColor}`}
      text={text}
      iconColor={generalColor}
      iconColorAfter={focusColor}
      color={colorM(color, 0.5)}
      colorAfter={colorM(color, 0.7)}
      fontSize="14px"
      borderRadius="8px"
      backgroundColor={"transparent"}
      placeholderColor={generalColor}
      placeholderColorAfter={focusColor}
      placeholderFont="Product Sans Regular, 100"
      inp={(inp) => {
        if (typeof inpTracker === "function") {
          inpTracker(inp);
        }
      }}
    ></InputR>
  );
}

export function RevisedInputJ({
  text,
  generalColor,
  focusColor,
  color,
  icon,
  inpTracker,
  HWFs,
  defaultsTo
}: {
  text: string;
  focusColor: string;
  generalColor: string;
  color: colorMR;
  icon: MaterialSymbol;
  inpTracker: (inp: HTMLInputElement | null) => void;
  HWFs: string[];
  defaultsTo?:string
}) {
  return (
    <InputM
      height={HWFs[0]}
      width={HWFs[1]}
      icon={icon}
      outline={`1px solid ${generalColor}`}
      outlineAfter={`1px dashed ${focusColor}`}
      text={text}
      iconColor={generalColor}
      iconColorAfter={focusColor}
      color={colorM(color, 0.5)}
      colorAfter={colorM(color, 0.7)}
      fontSize={HWFs[2]}
      borderRadius="8px"
      backgroundColor={"transparent"}
      placeholderColor={generalColor}
      placeholderColorAfter={focusColor}
      placeholderFont="Product Sans Regular, 100"
      inp={(inp) => {
        if (typeof inpTracker === "function") {
          inpTracker(inp);
        }
      }}
      defaultsTo={defaultsTo}
    ></InputM>
  );
}

export function RevisedButtonM({
  text,
  icon,
  palate,
  sinensisAct,
}: {
  text: string;
  icon: MaterialSymbol;
  palate: string[];
  sinensisAct: Function;
}) {
  return (
    <ButtonM
      background={{
        general: palate[0],
        hover: palate[1],
        active: palate[2],
      }}
      color={{
        general: palate[1],
        hover: palate[0],
        active: palate[1],
      }}
      iconColor={{
        general: palate[1],
        hover: palate[0],
        active: palate[1],
      }}
      outline={{
        general: `1px solid ${palate[1]}`,
        hover: `1px solid ${palate[0]}`,
        active: `1px solid ${palate[2]}`,
      }}
      height="2.5rem"
      icon={icon}
      text={text}
      font="Product Sans Bold"
      width="auto"
      borderRadius="13px"
      fontSize="14px"
      sinensisAct={sinensisAct}
    ></ButtonM>
  );
}

export function RevisedButtonR({
  text,
  icon,
  palate,
  sinensisAct,
  HWFs,
  reverse,
  radius,
  spacingX,
}: {
  text: string;
  icon?: MaterialSymbol;
  palate: string[];
  sinensisAct: Function;
  HWFs: string[];
  reverse?: boolean;
  radius?: string;
  spacingX?: string;
}) {
  return (
    <ButtonM
      background={{
        general: palate[0],
        hover: palate[1],
        active: palate[2],
      }}
      color={{
        general: palate[1],
        hover: palate[0],
        active: palate[1],
      }}
      iconColor={{
        general: palate[1],
        hover: palate[0],
        active: palate[1],
      }}
      outline={{
        general: `1px solid ${palate[1]}`,
        hover: `1px dashed ${palate[0]}`,
        active: `1px solid ${palate[2]}`,
      }}
      height={HWFs[0]}
      icon={icon}
      text={text}
      font="Product Sans Bold"
      width={HWFs[1]??"auto"}
      borderRadius={radius ?? "13px"}
      fontSize={HWFs[2]}
      sinensisAct={sinensisAct}
      reverse={reverse}
      spacingX={spacingX}
    ></ButtonM>
  );
}

