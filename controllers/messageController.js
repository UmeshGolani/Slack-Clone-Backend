const Message = require('../models/message');

exports.createMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const author = req.user._id;
    const { channelId } = req.params;

    const message = new Message({ content, author, channel: channelId });
    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};

exports.getMessagesByChannelId = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const messages = await Message.find({ channel: channelId }).populate('author');
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
