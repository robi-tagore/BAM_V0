"use client";

import { MaterialSymbol } from "material-symbols";
import { createRef, CSSProperties, useEffect, useId, useState } from "react";
import { colorM } from "@/deps/color";

export function InputM({
  text,
  icon,
  height,
  width,
  outline,
  iconColor,
  fontSize,
  color,
  borderRadius,
  backgroundColor,
  outlineAfter,
  colorAfter,
  iconColorAfter,
  placeholderColor,
  placeholderColorAfter,
  placeholderFont,
  defaultsTo,
  inp,
}: {
  text: string;
  icon: MaterialSymbol;
  height: string;
  width: string;
  outline: string;
  iconColor: string;
  iconColorAfter: string;

  fontSize: string;
  color: string;
  colorAfter: string;

  borderRadius: string;
  backgroundColor: string;

  outlineAfter: string;

  placeholderColor: string;
  placeholderColorAfter: string;
  placeholderFont: string;

  inp: (inp: HTMLInputElement | null) => void;
  defaultsTo?: string;
}) {
  var [focusStylesD, focusStylesDTo] = useState<CSSProperties>();
  var [focusStylesT, focusStylesTTo] = useState<CSSProperties>();
  var [focusStylesI, focusStylesITo] = useState<CSSProperties>();

  var [focusStylesInp, focusStylesInpTo] = useState<CSSProperties>();

  var inputElm = createRef<HTMLInputElement>();
  var [val, valTo] = useState<string>(defaultsTo ?? '');
  useEffect(() => {
    if (typeof inp === "function") {
      inp(inputElm.current);
    }
  }, [inputElm]);

  // useEffect(() => {
  //   inputElm.current?.addEventListener("change", () => {
      
  //     if (val != inputElm.current?.value) {
  //       valTo(inputElm.current?.value);
  //     }
      
  //   });
  // }, []);

  useEffect(() => {
    inputElm.current?.setAttribute('value',val)
    if (defaultsTo) {
      inputElm.current?.focus()
    }
  },[val])

  return (
    <div
      onClick={() => {
        inputElm.current?.focus();
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        height: height,
        width: `calc(${width} - 2rem)`,
        outline: outline,

        borderRadius: borderRadius,
        padding: "0 .5rem",

        position: "relative",

        background: backgroundColor,

        ...focusStylesD,
      }}
    >
      <input
        ref={inputElm}
        spellCheck="false"
        style={{
          height: "100%",
          background: "transparent",
          outline: "none",
          border: "none",
          padding: ".25rem",

          fontSize: fontSize,
          color: color,

          width: "calc(100% - 2rem)",
          ...focusStylesInp,
        }}
        type="text"
        onFocus={() => {
          focusStylesTTo({
            top: `calc(${height} / -4 )`,
            fontSize: `calc(${fontSize} * .60)`,
            color: placeholderColorAfter,
          });
          focusStylesDTo({ outline: outlineAfter });
          focusStylesITo({ color: iconColorAfter });
          focusStylesInpTo({ color: colorAfter });
        }}
        onBlur={() => {
          focusStylesDTo({ outline: outline, color: color });
          focusStylesITo({ color: iconColor });
          focusStylesInpTo({ color: color });

          if (inputElm.current?.value.length == 0) {
            focusStylesTTo({
              top: "25%",
              // fontSize: `initial`,
              color: placeholderColor,
            });
          } else {
            focusStylesTTo({
              top: `calc(${height} / -4 )`,
              fontSize: `calc(${fontSize} * .60)`,
              color: placeholderColor,
            });
          }
        }}
      
        onChange={() => {
          valTo(inputElm.current?.value??'');
        }}
      />
      <span
        className="material-symbols-rounded"
        style={{
          fontSize: `calc((${height}  + ${fontSize}) / 2)`,
          color: iconColor,
          fontWeight:'300',
          ...focusStylesI,
        }}
      >
        {icon}
      </span>

      <div
        style={{
          position: "absolute",
          backgroundColor: backgroundColor,
          padding: "0 5px",
          height: `calc(${height} / 2)`,
          top: "25%",

          display: "flex",
          alignItems: "center",

          fontSize: fontSize,
          borderRadius: borderRadius,
          transitionDuration: "250ms",

          backdropFilter: "blur(300px)",

          color: placeholderColor,
          fontFamily: placeholderFont,

          fontWeight: placeholderFont.split(",")[1] ?? "100",
          ...focusStylesT,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export function ButtonM({
  background,
  color,
  font,
  height,
  iconColor,
  outline,
  text,
  width,
  icon,
  borderRadius,
  fontSize,
  sinensisAct,
  reverse,
  spacingX,
}: {
  text: string;

  height: string;
  width: string;
  font: string;

  outline: { general: string; hover: string; active?: string };
  background: { general: string; hover: string; active?: string };
  color: { general: string; hover: string; active?: string };
  iconColor: { general: string; hover: string; active?: string };

  icon?: MaterialSymbol;
  borderRadius: string;
  fontSize: string;

  sinensisAct: Function;
  reverse?: boolean;
  spacingX?: string;
}) {
  var [styleM, styleMTo] = useState<CSSProperties>();
  var [styleI, styleITo] = useState<CSSProperties>();
  var [styleT, styleTTo] = useState<CSSProperties>();

  reverse = reverse ?? false;
  spacingX = spacingX ?? ".75rem";

  return (
    <div
      style={{
        display: "flex",
        height: height,
        width: "fit-content",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: reverse ? "row-reverse" : "row",

        outline: outline.general,
        background: background.general,
        borderRadius: borderRadius,
        padding: `0 ${spacingX}`,
        cursor: "pointer",
        ...styleM,
      }}
      onMouseEnter={() => {
        styleMTo({ outline: outline.hover, background: background.hover });
        styleITo({ color: iconColor.hover });
        styleTTo({ color: color.hover });
      }}
      onMouseLeave={() => {
        styleMTo({ outline: outline.general, background: background.general });
        styleITo({ color: iconColor.general });
        styleTTo({ color: color.general });
      }}
      onClick={() => {
        styleMTo({ outline: outline.active, background: background.active });
        styleITo({ color: iconColor.active });
        styleTTo({ color: color.active });

        setTimeout(() => {
          styleMTo({
            outline: outline.general,
            background: background.general,
          });
          styleITo({ color: iconColor.general });
          styleTTo({ color: color.general });
        }, 250);

        sinensisAct();
      }}
    >
      {text != "" && (
        <div
          style={{
            color: color.general,
            fontFamily: font,
            fontSize: fontSize,
            margin: reverse
              ? `0 0 0 calc(${spacingX} - .5rem)`
              : `0 calc(${spacingX} - .5rem) 0 0`,
            ...styleT,
          }}
        >
          {text}
        </div>
      )}

      <span
        className="material-symbols-rounded"
        style={{
          // width: height,
          color: iconColor.general,
          fontWeight:'300',

          ...styleI,
        }}
      >
        {icon}
      </span>
    </div>
  );
}

export function DivExt({
  style: { general, active, hover },
  afterClick,
  children,
}: {
  style: {
    general: CSSProperties;
    hover: CSSProperties;
    active: CSSProperties;
  };
  afterClick: (elem: HTMLDivElement) => void;
  children: JSX.Element;
}) {
  var [_style, _styleTo] = useState<CSSProperties>();
  var elem = createRef<HTMLDivElement>();

  return (
    <div
      ref={elem}
      style={{ ...general, ..._style }}
      onMouseOver={() => {
        _styleTo(hover);
      }}
      onMouseLeave={() => {
        _styleTo(general);
      }}
      onClick={(e) => {
        e.preventDefault();

        _styleTo(active);

        setTimeout(() => {
          _styleTo(general);
        }, 250);

        if (elem.current) {
          afterClick(elem.current);
        }
      }}
    >
      {children}
    </div>
  );
}

export function InputR({
  text,
  icon,
  height,
  width,
  outline,
  iconColor,
  fontSize,
  color,
  borderRadius,
  backgroundColor,
  outlineAfter,
  colorAfter,
  iconColorAfter,
  placeholderColor,
  placeholderColorAfter,
  placeholderFont,
  spacing,
  inp,
  mrj,
  defaultsTo,
}: {
  text: string;
  icon: MaterialSymbol;

  height: string;
  width: string;

  outline: string;
  iconColor: string;
  iconColorAfter: string;

  fontSize: string;
  color: string;
  colorAfter: string;

  borderRadius: string;
  backgroundColor: string;

  outlineAfter: string;

  placeholderColor: string;
  placeholderColorAfter: string;
  placeholderFont: string;
  spacing: string;

  mrj: string;

  inp: (inp: HTMLTextAreaElement | null) => void;
  defaultsTo?: string;
}) {
  var [focusStylesD, focusStylesDTo] = useState<CSSProperties>();
  var [focusStylesT, focusStylesTTo] = useState<CSSProperties>();
  var [focusStylesI, focusStylesITo] = useState<CSSProperties>();

  var [focusStylesInp, focusStylesInpTo] = useState<CSSProperties>();

  var inputElm = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (typeof inp === "function") {
      inp(inputElm.current);
    }
  }, [inputElm]);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          inputElm.current?.focus();
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",

          height: `calc(${height} - ${spacing} * 2)`,
          width: `calc(${width} - ${spacing} * 2)`,
          outline: outline,

          borderRadius: borderRadius,
          padding: spacing,

          position: "relative",

          background: backgroundColor,

          ...focusStylesD,
        }}
      >
        <textarea
          ref={inputElm}
          spellCheck="false"
          style={{
            height: "100%",
            background: "transparent",
            outline: "none",
            border: "none",
            overflow: "auto",

            fontSize: fontSize,
            color: color,

            width: "100%",

            ...focusStylesInp,
          }}
          onFocus={() => {
            focusStylesTTo({
              top: `calc(${mrj} * 1.5 / -2 )`,
              color: placeholderColorAfter,
            });
            focusStylesDTo({ outline: outlineAfter });
            focusStylesITo({ color: iconColorAfter });
            focusStylesInpTo({ color: colorAfter });
          }}
          onBlur={() => {
            focusStylesDTo({ outline: outline, color: color });
            focusStylesITo({ color: iconColor });
            focusStylesInpTo({ color: color });

            if (inputElm.current?.value.length == 0) {
              focusStylesTTo({
                // top: `calc(${height} / 2)`,
                top: `calc(${mrj} * 1.5 / -2 )`,

                color: placeholderColor,
              });
            } else {
              focusStylesTTo({
                top: `calc(${mrj} * 1.5 / -2 )`,
                color: placeholderColor,
              });
            }
          }}
          defaultValue={defaultsTo ?? ""}
        ></textarea>
      </div>{" "}
      <div
        style={{
          position: "absolute",
          backgroundColor: backgroundColor,
          height: `fit-content`,
          // top: `calc(${height} / 2 )`,
          top: `calc(${mrj} * 1.5 / -2 )`,

          marginLeft: `calc(${spacing} / 2)`,
          display: "flex",
          alignItems: "center",
          zIndex: "1",

          fontSize: mrj,
          borderRadius: borderRadius,
          transitionDuration: "250ms",

          backdropFilter: "blur(300px)",

          color: placeholderColor,
          fontFamily: placeholderFont,

          fontWeight: placeholderFont.split(",")[1] ?? "100",
          ...focusStylesT,
        }}
      >
        <span
          className="material-symbols-rounded"
          style={{
            fontSize: `calc(${mrj} * 1.25 )`,
            color: iconColor,
            marginRight: ".25rem",
            ...focusStylesI,
          }}
        >
          {icon}
        </span>
        {text}
      </div>
    </div>
  );
}

export function LoaderM({
  HW,
  size,
  speed,
  icons,
  scaleEffect,
}: {
  HW: string[];
  size: string;
  speed: number;
  icons?: MaterialSymbol[];
  scaleEffect?: string;
}) {
  var [processIcon, processIconTo] = useState<MaterialSymbol>("database");
  var [processIconColor, processIconColorTo] = useState<string>();

  var [num, numTo] = useState<number>(0);
  var uniqueId = useId().replaceAll(":", "");

  var interVal: any;
  useEffect(() => {
    if (!interVal) {
      interVal = setInterval(() => {
        numTo((p) => p + 1);
      }, speed * 2);
    }
  }, []);

  useEffect(() => {
    icons = icons ?? [
      "database",
      "category",
      "brand_family",
      "edit_document",
      "text_fields",
      "list_alt",
      "price_change",
      "edit",
      "text_fields",
      "key",
      "data_table",
      "category",
    ];
    var colors: string[] = [
      colorM("green-black-2", 0.5),
      colorM("blue-black-2", 0.5),
      colorM("red-black-2", 0.5),
      colorM("orange-black-2", 0.5),
      colorM("magenta-black-2", 0.5),
      colorM("yellow-black-2", 0.5),
      colorM("indigo-black-2", 0.5),
      colorM("cyan-black-2", 0.5),
      colorM("lime-black-2", 0.5),
    ];

    processIconColorTo(colors[num % colors.length]);
    processIconTo(icons[num % icons.length]);
  }, [num]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: HW[0],
        width: HW[1],
        position: "relative",
      }}
    >
      <style>{`@keyframes ${uniqueId} 
      {
        0% {
          top: 0;
          ${scaleEffect ? "transform:scale(" + scaleEffect + ")" : ""}
        } 100% {
          top: calc(100% - ${size} - .26rem);
          ${scaleEffect ? "transform:scale(1)" : ""}
        }
      }
      
      `}</style>

      <span
        style={{
          fontSize: size,
          color: processIconColor,
          transitionDuration: speed + "ms",

          position: "absolute",
          animation: uniqueId,
          animationDuration: speed + "ms",
          animationIterationCount: "infinite",
          animationDirection: "alternate-reverse",
          animationTimingFunction: "cubic-bezier(0.55, 0.06, 0.68, 0.19)",
        }}
        className="material-symbols-outlined"
      >
        {processIcon}
      </span>
    </div>
  );
}
