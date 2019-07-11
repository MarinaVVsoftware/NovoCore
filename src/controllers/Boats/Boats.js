const Boats = {};

Boats.GetBoatsByClient = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'clientId' no es un número válido.", 400));
      else {
        let Promises = [
          Query(mysqlConnection, "CALL SP_Boats_GetByClient(?);", [
            req.params.id
          ]),
          Query(mysqlConnection, "CALL SP_Engines_GetByClient(?);", [
            req.params.id
          ]),
          Query(mysqlConnection, "CALL SP_BoatElectricity_GetByClient(?);", [
            req.params.id
          ]),
          Query(mysqlConnection, "CALL SP_BoatDocuments_GetByClient(?);", [
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
              response[boat.boatName] = { boat: boat };
              response[boat.boatName].engines = [];
              response[boat.boatName].electricity = [];
              response[boat.boatName].documents = {};

              /* Inserta cada engine dentro del bote respectivo */
              engines.forEach(engine => {
                if (engine.boatId == boat.boatId)
                  response[boat.boatName].engines.push(engine);
              });

              /* Inserta cada relación eléctrica dentro del bote respectivo */
              boatElectricity.forEach(elect => {
                if (elect.boatId == boat.boatId)
                  response[boat.boatName].electricity.push(elect);
              });

              /* Inserta cada documento en su bote respectivo */
              documents.forEach(document => {
                if (document.boatId == boat.boatId)
                  response[boat.boatName].documents[
                    document.boatDocumentType
                  ] = document;
              });
            });

            /* Modificación para pasar por caché */
            res.status(200);
            res.json({
              boats: response
            });
            res.body = {
              boats: response
            };
            next();
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Boats.PutBoat = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else {
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
        Query(mysqlConnection, "CALL SP_Boats_PutBoat(?,?,?,?,?,?);", [
          boat.clientId,
          boat.name,
          boat.model,
          boat.loa,
          boat.draft,
          boat.beam
        ])
          .then(result => {
            boatId = result[0][0][0]["LAST_INSERT_ID()"];

            let Promises = [];

            /* Si se estableció un capitán, se inserta. */
            if (captain)
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_Captains_PutByBoat(?,?,?,?,?,?,?);",
                  [
                    req.params.id,
                    decodeURIComponent(req.params.name),
                    captain.name,
                    captain.phone,
                    captain.email,
                    captain.paymentPermission,
                    captain.aceptationPermission
                  ]
                )
              );

            /* Si se estableció un responsable, se inserta. */
            if (responsable)
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_Responsible_PutByBoat(?,?,?,?,?,?,?);",
                  [
                    req.params.id,
                    decodeURIComponent(req.params.name),
                    responsable.name,
                    responsable.phone,
                    responsable.email,
                    responsable.paymentPermission,
                    responsable.aceptationPermission
                  ]
                )
              );

            /* Si existen engines, por cada engine, crea una query */
            if (engines)
              engines.forEach(engine => {
                Promises.push(
                  Query(
                    mysqlConnection,
                    "CALL SP_Engines_PostByBoat(?,?,?,?);",
                    [
                      req.params.id,
                      decodeURIComponent(req.params.name),
                      engine.model,
                      engine.brand
                    ]
                  )
                );
              });

            /* Si existen engines, por cada engine, crea una query */
            if (electricity)
              electricity.forEach(electr => {
                Promises.push(
                  Query(
                    mysqlConnection,
                    "CALL SP_BoatElectricity_PostByBoat(?,?,?,?);",
                    [
                      req.params.id,
                      decodeURIComponent(req.params.name),
                      electr.cableTypeId,
                      electr.socketTypeId
                    ]
                  )
                );
              });

            /* Si existen documentos, por cada documento, crea una query */
            if (documents)
              documents.forEach(doc => {
                Promises.push(
                  Query(
                    mysqlConnection,
                    "CALL SP_BoatDocuments_PutByBoat(?,?,?,?);",
                    [
                      req.params.id,
                      decodeURIComponent(req.params.name),
                      doc.boatDocumentTypeId,
                      doc.url
                    ]
                  )
                );
              });

            /* Ejecuta todas las promesas y las resuelve todas */
            Promise.all(Promises)
              .then(() => {
                /* Modificación para pasar por caché */
                res.status(201);
                next();
              })
              .catch(error => next(newError(error, 400)));
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Boats.PatchBoat = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else {
        Query(mysqlConnection, "CALL SP_Boats_PatchBoat(?,?,?,?,?,?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name),
          req.body.boat.name,
          req.body.boat.model,
          req.body.boat.loa,
          req.body.boat.draft,
          req.body.boat.beam
        ])
          .then(() => {
            /* Modificación para pasar por caché */
            res.status(204);
            next();
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

Boats.DeleteBoat = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un número válido.", 406));
      else if (!/^[a-z0-9 ]+$/i.test(decodeURIComponent(req.params.name)))
        next(newError("el param 'name' no es un string válido.", 406));
      else {
        /* Elimina el barco */
        Query(mysqlConnection, "CALL SP_Boats_DeleteBoat(?,?);", [
          req.params.id,
          decodeURIComponent(req.params.name)
        ])
          .then(() => {
            let Promises = [
              Query(mysqlConnection, "CALL SP_Captains_DeleteByBoat(?,?);", [
                req.params.id,
                decodeURIComponent(req.params.name)
              ]),
              Query(
                mysqlConnection,
                "CALL SP_Responsible_DeleteByBoat (?,?);",
                [req.params.id, decodeURIComponent(req.params.name)]
              ),
              Query(mysqlConnection, "CALL SP_Engines_DeleteByBoat(?,?);", [
                req.params.id,
                decodeURIComponent(req.params.name)
              ]),
              Query(
                mysqlConnection,
                "CALL SP_Boatelectricity_DeleteByBoat (?,?);",
                [req.params.id, decodeURIComponent(req.params.name)]
              ),
              Query(
                mysqlConnection,
                "CALL SP_BoatDocuments_DeleteByBoat (?,?);",
                [req.params.id, decodeURIComponent(req.params.name)]
              )
            ];

            Promise.all(Promises)
              .then(() => {
                /* Modificación para pasar por caché */
                res.status(204);
                next();
              })
              .catch(error => next(newError(error, 400)));
          })
          .catch(error => next(newError(error, 400)));
      }
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = Boats;
