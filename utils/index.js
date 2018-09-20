import jwt from 'jsonwebtoken';
import environment from '../config/constants';
const env = environment.ENVIRONMENT;
const config = require(`../config/config-${env}.json`);
const CONSTANT = config.CONSTANTS;
import bcrypt from 'bcrypt-nodejs';

export const generateToken = (userId, type, fn)=>{
    jwt.sign({
        id: userId,
        type:type,
    }, CONSTANT.JWT.SECRET, {
        algorithm: CONSTANT.JWT.ALGORITHM,
        expiresIn: CONSTANT.JWT.EXPIRES_IN
    }, (err, token)=> {
        fn(err, token);
    });
};

export const generateHashpassword = (password,cb)=>{
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) {
            cb(err);
        } else{
            bcrypt.hash(password, salt, null, (err, hash) => {
                cb(err,hash);
            });
        }
    });
};
