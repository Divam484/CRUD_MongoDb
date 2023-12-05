const companyService = require("./company.services");
const { commonResponse, commonFunctions } = require("../../helper");
const validatecompanyCreateInput = require("../../validations/company/companycreate");
const isEmpty = require("../../validations/is-empty");
const CompanyModel = require("./company.model");
const mongoose = require('mongoose')

module.exports = {
  /*
   *  Register New company
   */
  companyCreate: async (req, res, next) => {
    try {
      if (!req.user) {
        return commonResponse.customErrorResponse(
          res,
          401,
          "Invalid User login",
          "Invalid Login credential"
        );
      }

      let userId = req.user._id;

      const { errors, isValid } = validatecompanyCreateInput(req.body);

      let is_exist = await companyService.is_exist_email(
        req.body.email.toLowerCase()
      );

      if (is_exist) {
        errors.email = "This Email Address is already in use";
      }

      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }

      let company = await companyService.save(req.body, userId);

      if (company) {
        commonResponse.success(
          res,
          201,
          company,
          "company Register Successfully"
        );
      } else {
        return commonResponse.customResponse(
          res,
          400,
          company,
          "Something went wrong, Please try again"
        );
      }
    } catch (error) {
      console.log("Create company -> ", error);
      return next(error);
    }
  },

  /*
   *   Get getCompanylist
   */
  getCompanylist: async (req, res, next) => {

    
    let order_column = req.body.order_column || 'code_length_count'
		let sort_order = req.body.order_direction;
		let filter_value = req.body.search;
		let skip = parseInt(req.body.per_page) * (parseInt(req.body.current_page) - 1);
		let limit = parseInt(req.body.per_page) || 50;
    let company_name = req.body.company_name;
    let city = req.body.city;
    let status = req.body.status;



    let userId = req.user._id

		let sortJson = {};
		if (sort_order == 1) {
			sortJson[order_column] = 1
		} else {
			sortJson[order_column] = -1;
		}

   

		let searchStr = { user_id: userId, deleted:false  };



    if (company_name != '' && company_name != undefined) {
      let regex_filter_company_name = new RegExp(company_name, "i");
      searchStr["company_name"] = regex_filter_company_name
    }

    if (city != '' && city != undefined) {
      let regex_filter_city = new RegExp(city, "i");
      searchStr["city"] = regex_filter_city
    }

    if (status != '' && status != undefined) {
      let regex_filter_status = new RegExp(status, "i");
      searchStr["status"] = regex_filter_status
    }

    if (filter_value != '' && filter_value != undefined) {
      let regex_filter = new RegExp(filter_value, "i");

      console.log("filter_value",typeof parseInt(filter_value) == "number")

      searchStr['$or'] = [
        { "email": regex_filter },
        { "contact_person": regex_filter },
        { "city": regex_filter}

      ];
    }

    // console.log('-serch str 2--',searchStr)

    let dashboard_data_listing = await CompanyModel.aggregate([
		{ $match: {user_id: userId, deleted:false}},
    {$lookup:
      {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_data"
      }},
			{ $match: searchStr },
			{ $sort: sortJson },

			{
				$facet: {
					paginatedResults: [{ $skip: Number(skip) }, { $limit: Number(limit) }],
				}
			}
			

		]);
    if (dashboard_data_listing) {
        commonResponse.success(res, 200, dashboard_data_listing, "companys listing");
      } else {
        return commonResponse.customResponse(
          res,
          400,
          companys,
          "Something went wrong, Please try again"
        );
      }
   },

  /*
   *   Get company Profile Detail By Id
   */
  getcompanyDetails: async (req, res, next) => {
    try {
      if (!req.user) {
        return commonResponse.customErrorResponse(
          res,
          401,
          "Invalid User login",
          "Invalid Login credential"
        );
      }

      let cmp_profile_details =
        await companyService.get_company_profile_details(req.params.id);

      if (cmp_profile_details) {
        commonResponse.success(
          res,
          200,
          cmp_profile_details,
          "company profile details"
        );
      } else {
        return commonResponse.customResponse(
          res,
          400,
          cmp_profile_details,
          "Something went wrong, Please try again"
        );
      }
    } catch (error) {
      console.log("Create company -> ", error);
      return next(error);
    }
  },

  /*
   *  User Profile Update By Id
   */
  updatecompanyDetails: async (req, res, next) => {
    try {
      if (!req.user) {
        return commonResponse.customErrorResponse(
          res,
          401,
          "Invalid User login",
          "Invalid Login credential"
        );
      }

      let userId = req.user._id;

      let id = req.params.id;

      let is_exist_cmp = await companyService.is_exist_cmp(id);

      if (is_exist_cmp) {
        const { errors, isValid } = validatecompanyCreateInput(req.body);

        let is_exist_email = await companyService.is_exist_email(
          req.body.email.toLowerCase()
        );

        if (
          is_exist_email &&
          isEmpty(errors.email) &&
          is_exist_email._id != id
        ) {
          errors.email = "Email Id is Already Exist";
        }

        if (!isValid || !isEmpty(errors)) {
          return commonResponse.customErrorResponse(
            res,
            422,
            "Something went wrong",
            errors
          );
        }
        let updateCmpProfile = await companyService.emp_profile_update(
          id,
          req.body,
          userId
        );

        if (updateCmpProfile) {
          commonResponse.success(
            res,
            200,
            updateCmpProfile,
            "company Profile Updated Successfully"
          );
        } else {
          return commonResponse.customResponse(
            res,
            400,
            updateCmpProfile,
            "Something went wrong, Please try again"
          );
        }
      } else {
        return commonResponse.customResponse(
          res,
          400,
          is_exist_user,
          "User does not exist"
        );
      }
    } catch (error) {
      console.log("Create company -> ", error);
      return next(error);
    }
  },

  /*
   *  Delete Accountant User or client user by Admin User and master admin
   */
  companyProfileDelete: async (req, res, next) => {
    try {
      if (!req.user) {
        return commonResponse.customErrorResponse(
          res,
          401,
          "Invalid User login",
          "Invalid Login credential"
        );
      }

      let id = req.params.id;

      let is_exist_cmp = await companyService.is_exist_cmp(id);

      if (is_exist_cmp) {
        let delete_cmp_data = await companyService.delete_cmp_data(id);

        if (delete_cmp_data) {
          commonResponse.success(
            res,
            200,
            delete_cmp_data,
            "company Profile Successfully Deleted"
          );
        } else {
          return commonResponse.customResponse(
            res,
            400,
            delete_cmp_data,
            "Something went wrong, Please try again"
          );
        }
      } else {
        return commonResponse.customResponse(
          res,
          400,
          {},
          "company does not exist"
        );
      }
    } catch (error) {
      console.log("Create company -> ", error);
      return next(error);
    }
  },
};
