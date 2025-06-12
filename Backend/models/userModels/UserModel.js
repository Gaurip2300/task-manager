const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4:uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    user_id :{ type: String, default:uuidv4, unique:true},
    name :{type:String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    toJSON :{
        transform(doc,ret){
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
  next();
})

const User = mongoose.model('User', userSchema);
module.exports = User