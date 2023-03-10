var express=require("express")
var router=express.Router();

const credential={
    email:"admin@gmail.com",
    password:"admin1234"
}
//login user
router.post("/login",(req,res)=>{
    if(req.body.email===credential.email && req.body.password===credential.password){
        req.session.user=req.body.email;
        res.redirect("/route/dashboard")
        // res.end("Login Successful!")
    }
    else{
        res.end('Invalid Username')
    }
})


//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
    res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorized User")
    }
})

//route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy(function(error){
        if(error){
            console.log(error)
            res.send('Error')
        }else{
            res.render('base',{title:'Express',logout:'logout successfully'})
        }
    })
})


module.exports=router;