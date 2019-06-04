const MarinaSchema = {};
const MarinaDebtSchema = {};
const MarinaPaymentsSchema = {};
const MarinaServicesSchema = {};
const MarinaPaymentTypeSchema = {};
const MarinaQuotationServicesSchema = {};

MarinaSchema.read = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "string",
			pattern: "^[0-9]*$"
		}
	}
};

MarinaSchema.readList = {
	type: "object",
	required: [ "filterBy" ],
	properties: {
		filterBy: { type: "string", enum: [ "active", "draft", "cancelled", "deleted", "finished", "inactive" ] }
	}
};

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
		"mooringTariffId",
		"arrivalDate",
		"departureDate",
		"arrivalStatus",
		"mooringTariff",
		"loa",
		"daysStay",
		"discountStayPercentage",
		"currencyAmount",
		"tax",
		"subtotal",
		"total",
		"monthlyQuotation",
		"annualQuotation",
		"semiannualQuotation",
		"creationResponsable"
	],
	properties: {
		boatId: {
			type: "number"
		},
		quotationStatusId: {
			type: "number"
		},
		mooringTariffId: {
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
		mooringTariff: {
			type: "number"
		},
		loa: {
			type: "number"
		},
		daysStay: {
			type: "number"
		},
		discountStayPercentage: {
			type: "number"
		},
		currencyAmount: {
			type: "number"
		},
		tax: {
			type: "number"
		},
		subtotal: {
			type: "number"
		},
		total: {
			type: "number"
		},
		monthlyQuotation: {
			type: "boolean"
		},
		annualQuotation: {
			type: "boolean"
		},
		semiannualQuotation: {
			type: "boolean"
		},
		creationResponsable: {
			type: "string"
		},
		electricityTariff: {
			type: "number"
		},
		totalElectricityDays: {
			type: "number"
		},
		discountElectricityPercentage: {
			type: "number"
		},
		currencyElectricityAmount: {
			type: "number"
		},
		electricityTax: {
			type: "number"
		},
		electricitySubtotal: {
			type: "number"
		},
		electricityTotal: {
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

MarinaPaymentsSchema.create = {
	type: "object",
	required: [
		"paymentTypeId",
		"clientId",
		"folio",
		"currency",
		"currencyDate",
		"paymentReceived",
		"convertedAmount",
		"creationDate"
	],
	properties: {
		paymentTypeId: {
			type: "number"
		},
		clientId: {
			type: "number"
		},
		folio: {
			type: "number"
		},
		currency: {
			type: "number"
		},
		currencyDate: {
			type: "string"
		},
		paymentReceived: {
			type: "number"
		},
		convertedAmount: {
			type: "number"
		},
		creationDate: {
			type: "string"
		}
	}
};

MarinaPaymentsSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

MarinaPaymentsSchema.update = {
	type: "object",
	required: [ "marinaPaymentId" ],
	properties: {
		marinaPaymentId: {
			type: "number"
		},
		...MarinaPaymentsSchema.create.properties
	}
};

MarinaServicesSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

MarinaServicesSchema.create = {
	type: "object",
	required: [ "name", "price" ],
	properties: {
		name: {
			type: "string"
		},
		price: {
			type: "number"
		}
	}
};

MarinaServicesSchema.update = {
	type: "object",
	required: [ "marinaServiceId" ],
	properties: {
		MarinaServiceId: {
			type: "number"
		},
		...MarinaServicesSchema.create.properties
	}
};

MarinaPaymentTypeSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

MarinaPaymentTypeSchema.create = {
	type: "object",
	required: [ "name" ],
	properties: {
		name: {
			type: "string"
		}
	}
};

MarinaPaymentTypeSchema.update = {
	type: "object",
	required: [ "paymentTypeId" ],
	properties: {
		paymentTypeId: {
			type: "number"
		},
		...MarinaPaymentTypeSchema.create.properties
	}
};

MarinaQuotationServicesSchema.create = {
	type: "object",
	required: [ "boatId", "marinaServiceId", "done", "tax", "total", "subtotal", "quantity", "creationDate" ],
	properties: {
		boatId: {
			type: "number"
		},
		marinaServiceId: {
			type: "number"
		},
		done: {
			type: "boolean"
		},
		tax: {
			type: "number"
		},
		total: {
			type: "number"
		},
		subtotal: {
			type: "number"
		},
		quantity: {
			type: "number"
		},
		creationDate: {
			type: "string"
		}
	}
};

MarinaQuotationServicesSchema.update = {
	type: "object",
	required: [ "marinaQuotationServiceId" ],
	properties: {
		marinaQuotationServiceId: {
			type: "number"
		},
		...MarinaQuotationServicesSchema.create.properties
	}
};

MarinaQuotationServicesSchema.delete = {
	type: "object",
	required: [ "marinaQuotationServiceId", "delete" ],
	properties: {
		marinaQuotationServiceId: {
			type: "number"
		},
		delete: {
			type: "number"
		}
	}
};

MarinaQuotationServicesSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

module.exports = {
	MarinaSchema,
	MarinaDebtSchema,
	MarinaPaymentsSchema,
	MarinaServicesSchema,
	MarinaPaymentTypeSchema,
	MarinaQuotationServicesSchema
};
