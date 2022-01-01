const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
    register: async (req, res) => {
        try{
            const {fullname, username, email, password, gender} = req.body;
            let formatUserName = username.toLowerCase().replace(/ /g, '');
            const user_name = await Users.findOne({username: formatUserName})
            if(user_name) return res.status(400).json({msg: "tên đăng nhập đã tồn tại"})
            if(password.length < 6)
            return res.status(400).json({msg: "mât khẩu quá ngắn"})
            const passHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                fullname,
                username: formatUserName,
                email,
                password: passHash,
                gender
            })
            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })
            await newUser.save();
            res.json({
                msg: "Đăng ký thành công",
                access_token,
                user:{
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    login: async (req, res) => {
        try{
            const {username, password} = req.body;
            const user = await Users.findOne({username})
            .populate("followers following", "avatar username fullname followers following")

            if(!user) return res.status(400).json({msg: "người dùng không tồn tại"})
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg: "mật khẩu không đúng"})

            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id})
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            res.json({
                msg: "Đăng nhập thành công",
                access_token,
                user:{
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err){
            return res.status(500).json({msg: err.message});
        }
    },
    logout: async (req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
            return res.json({msg: "Đã đăng xuất"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "vui lòng đăng nhập"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result)=>{
                if(err) return res.status(400).json({msg: "vui lòng đăng nhập 1"})
                const user = await Users.findById(result.id).select('-password')
                .populate("followers following", "avatar username fullname followers following")
                if(!user) return res.status(400).json({msg: "người dùng không tồn tại"})

                const access_token = createAccessToken({id: user._id})

                res.json({
                    access_token,
                    user
                })
            })

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
};

const createAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}
const createRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}
module.exports = authCtrl;