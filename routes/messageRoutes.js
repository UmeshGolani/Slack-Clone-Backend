const express = require('express');
const Message = require('../models/message');
const { verifyToken } = require('../utils/utils');

const router = express.Router();

// GET /api/channels/:channelId/messages
router.get('/:channelId/messages', verifyToken, async (req, res, next) => {
  try {
    const messages = await Message.find({ channelId: req.params.channelId });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// POST /api/channels/:channelId/messages
router.post('/:channelId/messages', verifyToken, async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  try {
    const message = await Message.create({
      text,
      channelId: req.params.channelId,
      userId: req.userId,
    });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
