import { cookies } from "next/headers";
import {
  _Pull_Response__user,
  POST as postToUsersPull,
} from "./admin/api/pull/route";
import { user } from "./admin/user";

export async function getUser({
  providedEmail,
}: {
  providedEmail?: string;
}): Promise<user> {
  providedEmail = providedEmail ?? cookies().get("email")?.value!;

  try {
    var fam = "m";
    var attempt = 0;
    while (true) {
      if (attempt >= 5 || fam == "r") {
        break;
      }

      var res = await postToUsersPull('','');
      var resForm: _Pull_Response__user.core = await res.json();

      fam = resForm.status;
      attempt = attempt + 1;

      var users = resForm.data;
      var user = users.filter(({ email }) => providedEmail == email)[0];

      if (!user) {
        throw new Error("user not found");
      }
      return Promise.resolve(user as user);
    }
  } catch (error) {
    console.log("Err while fetching user @" + providedEmail, error);

    return Promise.resolve({
      email: "anonymous email",
      grade: "un specified",
      username: "unknown",
      logged: "out",
    } satisfies user);
  }

  return Promise.resolve({
    email: "anonymous email",
    grade: "un specified",
    username: "unknown",
    logged: "out",
  } satisfies user);
}
