import models from '../../models';
import _ from 'lodash';
import {generateToken} from '../../utils/';

export const login = (req, res) => {
    models.user.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.json({
                status: 400,
                message: 'Something went wrong'
            });
        }
        if (!_.isEmpty(user)) {
            //check password
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    return res.json({
                        status: 400,
                        message: 'Something went wrong.'
                    });
                }
                if (isMatch) {
                    generateToken(user._id,'user',(err, token)=>{
                        if(err){
                            return res.json({
                                status: 400,
                                message: 'Something went wrong.'
                            });
                        }
                        res.json({
                            status: 200,
                            message: 'Login success.',
                            token:token
                        });
                    })
                } else{
                    res.json({
                        status:400,
                        message:'Wrong password.'
                    });
                }
            });
        } else {
            res.json({
                status: 400,
                message: 'Email address not registered'
            });
        }
    });
};