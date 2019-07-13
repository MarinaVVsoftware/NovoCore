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
  required: ["rol"],
  properties: {
    rol: {
      type: "object",
      required: ["rankId", "rolName", "permissions"],
      properties: {
        rankId: {
          type: "number"
        },
        rolName: {
          type: "string"
        },
        permissions: {
          type: ["object", "array", "string"]
        }
      }
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
