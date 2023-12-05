const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
    {
        company_Id: {
            type: Number
        },
        company_name: {
            type: String
        },
        contact_number: {
            type: String
        },
        address: {
            type: String
        },
        email:{
            type : String
        },
        contact_person: {
            type: String
        },
        pincode:{
            type: String
        },
        landmark:{
            type: String
        },
        city:{
            type: String
        },
        state:{
            type: String
        },
        country:{
            type: String
        },
        gstIn:{
            type: String
        },
        status:{
            type:String
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        deleted:{
            type:Boolean,
            default:false
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
        },
        deleted_at: {
            type: Date,
        },

    }
);


const Company = mongoose.model("Company", companySchema);

module.exports = Company;


