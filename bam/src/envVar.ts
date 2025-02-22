export namespace Env_M {
  // Database Configuration
  export var DATABASE_NAME:string = process.env.NEXT_PUBLIC_DATABASE_NAME!;
  export var MONGODB_CONNECTION_STRING:string = process.env.NEXT_PUBLIC_MONGODB_CONNECTION_STRING!;

  // Admin Server Configuration
  export var ADMIN_SERVER = {
    EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL_SERVER!,
    PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD_SERVER!,
  };

  // Admin Client Configuration
  export var ADMIN_CLIENT = {
    EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL_CLIENT!,
    NAME: process.env.NEXT_PUBLIC_ADMIN_EMAIL_NAME!,
  };

  // Outgoing Mail Server
  export var OUTGOING_MAIL_SERVER = {
    HOST: process.env.NEXT_PUBLIC_OUTGOING_MAIL_SERVER_HOST!,
    PORT: Number(process.env.NEXT_PUBLIC_OUTGOING_MAIL_SERVER_PORT!),
  };

  // Edition Information
  export var EDITION = {
    FOR: process.env.NEXT_PUBLIC_EDITION_FOR!,
    OF: process.env.NEXT_PUBLIC_EDITION_OF!,
    THEME: process.env.NEXT_PUBLIC_EDITION_THEME!,
    EDITION: process.env.NEXT_PUBLIC_EDITION_EDITION!,
  };

  // Administrative Password
  export var ADMINISTRATIVE_PASSWORD:string = process.env.NEXT_PUBLIC_ADMINISTRATIVE_PASSWORD!;
}
