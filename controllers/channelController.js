const Channel = require('../models/channel');

exports.createChannel = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const createdBy = req.user._id;

    const existingChannel = await Channel.findOne({ name });
    if (existingChannel) {
      return res.status(409).json({ error: 'Channel already exists' });
    }

    const channel = new Channel({ name, createdBy, members });
    const savedChannel = await channel.save();

    res.status(201).json(savedChannel);
  } catch (error) {
    next(error);
  }
};

exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find().populate('createdBy members');
    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

exports.getChannelById = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId).populate('createdBy members messages');
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};
