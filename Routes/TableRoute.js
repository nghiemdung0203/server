const { CreateTable } = require('../Controller/TableController/CreateTable');

const router = require('express').Router();

router.post('/CreateTable', CreateTable);

module.exports = router