const express = require('express');
const { getShortURlController, createShortURlController, updateShortURlController, partialUpdateShortURlController, deleteShortURlController } = require('../controllers/serviceController');
const router = express.Router();

// GET
router.get('/', getShortURlController)
router.post('/', createShortURlController)
router.put('/:id', updateShortURlController)
router.patch('/:id', partialUpdateShortURlController)
router.delete('/:id', deleteShortURlController)

// POST
// router.post('/', (req, res) => {
//     res.send('Post method called')
// })

// // PUT
// router.put('/dfd', (req, res) => {
//     res.send('Put method called')
// })

// // PATCH 
// router.patch('/dfdf', (req, res) => {
//     res.send('Patch method called')
// })

// // Delete
// router.delete('/ddfd', (req, res) => {
//     res.send('Delete method called')
// })

const shortUrlRouter = router;
module.exports = shortUrlRouter;