const conversationModel = require("../dbModels/conversation.model");
const messageModel = require("../dbModels/message.model");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiver_id } = req.params;
    const sender_id = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [sender_id, receiver_id] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [sender_id, receiver_id],
      });
    }

    const newMessage = new messageModel({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()     these boh will take long time
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]); //this will run faster
    //socket io functionality
    const receiverSocketId = getReceiverSocketId(receiver_id);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(`error in sendMessage controller =>${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const sender_id = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [sender_id, userToChatId] },
      })
      .populate("messages");

    return res.status(200).json(conversation.messages);
  } catch (err) {
    console.log(`error in getMessages controller =>${err}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessage,
};
