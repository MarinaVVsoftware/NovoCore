/* Función que retorna una promesa. Ayuda a transformar la función
fetch en una promesa para utilizarse apropiadamente. */
const Fetch = async (url, params) => {
  return await fetch(url, params);
};

module.exports = Fetch;
