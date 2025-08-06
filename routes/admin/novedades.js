var express = require('express');
var router = express.Router();

// listar novedades
router.get('/', function(req, res, next) {
  res.render('admin/novedades',{
    layout:'admin/layout',
    persona:req.session.nombre
  });
});

module.exports = router;
