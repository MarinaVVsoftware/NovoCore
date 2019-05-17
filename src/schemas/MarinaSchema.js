const MarinaSchema = {};
const MarinaDebtSchema = {};

MarinaSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

MarinaSchema.delete = {
	type: "object",
	required: [ "id", "delete" ],
	properties: {
		id: {
			type: "number"
		},
		delete: {
			type: "number"
		}
	}
};

MarinaSchema.create = {
	type: "object",
	required: [
		"boatId",
		"quotationStatusId",
		"mooringRateId",
		"arrivalDate",
		"departureDate",
		"arrivalStatus",
		"daysStay",
		"discountStay",
		"tax",
		"total",
		"subtotal"
	],
	properties: {
		boatId: {
			type: "number"
		},
		quotationStatusId: {
			type: "number"
		},
		mooringRateId: {
			type: "number"
		},
		arrivalDate: {
			type: "string"
		},
		departureDate: {
			type: "string"
		},
		arrivalStatus: {
			type: "boolean"
		},
		daysStay: {
			type: "number"
		},
		discountStay: {
			type: "number"
		},
		tax: {
			type: "number"
		},
		total: {
			type: "number"
		},
		subtotal: {
			type: "number"
		}
	}
};

MarinaSchema.update = {
	type: "object",
	required: [ "quotationId" ],
	properties: {
		quotationId: {
			type: "number"
		},
		...MarinaSchema.create.properties
	}
};

MarinaDebtSchema.create = {
	type: "object",
	required: [ "clientId", "folio", "amount", "creationDate" ],
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

MarinaDebtSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

MarinaDebtSchema.update = {
	type: "object",
	required: [ "marinaDebtId" ],
	properties: {
		marinaDebtId: {
			type: "number"
		},
		...MarinaDebtSchema.create.properties
	}
};

module.exports = {
	MarinaSchema,
	MarinaDebtSchema
};
