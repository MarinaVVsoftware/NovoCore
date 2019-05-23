const userSchema = {};

userSchema.email = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

userSchema.create = {
  type: "object",
  required: ["userName", "email", "rol", "status"],
  properties: {
    userName: {
      type: "string"
    },
    email: {
      type: "string"
    },
    rol: {
      type: "number"
    },
    status: {
      type: "number"
    }
  }
};

userSchema.update = {
  type: "object",
  required: ["userId"],
  properties: {
    userId: {
      type: "number"
    },
    ...userSchema.create.properties
  }
};

module.exports = userSchema;
