const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");
const Query = require("../helpers/query");

// Marina - Controller
const Boats = {};

/* Trae la lista de botes que pertenecen a un cliente
mediante el id del cliente. */
Boats.GetBoatsByClient = mysqlConnection => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.clientId)))
        next(newError('el param "clientId" no es un número válido.', 500));

      /* trae todos los barcos del cliente, y junto trae todos los engines, relaciones
      eléctricas y motores de cada barco. */
      let Promises = [
        Query(mysqlConnection, "CALL SP_READ_BOATS_BY_CLIENT (?);", [
          req.params.clientId
        ]),
        Query(mysqlConnection, "CALL SP_READ_ENGINES_BY_CLIENT (?);", [
          req.params.clientId
        ]),
        Query(mysqlConnection, "CALL SP_READ_BOAT_ELECTRICITY_BY_CLIENT (?);", [
          req.params.clientId
        ]),
        Query(mysqlConnection, "CALL SP_READ_BOAT_DOCUMENTS_BY_CLIENT (?);", [
          req.params.clientId
        ])
      ];

      /* Ejecuta asíncronamente todas las query, y espera a todas. */
      Promise.all(Promises)
        .then(result => {
          /* la data está dentro de un array tridimensional. así se saca de los arrays */
          let boats = result[0][0][0];
          let engines = result[1][0][0];
          let boatElectricity = result[2][0][0];
          let documents = result[3][0][0];

          /* Mapeo de boats de array a un objeto json con keys */
          let response = {};
          boats.map(boat => {
            /* crea los object element contenedores */
            response[boat.boat_name] = { boat: boat };
            response[boat.boat_name].engines = [];
            response[boat.boat_name].electricity = [];
            response[boat.boat_name].documents = {};

            /* Inserta cada engine dentro del bote respectivo */
            engines.forEach(engine => {
              if (engine.boat_id == boat.boat_id) {
                response[boat.boat_name].engines.push(engine);
              }
            });

            /* Inserta cada relación eléctrica dentro del bote respectivo */
            boatElectricity.forEach(elect => {
              if (elect.boat_id == boat.boat_id) {
                response[boat.boat_name].electricity.push(elect);
              }
            });

            /* Inserta cada documento en su bote respectivo */
            documents.forEach(document => {
              if (document.boat_id == boat.boat_id) {
                response[boat.boat_name].documents[
                  document.boat_document_type
                ] = document;
              }
            });
          });

          /* envia la data */
          res.status(200).send(
            JSON.stringify({
              boats: response
            })
          );
        })
        .catch(error => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Boats.PutBoat = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send(JSON.stringify("PutBoat"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Boats.DeleteBoat = mysqlConnection => {
  return (req, res, next) => {
    try {
      res.status(200).send(JSON.stringify("DeleteBoat"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Boats;
