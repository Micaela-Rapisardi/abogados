var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModels');

//Para ver el formulario del login
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

//cerrar login
router.get('/logout', function(req, res, next) {
    req.session.destroy(); //destruye id y usuario
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

//procesa el formulario
router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario, password);


        if (data != undefined) {
            req.session.id_usuario=data.id;
            req.session.nombre=data.usuario;
            
            res.redirect('/admin/novedades');
        } else {
             res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    }catch (error) {
            console.log(error);
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }

    });


module.exports = router;
