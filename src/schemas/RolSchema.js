const rolSchema = {};

rolSchema.erase = {
	type: "object",
	required: [ "rolName" ],
	properties: {
		rolName: {
			type: "string"
		}
	}
};

rolSchema.create = {
	type: "object",
	required: [ "rolName", "jsn", "idGrade" ],
	properties: {
		rolName: {
			type: "string"
		},
		jsn: {
			type: "object"
		},
		idGrade: {
			type: "number"
		}
	}
};

rolSchema.update = {
	type: "object",
	required: [ "rolName" ],
	properties: {
		...rolSchema.create.properties
	}
};
module.exports = rolSchema;
