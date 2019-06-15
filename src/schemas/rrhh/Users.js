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
  required: ["rol_id", "status_id", "email", "username", "recruitment_date"],
  properties: {
    rol_id: {
      type: "number"
    },
    status_id: {
      type: "number"
    },
    email: {
      type: "string"
    },
    username: {
      type: "string"
    },
    recruitment_date: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Users.ParamsDeleteUserByName = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

module.exports = Users;
