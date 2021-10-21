const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
var cookies = require('cookie-parser');
const authenticate = require('../middleware/authenticate')
var cors = require('cors');
        app.use(cors())
require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send("hellow world from router")
})

//using promises
// router.post('/signup',(req,res)=>{
//     const {name,email,password,confirmpassword}=req.body;
//     if(!name||!email||!password||!confirmpassword)
//     return res.status(422).json({error:"plz fill the field"})

//     // {dbemail:ye wala email}  it return a promise
//     User.findOne({email:email})
//     .then((userExists)=>{
//         if(userExixts)
//             return res.status(422).json({error:"email exists"})

//             const user =new User({name,email,password,confirmpassword})

//     user.save().then(()=>{
//         return res.status(201).json({message :"user register successfuly"})
//     }).catch((err)=>{
//         return res.status(500).json({message :"user register failed"})
//     })
// }).catch((err)=>{
//     console.log(err)
// });
// })


router.post('/signup', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword)
        return res.status(422).json({ error: "plz fill the field" })
    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ error: "email exists" })
        }
        else if (password != confirmpassword)
            return res.status(422).json({ error: "password are not matching" })
        else {
            const user = new User({ name, email, password, confirmpassword })
            //------pasword incrypt using pre in userScchema
            const userRegister = await user.save();
            if (userRegister)
                return res.status(201).json({ message: "user register successfuly" })
        }
    } catch (err) {
        console.log(err)
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "plz fill the field" })

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            // console.log(token)
            res.cookie("jwtoken", token, {
                // maxAge: 15* 1000,
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            
            if (!isMatch) {
                return res.status(400).json({ error: "invalid credential" })
            } else
            return res.json({ message: "user login successfuly" })
        }
        else {
            return res.status(400).json({ error: "invalid credential" })
        }



    } catch (err) {
        console.log(err)
    }
})


router.get('/dashboard', authenticate, (req, res) => {
    console.log("from dashboard")
    res.send(req.rootUser)
})

module.exports = router;