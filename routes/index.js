const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const channelRoutes = require('./channelRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/auth', authRoutes);
router.use('/channels', channelRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
