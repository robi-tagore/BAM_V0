'use client'

import { colorM } from "@/deps/color";
import { MaterialSymbol } from "material-symbols";
import { RevisedButtonR } from "../components";
import { useRouter } from "next/navigation";

export function IconAndData({
  data,
  icon,
  size,
  weightM
}: {
  icon?: MaterialSymbol;
  data: JSX.Element;
  size?: string;
  weightM?:string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: ".25rem 1rem 0 0 ",
      }}
    >
      <span style={{ fontSize: size,...(weightM ? {fontWeight:weightM} : {}) }} className="material-symbols-rounded">
        {icon}
      </span>
      &nbsp;
      <span>{data}</span>
    </div>
  );
}

export function CustomerView({
  customerData,
  actions,
}: {
  customerData: Partial<Customer>;
  actions?: {
    delete?: boolean;
    edit?: boolean;
    view?: boolean;
  };
}) {
  var route = useRouter();
  return (
    <div
      style={{
        padding: "2rem",
        background: colorM("red-white-10"),
        // width:'calc(100% - 4rem)',
        width: "calc(100% - 4rem)",
        borderRadius: "13px",
        // display:'flex',
        justifyContent: "center",
        // flexDirection:'column',
        position: "relative",
      }}
      className="mshadow"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <br />
          {customerData.name && (
            <>
              <h3 style={{ fontFamily:'Product Sans Bold' }}>
                {customerData.name.first}&nbsp;{customerData.name.last}&nbsp;
              </h3>
              <br />
              <h5>
                {customerData.name.surname != "" && (
                  <>~ {customerData.name.surname}</>
                )}
              </h5>
              <br />
            </>
          )}
        </div>
        <div>
          {customerData.uniqueIdentity && (
            <span>
              <h5
                style={{
                fontFamily: "Product Sans Bold",
                }}
              >
                #{customerData.uniqueIdentity}
              </h5>
              {/* <h5>&nbsp; Will be Customer Id &nbsp;</h5> */}
            </span>
          )}
        </div>
      </div>

      <br />
      {customerData.physicalIdentity &&
        customerData.physicalIdentity.length != 0 && (
          <>
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
              size="22px"
              icon="location_on"
            ></IconAndData>

            <span>
              {customerData.physicalIdentity.map((d, i) => (
                <span key={i} style={{ marginLeft: "1rem" }}>
                  <h5>{i} </h5> <h5 style={{ fontWeight: "500" }}>{d}</h5>{" "}
                  <br />{" "}
                </span>
              ))}
            </span>
            <br />
          </>
        )}

      {customerData.virtualIdentity && (
        <>
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
            size="22px"
            icon="cloud"
          ></IconAndData>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              paddingLeft: ".5rem",
            }}
          >
            {customerData.virtualIdentity.phoneNumber && (
              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "500" }}>
                    {customerData.virtualIdentity.phoneNumber}
                  </h5>
                }
                icon={"call"}
              ></IconAndData>
            )}
            {customerData.virtualIdentity.emergencyNumber && (
              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "500" }}>
                    {customerData.virtualIdentity.emergencyNumber}
                  </h5>
                }
                icon={"call_quality"}
              ></IconAndData>
            )}
            {customerData.virtualIdentity.email && (
              <IconAndData
                size="20px"
                data={
                  <h5 style={{ fontWeight: "500" }}>
                    {customerData.virtualIdentity.email}
                  </h5>
                }
                icon={"mark_email_read"}
              ></IconAndData>
            )}
          </div>
        </>
      )}

      <br />
      {actions && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {actions.view && (
            <div style={{ margin: "1rem .25rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                // spacingX=".5rem"
                reverse={true}
                HWFs={["2rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/customers/view?customerid=" + customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("green-white-10"),
                  colorM("green-black-6", 0.4),

                  colorM("green-black-0", 0.1),
                ]}
                icon="table_eye"
                text="View"
              ></RevisedButtonR>
            </div>
          )}
          {actions.edit && (
            <div style={{ margin: "1rem .25rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                // spacingX=".5rem"
                reverse={true}
                HWFs={["2rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/customers/manage?action=edit&customerid=" +
                      customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("blue-white-10"),
                  colorM("blue-black-6", 0.4),

                  colorM("blue-black-0", 0.1),
                ]}
                icon="edit"
                text="Edit"
              ></RevisedButtonR>
            </div>
          )}
          {actions.delete && (
            <div style={{ margin: "1rem .25rem 0 0" }}>
              <RevisedButtonR
                radius="7px"
                // spacingX=".5rem"
                reverse={true}
                HWFs={["2rem", "auto", "12px"]}
                sinensisAct={() => {
                  route.push(
                    "/customers/delete?customerid=" +
                      customerData.uniqueIdentity
                  );
                }}
                palate={[
                  colorM("red-white-10"),
                  colorM("red-black-6", 0.4),

                  colorM("red-black-0", 0.1),
                ]}
                icon="delete_forever"
                text="Delete"
              ></RevisedButtonR>
            </div>
          )}
        </div>
      )}
      <div style={{ height: ".75rem" }}></div>
      <RevisedButtonR
        radius="7px"
        // spacingX=".5rem"
        // reverse={true}
        HWFs={["2rem", "auto", "12px"]}
        sinensisAct={() => {
          route.push("/records/manage?customerref=" + customerData.uniqueIdentity);
        }}
        palate={[
          colorM("orange-white-10"),
          colorM("orange-black-3", 0.8),
          colorM("orange-black-0", 0.1),
        ]}
        icon="open_in_new"
        text="Assign a Record"
      ></RevisedButtonR>
    </div>
  );
}
