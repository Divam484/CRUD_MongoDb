const router = require("express").Router();
const controller = require("./company.controller");
const {ensureUserAuthenticated} = require("../../helper/guards");

//System User Register and Login
router.post("/Create",ensureUserAuthenticated,controller.companyCreate);

router.post("/list",ensureUserAuthenticated,controller.getCompanylist);

router.get("/:id",ensureUserAuthenticated,controller.getcompanyDetails);

router.put("/edit/:id",ensureUserAuthenticated,controller.updatecompanyDetails);

router.delete("/:id",ensureUserAuthenticated,controller.companyProfileDelete);


module.exports = router;


