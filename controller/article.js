const {Router} = require("express")
const router = Router()
const articleModel = require("../model/article")
const mongoose = require("mongoose")

// router.get('/',(req,res) =>{
//     res.sendfile = path.join(__dirname,"../public/page/index.html")
// })
// router.get("/write",(req,res) =>{
//     res.sendFile(path.resolve(__dirname,"../public/page/write.html"))
// })

// router.post("/article",async(req,res,next)=>{//发表文章路由
//     //判断用户是否登录
//     //登陆将数据存储到数据库，未登录就告诉前端
//     try{
//         let{
//             title,
//             content,
//             contentText,
//             category
//         } = req.body
//         category = category.map(item => mongoose.Types.ObjectId(item))
//         console.log(category)
//         console.log(req.session.user);
//         if(req.session.user){//登录
            
//             await articleModel.create({
//                 title,
//                 content,
//                 contentText,
//                 category,
//                 author: mongoose.Types.ObjectId(req.session.user._id)
//             })
            
//             res.json({
//                 code:200,
//                 msg:"文章添加成功"
//             })
//         }else{//未登陆
            
//             res.json({
//                 code:401,
//                 msg:"未登录不能发表笔记"
//             })
//         }
//     } catch(err){
//         next(err)
//     }
// })

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


module.exports = router