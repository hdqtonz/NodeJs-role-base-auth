const User = require("../models/user.model");

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIdex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await User.find({});

    const resuals = {};

    if (endIndex < users.length) {
      resuals.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIdex > 0) {
      resuals.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    resuals.resuals = users.slice(startIdex, endIndex);
    resuals.total = users.length;
    res.status(200).send(resuals);
  } catch (e) {
    res.status(500).send();
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user_id });
    if (!user) throw new Error("User Not Avelible");
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  profile,
};
