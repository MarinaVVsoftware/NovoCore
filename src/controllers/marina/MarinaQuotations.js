const path = require("path");
const SendMail = require(path.resolve(__dirname, "../../helpers/SendMail"));
const PartitionalQuotations = require(path.resolve(
  __dirname,
  "../../helpers/PartitionalQuotations"
));

// Marina - Controller
const Marina = {};

// Read all the Marina Quotation
Marina.Read = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_READ_MARINA_QUOTATION (?);", [
        req.params.id
      ])
        .then(([rows, fields]) => {
          rows.pop();
          res.status(200).send(rows[0]);
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Create a new record
Marina.Create = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      // Group the body for easy handle.
      const params = {
        boatId: req.body.boatId,
        quotationStatusId: req.body.quotationStatusId,
        mooringTariffId: req.body.mooringTariffId,
        arrivalDate: req.body.arrivalDate,
        departureDate: req.body.departureDate,
        arrivalStatus: req.body.arrivalStatus,
        mooringTariff: req.body.mooringTariff,
        loa: req.body.loa,
        daysStay: req.body.daysStay,
        discountStayPercentage: req.body.discountStayPercentage,
        currencyAmount: req.body.currencyAmount,
        tax: req.body.tax,
        subtotal: req.body.subtotal,
        total: req.body.total,
        monthlyQuotation: req.body.monthlyQuotation,
        annualQuotation: req.body.annualQuotation,
        semiannualQuotation: req.body.semiannualQuotation,
        creationResponsable: req.body.creationResponsable,
        electricityTariff: req.body.electricityTariff,
        totalElectricityDays: req.body.totalElectricityDays,
        discountElectricityPercentage: req.body.discountElectricityPercentage,
        currencyElectricityAmount: req.body.currencyElectricityAmount,
        electricityTax: req.body.electricityTax,
        electricitySubtotal: req.body.electricitySubtotal,
        electricityTotal: req.body.electricityTotal
      };

      // If the monthly quotation is true, call the partional quotations function.
      if (params.monthlyQuotation) {
        const partialQuotations = PartitionalQuotations(
          req.body.arrivalDate,
          req.body.departureDate
        );

        if (partialQuotations.length === 0)
          throw new Error("No se pudo crear las cotizaciones.");

        partialQuotations.map((element, index) => {
          const quotationsObject = {
            ...params,
            arrivalDate: element.arrivalDate,
            departureDate: element.departureDate,
            daysStay: element.days
          };

          Query(
            mysqlConnection,
            "CALL SP_CREATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            Object.values(quotationsObject)
          );
        });
      } else {
      }

      // 1.- Revisar el tipo de cotizacion
      // Si viene mensual
      // 2.- Valida el quotationStatusId
      // Casos: Suspendido
      // 3.- Hacer las particiones de tiempo de las cotizaciones.
      //if (req.body.monthlyQuotation && !req.body.group_quotation) {
      // Crear una cotización mensual normal.
      //} else {
      // Cualquier cotización.
      //}
      /*Query(
        mysqlConnection,
        "CALL SP_CREATE_MARINA_QUOTATION (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.boatId,
          req.body.quotationStatusId,
          req.body.mooringTariffId,
          req.body.arrivalDate,
          req.body.departureDate,
          req.body.arrivalStatus,
          req.body.mooringTariff,
          req.body.loa,
          req.body.daysStay,
          req.body.discountStayPercentage,
          req.body.currencyAmount,
          req.body.tax,
          req.body.subtotal,
          req.body.total,
          req.body.monthlyQuotation,
          req.body.annualQuotation,
          req.body.semiannualQuotation,
          req.body.creationResponsable,*/
      /* Electricity */
      /* req.body.electricityTariff,
          req.body.totalElectricityDays,
          req.body.discountElectricityPercentage,
          req.body.currencyElectricityAmount,
          req.body.electricityTax,
          req.body.electricitySubtotal,
          req.body.electricityTotal
        ]
      )
        .then(result => {
          res.status(200).send({ status: "QUOTATION CREATED" });
        })
        .catch(error => next(error));*/
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Si se cicla, quiza no se ha puesto el res.status.send Promises.all, el resultado de cada promesa es una row.
Marina.ReadList = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      // Objeto para seleccionar el grupo de cotizaciones a base de su status
      const quotationStatus = {
        active: [2, 3, 4, 6, 7, 8, 9, 10],
        draft: [1],
        cancelled: [5, 12, 13],
        deleted: [14],
        finished: [11]
      };

      const statusSelected = quotationStatus.hasOwnProperty(req.query.filterBy)
        ? quotationStatus[req.query.filterBy]
        : quotationStatus[active];

      // Convierte el array a string delimitado por comas para la base de datos.
      Query(mysqlConnection, "CALL SP_READ_MARINA_QUOTATIONS_LIST (?)", [
        statusSelected.toString()
      ])
        .then(([rows, fields]) => {
          const quotations = [];
          const Promises = [];
          const data = [];

          // Se ejecuta UNA promesa y se hace un push a las nuevas promesas para la electricidad.
          rows[0].forEach((element, index) => {
            Promises.push(
              Query(
                mysqlConnection,
                "CALL SP_BoatElectricity_GetByBoat (?,?)",
                [element.client_id, element.boat_name]
              )
            );
            quotations.push(element);
          });

          // Se ejecuta las promesas sincronas y se crea un objeto nuevo por cada iteración.
          Promise.all(Promises)
            .then(result => {
              result.forEach((element, index) => {
                data.push(
                  Object.assign({}, quotations[index], {
                    electricity: element[0][0]
                  })
                );
              });
              res.status(200).send(data);
            })
            .catch(error => next(error));
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

// Redireccionamiento de /api/marina/quotation/active
Marina.GetDefault = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      res.redirect("active");
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

/*------------------------------ Quotation Status --------------------------------------*/
Marina.StatusSent = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_UPDATE_MARINA_QUOTATION_STATUS (?,?);", [
        req.params.id,
        9
      ])
        .then(result => {
          // Send a mail as a promise.
          SendMail("manu.gtzp@gmail.com", "test", "test", "<h1>test</h1>")
            .then(result => {
              res
                .status(200)
                .send({ status: "QUOTATION UPDATED TO STATUS SENT." });
            })
            .catch(error => next(error));
        })
        .catch(error => next(error));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Marina.StatusAccepted = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_UPDATE_MARINA_QUOTATION_STATUS (?,?);", [
        req.params.id,
        2
      ]).then(result => {
        res
          .status(200)
          .send({ status: "QUOTATION UPDATED TO STATUS ACCEPTED " });
      });
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Marina.StatusValidated = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_UPDATE_MARINA_QUOTATION_STATUS (?,?);", [
        req.params.id,
        3
      ]).then(result => {
        res
          .status(200)
          .send({ status: "QUOTATION UPDATED TO STATUS VALIDATED" });
      });
    } catch (error) {
      console.log(errorr);
      next(newError(error, 500));
    }
  };
};

Marina.StatusDeclined = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_UPDATE_MARINA_QUOTATION_STATUS (?,?);", [
        req.params.id,
        2
      ]).then(result => {
        res.status(200).send({ status: "QUOTATION HAS BEEN DECLINED" });
      });
    } catch (error) {
      console.log(errorr);
      next(newError(error, 500));
    }
  };
};

Marina.StatusWithOutPay = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Marina.StatusPartialPaid = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusMoratoriumCharge = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusSuspension = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusPaid = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusFinished = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusCancelled = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusExpired = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

Marina.StatusDeleted = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
    } catch (error) {}
  };
};

module.exports = Marina;
