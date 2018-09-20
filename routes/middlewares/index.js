import models from '../../models';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    let token = req.headers.Authorization ? req.headers.Authorization : undefined;
    if (token) {
        let decodedMessage = (jwt.decode(token)) ? jwt.decode(token) : undefined;
        models.user.findOne({ _id: decodedMessage.id }, (err, user) => {
            if (err) {
                res.json({
                    status: 400,
                    message: 'Something went wrong'
                });
            } else {
                if (!_.isEmpty(user)) {
                    req.currentUser = user;
                    req.isLoggedIn = true;
                    next();
                } else {
                    req.isLoggedIn = false;
                    res.json({
                        status: 403,
                        message: 'Unauthorized'
                    });
                }
            }
        });
    } else{
        res.json({
            status: 403,
            message: 'Unauthorized'
        });
    }
};