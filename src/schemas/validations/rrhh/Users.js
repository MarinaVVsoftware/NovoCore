/* Modelos de validación de los endpoints de Users */
const Users = {};

/* Valida los params de la url */
Users.ParamsGetUserByName = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Users.ParamsPutUserByName = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Users.BodyPutUserByName = {
  type: "object",
  required: ["user"],
  properties: {
    user: {
      type: "object",
      required: ["rolId", "statusId", "email", "username", "recruitmentDate"],
      properties: {
        rolId: {
          type: "number"
        },
        statusId: {
          type: "number"
        },
        email: {
          type: "string"
        },
        username: {
          type: "string"
        },
        recruitmentDate: {
          type: "string"
        }
      }
    }
  }
};

/* Valida los params de la url */
Users.ParamsDeleteUserByName = {
  type: "object",
  required: ["email"],
  properties: {
    email: {
      type: "string"
    }
  }
};

module.exports = Users;
