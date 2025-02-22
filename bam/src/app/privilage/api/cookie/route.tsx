import {
  CookieListItem,
  RequestCookie,
  ResponseCookie,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export declare namespace _Cookie_Request_ {
  type core = {
    action: "set" | "get" | "delete";
    names?: Partial<sessionKey[]>;
    cookies?: CookieListItem[];
  };
}

export declare namespace _Cookie_Response_ {
  type core = {
    status: "success" | "failure";
    data: ResponseCookie[];
  };
}

export async function POST(req: Request, res: Response) : Promise<any>{
  var reqParam: _Cookie_Request_.core = await req.json();

  var cookieFetched: (ResponseCookie | undefined)[] = [];

  if (reqParam.action == "set" && reqParam.cookies) {
    reqParam.cookies?.forEach((cookie) => {
      cookies().set(cookie);
    });
    cookieFetched = reqParam.cookies.map(({ name }) => cookies().get(name));
  } else if (reqParam.action == "get") {
    cookieFetched = reqParam.names!.map((name) => cookies().get(name!));
  } else if (reqParam.action == "delete") {
    reqParam.names?.forEach((name) => cookies().delete(name!));
    cookieFetched = reqParam.names!.map((name) => cookies().get(name!));
  }

  return Response.json({
    status: "success",
    data: cookieFetched,
  } as _Cookie_Response_.core);

  // } catch (err) {
  //   return Response.json({
  //     status: "failure",
  //     data: err,
  //   } as _Create_OTP_Response_.core);
  // }
}
