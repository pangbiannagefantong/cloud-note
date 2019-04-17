const {Router} = require("express")
const router = Router()





// router.post("/register",(req,res)=>{
//     const {name,password,email} = req.body;
//     userModel.findOne({email}).then(data =>{
//         if(data){
//             res.json({
//                 code:400,
//                 msg:"该邮箱已经被注册了",
//                 data:null
//             })
//         }else{
//             userModel.create({
//                 name,
//                 password,
//                 email
//             }).then(result =>{
//                 res.json({
//                     code:200,
//                     msg:"注册成功"
//                 })
//             }).catch(err=>{
//                 res.json({
//                     code:500,
//                     msg:err
//                 })
//             })
//         }
//     })
// });

// router.post("/login", async(req,res,next)=>{
    
//     try{
        
//         const {email,password} = req.body
//         const user = await userModel.findOne({email})
//         if(user){//找到用户
//             if(password == user.password){//找到用户
//                 req.session.user = user 
//                 res.json({
//                     code:200,
//                     data:{
//                         name : user.name,
//                         email : user.email,
//                         avatar : user.avatar
//                     }
//                 })
//             }else{//密码不正确
//                 res.json({
//                     code:400,
//                     msg:"密码错误"
//                 })
//             }
//         }else{//找不到用户
//             res.json({
//                 code:401,
//                 msg:"该邮箱没有注册"
//             })
//         }

//     }catch(err){
//         next(err)
//     }
// })
// router.post("/exit",async(req,res,next)=>{
//     try{
//         if(req.session.user){
//             req.session.user = null
//             res.json({
//                 code:200,
//                 msg:"退出成功"
//             })
//         }else{
//             res.json({
//                 code:400,
//                 msg:"用户尚未登录"
//             })
//         }
//     }catch(err){
//         next(err)
//     }
// })


module.exports = router