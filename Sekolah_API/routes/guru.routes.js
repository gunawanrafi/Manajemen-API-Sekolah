module.exports = app => {
  const guru = require('../controllers/guru.controller.js');
  const router = require('express').Router();

  // Prefix: /api/guru
  router.post('/', guru.create);
  router.get('/', guru.findAll);
  router.get('/:id', guru.findOne);
  router.put('/:id', guru.update);
  router.delete('/:id', guru.delete);

  app.use('/api/guru', router);
};