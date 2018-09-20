import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    contact:{
        type:String,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    }
},{
    timestamps: true,
    versionKey: false,
    virtuals: true
});

userSchema.pre('save', (next) =>{
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash)=> {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = (passw, cb)=> {
    bcrypt.compare(passw, this.password, (err, isMatch)=> {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// export default mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);