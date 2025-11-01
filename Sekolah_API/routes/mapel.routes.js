module.exports = app => {
  const mapel = require('../controllers/mapel.controller.js');
  const router = require('express').Router();

  // Prefix: /api/mapel
  router.post('/', mapel.create);
  router.get('/', mapel.findAll);
  router.get('/:id', mapel.findOne);
  router.put('/:id', mapel.update);
  router.delete('/:id', mapel.delete);

  app.use('/api/mapel', router);
};