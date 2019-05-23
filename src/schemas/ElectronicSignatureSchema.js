const ElectronicSignatureSchema = {};

ElectronicSignatureSchema.erase = {
	type: "object",
	required: [ "id" ],
	properties: {
		id: {
			type: "number"
		}
	}
};

ElectronicSignatureSchema.create = {
	type: "object",
	required: [ "signature", "attemps", "attempsResetDate" ],
	properties: {
		signature: {
			type: "number"
		},
		attemps: {
			type: "number"
		},
		attempsResetDate: {
			type: "string"
		}
	}
};

ElectronicSignatureSchema.update = {
	type: "object",
	required: [ "electronicSignatureId" ],
	properties: {
		electronicSignatureId: {
			type: "number"
		},
		...ElectronicSignatureSchema.create.properties
	}
};

module.exports = ElectronicSignatureSchema;
