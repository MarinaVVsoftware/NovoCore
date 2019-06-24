const path = require("path");
const SendMail = require(path.resolve(__dirname, "../../helpers/SendMail"));
const PartitionalQuotations = require(path.resolve(
  __dirname,
  "../../helpers/PartitionalQuotations"
));

// Marina - Controller
const Marina = {};

// Read a Marina Quotation.
Marina.Read = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
      Query(mysqlConnection, "CALL SP_MarinaQuotations_GetQuotationById (?);", [
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

// Create a new quotation
Marina.Create = (newError, Query, mysqlConnection) => {
  return (req, res, next) => {
    try {
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
        groupQuotation: null,
        creationResponsable: req.body.creationResponsable,
        /* ELECTRICITY */
        electricityTariff: req.body.electricityTariff,
        totalElectricityDays: req.body.totalElectricityDays,
        discountElectricityPercentage: req.body.discountElectricityPercentage,
        currencyElectricityAmount: req.body.currencyElectricityAmount,
        electricityTax: req.body.electricityTax,
        electricitySubtotal: req.body.electricitySubtotal,
        electricityTotal: req.body.electricityTotal
      };

      // If the status is different to nine, set one, otherwise set nine.
      params.quotationStatusId = params.quotationStatusId !== 9 ? 1 : 9;

      // If the monthly quotation is true, call the partional quotations function.
      if (params.monthlyQuotation) {
        Query(mysqlConnection, "CALL SP_MarinaQuotations_GetQuotationGroup();")
          .then(([rows, fields]) => {
            rows.pop();
            // If the value is not null, return rows, otherwise return one.
            let id = rows[0][0]["group_quotation"]
              ? Number(rows[0][0]["group_quotation"])
              : 0;
            id += 1;
            return id;
          })
          .then(id => {
            // Get the partial quotations
            const partialQuotations = PartitionalQuotations(
              req.body.arrivalDate,
              req.body.departureDate
            );

            // Trhow an error if the quotations didn't create.
            if (partialQuotations.length === 0) {
              next(newError(partialQuotations, 400));
            }

            // Create the array of quotations.
            const Promises = [];
            // Map the result of the partial quotations.
            partialQuotations.map((element, index) => {
              // Overwrite the params.
              const quotationParams = {
                ...params,
                arrivalDate: element.arrivalDate,
                departureDate: element.departureDate,
                daysStay: element.days,
                groupQuotation: id
              };

              // Push the create SP.
              Promises.push(
                Query(
                  mysqlConnection,
                  "CALL SP_MarinaQuotations_PostQuotation (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                  Object.values(quotationParams)
                )
              );
            });
            Promise.all(Promises)
              .then(result => {
                res.status(200).send({ status: "QUOTATIONS CREATED." });
              })
              .catch(error => next(error));
          })
          .catch(error => next(error));
      } else {
        Query(
          mysqlConnection,
          "CALL SP_MarinaQuotations_PostQuotation (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          Object.values(params)
        )
          .then(result => {
            res.status(200).send({ status: "QUOTATION CREATED." });
          })
          .catch(error => next(error));
      }
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
      Query(mysqlConnection, "CALL SP_Marina_GetQuotationsByGroup (?)", [
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
      Query(mysqlConnection, "CALL SP_MarinaQuotations_GetQuotationById (?);", [
        req.params.id
      ])
        .then(([rows, fields]) => {
          rows.pop();
          const idStatus = Number(rows[0][0]["marina_quotation_status_id"]);
          if (idStatus > 2) {
            throw new Error("QUOTATION HAS BEEN SENT");
          }
          Query(
            mysqlConnection,
            "CALL SP_MarinaQuotations_PatchStatus (?,?);",
            [req.params.id, 2]
          )
            .then(result => {
              res
                .status(200)
                .send({ status: "QUOTATION UPDATED TO STATUS SENT." });
              // Send a mail as a promise.
              SendMail("manu.gtzp@gmail.com", "test", "test", "<h1>ola</h1>")
                .then(result => {
                  console.log("EMAIL SENT");
                })
                .catch(error => next(error));
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
      Query(mysqlConnection, "CALL SP_MarinaQuotations_PatchStatus (?,?);", [
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
      Query(mysqlConnection, "CALL SP_MarinaQuotations_PatchStatus (?,?);", [
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
      Query(mysqlConnection, "CALL SP_MarinaQuotations_PatchStatus (?,?);", [
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
