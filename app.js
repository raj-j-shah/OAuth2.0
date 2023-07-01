const express = require('express')
const key = "12323wfsv";
const app = express();
const passportSetup = require('./config/passport')
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const user = require('./model/user');
const uri = "mongodb+srv://harry:123@cluster1.etu4s6u.mongodb.net/?retryWrites=true&w=majority"
app.set('view engine', 'ejs');
mongoose.connect(uri)
.then((v)=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("Failed!",err)
})


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [key]
}));

app.use(passport.initialize());
app.use(passport.session());
const connst = (req,res,next)=>{
    let a = mongoose.connection.readyState;
    if(a===0||a===99) mongoose.connect(uri);
    console.log(a);
    next()
    // mongoose.disconnect();
}
app.use(connst)
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/disconnect',(req,res)=>{
console.log("here");
mongoose.disconnect();
})
app.get('/login/google', passport.authenticate('google', {
    scope: ['profile']
}));
app.get('/login/google/redirect',passport.authenticate('google'),(req,res)=>{
res.redirect('/pinfo')
});
app.get('/profile',(req,res)=>{
    if(req.user) res.render('ld');
    res.json({message:"UnAuthorized"})
})
app.get('/pinfo',async (req,res)=>{
    if(req.user) {
        const usr  = await user.findOne({id:req.user})
        if(usr){
            res.render('ld',{user:usr});}
            else
        res.send("db is down");
       
    }
    else
    res.json({message:"UnAuthorized"})
})
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
})
app.listen(3000,()=>{
    console.log("Server is running at 3000");
})