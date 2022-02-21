const bcrypt = require('bcrypt');
const saltRounds = 10;
 const logger = require('../logger/logger');
const db = require('../dbConnection/db');
const Otp = require('../Middleware/Otp');
const { registrationValidate, loginValidate, EmailValidate, updatePasswordValidate, resetpasswordValidate, updateProfileValidate } = require('../validation/authValidation');
const res = require('express/lib/response');



const otp = Math.floor(100000 + Math.random() * 900000);
logger.info(otp);



exports.registration = async(req, res) => {

    try {
        let { error } = registrationValidate(req.body);
        if (error) {
            console.log(error)
            res.status(400).send(error.details[0].message);

        } else {
            const Email = req.body.Email;  
            const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
            const fname = req.body.fname;
            const mname = req.body.mname;
            const lname = req.body.lname;
            const gender = req.body.gender;
            const hobby = req.body.hobby;
            const mobile = req.body.mobile;
            const Image = req.file.filename;
            const city = req.body.city;
            const Password = encryptedPassword;

            db.query(`Select * from registration where email = '${Email}'`, (err, response) => {
            if (!err && response !="") {
                console.log(response);
                res.send("Email already registered");
                return;
            }
            else if(err){
                console.log(err);
                res.send(err);
            }
            else if(response == ""){
                const sql = `INSERT INTO registration(fname,mname,lname,gender,hobby,mobile,Image,city,Email,Password)VALUES('${fname}','${mname}','${lname}','${gender}','${hobby}','${mobile}','${Image}','${city}','${Email}','${Password}')`;

                db.query(sql, (err, result) => {
                    console.log(result);
                    if (err) {
                        logger.error('Error', err);
                    } else {
                        res.send("record Inserted....");
                    }

                });
            }
            });
        }


    } catch (err) {
        logger.error("err", err);
    }
};

exports.login = async(req, res) => {

    try {

        let { error } = loginValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);

        } else {

            const Email = req.body.Email;

            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {

                if (err) {

                    logger.error("error", err);
                } else {
                    if (response.length > 0) {

                        const comparison = await bcrypt.compare(req.body.Password, response[0].password);
                        if (comparison){
                           
                            res.render('index',{
                                Email:req.body.Email
                            }
                            );
                        }else {
                            res.send("Password is not correct..");}
                    } else {
                        res.send("Email address is not registered");
                    }
                }
            });
        }
    } catch (err) {
        logger.error("err", err);
    }

};


exports.verifyEmail = async(req, res) => {
    try {
        let { error } = EmailValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                } else {
                    if (response.length > 0) {
                        Otp(Email, otp);
                        res.render('otp',{Email : Email});
                    } else {
                        res.send("Email invalid...")
                    }
                }
            });

        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.verifyOtp = async(req, res) => {
    try {

        if (otp == req.body.otp) {
            res.render('forgetpassword',{Email : req.body.Email});
        } else {
            res.send("OTP is invalid");
        }

    } catch (err) {
        logger.error("err", err);

    }
};

exports.ejsUpdateProfile = async(req, res) => {
    console.log(req.body)
    console.log("mobile"+req.body.mobile)
    console.log("email"+req.body.Email)
    res.render("updateprofile",{
        fname:req.body.fname,
        mname:req.body.mname,
        lname:req.body.lname,
        mobile:req.body.mobile,
        Image:req.body.Image,
        city:req.body.city,
        Email:req.body.Email,
        gender:req.body.gender,
        hobby:req.body.hobby

    })
};

exports.changePassword = async(req, res) => {
    console.log(req.query.Email)
    res.render("resetpassword",{
        Email:req.query.Email
    })
};






exports.updatePassword = async(req, res) => {
    try {
        console.log(req.body)

        let { error } = resetpasswordValidate(req.body);
        if (error) {
            
            console.log(error)

        } else {
            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (response !="") {
                    const encryptedPassword = await bcrypt.hash(req.body.Password, saltRounds);
                    if (encryptedPassword) {
                        db.query(`UPDATE registration set Password=? WHERE Email=?`, [encryptedPassword, Email]);
                        //res.send("Password Updated....")
                        res.render('login')
                    } else {
                        res.send("Invalid Password");
                    }
                } else{
                    res.send(err)
                }
            });

        }

    } catch (err) {
        logger.error("err", err);
    }
};


exports.viewProfile = async(req, res) => {
    try {
 console.log('sru')

        db.query(`SELECT * FROM registration`, async(err, response) => {
            if (err) {
                logger.error("error", err);
            } else {
                
                res.render('viewProfile' , {
                    fname:(response[0].fname),
                    mname:(response[0].mname),
                    lname:(response[0].lname),
                    gender:(response[0].gender),
                    hobby:(response[0].hobby),
                    mobile:(response[0].mobile),
                    Image:(response[0].image),
                    city:(response[0].city),
                    Email:(response[0].email),
                })
            }
        });

    } catch (err) {
        logger.error("err", err);
    }
};


exports.forgetPassword = async(req, res) => {
    try {
        let { error } = resetpasswordValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            
            const Email = req.user.Email;
            db.query(`SELECT * FROM registration WHERE Email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                }
                if (response) {

                    const comparison = await bcrypt.compare(req.body.CurrentPassword, response[0].Password);
                    if (comparison) {
                        const updatePassword = await bcrypt.hash(req.body.Password, saltRounds);
                        db.query(`UPDATE registration set Password='${updatePassword}'WHERE Email=?`, [Email], async(err1, response1) => {
                            if (response1) {
                                res.render('resetpassword')
                                res.send("Your Password has been Reset");
                            } else {
                                res.send("Your Password has not been Reset");
                            }
                        });


                    } else {
                        res.send("Current Password is incorrect");
                    }

                }
            });

        }


    } catch (err) {
        logger.error("err", err);
    }
};

exports.updateProfile = async(req, res) => {
    try {
        const { error } = updateProfileValidate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const Email = req.body.Email;
            db.query(`SELECT * FROM registration WHERE email = ?`, [Email], async(err, response) => {
                if (err) {
                    logger.error("error", err);
                }
                if (response) {
                    const fname = req.body.fname;
                    const mname = req.body.mname;
                    const lname = req.body.lname;
                    const gender = req.body.gender;
                    const hobby = req.body.hobby;
                    const mobile = req.body.mobile;
                    const Image = req.file.filename;
                    const city = req.body.city;
                    const mail = req.body.Email;

                    db.query(`UPDATE registration set fname='${fname}',mname='${mname}',lname='${lname}',gender='${gender}',hobby='${hobby}',mobile='${mobile}',Image='${Image}',city='${city}',email='${mail}'WHERE email=?`,[mail], async(err1, response1) => {

                        if (response1) {
                            res.send("Updated")
                        } else if(err1) {
                            res.send(err1)
                        }
                    });

                }
            });
        }
    } catch (err) {
        logger.error("err", err);
    }
};

exports.logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.clearCookie("id");
       
        res.render('login')
    } catch (err) {
        logger.error("err", err)
    }
};