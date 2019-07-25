const MarinaQuotationElectricity = {};

MarinaQuotationElectricity.GetElectricity = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      res.send("GetElectricity");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

MarinaQuotationElectricity.PutElectricity = (
  newError,
  Query,
  mysqlConnection
) => {
  return (req, res, next) => {
    try {
      res.send("PutElectricity");
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = MarinaQuotationElectricity;
