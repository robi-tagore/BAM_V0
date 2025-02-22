import { LoaderM } from "@/app/baseComponents";
import { RevisedButtonR } from "@/app/components";
import { MiniRecord } from "@/app/records/filter/components";
import { colorM } from "@/deps/color";
import { layout } from "@/deps/constants";
import { Filter } from "mongodb";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  _Pull_Request__Customer,
  _Pull_Response__Customer,
} from "../api/pull/route";
import { IconAndData } from "../components";
import { complexPayment } from "@/mTypes/databases";
import {
  _ComplexPull_Request__Payment,
  _ComplexPull_Response__Payment,
} from "../api/complexpull/route";
import { MiniPayment } from "@/app/payments/filter/components";
import { MaterialSymbol } from "material-symbols";

export function CustomerPortion({
  customerData,
  shouldDisplay,
}: {
  customerData: Partial<Customer> | undefined;
  shouldDisplay: boolean;
}) {
  var route = useRouter();
  if (!customerData) return;
  return (
    <div style={{ display: shouldDisplay ? "flex" : "none" }}>
      <div style={{ width: "fit-content" }}>
        <h3>General Details</h3>
        <h2>_</h2>
        <br />
        <div style={{ width: "100%" }}>
          <hr
            style={{
              border: "none",
              background: colorM("blue-black-10", 0.15),
              height: "1px",
            }}
          />
        </div>
        <br />
        <div
          style={{
            padding: "2rem",
            background: colorM("red-white-10"),
            width: "calc(100% - 4rem)",
            borderRadius: "13px",
            justifyContent: "center",
            position: "relative",
          }}
          className="mshadow"
        >
          <span>
            <h3 style={{ fontFamily: "Product Sans Bold" }}>
              {customerData.name!.first}&nbsp;{customerData.name!.last}
              &nbsp;
            </h3>
            <h5>{customerData.name!.surname}</h5>
          </span>

          <br />
          <br />
          <IconAndData
            data={
              <h5
                style={{
                  fontFamily: "Product Sans Regular",
                }}
              >
                {customerData.uniqueIdentity}
              </h5>
            }
            size="22px"
            icon="id_card"
          ></IconAndData>

          <br />

          <div>
            <IconAndData
              data={
                <h5
                  style={{
                    fontFamily: "Product Sans Bold",
                  }}
                >
                  Physical Address
                </h5>
              }
              size="20px"
              icon="location_on"
            ></IconAndData>

            <span>
              {customerData.physicalIdentity!.map((d, i) => (
                <span key={i} style={{ marginLeft: "1rem" }}>
                  <h5>{i} </h5> <h5 style={{ fontWeight: "300" }}>{d}</h5>{" "}
                  <br />{" "}
                </span>
              ))}
            </span>
            <br />
          </div>

          <div>
            <IconAndData
              data={
                <h5
                  style={{
                    fontFamily: "Product Sans Bold",
                  }}
                >
                  Virtual Address
                </h5>
              }
              size="20px"
              icon="cloud"
            ></IconAndData>

            <div
              style={{
                // display: "flex",
                // alignItems: "center",
                // flexWrap: "wrap",

                paddingLeft: ".5rem",
              }}
            >
              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "300" }}>
                    {customerData.virtualIdentity!.phoneNumber}
                  </h5>
                }
                icon={"call"}
              ></IconAndData>

              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "300" }}>
                    {customerData.virtualIdentity!.emergencyNumber}
                  </h5>
                }
                icon={"call_quality"}
              ></IconAndData>

              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "300" }}>
                    {customerData.virtualIdentity!.email}
                  </h5>
                }
                icon={"mark_email_read"}
              ></IconAndData>
            </div>
          </div>
          <br />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "strat",
            }}
          >
            <div style={{ margin: ".5rem .5rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                spacingX=".5rem"
                reverse={true}
                HWFs={["1.75rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/customers/manage?action=edit&customerid=" +
                      customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("blue-white-10"),
                  colorM("blue-black-6", 0.45),

                  colorM("blue-black-0", 0.1),
                ]}
                // icon="edit"
                text="Edit"
              ></RevisedButtonR>
            </div>
            <div style={{ margin: ".5rem .5rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                spacingX=".5rem"
                reverse={true}
                HWFs={["1.75rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/customers/delete?customerid=" +
                      customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("red-white-10"),
                  colorM("red-black-6", 0.45),

                  colorM("red-black-0", 0.1),
                ]}
                // icon="delete_forever"
                text="Delete"
              ></RevisedButtonR>
            </div>
            <div style={{ margin: ".5rem .5rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                spacingX=".5rem"
                // reverse={true}
                HWFs={["1.75rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/records/manage?customerref=" + customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("orange-white-10"),
                  colorM("orange-black-3", 0.8),
                  colorM("orange-black-0", 0.1),
                ]}
                // icon="open_in_new"
                text="Assign Record"
              ></RevisedButtonR>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecordPortion({
  customerId,
  boughtM,
}: {
  customerId: string;
  boughtM: (b: record[]) => void;
}) {
  var [recordsDiv, recordsDivTo] = useState<JSX.Element>(<></>);
  var [loaderDisplay, loaderDisplayTo] = useState<boolean>(true);

  var [records, recordsTo] = useState<Partial<record>[] | "not exists">();

  useEffect(() => {
    if (records == "not exists") {
      recordsDivTo(
        <>
          <div
            style={{
              height: layout.availableSpace,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <LoaderM
              HW={["13rem", "100%"]}
              size="64px"
              speed={1000}
              icons={["blur_off"]}
            ></LoaderM>
            <br />
            <br />
            <h3 style={{ fontWeight: "900" }}>
              No Record has mentioned this Cusotmer
            </h3>
            <br />
            <h6 style={{ fontWeight: "500", textAlign: "center" }}>
              No Record has used this customer id. <br />
              Which means this customer is relatively new
            </h6>
          </div>
        </>
      );
    } else {
      recordsDivTo(
        <>
          {records?.map((d, i) => (
            <div style={{ margin: "0 1rem 0 0", width: "350px" }}>
              <MiniRecord recordata={d} key={i}></MiniRecord>
            </div>
          ))}
        </>
      );
    }
  }, [records]);

  useEffect(() => {
    fetch("/records/api/pull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection: "Record",
        fields: [],
        query: { customerId: customerId } as Filter<record>,
      } as _Pull_Request__Customer.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Customer.core) => {
          if ((d.status = "r")) {
            loaderDisplayTo(false);
            if (d.data.length == 0) {
              recordsTo("not exists");
            } else {
              recordsTo(d.data as Partial<record>[]);
            }
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  function calcTotal(recordListRaw: Partial<record>[]) {
    var n = 0;
    recordListRaw.forEach((d) => {
      d.items!.forEach((i) => {
        n += Number(i.price.total);
      });
    });
    return n;
  }

  useEffect(() => {
    if (records != undefined && records != "not exists") {
      boughtM(records as record[]);
    }
  }, [records]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          display: loaderDisplay ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoaderM
          HW={["13rem", "auto"]}
          size="48px"
          speed={1000}
          icons={[
            "hourglass",
            "hourglass_bottom",
            "hourglass_top",
            "hourglass_top",
            "hourglass_bottom",
            "hourglass",
          ]}
        ></LoaderM>
        <h3 style={{ fontFamily: "Product Sans Bold" }}>Fetching Records</h3>
        <h5>This will load the records assinged to the customer</h5>
      </div>

      <div
        style={{
          display: !loaderDisplay ? "block" : "none",
        }}
      >
        {records && records != "not exists" && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Records assigned with the Customer</h3>

            <div>
              <h3>Bought &nbsp;</h3>
              <h2
                style={{
                  fontFamily: "Product Sans Bold",
                  color: colorM("red-black-2"),
                }}
              >
                {calcTotal(records)}
              </h2>
            </div>
          </div>
        )}
        <div style={{ width: "100%" }}>
          <hr
            style={{
              border: "none",
              background: colorM("blue-black-10", 0.15),
              height: "1px",
            }}
          />
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
          }}
        >
          {recordsDiv}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export function PaymentPortion({
  customerId,
  paidM,
}: {
  customerId: string;
  paidM: (b: complexPayment[]) => void;
}) {
  var [loaderDisplay, loaderDisplayTo] = useState<boolean>(true);
  var [comlexPaymentList, comlexPaymentListTo] = useState<
    complexPayment[] | "not exists"
  >();

  useEffect(() => {
    fetch("/customers/api/complexpull", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [],
        customerId: customerId,
        query: {},
      } as _ComplexPull_Request__Payment.core),
    }).then(async (d) => {
      d.json().then(
        (d: _Pull_Response__Customer.core) => {
          if ((d.status = "r")) {
            loaderDisplayTo(false);
            if (d.data.length == 0) {
              comlexPaymentListTo("not exists");
            } else {
              comlexPaymentListTo(d.data as complexPayment[]);
            }
          } else if ((d.status = "m")) {
          }
        },
        (err) => {}
      );
    });
  }, []);

  var paid = (payment: complexPayment[]) => {
    var paid = 0;
    payment.forEach((d) => {
      paid += Number(d.amount);
    });
    return paid;
  };

  useEffect(() => {
    if (comlexPaymentList != undefined && comlexPaymentList != "not exists") {
      paidM(comlexPaymentList);
    }
  }, [comlexPaymentList]);

  return (
    <>
      <div
        style={{
          display: loaderDisplay ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          height: layout.availableSpace,
        }}
      >
        <LoaderM
          HW={["13rem", "auto"]}
          size="48px"
          speed={1000}
          icons={[
            "hourglass",
            "hourglass_bottom",
            "hourglass_top",
            "hourglass_top",
            "hourglass_bottom",
            "hourglass",
          ]}
        ></LoaderM>
        <br />
        <h3>Fetching Payments</h3>
        <h5>Payments related to this customer is being fetched.</h5>
      </div>

      {comlexPaymentList && comlexPaymentList == "not exists" && (
        <div
          style={{
            height: layout.availableSpace,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LoaderM
            HW={["13rem", "100%"]}
            size="64px"
            speed={1000}
            icons={["blur_off"]}
          ></LoaderM>
          <br />
          <br />
          <h3 style={{ fontWeight: "900" }}>No Payment Found</h3>
          <br />
          <h6 style={{ fontWeight: "500", textAlign: "center" }}>
            Unfortunately no Payment has been made by this Customer. <br />
            Or the customer Id may be wron or mistyped.
          </h6>
        </div>
      )}
      {comlexPaymentList && comlexPaymentList != "not exists" && (
        <>
          <br />
          <br />
          <br />
          <div
            style={{
              display: !loaderDisplay ? "flex" : "none",
              // width: "fit-content",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h3>Payments Made</h3>
              <div>
                <h3>Paid &nbsp;</h3>
                <h2
                  style={{
                    fontFamily: "Product Sans Bold",
                    color: colorM("green-black-2"),
                  }}
                >
                  {paid(comlexPaymentList)}
                </h2>
              </div>
            </div>

            <div style={{ width: "100%" }}>
              <hr
                style={{
                  border: "none",
                  background: colorM("blue-black-10", 0.15),
                  height: "1px",
                }}
              />
            </div>

            <br />
            <div style={{ width: "fit-content" }}>
              <div
                style={{
                  display: "grid",
                  gridGap: "1rem",
                  gridTemplateColumns: "1fr 1fr 1fr",
                }}
              >
                {comlexPaymentList &&
                  (comlexPaymentList as complexPayment[]).map((d, i) => (
                    <MiniPayment payment={d} view="block"></MiniPayment>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function MILYs({
  payments,
  records,
  onflex,
}: {
  payments?: complexPayment[];
  records?: record[];
  onflex?: boolean;
}) {
  interface MILY_Stucture {
    payments: complexPayment[];
    itemName: string;
    itemModel: string;
    itemPrice: number;
  }

  onflex = onflex ?? false;
  var MILYs: MILY_Stucture[] = [];

  if (records == undefined || records.length == 0) return;
  if (payments == undefined) return;

  records.forEach((record) => {
    if (!record) return;
    if (record.items == undefined || record.items.length == 0) return;

    record.items.forEach((i) => {
      var itsPayemts = payments.filter((d) => d.recordId == record.id);
      MILYs.push({
        itemName: i.product.name,
        itemModel: i.product.model,
        payments: itsPayemts,
        itemPrice: Number(i.price.total),
      });
    });
  });

  function OFMM(d: complexPayment[]) {
    var n = 0;
    d.forEach((d) => (n += Number(d.amount)));
    return n;
  }

  var AnnualPrice = 0;
  records.forEach((r) => {
    if (!r) return;
    if (r.items == undefined || r.items.length == 0) return;

    r.items.forEach((i) => {
      AnnualPrice += Number(i.price.total);
    });
  });

  var AnnualDeposit = 0;
  payments.forEach((p) => {
    AnnualDeposit += Number(p.amount);
  });

  return (
    <div style={{ display: onflex ? "flex" : "block" }}>
      <div>
        <h3>Product Wise Deposits</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {MILYs.map((d) => (
            <div
              style={{
                padding: "2rem",
                margin: "1rem 1rem 0 0",
                outline: "1px dashed " + colorM("blue-black-10", 0.25),
                borderRadius: "7px",
                minWidth: "200px",
              }}
            >
              <h3>{d.itemName}</h3>
              <br />
              <br />

              <div style={{ width: "fit-content" }}>
                <div>
                  <h5>Total Price </h5>&nbsp;&nbsp;&nbsp;
                  <h4
                    style={{
                      fontFamily: "Product Sans Bold",
                      color: colorM("blue-black-4", 0.6),
                    }}
                  >
                    {d.itemPrice}
                  </h4>
                </div>

                <div>
                  <h5>Deposited </h5>&nbsp;&nbsp;&nbsp;
                  <h4
                    style={{
                      fontFamily: "Product Sans Bold",
                      color: colorM("green-black-4", 0.6),
                    }}
                  >
                    {OFMM(d.payments)}
                  </h4>
                </div>

                <hr />

                <div>
                  <h5>
                    Due &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </h5>
                  <h4
                    style={{
                      fontFamily: "Product Sans Bold",
                      color: colorM("red-black-4", 0.6),
                    }}
                  >
                    = {d.itemPrice - OFMM(d.payments)}
                  </h4>
                </div>
              </div>

              <br />
              <br />
              {d.payments.length != 0 && (
                <h4 style={{ fontFamily: "Product Sans Bold" }}>
                  Despositions
                </h4>
              )}
              <div style={{ height: ".75rem" }}></div>
              {d.payments.length == 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: "48px" }}
                    className="material-symbols-rounded"
                  >
                    {"blur_off" as MaterialSymbol}
                  </span>
                  <h4 style={{ fontFamily: "Product Sans Bold" }}>
                    No Deposits Yet
                  </h4>
                  <h5 style={{ width: "200px", textAlign: "center" }}>
                    Customer has'nt started paying this product.
                  </h5>
                </div>
              )}
              {d.payments.map((p, i) => (
                <div key={i}>
                  <h5>
                    {i} . {new Date(p.date).toLocaleDateString()}{" "}
                  </h5>{" "}
                  &nbsp;
                  <h4
                    style={{
                      fontFamily: "Product Sans Bold",
                      color: colorM("green-black-6", 0.4),
                    }}
                  >
                    + {p.amount}
                  </h4>
                </div>
              ))}
            </div>
          ))}
          <br />
        </div>
      </div>

      <br />
      <br />
      <div>
        <h3>Annual Claims</h3>
        <br />
        <div
          style={{
            padding: "2rem",
            margin: "1rem 1rem 0 0",
            outline: "1px dashed " + colorM("blue-black-10", 0.25),
            borderRadius: "7px",
            width: "fit-content",
          }}
        >
          <div>
            <h5 style={{ fontFamily: "Product Sans Bold" }}>Annual Expent </h5>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <h3
              style={{
                fontFamily: "Product Sans Bold",
                color: colorM("blue-black-4", 0.6),
              }}
            >
              {AnnualPrice}
            </h3>
          </div>

          <div>
            <h5 style={{ fontFamily: "Product Sans Bold" }}>Annual Deposit </h5>
            &nbsp;&nbsp;&nbsp;
            <h3
              style={{
                fontFamily: "Product Sans Bold",
                color: colorM("green-black-4", 0.6),
              }}
            >
              {AnnualDeposit}
            </h3>
          </div>

          <hr />

          <div>
            <h5 style={{ fontFamily: "Product Sans Bold" }}>
              Annual Due &nbsp;&nbsp;&nbsp;&nbsp;
            </h5>
            <h3
              style={{
                fontFamily: "Product Sans Bold",
                color: colorM("red-black-4", 0.6),
              }}
            >
              = {AnnualPrice - AnnualDeposit}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
