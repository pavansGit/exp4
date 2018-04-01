var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/', user_controller.index);

router.post('/', user_controller.user_create);

router.get('/user/:id', user_controller.user_detail);

//POST request to delete User
router.post('/user/:id', user_controller.user_delete_post);

router.get('/user/:id/edit', user_controller.user_edit_get);

router.post('/user/:id/edit', user_controller.user_edit_post);


module.exports = router;
