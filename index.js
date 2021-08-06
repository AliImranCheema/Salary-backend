const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const Joi = require('joi')


const app = express()
const port = process.env.PORT || 3001
app.listen(port , ()=> console.log(`Listening on port ${port}`))

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


var conn = mysql.createConnection({

host : "localhost",
user : "root",
password : "",
database : "form"

});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected....");
});


app.get('/form_test' , (req , res)=>{

    conn.query("SELECT * FROM form_test", function (err,rows) {
        if (!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

/*app.get('/admission_form/:id' , (req , res)=>{

    conn.query("SELECT * FROM admission_form WHERE id = ?",[req.params.id], function (err,rows) {
        if (!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
}) */

app.post('/form_test/add' , (req , res)=>{

    console.log(req.body)

    const schema = Joi.object({

        Name : Joi.string().required(),
        Designation : Joi.string().required(),
        Periods : Joi.number().required(),
        Amount : Joi.number().required(),
        Result : Joi.number().required()
    });
     result = schema.validate(req.body);
     if (result.error){
        res.send(result.error.details[0].message)
    }
     else{conn.query("INSERT INTO form_test(Name , Designation , Periods , Amount , Result )values(?,?,?,?,?);",[req.body.Name,req.body.Designation,req.body.Periods,req.body.Amount,req.body.Result] , (err , rows)=>{

        if(!err){
            res.send("Data inserted successfully....")
        }
        else{
            throw err;
        }

    })
}

})
