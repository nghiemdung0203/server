const { CreateTable } = require('../Controller/TableController/CreateTable');
const { GetTables } = require('../Controller/TableController/GetTable');
const { UpdateTable } = require('../Controller/TableController/UpdateTable');

const router = require('express').Router();

router.post('/CreateTable', CreateTable);
router.put('/UpdateTable', UpdateTable);
router.post('/GetTables', GetTables)
module.exports = router