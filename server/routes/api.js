const express = require('express');
const path = require('path');

const Dm = require('../models/dm');
const router = express.Router();

router.get('/chattypes/:chattype/channels/', async (req, res, next) => {
  try {
    return res.json(
      await Dm.find({ chattype: req.params.chattype }).distinct('channel')
    );
  } catch (error) {
    next(error);
  }
});

router.get(
  '/chattypes/:chattype/channels/:channel/chats',
  async (req, res, next) => {
    try {
      return res.json(
        await Dm.find({
          $and: [
            { channel: req.params.channel },
            { chattype: req.params.chattype },
          ],
        })
      );
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/chattypes/:chattype/channels/:channel/chats',
  async (req, res, next) => {
    try {
      const chattype = req.params.chattype;
      const channel = req.body.channel;
      // console.log(channel);
      const chat = await Dm.create({
        userId: req.body.userId,
        content: req.body.content,
        channel: channel,
        chattype: chattype,
      });
      const io = req.app.get('io');
      io.of(`/ct-${chattype}`)
        .to(`/ct-${chattype}-${channel}`)
        .emit('message', chat);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
