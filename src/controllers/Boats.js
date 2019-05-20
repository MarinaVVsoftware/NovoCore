const Log = require("../helpers/Logs");
const newError = require("../helpers/newError");

// Marina - Controller
const Boats = {};

async function Query(mysqlConnection, query, params, next) {
  let result = await mysqlConnection
    .promise()
    .query(query, params)
    .then(([rows, fields]) => {
      // if (err) next(err);
      rows.pop();

      return rows[0];
    })
    .catch(error => {
      next(error);
    });

  return result;
}

async function test(c) {
  const [rows, fields] = await c.promise().query("show databases");
  console.log(rows);
}

/* Trae la lista de botes que pertenecen a un cliente
mediante el id del cliente. */
Boats.GetBoatsByClient = mysqlConnection => {
  return (req, res, next) => {
    try {
      /* Valida manualmente el tipado de clientId */
      if (isNaN(parseInt(req.params.clientId)))
        next(newError('el param "clientId" no es un número válido.', 500));

      // const r = Query(mysqlConnection, "CALL SP_READ_BOATS_BY_CLIENT (?);", [
      //   req.params.clientId,
      //   next
      // ]);

      const [rows, fields] = mysqlConnection.promise().query("show databases");
      console.log(rows);

      // console.log("fuera del promise");
      // console.log(r);

      test(mysqlConnection);

      // let result = "0";
      // result = Query(mysqlConnection, "CALL SP_READ_BOATS_BY_CLIENT (?);", [
      //   req.params.clientId
      // ]);

      /* rows[0] viene como un array dentro de otro array */
      res.status(200).send(JSON.stringify({ boats: 0 }));
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
