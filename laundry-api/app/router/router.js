const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const laundryController = require('../controllers').laundry;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup',
		[
            verifySignUpController.checkDuplicateUserNameOrEmail,
			verifySignUpController.checkRolesExisted
		],
		(req, res) => {
			verifySignController.signup(req, res);
		});

	app.post('/api/auth/signin', (req, res) => {
		verifySignController.signin(req, res);
	});
	
    // ini method post di pertemuan sebelumnya

	// app.post('/api/auth/signin', (req, res) => {
    //     verifySignController.signIn(req,res);
    // }); 

	//Status
	app.get('/api/laundry', (req, res) => {
		laundryController.list(req, res);
	});
	app.get('/api/laundryuser', [verifyJwtTokenController.verifyToken], (req, res) => {
		laundryController.listStatusUser(req, res);
	});
	app.get('/api/laundry/:id',
		[
            verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			laundryController.getById(req, res);
		});
	app.post('/api/laundry',
		[
            verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			laundryController.add(req, res);
		});
	app.put('/api/laundry/:id',
		[
            verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			laundryController.update(req, res);
		});
	app.delete('/api/laundry/:id',
		[
            verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			laundryController.delete(req, res);
		});
}