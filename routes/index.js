var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//create valitede 
 function createUserValitede (req,res,next){
  const {loginname,password,comfir} = req.body;
  if(loginname&&password&&comfir&&password === comfir){
    next();
  }else{
    res.send({error:"登录名或者密码不正确或者重新输入"})
  }
  
}
router.post('/user/create',createUserValitede,async function(req,res,next){
  try {
    const user = await domain.create("User",req.body);
    res.send(user.id);
  } catch (error) {
    res.send({error:new Error("user 创建失败")}) 
  }
})
module.exports = router;
