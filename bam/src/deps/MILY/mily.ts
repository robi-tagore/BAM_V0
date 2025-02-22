// var { connect, TLSSocket } = require("tls");
import { connect, TLSSocket } from "tls";

export async function MILY({
  host,
  port,
  body,
  from,
  password,
  subject,
  username,
  to,
  process,
  debug=false,
}: {
  host: string;
  port: number;

  username: string;
  password: string;

  from: string;
  to: string;
  subject: string;
  body: string;

  debug?:boolean,
  process?:string
}): Promise<void> {
  if (!to || !to.includes('@')) {
    return Promise.resolve();
  }

  process = process + " MILY => "

  var password_B64 = Buffer.from(password).toString("base64");
  var username_B64 = Buffer.from(username).toString("base64");

  var SMTP_COMMANDs = [
    `EHLO localhost\r\n`,
    `AUTH LOGIN\r\n`,
    `${username_B64}\r\n`,
    `${password_B64}\r\n`,
    `MAIL FROM:<${username}>\r\n`,
    `RCPT TO:<${to}>\r\n`,
    `DATA\r\n`,
    `Subject: ${subject}
From: ${from}
To: ${to}
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8


${body}

\r\n.\r\n`,
    `QUIT\r\n`,
  ];


  function MILY_LOG(debug:boolean,...args: any) {
    if (debug) {
      console.log(process, ...args);
    }
  }

  MILY_LOG(true,`### has started`);
  MILY_LOG(debug,`host : ${host}`);
  MILY_LOG(debug,`port : ${port}`);
  MILY_LOG(debug,`username : ${username} b64 : ${username_B64}`);
  MILY_LOG(debug,`password : ${password} b64 : ${password_B64}`);
  MILY_LOG(true,`from : ${username}`);
  MILY_LOG(true,`to : ${to}`);
  MILY_LOG(true,`subject : ${subject}`);
  MILY_LOG(debug,`body : ${body.slice(0,1000)}`);

  return new Promise((m, j) => {
    function flyCommands(client: typeof TLSSocket | any) {
      if (SMTP_COMMANDs.length == 0) {
        MILY_LOG(debug,"excecuted all SMTP commands");
        client.end();
        MILY_LOG(true," :) :) :) gracefully ended");
        m();
        return;
      } else {
        var cmd = SMTP_COMMANDs.shift()!;
        MILY_LOG(debug," >>> ", cmd);
        client.write(cmd);
      }
    }

    var clientM = connect({ host: host, port: port }, () => {
      MILY_LOG(debug,`connected to server`);
    });

    clientM.on("data", (d: Buffer) => {
      MILY_LOG(debug," <<< ", d.toString().replaceAll("\r", "").replaceAll("\n", ""));
      flyCommands(clientM);
    });

    clientM.on("error", (err: any) => {
      MILY_LOG(true," !!! ", err);
      MILY_LOG(true," :( :( :( ended with err");
      j(err);
      // m()
    });

    clientM.on("end", () => {
      MILY_LOG(debug,"connection ended");
    });
  });
}

// MILY({
//   host: "lxbd4.alpha.net.bd",
//   port: 465,
//   body: "Test for development purpose",
//   from: "fahadurrahman@probha.com",
//   password: "Fahad@2005",
//   subject: "A Test",
//   to: "probhaakanda@gmail.com",
//   username: "fahadurrahman@probha.com",
// }).then(
//   () => {
//     console.log("email sent successfully");
//   },
//   (err) => {
//     console.log("email was not sent successfully for", err);
//   }
// );
