"use client";

import { Frame } from "@/deps/parsers/htmlTableJSX";
import {
  Tabilize_as_HTML_str,
  TabilizeM,
  TabilizeOBJ_as_HTML_str,
} from "@/deps/parsers/htmlTableTxt";
import {
  Titled_oldFashionedTable,
} from "@/deps/parsers/oldFashionedHTML_table";
import { useEffect } from "react";

var Record = {
  id: "1690732321236454",
  date: "2024-08-05",
  items: [
    {
      product: {
        name: "HP Envy Printer",
        model: "Envy-6055",
      },
      price: {
        each: "149",
        total: "447",
        quantity: "3",
      },
    },
    {
      product: {
        name: "Asus ROG Gaming Laptop",
        model: "ROG-GL502",
      },
      price: {
        each: "1599",
        total: "3198",
        quantity: "2",
      },
    },
  ],
  customerId: "123",
  type: "incoming",
};

var Customer = {
  name: {
    first: "Aisha",
    last: "Rahman",
    surname: "What",
  },
  physicalIdentity: ["456 Elm St", "Dhaka 1215", "Bangladesh"],
  virtualIdentity: {
    phoneNumber: "017-12345678",
    email: "aisha.rahman@example.com",
    emergencyNumber: "019293982323",
  },
  uniqueIdentity: "AR9876543",
};

export default function Page() {
  // var elm = (
  //   <Docify title="Customer Data">
  //     {[
  //       {
  //         key: "sdsdf",
  //         ref: "nulsdfl",
  //         props: {
  //           title: "Overall Operation Status",
  //           children: {
  //             operation: "create OTP",
  //             of: "user",
  //             status: "failure",
  //             reason: {
  //               errno: -3008,
  //               code: "ENOTFOUND",
  //               syscall: "getaddrinfo",
  //               hostname: "lxbd4.alpha.net.bd",
  //             },
  //           },
  //         },
  //         _owner: null,
  //         _store: {},
  //       },
  //     ]}
  //   </Docify>
  // );

  // var txt = renderToStaticMarkup(elm)

  var doc = Titled_oldFashionedTable(Record, "");

  // var docDoc = TabilizeOBJ_as_HTML_str({
  //   children:{...Customer.name,doc : doc},
  // })
  // console.log(doc);

  useEffect(() => {
    // document.querySelector("article")?.setHTMLUnsafe(doc);
  }, []);

  return (
    <div style={{}}>
      <br />
      <br />
      <br />
      <article></article>
      {<Frame children={Record}></Frame>}
    </div>
  );
}
