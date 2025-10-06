const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PasswordEntry = require('../models/PasswordEntry');
const { encrypt, decrypt } = require('../utils/crypto');

// create
router.post('/', auth, async (req, res) => {
  const { title, url, username, password } = req.body;
  try {
    const entry = new PasswordEntry({
      user: req.user.id,
      title,
      url,
      username,
      passwordEncrypted: encrypt(password)
    });
    await entry.save();
    res.json({ entry });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// read all for user
router.get('/', auth, async (req, res) => {
  try {
    const list = await PasswordEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    // optionally do not decrypt here — let frontend request decrypted when needed
    const decrypted = list.map(e => ({
      id: e._id,
      title: e.title,
      url: e.url,
      username: e.username,
      password: decrypt(e.passwordEncrypted),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt
    }));
    res.json(decrypted);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// update
router.put('/:id', auth, async (req, res) => {
  const { title, url, username, password } = req.body;
  try {
    const entry = await PasswordEntry.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ msg: 'Not found' });

    entry.title = title ?? entry.title;
    entry.url = url ?? entry.url;
    entry.username = username ?? entry.username;
    if (password !== undefined) entry.passwordEncrypted = encrypt(password);

    await entry.save();
    res.json({ entry });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await PasswordEntry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
