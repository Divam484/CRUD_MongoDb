const router = require("express").Router();
const controller = require("./users.controller");
const { ensureUserAuthenticated } = require("../../helper/guards");

//System User Register and Login
router.post("/register", controller.userRegister);
router.post("/login", controller.userLogin);
router.get("/list", controller.userList);
router.get("/:id", ensureUserAuthenticated, controller.getUserProfileDetails);
router.put("/edit/:id",ensureUserAuthenticated,controller.updateUserProfileDetails);
router.delete("/:id", ensureUserAuthenticated, controller.userProfileDelete);

router.patch("/resetPassword", ensureUserAuthenticated,controller.resetPassword)



module.exports = router;
