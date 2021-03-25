import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false,
});

//Encrypt password
userSchema.statics.encryptPassword = async (password)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }catch(err){
        console.log(err);
    }
}

//Compare password
userSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword)
}

export default model( 'User' , userSchema);