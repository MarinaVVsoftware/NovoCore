// Carga cada archivo de routes en un único directorio
// de routes, aquí se carga el arbol superior de las rutas y facilita
// entender el ruteo de la API. También ayuda a el paso de parámetros de instancias
// necesarias.
const path = require("path");
const Log = require(path.resolve(__dirname, "../helpers/Logs"));
const Auth = require(path.resolve(__dirname, "../routes/Auth"));
const ErrorHandler = require(path.resolve(__dirname, "../routes/ErrorHandler"));
/* Imports de Users y RRHH */
const Users = require(path.resolve(__dirname, "../routes/Users"));
const Roles = require(path.resolve(__dirname, "../routes/Roles"));
/* Imports de Clients */
const Clients = require(path.resolve(__dirname, "../routes/Clients"));
const Bank_Account = require(path.resolve(__dirname, "../routes/Bank_Account"));
const Social_Reason = require(path.resolve(__dirname, "../routes/Social_Reason"));
const Electronic_Wallet_Historic = require(path.resolve(
	__dirname,
	"../routes/electronicWallet/Electronic_Wallet_Historic"
));
const Electronic_wallet = require(path.resolve(__dirname, "../routes/electronicWallet/Electronic_Wallet"));
const ElectronicSignature = require(path.resolve(__dirname, "../routes/electronicSignature/ElectronicSignature"));
/* Imports de Marina */
const Marina = require(path.resolve(__dirname, "../routes/marina/Marina"));
const MarinaServices = require(path.resolve(__dirname, "../routes/marina/MarinaServices"));
const MarinaQuotationServices = require(path.resolve(__dirname, "../routes/marina/MarinaQuotationServices"));
const MarinaDebts = require(path.resolve(__dirname, "../routes/marina/MarinaDebts"));
const MarinaPayments = require(path.resolve(__dirname, "../routes/marina/MarinaPayments"));
const MarinaPaymentTypes = require(path.resolve(__dirname, "../routes/marina/MarinaPaymentTypes"));

/* Imports de Boats */
const BoatDocuments = require(path.resolve(__dirname, "../routes/boats/BoatDocuments"));
const BoatDocumentTypes = require(path.resolve(__dirname, "../routes/boats/BoatDocumentTypes"));
const Boats = require(path.resolve(__dirname, "../routes/boats/Boats"));
const CableTypes = require(path.resolve(__dirname, "../routes/boats/CableTypes"));
const Slips = require(path.resolve(__dirname, "../routes/boats/Slips"));
const SlipTypes = require(path.resolve(__dirname, "../routes/boats/SlipTypes"));
const SocketTypes = require(path.resolve(__dirname, "../routes/boats/SocketTypes"));

module.exports = (app, router, newError, Query, validate, mysqlConnection) => {
	const instances = [ app, router, newError, Query, validate, mysqlConnection ];

	/* Middleware: Autenticación */
	//Auth(app);

	/* Rutas del Modelo de Users y RRHH */
	Users(app, router, mysqlConnection);
	Roles(app, router, mysqlConnection);

	/* Rutas del Modelo de Clients */
	Clients(app, router, mysqlConnection);
	Bank_Account(app, router, mysqlConnection);
	Social_Reason(app, router, mysqlConnection);
	Electronic_Wallet_Historic(app, router, mysqlConnection);
	Electronic_wallet(app, router, mysqlConnection);
	ElectronicSignature(...instances);

	/* Rutas del Modelo de Marina */
	Marina(...instances);
	MarinaServices(...instances);
	MarinaQuotationServices(...instances);
	MarinaDebts(...instances);
	MarinaPayments(...instances);
	MarinaPaymentTypes(...instances);

	/* Rutas del Modelo de Boats */
	BoatDocuments(...instances);
	BoatDocumentTypes(...instances);
	Boats(...instances);
	CableTypes(...instances);
	Slips(...instances);
	SlipTypes(...instances);
	SocketTypes(...instances);

	/* Middleware: Manejo de Errores */
	ErrorHandler(app);

	Log.Success("Rutas de la API cargadas.");
};
