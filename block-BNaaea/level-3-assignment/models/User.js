var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var userSchema = new Schema({
   name : {type : String},
   email : {type : String, required: true},
   password : {type : String, required : true},
   isAdmin : {type : String},
}, {timestamps : true})


userSchema.pre('save', function (next) {
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password , 10, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            if(this.isAdmin === 'admin'){
                this.isAdmin = 'true';
            }else if(this.isAdmin === 'user'){
                this.isAdmin = 'false'
            }
            return next();
        })
    }else{
        next();
    }
});
userSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password,(err, result)=> {
        return cb(err, result)
    })
}

var User = mongoose.model('User', userSchema);
module.exports = User;