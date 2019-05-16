const marinaSchema = {};

marinaSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

marinaSchema.delete = {
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

marinaSchema.create = {
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

marinaSchema.update = {
	type: "object",
	required: [ "quotationId" ],
	properties: {
		quotationId: {
			type: "number"
		},
		...marinaSchema.create.properties
	}
};

module.exports = marinaSchema;
