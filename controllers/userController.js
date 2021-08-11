const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const User = require('../model/User');

module.exports = {
    login(req, res) {
        let {email, password} = req.body;
        let validate = loginValidator({email, password});
        
        if(!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({email})
            .then(user => {
                if(!user) {
                    return res.status(400).json({ message: 'User not found!'});
                }

                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        return res.status(500).json({message: 'Internal Server Error!'});
                    }

                    if(!result) {
                        return res.status(400).json({ message: 'Invalid Email or Password!!'});
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }, 'SECRET', { expiresIn: '2h' });

                    return res.status(200).json({
                        message: 'Login Successfully',
                        token: `Bearer ${token}`,
                        name: user.name
                    });
                })
                
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
            
        }
    },
    register(req, res) {
        let {name, email, password, confirmPassword} = req.body;
        let validate = registerValidator({name, email, password, confirmPassword});
        
        if(!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({email})
            .then(user => {
                if(user) {
                    return res.status(400).json({
                        message: 'Email already exist!'
                    });
                }

                bcrypt.hash(password, 11, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            message: 'Internal Server Error!'
                        });
                    }

                    let user = new User({
                        name, 
                        email, 
                        password: hash
                    })

                    user.save()
                    .then(user => {
                        return res.status(201).json({
                            message: 'User created successfully'
                        });
                    })
                    .catch(err => {
                        console.log(error);
                        return res.status(500).json({
                            message: 'Internal Server Error!'
                        });
                    })

                    
                })
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal Server Error!'
                });
            })
            
        }
    }
}