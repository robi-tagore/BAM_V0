import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.url.includes("manage") ||
    (request.url.includes("users") && !request.url.includes("api"))
  ) {

    var sessionEmail = cookies().get("logged" as sessionKey)?.value
    
    var logged = cookies().get("logged" as sessionKey)?.value;
    if (!sessionEmail || sessionEmail == null || logged == 'out') {
      return NextResponse.rewrite(new URL("/privilage", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.next();
  }
}
