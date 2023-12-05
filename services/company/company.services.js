const CompanyModel = require("./company.model");
const { commonFunctions } = require("../../helper");

/*
 *  Check Email Exist
*/
exports.is_exist_email = async (email) => {
    try {
    
        let emp_exist = await CompanyModel.findOne({ email: email });
        
        if (!emp_exist) {
            return false;
        }
       
        return emp_exist;
    } catch (error) {
        console.log("Error : ", error);
    }
};



/*
 *  Register New User
*/
exports.save = async (reqbody,userId) => {
    try {
        let company = {};


        const latestCompany = await CompanyModel.findOne({company_Id:{$exists:true}}, {company_Id:1}, { sort: { 'company_Id': -1 } });

        // Generate a new company_id
        const newCompanyId = latestCompany ? latestCompany.company_Id + 1 : 1;
        

        company.company_Id        = newCompanyId
        company.company_name      = reqbody.company_name
        company.contact_number    = reqbody.contact_number
        company.address           = reqbody.address
        company.email             = reqbody.email
        company.contact_person    = reqbody.contact_person
        company.pincode           = reqbody.pincode
        company.landmark          = reqbody.landmark
        company.city              = reqbody.city
        company.state             = reqbody.state
        company.country           = reqbody.country
        company.gstIn             = reqbody.gstIn
        company.status            = reqbody.status
        company.user_id           = userId,
        company.created_at        = Date.now()
        company.updated_at        = Date.now()

        let companyCreate = await CompanyModel.create(company);

        return companyCreate;

    } catch (error) {
        console.log("Error : ", error);
    }
};


/*
 *   Get User Profile Detail By Id
*/
exports.get_company_profile_details = async (id) => {
    try {


        let emp_profile_details = await CompanyModel.findOne({ _id: id }, { created_at: 0, updated_at: 0 }).lean();


        return emp_profile_details;

    } catch (error) {
        console.log("Error : ", error);
    }
};



/*
*  Check User Exist
*/
exports.is_exist_cmp = async (id) => {
    try {

        let cmp_exist = await CompanyModel.findOne({ _id: id }).lean();
        if (!cmp_exist) {
            return false;
        }
        return cmp_exist;
    } catch (error) {
        console.log("Error : ", error);
    }
};



/*
*  Update User Profile 
*/
exports.emp_profile_update = async (id, reqbody,userId) => {
    try {

        let update_cmp_profile = {};

        
        update_cmp_profile.company_name      = reqbody.company_name
        update_cmp_profile.contact_number    = reqbody.contact_number
        update_cmp_profile.address           = reqbody.address
        update_cmp_profile.email             = reqbody.email
        update_cmp_profile.contact_person    = reqbody.contact_person
        update_cmp_profile.pincode           = reqbody.pincode
        update_cmp_profile.landmark          = reqbody.landmark
        update_cmp_profile.city              = reqbody.city
        update_cmp_profile.state             = reqbody.state
        update_cmp_profile.country           = reqbody.country
        update_cmp_profile.gstIn             = reqbody.gstIn
        update_cmp_profile.status            = reqbody.status
        update_cmp_profile.user_id           = userId,
        update_cmp_profile.updated_at        = Date.now()
            


        return await CompanyModel.updateOne({ _id: id }, update_cmp_profile).lean();
    } catch (error) {
        console.log("Error : ", error);
    }
};



/*
 * Delete Accountant User or client user by Admin User and master admin
*/
exports.delete_cmp_data = async (id) => {
    try {

        var cmp_profile_data_delete = await CompanyModel.updateOne({ _id: id },{deleted:true,deleted_at:Date.now()});
        return cmp_profile_data_delete;

    } catch (error) {
        console.log("Error : ", error);
    }
};