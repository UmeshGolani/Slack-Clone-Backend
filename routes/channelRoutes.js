const express = require('express');
const Channel = require('../models/channel');
const { verifyToken } = require('../utils/utils');

const router = express.Router();

// GET /api/channels
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (error) {
    next(error);
  }
});

// POST /api/channels
router.post('/', verifyToken, async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const channel = await Channel.create({ name });
    res.status(201).json(channel);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
