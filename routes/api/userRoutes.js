const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/user/
router.route("/").get(getAllUsers).post(createUser);

// /api/thoughts/:thoughtId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
