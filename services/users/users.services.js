const UserModel = require("./users.model");
const { commonFunctions } = require("../../helper");
const mime = require('mime')
const isEmpty= require('../../validations/is-empty')
const fs = require('fs')

/*
 *  Check Email Exist
 */
exports.is_exist_email = async (email) => {
  try {
    let user_exist = await UserModel.findOne({ email: email }).lean();
    if (!user_exist) {
      return false;
    }
    return user_exist;
  } catch (error) {
    console.log("Error : ", error);
  }
};

/*
 *  Register New User
 */
exports.save =async (reqbody) => {
  try {

     // check image validation
    // store logo image
    if(!isEmpty(reqbody.profile)){
      var matches = reqbody.profile.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      image = {};
      // get image extension and image
      image.type = matches[1];
      image.data = new Buffer.from(matches[2], 'base64');
      let decodedImg = image;
      var imageBuffer = decodedImg.data;
      let type = decodedImg.type;
      var extension = mime.getExtension(type);		

      var filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|GIF|gif/;
      var check_image = !filetypes.test(extension);

      if (check_image) {
          errors.image = 'Only image files are allowed';
      }
      // var img_size = image.data.length / 1e+6;
      // var dimensions = sizeOf(image.data);
      // if(dimensions.height >= 250 && dimensions.width >= 300 ){
      //     errors.image = 'Image size less than  300*250.';
      // }
  }
  if(!isEmpty(reqbody.profile)){
    var filepath = "uploads"
    // var thumbpath = "/upload/profile_image/thumb/"
    var publicpath = process.cwd() + "/public/"
    // console.log('--publicpath',publicpath)
    var storepath = publicpath + filepath
    // console.log('--publicpath',storepath)

    // var store_thumb_path = publicpath + thumbpath
    fs.mkdirSync(storepath)
    // fse.mkdirsSync(store_thumb_path)
    var filename = Date.now() + "-profile_image" + "." + extension
    
    try {
        fs.writeFileSync(storepath + filename, imageBuffer, 'utf8');
        }
        catch (e) {
            console.log(e);
    }
}
    
    let hashpassword = await commonFunctions.hashPassword(reqbody.password);

    let user = {};

    (user.first_name = reqbody.first_name),
      (user.last_name = reqbody.last_name),
      (user.email = reqbody.email),
      (user.mobile_number = reqbody.mobile_number),
      (user.password = hashpassword),
      (user.profile = filename)
      // (user.created_at = Date.now());

      // console.log('---',filename)

      // console.log('--user obj',user)

    let userCreate = await UserModel.create(user);

    return userCreate;
  } catch (error) {
    console.log("Error : ", error);
  }
};

/*
 *   Get User Profile Detail By Id
 */
exports.get_user_profile_details = async (id, userId) => {
  try {
    let user_profile_details = await UserModel.findOne(
      { _id: id },
      { created_at: 0, updated_at: 0 }
    ).lean();
    // let user_profile_detail = await UserModel.findOne(
    //   { _id: id },
    //   { created_at: 0, updated_at: 0 }
    // );
    // console.log('----lean',user_profile_details)
    // console.log('----without-lean',user_profile_detail)

    return user_profile_details;
  } catch (error) {
    console.log("Error : ", error);
  }
};

/*
 *  Check User Exist
 */
exports.is_exist_user = async (id) => {
  try {
    let user_exist = await UserModel.findOne({ _id: id }).lean();

    // console.log('----lean',user_exist)
    
    if (!user_exist) {
      return false;
    }
    return user_exist;
  } catch (error) {
    console.log("Error : ", error);
  }
};

/*
 *  Update User Profile
 */
exports.user_profile_update = async (id, reqbody) => {
  try {
    let update_user_profile = {};

    (update_user_profile.first_name = reqbody.first_name),
      (update_user_profile.last_name = reqbody.last_name),
      (update_user_profile.email = reqbody.email),
      (update_user_profile.mobile_number = reqbody.mobile_number),
      (update_user_profile.updated_at = Date.now());

    return await UserModel.updateOne({ _id: id }, update_user_profile).lean();
  } catch (error) {
    console.log("Error : ", error);
  }
};

/*
 * Delete Accountant User or client user by Admin User and master admin
 */
exports.delete_user_data = async (id) => {
  try {
    var user_profile_data_delete = await UserModel.updateOne({ _id: id },{deleted:true,deleted_at:Date.now()});
    return user_profile_data_delete;
  } catch (error) {
    console.log("Error : ", error);
  }
};
