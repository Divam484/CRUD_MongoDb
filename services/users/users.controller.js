const UserService = require("./users.services");
const { commonResponse, commonFunctions } = require("../../helper");
const validateUserRegisterInput = require("../../validations/user/userRegister");
const validateLoginInput = require("../../validations/user/userLogin");
const isEmpty = require("../../validations/is-empty");
const jwt = require("jsonwebtoken");
const mail = require("../../helper/email/emailsend");
const User = require("./users.model");

module.exports = {
  /*
   *  Register New User
   */
  userRegister: async (req, res, next) => {
    try {
      const { errors, isValid } = validateUserRegisterInput(req.body);

      let is_exist = await UserService.is_exist_email(
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

      let user = await UserService.save(req.body);

      if (user) {
        var send_mail = await mail.send({
          filename: "welcome",
          data: user.first_name,
          subject: "Successfully register",
          user: {
            email: user.email,
          },
        });

        return commonResponse.success(res, 201, user, "User Register Successfully");
      } else {
        return commonResponse.customResponse(
          res,
          400,
          user,
          "Something went wrong, Please try again"
        );
      }
    } catch (error) {
      console.log("Create User -> ", error);
      return next(error);
    }
  },

  /*
   *  User Login
   */
  userLogin: async (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return commonResponse.customErrorResponse(
        res,
        422,
        "Something went wrong",
        errors
      );
    }

    let is_user = await UserService.is_exist_email(req.body.email);

    if (!is_user) {
      errors.email = "Email does not exist";
      return commonResponse.customErrorResponse(
        res,
        422,
        "Something went wrong",
        errors
      );
    }

    let password_match = await commonFunctions.matchPassword(
      req.body.password,
      is_user.password
    );

    if (password_match) {
      const payload = {
        _id: is_user._id,
        email: is_user.email,
        first_name: is_user.first_name,
        last_name: is_user.last_name,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.EXPIRE_JWT_SECRET || "24h" },
        (err, token) => {
          commonResponse.success(
            res,
            200,
            { user_detail: is_user, token: "Bearer " + token },
            "User Login Successfully"
          );
        }
      );
    } else {
      errors.password = "Invalid Password";
      return commonResponse.customErrorResponse(
        res,
        422,
        "Something went wrong",
        errors
      );
    }
  },

  /*
   *  Users  listing
   */
  userList: async (req, res, next) => {
    const users = await User.find({ deleted: false });
    if (users) {
      commonResponse.success(res, 200, users, "Users listing");
    } else {
      return commonResponse.customResponse(
        res,
        400,
        users,
        "Something went wrong, Please try again"
      );
    }
  },
  /*
   *   Get User Profile Detail By Id
   */
  getUserProfileDetails: async (req, res, next) => {
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

      if (userId == req.params.id) {
        let user_profile_details = await UserService.get_user_profile_details(req.params.id,userId);
        if (user_profile_details) {
          commonResponse.success(
            res,
            200,
            user_profile_details,
            "User Profile Details"
          );
        } else {
          return commonResponse.customResponse(
            res,
            400,
            user_profile_details,
            "Something went wrong, Please try again"
          );
        }
      } else {
        return commonResponse.customResponse(
          res,
          400,
          "Invalid User login",
          "Something went wrong, Please try again"
        );
      }
    } catch (error) {
      console.log("Create User -> ", error);
      return next(error);
    }
  },

  /*
   *  User Profile Update By Id
   */
  updateUserProfileDetails: async (req, res, next) => {
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

      let userId = req.user._id;

      let url = req.originalUrl.split("/");

      let is_exist_user = await UserService.is_exist_user(id);
      if (userId == req.params.id) {
        if (is_exist_user) {
          const { errors, isValid } = validateUserRegisterInput(
            req.body,
            url[4]
          );

          let is_exist_email = await UserService.is_exist_email(
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

          let updateUserProfile = await UserService.user_profile_update(
            id,
            req.body,
            is_exist_user
          );

          if (updateUserProfile) {
            commonResponse.success(
              res,
              200,
              updateUserProfile,
              "User Profile Updated Successfully"
            );
          } else {
            return commonResponse.customResponse(
              res,
              400,
              updateUserProfile,
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
      }
    } catch (error) {
      console.log("Create User -> ", error);
      return next(error);
    }
  },

  /*
   *  Delete Accountant User or client user by Admin User and master admin
   */
  userProfileDelete: async (req, res, next) => {
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
      let userId = req.user._id;

      let is_exist_user = await UserService.is_exist_user(id);

      if (userId == req.params.id) {
        if (is_exist_user) {
          let delete_user_data = await UserService.delete_user_data(id);

          if (delete_user_data) {
            commonResponse.success(
              res,
              200,
              delete_user_data,
              "User Profile Successfully Deleted"
            );
          } else {
            return commonResponse.customResponse(
              res,
              400,
              delete_user_data,
              "Something went wrong, Please try again"
            );
          }
        } else {
          return commonResponse.customResponse(
            res,
            400,
            {},
            "User does not exist"
          );
        }
      }
    } catch (error) {
      console.log("Create User -> ", error);
      return next(error);
    }
  },

  /*
  resetPassword
  */
  resetPassword: async (req, res, next) => {
    // 1) Get user from the collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) check if Posted current password is correct
    let password_match = await commonFunctions.matchPassword(
      req.body.passwordCurrent,
      user.password
    );

    // 3) IF so, update password
    if (password_match) {
      if (req.body.password == req.body.passwordConfirm) {
        const newpass = await commonFunctions.hashPassword(req.body.password);
        const newuser = await User.updateOne({_id:req.user.id},{password:newpass})
        return commonResponse.success(
          res,
          200,
          newuser,
          "User password changed"
        );
      }
    return commonResponse.customResponse(res, 400, {}, "passwordConfirm  is not same");
    }
    return commonResponse.customResponse(res, 400, {}, "something  want wrong");
  },
};
