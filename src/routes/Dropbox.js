const path = require("path");
const Dropbox = require(path.resolve(__dirname, "../controllers/Dropbox"));

module.exports = (
  app,
  router,
  newError,
  Query,
  validate,
  mysqlConnection,
  multer,
  dropbox
) => {
  const instances = [newError, dropbox];

  router.get("/api/dropbox/", Dropbox.GetAccount(...instances));
  router.post(
    "/api/dropbox/",
    multer.single("myFile"),
    Dropbox.UploadFile(...instances)
  );

  app.use(router);
};
