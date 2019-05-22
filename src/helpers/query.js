/* Función que retorna una promesa. Ayuda a transformar la función
query de mysql en una promesa y usarla eficientemente. */
const Query = async function ExecuteQuery(mysqlConnection, query, params) {
  return await mysqlConnection.promise().query(query, params);
};

module.exports = Query;
