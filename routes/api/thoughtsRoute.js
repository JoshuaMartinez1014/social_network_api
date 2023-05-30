const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThoughts);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route("/:thoughtId").post(createReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);
module.exports = router;
