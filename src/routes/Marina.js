// Routes

const Marina = require('../controllers/Marina');

module.exports = (app, router, mysqlConnection) => {
	router.get('/api/Marina/Read', Marina.Read(mysqlConnection));
	router.patch('/api/Marina/Delete', Marina.Delete(mysqlConnection));
	router.delete('/api/Marina/Erase', Marina.Erase(mysqlConnection));
	router.post('/api/Marina/Create', Marina.Create(mysqlConnection));
	router.put('/api/Marina/Update', Marina.Update(mysqlConnection));

	app.use(router);
};
