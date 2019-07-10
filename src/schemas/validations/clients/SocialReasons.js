const SocialReasons = {};

SocialReasons.ParamsGetSocialReasons = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

SocialReasons.ParamsPutSocialReason = {
  type: "object",
  required: ["id", "rfc"],
  properties: {
    id: {
      type: "string"
    },
    rfc: {
      type: "string"
    }
  }
};

SocialReasons.BodyPutSocialReason = {
  type: "object",
  required: ["socialReason"],
  properties: {
    bankAccount: {
      type: "object",
      required: ["socialReason", "cfdi", "email", "address"],
      properties: {
        socialReason: {
          type: "string"
        },
        cfdi: {
          type: "string"
        },
        email: {
          type: "string"
        },
        address: {
          type: "string"
        }
      }
    }
  }
};

SocialReasons.ParamsDeleteSocialReason = {
  type: "object",
  required: ["id", "rfc"],
  properties: {
    id: {
      type: "string"
    },
    rfc: {
      type: "string"
    }
  }
};

module.exports = SocialReasons;
