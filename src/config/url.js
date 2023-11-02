class URL {
  static api() {
    let env = process.env.APP_ENV;

    if (env === "dev") {
      return "/";
    } else if (env === "uat") {
      return "/";
    } else if (env === "prod") {
      return "/";
    }

    return "/";
  }
}

export default URL;
