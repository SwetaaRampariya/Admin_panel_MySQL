
const { array } = require("@hapi/joi");
const { result } = require("@hapi/joi/lib/base");
const db = require("../dbConnection/db");
const logger = require('../logger/logger');
const { categoryValidation} = require('../validation/categoryValidation');


exports.category = async(req,res)=>{
    db.query("select * FROM category_register", (err, response) => {
        if (response) {
            // console.log(response)
            res.render('category',{
                array:response
            })
            
        } else if(err) {
            res.send(err);
        }
    });
}

exports.xyz = async(req,res)=>{
    const id = req.query.id
    const USE = `SELECT * FROM category_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.render('editCategory',{
                id:result[0].id,
                categoryName:result[0].categoryName
            })
        })
    
}


exports.multiDeleteCategory = async (req, res) => {
    try {
            const id = req.body.id.toString();
            const name = id.split(",");
            db.query("DELETE FROM category_register WHERE id IN (?) ",[name], (err, response) => {
                if (response) {
                    db.query("select * FROM category_register", (err, response) => {
                        if (response) {
                            // console.log(response)
                            res.render('category',{
                                array:response
                            })
                            
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


exports.addCategory = async (req, res) => {
    try {
        const { error } = categoryValidation(req.body);
        if (error) {
        
           
            return;
        } else {

            const categoryName = req.body.categoryName;

            const USE = `INSERT INTO category_register(categoryName) VALUES ('${categoryName}')`;
            db.query(USE, (err, result) => {
                console.log('five');
                if (err) {
                    // logger.error('error', err);
                    console.log(err)
                } else {
                    console.log(result)

                   

                    db.query("select * FROM category_register", (err, response) => {
                        if (response) {
                            
                            res.render('category',{
                                array:response
                            })
                           
                        } else if(err) {
                            res.send(err);
                        }
                    });

                    
                }
            })
            
                    
        }
    }
    catch (err) {
       
        console.log(err)
    }
}

exports.viewCategory = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT * FROM category_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { error } = categoryValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const categoryName = req.body.categoryName;
            db.query(`SELECT * FROM category_register WHERE id=?`, [id], async (error, result) => {
                if (result) {
                    db.query(`UPDATE category_register SET categoryName='${categoryName}' WHERE id='${id}'`, async (error, response) => {
                        if (error) {
                            res.send('your data is not update...');
                        } else {
                            res.send('your data updated....');
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

exports.deleteCategory = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `DELETE FROM category_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
         // res.send('data deleted....');
         db.query("select * FROM category_register", (err, response) => {
            if (response) {
                
                res.render('category',{
                    array:response
                })
                
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