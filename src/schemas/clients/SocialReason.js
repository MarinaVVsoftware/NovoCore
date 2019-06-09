const SocialReason = {};

SocialReason.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

SocialReason.delete = {
  type: "object",
  required: ["id", "delete"],
  properties: {
    id: {
      type: "number"
    },
    delete: {
      type: "number"
    }
  }
};

SocialReason.create = {
  type: "object",
  required: [
    "client_id",
    "email",
    "social_reason",
    "RCD",
    "CFDI",
    "address",
    "status_id"
  ],
  properties: {
    client_id: {
      type: "number"
    },
    email: {
      type: "string"
    },

    social_reason: {
      type: "string"
    },
    RCD: {
      type: "string"
    },
    CFDI: {
      type: "string"
    },
    address: {
      type: "string"
    },
    status_id: {
      type: "number"
    }
  }
};

SocialReason.update = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    },
    ...SocialReason.create.properties
  }
};

module.exports = SocialReason;
