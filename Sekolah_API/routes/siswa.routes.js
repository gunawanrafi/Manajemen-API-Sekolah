module.exports = app => {
  const siswa = require('../controllers/siswa.controller.js');
  const router = require('express').Router();

  // Prefix untuk semua rute ini adalah /api/siswa
  router.post('/', siswa.create);
  router.get('/', siswa.findAll);
  router.get('/:id', siswa.findOne);
  router.put('/:id', siswa.update);
  router.delete('/:id', siswa.delete);

  app.use('/api/siswa', router);
};