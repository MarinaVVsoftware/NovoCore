const SocialReasons = {};

SocialReasons.GetSocialReasons = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else
        Query(mysqlConnection, "CALL SP_SocialReasons_GetSocialReasons(?);", [
          req.params.id
        ])
          .then(result => res.status(200).send({ socialReasons: result[0][0] }))
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

SocialReasons.PutSocialReason = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      const socialReason = req.body.socialReason;

      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else if (/[A-ZÑ&]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]/.test(req.params.rfc))
        next(newError("el param 'rfc' no es un rfc válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_SocialReasons_PutSocialReason(?,?,?,?,?,?);",
          [
            req.params.id,
            req.params.rfc,
            socialReason.socialReason,
            socialReason.cfdi,
            socialReason.email,
            socialReason.address
          ]
        )
          .then(() => res.status(201).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

SocialReasons.DeleteSocialReason = (
  newError,
  Query,
  mysqlConnection,
  ErrorSchema
) => {
  return (req, res, next) => {
    try {
      if (isNaN(req.params.id))
        next(newError("el param 'id' no es un string válido.", 406));
      else if (/[A-ZÑ&]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]/.test(req.params.rfc))
        next(newError("el param 'rfc' no es un rfc válido.", 406));
      else
        Query(
          mysqlConnection,
          "CALL SP_SocialReasons_DeleteSocialReason(?,?);",
          [req.params.id, req.params.rfc]
        )
          .then(() => res.status(204).send())
          .catch(error => next(newError(...ErrorSchema(error))));
    } catch (error) {
      next(newError(error, 500));
    }
  };
};

module.exports = SocialReasons;
