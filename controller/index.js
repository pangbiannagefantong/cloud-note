//主要路由文件
const {Router} = require("express")
const router = Router()


const userRoutes = require("./user.js")
const articleRoutes = require("./article")
const categoryRoutes = require("./category")
const path = require("path")
const userModel = require("../model/user")
const articleModel = require("../model/article")
const mongoose = require("mongoose")

router.get("/",(req,res) => {
    res.sendFile(path.resolve(__dirname,"../public/page/index.html"))
})
router.get("/status",(req,res)=>{
    let data = req.session.user
    if(req.session.user){
        res.json({
            code:200,
            data,
            msg:1
        })
    }else{
        res.json({
            code:401,
            msg:0
        })
    }
})
router.get("/register",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../public/page/register.html"))
})
router.post("/login", async(req,res,next)=>{
    
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(user){//找到用户
            if(password == user.password){//找到用户
                req.session.user = user 
                res.json({
                    code:200,
                    data:{
                        name : user.name,
                        email : user.email,
                        avatar : user.avatar
                    }
                })
            }else{//密码不正确
                res.json({
                    code:400,
                    msg:"密码错误"
                })
            }
        }else{//找不到用户
            res.json({
                code:401,
                msg:"该邮箱没有注册"
            })
        }

    }catch(err){
        next(err)
    }
})
router.post("/register",(req,res)=>{
    const {name,password,email} = req.body;
    userModel.findOne({email}).then(data =>{
        if(data){
            res.json({
                code:400,
                msg:"该邮箱已经被注册了",
                data:null
            })
        }else{
            userModel.create({
                name,
                password,
                email
            }).then(result =>{
                res.json({
                    code:200,
                    msg:"注册成功"
                })
            }).catch(err=>{
                res.json({
                    code:500,
                    msg:"注册失败"
                })
            })
        }
    })
})
router.get("/exit",async(req,res,next)=>{
    try{
        if(req.session.user){
            req.session.user = null
            res.json({
                code:200,
                msg:"退出成功"
            })
        }else{
            res.json({
                code:400,
                msg:"用户尚未登录"
            })
        }
    }catch(err){
        next(err)
    }
})
router.get("/write",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../public/page/write.html"))
})
router.get("/article",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../public/page/article.html"))
})
router.post("/article",async(req,res,next)=>{//发表文章路由
    //判断用户是否登录
    //登陆将数据存储到数据库，未登录就告诉前端
    try{
        let{
            author,
            title,
            content,
            times,
            // contentText,
            // category
        } = req.body
        // category = category.map(item => mongoose.Types.ObjectId(item))
        // console.log(category)
        console.log(req.session.user);
        console.log("111");
        if(req.session.user){//登录
            await articleModel.create({
                author,
                title,
                content,
                times,
                // title,
                // content,
                // contentText,
                // category,
                // times,
                //author: mongoose.Types.ObjectId(req.session.user._id)
            }).then( data =>{
                res.json({
                    code:200,
                    msg:"文章添加成功"
                })
            })
        }else{//未登陆
            
            res.json({
                code:401,
                msg:"未登录不能发表笔记"
            })
        }
    } catch(err){
        next(err)
    }
})
router.get("/allArticle",(req,res) => {
        // let {pn=1,size=10} = req.query
        // pn = Number(pn)
        // size = Number(size)
        // .sort({_id:-1})
        // .limit(size)
        // .skip((pn-1)*size)
        const articles = articleModel.find({},(err,data) => {    
            res.json({
                code: 200,
                data
            })
        })
        
});
// router.get("/allArticle",async(req,res,next)=>{
//     try{
//         let {pn=1,size=10} = req.query
//         pn = Number(pn)
//         size = Number(size)
//         const articles = await articleModel
//         .find()
//         .populate({
//             path:"author",
//             select:"-password -email"
//         })
//         .populate("category")
//         .sort({_id:-1})
//         .limit(size)
//         .skip((pn-1)*size)
//         res.json({
//             code:200,
//             data:articles
//         })
//     }catch(err){
//         next(err)
//     }
// })
// router.get("/:id",async(req,res,next)=>{
//     try{
//         const{id} = req.params
//         const article = await articleModel
//         .findById(id)
//         .populate({
//             path:"user",
//             select:"-password -email"
//         })
//         .populate("category")
//         await article.update({$inc:{
//             looknum:1
//         }})
//         res.json({
//             code:200,
//             data:article
//         })
//     }catch(err){
//         next(err)
//     }
// })
router.post("/content",(req,res)=>{
    const{_id} = req.body
    // console.log(_id);
    // article.update({$inc:{
    //     looknum:1
    // }})
    const article = articleModel.findOne({_id}).then(data =>{
        res.json({
            code:200,
            data
        })
    })
    // .update({$inc:{
    //     looknum:1
    // }})
    
})
router.get("/author",(req,res)=>{
    res.json({
        data:req.session.user    
    })
    // console.log(data)
})

router.use("/user",userRoutes)
router.use("/article",articleRoutes)
router.use("/category",categoryRoutes)

module.exports = router