const { result, id } = require("@hapi/joi/lib/base");
const hapijoidate = require("@hapi/joi-date");
const db = require("../dbConnection/db");
const logger = require("../logger/logger");
const { portfolioValidation } = require('../validation/portfolioValidation');

exports.firstPage = async(req,res)=>{
    



    db.query("select * FROM category_register", (err, response) => {
        if (response) {
            

            res.render('addPortfolio',{
                array:response
            })




        } else if(err) {
            res.send(err);
        }
    });
}


exports.portfolio = async(req,res)=>{
    db.query("select * FROM portfolio_register", (err, response) => {
        if (response) {
            
            res.render('portfolio',{
                array:response,
            })
            
        } else if(err) {
            res.send(err);
        }
    });
}

exports.showAddPage = async(req,res)=>{
    res.render('addPortfolio')
}


exports.xyz = async(req,res)=>{
    const id = req.query.id
    const USE = `SELECT * FROM portfolio_register WHERE id='${id}'`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.render('editPortfolio',{
                
                id:result[0].id,
                images:result[0].P_Image,
                projectCategory:result[0].projectCategory,
                projectName:result[0].projectName,
                projectImage:result[0].projectImage,
                projectTitle :result[0].projectTitle ,
                projectDate:result[0].projectDate,
                projectDescription:result[0].projectDescription

            })
        })
    
}



exports.multiDeletePortfolio = async (req, res) => {
    try {
        const id = req.body.id.toString();
        const name = id.split(",")
        
        console.log(name)
        db.query("DELETE FROM portfolio_register WHERE id IN (?) ",[name], (err, response) => {
            if (response) {
                db.query("select * FROM portfolio_register", (err, response) => {
                    if (response) {
                        // console.log(response)
                        res.render('portfolio',{
                            array:response,
                        })
                        // res.send("Selected Category Deleted...");
                    } else if(err) {
                        res.send(err);
                    }
                });
            } else {
                console.log(err)
                res.send('Selected Category Not Deleted!.....');
            }
        });

    } catch (err) {
        logger.error("err", err);
        res.send(err);
    }

};


exports.addPortfolio = async (req, res) => {
    try {
        const { error } = portfolioValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const images = req.file.filename;
            const categoryName = req.body.projectCategory;
            const projectName = req.body.projectName;
            const projectImage = images;
            const projectTitle = req.body.projectTitle;
            const projectDate = req.body.projectDate;
            const projectDescription = req.body.projectDescription;

            
                const SQL = `INSERT INTO portfolio_register(categoryName,projectName,projectImage,projectTitle,projectDate,projectDescription) VALUES ('${categoryName}','${projectName}','${projectImage}','${projectTitle}','${projectDate}','${projectDescription}')`;
                db.query(SQL, (err, result) => {
                    if (err) {
                        logger.error('Error', err);
                    } else {
                        db.query("select * FROM portfolio_register", (err, response) => {
                            if (response) {
                                
                                res.render('portfolio',{
                                    array:response
                                })
                                
                            } else if(err) {
                                res.send(err);
                            }
                        });
                    } 
                })

            // })

        }
    }
    catch (err) {
        console.log(err);
    }
}

exports.viewPortfolio = async (req, res) => {
    try {
        id = req.params.id;
        const USE = `SELECT category_register.categoryName,portfolio_register.projectName FROM category_register INNER JOIN portfolio_register ON category_register.categoryName = portfolio_register.categoryName`;
        db.query(USE, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
    }
    catch (err) {
        logger.error('err', err);
    }
}

exports.updatePortfolio = async (req, res) => {
    try {
        const { error } = portfolioValidation(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } else {
            const id = req.params.id;
            const images = req.files.map(projectImage => projectImage.filename);
            const categoryName = req.body.categoryName;
            const projectName = req.body.projectName;
            const projectImage = images;
            const projectTitle = req.body.projectTitle;
            const projectDate = req.body.projectDate;
            const projectDescription = req.body.projectDescription;

            db.query(`SELECT id FROM category_register WHERE categoryName='${categoryName}'`, async (error, result) => {
                const category_id = result[0].id;
                if (result) {
                    db.query(`UPDATE portfolio_register SET categoryName='${categoryName}',projectName='${projectName}',projectImage='${projectImage}',projectTitle='${projectTitle}',projectDate='${projectDate}',projectDescription='${projectDescription}' WHERE id='${id}'`, async (error, response) => {
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

exports.deletePortfolio = async (req, res) => {
    try {
       const id = req.query.id;
        const USE = `DELETE FROM portfolio_register WHERE id='${id}'`;

        db.query(USE, (err, result) => {
            if (err) throw err;
               // res.send('data deleted....');

                db.query("select * FROM portfolio_register", (err, response) => {
                    if (response) {
                        // console.log(response)
                        res.render('portfolio',{
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