const router = require("express").Router();
const thoughtsRoute = require("./thoughtsRoute");
const userRoutes = require("./userRoutes");

// routing path /api/<>

router.use("/thoughts", thoughtsRoute);
router.use("/user", userRoutes);

module.exports = router;
