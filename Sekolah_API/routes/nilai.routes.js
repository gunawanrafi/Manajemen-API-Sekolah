module.exports = app => {
  const nilai = require('../controllers/nilai.controller.js');
  const router = require('express').Router();

  // Prefix: /api/nilai
  router.post('/', nilai.create);
  router.get('/', nilai.findAll);
  router.delete('/:id', nilai.delete); // Pastikan ini terpanggil
  
  // Debug route untuk testing
  router.get('/test/:id', async (req, res) => {
    try {
      const nilai = await db.nilai.findByPk(req.params.id);
      res.json({ exists: !!nilai, nilai });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/api/nilai', router);
};