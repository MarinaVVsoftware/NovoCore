/* Modelos de validación de los endpoints de Roles */
const Roles = {};

/* Valida los params de la url */
Roles.ParamsPutRolByName = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Roles.BodyPutUserByName = {
  type: "object",
  required: ["rank_id", "rol_name", "permissions"],
  properties: {
    rank_id: {
      type: "number"
    },
    rol_name: {
      type: "string"
    },
    permissions: {
      type: "string"
    }
  }
};

/* Valida los params de la url */
Roles.ParamsDeleteRolByName = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string"
    }
  }
};

module.exports = Roles;
