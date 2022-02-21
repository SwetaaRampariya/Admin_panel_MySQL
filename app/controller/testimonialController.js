const { array } = require("@hapi/joi");
const { result } = require("@hapi/joi/lib/base");
const db = require("../dbConnection/db");
const logger = require("../logger/logger");
const { testimonialValidation } = require('../validation/testimonialValidation');



exports.testimonial = async(req,res)=>{
    db.query("select * FROM testimonial_register", (err, response) => {
        if (response) {
            // console.log(response)
            res.render('testimonial',{
                array:response
            })
            // res.send("Selected Category Deleted...");
        } else if(err) {
            res.send(err);
        }
    });
}

exports.showAddPage = async(req,res)=>{
    res.render('addTestimonial')
}

exports.xyz = async(req,res)=>{
    const id = req.query.id
    const USE = `SELECT * FROM testimonial_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.render('editTestimonial',{
                id:result[0].id,
                T_Name:result[0].T_Name,
                designation:result[0].designation,
                T_Desc:result[0].T_Desc,
                T_Image:result[0].T_Image


            })
        })
    // db.query("select * from FROM category_register WHERE id = ${}")
}






exports.multiDeleteTestimonial = async (req, res) => {
    try {
            const id = req.body.id.toString();
            const name = id.split(",");
            db.query("DELETE FROM testimonial_register WHERE id IN (?) ",[name], (err, response1) => {
                if (response1) {
                    db.query("select * FROM testimonial_register", (err, response) => {
                        if (response) {
                            // console.log(response)
                            res.render('testimonial',{
                                array:response
                            })
                            // res.send("Selected Category Deleted...");
                        } else if(err) {
                            res.send(err);
                        }
                    });
                } else {
                    res.send('Selected Category Not Deleted!.....');
                }
            });

    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }

};


exports.addTestimonial = async (req, res) => {
    try {
        const { error } = testimonialValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {

            const T_Name = req.body.T_Name;
            const designation = req.body.designation;
            const T_Desc = req.body.T_Desc;
            const T_Image = req.file.filename;
            console.log(T_Name)
            //sql Query
            const MAN = `INSERT INTO testimonial_register(T_Name,designation,T_Desc,T_Image) VALUES('${T_Name}','${designation}','${T_Desc}','${T_Image}')`;

            //run query
            db.query(MAN, (err, result) => {
                if (err) {
                    logger.error('Error', err);
                } else {
                    db.query("select * FROM testimonial_register", (err, response) => {
                        if (response) {
                            // console.log(response)
                            res.render('testimonial',{
                                array:response
                            })
                            // res.send("Selected Category Deleted...");
                        } else if(err) {
                            res.send(err);
                        }
                    });
                }

                

            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.viewTestimonial = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM testimonial_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updateTestimonial = async (req, res) => {
    try {
        const { error } = testimonialValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const T_Name = req.body.T_Name;
            const designation = req.body.designation;
            const T_Desc = req.body.T_Desc;
            const T_Image = req.file.filename;
            db.query(`SELECT * FROM testimonial_register WHERE id=?`, [id], async (error, result) => {
                if (result) {
                    db.query(`UPDATE testimonial_register SET T_Name='${T_Name}',designation='${designation}',T_Desc='${T_Desc}',T_Image='${T_Image}' WHERE id='${id}'`, async (error, response) => {
                        if (error) {

                            res.send('your data is not update...');
                        } else {
                            db.query("select * FROM testimonial_register", (err, response) => {
                                if (response) {
                                    // console.log(response)
                                    res.render('testimonial',{
                                        array:response
                                    })
                                    // res.send("Selected Category Deleted...");
                                } else if(err) {
                                    res.send(err);
                                }
                            });
                        }
                    })
                } else {
                    res.send('please enter valid data....');
                }
            })
        }
    }
    catch (err) {
        logger.error('err', err);
    }

}

exports.deleteTestimonial = async (req, res) => {
    try {
       const id = req.query.id;
        const USE = `DELETE FROM testimonial_register WHERE id='${id}'`;
        //console.log(USE);
        db.query(USE, (err, result) => {
            if (err) throw err;
        
            db.query("select * FROM testimonial_register", (err, response) => {
                
                if (response) {
                    // console.log(response)
                    res.render('testimonial',{
                        array:response
                    })
                    // res.send("Selected Category Deleted...");
                } else if(err) {
                    res.send(err);
                }
            });
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}