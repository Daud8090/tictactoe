const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
        // console.log(this.password)
    }
    next();
})

//generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        // let token=jwt.sign({})
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        // console.log(token, "  <<<<<-------in genauthtoken")
    //now adding to the schema
    this.tokens=this.tokens.concat({token:token});
    await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;