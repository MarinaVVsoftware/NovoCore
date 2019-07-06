const MarinaDebts = {};

MarinaDebts.create = {
  type: "object",
  required: ["clientId", "folio", "amount", "creationDate"],
  properties: {
    clientId: {
      type: "number"
    },
    folio: {
      type: "number"
    },
    amount: {
      type: "number"
    },
    creationDate: {
      type: "string"
    }
  }
};

MarinaDebts.erase = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "number"
    }
  }
};

MarinaDebts.update = {
  type: "object",
  required: ["marinaDebtId"],
  properties: {
    marinaDebtId: {
      type: "number"
    },
    ...MarinaDebts.create.properties
  }
};

module.exports = MarinaDebts;
