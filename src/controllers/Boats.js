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
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "clientId" no es un número válido.', 500));

      /* trae todos los barcos del cliente, y junto trae todos los engines, relaciones
      eléctricas y motores de cada barco. */
      let Promises = [
        Query(mysqlConnection, "CALL SP_READ_BOATS_BY_CLIENT (?);", [
          req.params.id
        ]),
        Query(mysqlConnection, "CALL SP_READ_ENGINES_BY_CLIENT (?);", [
          req.params.id
        ]),
        Query(mysqlConnection, "CALL SP_READ_BOAT_ELECTRICITY_BY_CLIENT (?);", [
          req.params.id
        ]),
        Query(mysqlConnection, "CALL SP_READ_BOAT_DOCUMENTS_BY_CLIENT (?);", [
          req.params.id
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
      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.id)))
        next(newError('el param "clientId" no es un número válido.', 500));

      /* Valida manualmente si el nombre del barco es un string alfanumérico válido */
      if (!/^[a-z0-9]+$/i.test(req.params.name))
        next(newError('el param "name" no es un string válido.', 500));

      let boat = req.body.boat;
      let captain = req.body.captain;
      let responsable = req.body.responsable;
      let engines = req.body.engines;
      let electricity = req.body.electricity;
      let documents = req.body.documents;

      /* Promise bien chonchote para insertar un barco 
      Valida cada objeto que es requerido o no, y si contiene datos, entonces los inserta.
      En los casos de engines, electricity y documents, se hacen los inserts en paralelo
      si son más de uno. */
      Query(mysqlConnection, "CALL SP_PUT_BOAT_BY_NAME (?,?,?,?,?,?);", [
        boat.client_id,
        boat.name,
        boat.model,
        boat.loa,
        boat.draft,
        boat.beam
      ])
        .then(result => {
          boatId = result[0][0][0]["LAST_INSERT_ID()"];

          /* El barco ha sido creado o modificado y se retornó su id, con el
          se puede realizar el resto de inserts o updates. todos los siguientes
          inserts se pueden hacer en paralelo a partir del id del bote. Se crea un
          arreglo de promesas que se ejecutarán en paralelo. */
          let Promises = [];

          /* Si se estableció un capitán, se inserta. */
          if (captain)
            Promises.push(
              Query(mysqlConnection, "CALL SP_CREATE_CAPTAIN (?,?,?,?,?,?);", [
                boatId,
                captain.name,
                captain.phone,
                captain.email,
                captain.payment_permission,
                captain.aceptation_permission
              ])
            );

          /* Si se estableció un responsable, se inserta. */
          if (responsable)
            Promises.push(
              Query(
                mysqlConnection,
                "CALL SP_CREATE_RESPONSABLE (?,?,?,?,?,?);",
                [
                  boatId,
                  responsable.name,
                  responsable.phone,
                  responsable.email,
                  responsable.payment_permission,
                  responsable.aceptation_permission
                ]
              )
            );

          /* Si existen engines, por cada engine, crea una query */
          if (engines)
            engines.forEach(engine => {
              Promises.push(
                Query(mysqlConnection, "CALL SP_CREATE_ENGINE (?,?,?);", [
                  boatId,
                  engine.model,
                  engine.brand
                ])
              );
            });

          /* Si existen engines, por cada engine, crea una query */
          if (electricity)
            electricity.forEach(electr => {
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_CREATE_BOAT_ELECTRICITY (?,?,?);",
                  [boatId, electr.cable_type_id, electr.socket_type_id]
                )
              );
            });

          /* Si existen engines, por cada engine, crea una query */
          if (documents)
            documents.forEach(doc => {
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_CREATE_BOAT_DOCUMENT (?,?,?);",
                  [boatId, doc.boat_document_type_id, doc.url]
                )
              );
            });

          /* Ejecuta todas las promesas y las resuelve todas */
          Promise.all(Promises)
            .then(() => {
              res.status(200).send(
                JSON.stringify({
                  status: "Barco creado correctamente. id: " + boatId
                })
              );
            })
            .catch(error => {
              console.log(error);
              next(error);
            });
        })
        .catch(error => {
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Boats.DeleteBoat = mysqlConnection => {
  return (req, res, next) => {
    try {
      console.log(req.params);
      /* Elimina el barco */
      Query(mysqlConnection, "CALL SP_DELETE_BOAT (?, ?);", [
        req.params.id,
        req.params.name
      ])
        .then(result => {
          /* retorna un status con el id */
          res.status(200).send(
            JSON.stringify({
              status:
                "Barco eliminado correctamente. Id: " + result[0][0][0].boat_id
            })
          );
        })
        .catch(error => {
          /* retorna el mensaje de error */
          console.log(error);
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Boats;