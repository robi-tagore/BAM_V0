

export interface user {
  username: string;
  email: string;
  grade: string;
  privilages?: Array<keyof ["edit", "add"]>;
  logged: "in" | "out" | string;
}
