const router = require("express").Router();
const appRoutes = require("./appRoutes");
const userRoutes = require("./userRoutes");

router.use("/thoughts", appRoutes);
router.use("/user", userRoutes);

module.exports = router;
