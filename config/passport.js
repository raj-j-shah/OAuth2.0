const passport = require('passport');
const user = require('../model/user')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser((user,cd)=>{
    cd(null,user.id);
})
passport.deserializeUser((id,cd)=>{
    cd(null,id);
})
passport.use(new GoogleStrategy({
    clientID: "439470601840-f7dksr947hthq1erc1hqlji7e078l0e9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/login/google/redirect"
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const a={id:profile.id,name:profile.name.givenName+" "+profile.name.familyName};
    let res = await user.findOne(a);
    if(res){
        cb(null,profile);
        return;
    }
    await (new user(a)).save();
   
  }
));