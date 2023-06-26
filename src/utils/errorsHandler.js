exports.extractErrMessages = (error) => {
    switch (error.name) {
      case "MongoServerError":
        return ["Username is already taken"];
      case "MongooseError":
        return ["Passwords do not match"];
      default:
        return Object.values(error.errors).map((x) => x.message);
    }
};