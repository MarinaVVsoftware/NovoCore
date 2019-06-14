const Users = {};

Users.GetUsers = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      res.status(200).send(JSON.stringify("GetUsers"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.GetUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      res.status(200).send(JSON.stringify("GetUserByName"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.PutUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      res.status(200).send(JSON.stringify("PutUserByName"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

Users.DeleteUserByName = (newError, Query, mysqlConnection) => {
  return function(req, res, next) {
    try {
      res.status(200).send(JSON.stringify("DeleteUserByName"));
    } catch (error) {
      console.log(error);
      next(newError(error, 500));
    }
  };
};

module.exports = Users;
