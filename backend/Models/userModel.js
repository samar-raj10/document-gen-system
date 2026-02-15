import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
        },

        password : {
            type : String,
            required : true,

        },

        role : {
            type : String,
            required : true,
            enum : ["admin","coordinator","hod","faculty","student"],
        }
    }, 
    {timestamps : true}
);

const userModel = mongoose.model('userModel', userSchema);

export default userModel;