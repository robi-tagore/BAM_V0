import { Env_M } from "@/envVar";

export var Subjects = {
  payment: `Payment Proof from ${Env_M.EDITION.FOR}`,
  record: `A Record of ${Env_M.EDITION.FOR} has Mentioned You`,
  customer: `About your Membership with ${Env_M.EDITION.FOR}`,
  notice: `Notice from ${Env_M.EDITION.FOR}`,
};

export var Bodys = {
  payment: `The following payment has been recently included in the database of ${Env_M.EDITION.FOR}, that has mentioned your customer id. Please review the details and store it carefully as a proof. You may have to use it in future as proof of payment. \r\n\r\n ${Env_M.EDITION.FOR}\r\nBusiness Administration\r\nA Sinensis Production (2)`,
  record: `The Record below of ${Env_M.EDITION.FOR} has a mention of you as a customer. You may have bought a product from ${Env_M.EDITION.FOR}. The record has all the details about your shopping cart. Link payment with this Record to start a Due. Store this email carefully as a proof. \r\n\r\n ${Env_M.EDITION.FOR}\r\nBusiness Administration\r\nA Sinensis Production (2)`,
  customer: `Welcome to ${Env_M.EDITION.FOR}. I, ${Env_M.EDITION.OF} from ${Env_M.EDITION.FOR} is wishing you a great journey from now, hope you will be with us in the future`,
  notice: `The following notice has been sent to you in monthly basis. Pleas review it carefully.`,
};
