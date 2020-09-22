
const express = require('express')
const app = express()
   
const mongodb = require('mongodb')

const mongoclient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/"

const bodyParser = require('body-parser')



app.get('/customers',function(req,res){

  mongoclient.connect(url,function(err,db){


      if(err) throw err;

      var dbo = db.db("mydb")

     var cursor =  dbo.collection("customers").find().toArray()

        cursor.then(function(data){

               res.json(data)
                db.close()
        })
  })
})

//************************************************** parsing data directly in updateone **************************************

app.put('/customers/:id',function(req,res){

        mongoclient.connect(url,function(err,db){

                if(err) throw err;
          
                var dbo = db.db("mydb")    
             
   dbo.collection("customers").updateOne({_id:mongodb.ObjectID(req.params.id)},{$set : { name : "deepika"}},function(err,data){

                        res.json({

                                message : "modified"
                        })

                        db.close();
                })
})
})

// ***************************************************************** body-parser (parsing data from postman -->  ( REQ.BODY ) )*******************************************


app.use(bodyParser.json())   // it is a middleware 

app.put('/customers/:id',function(req,res){

        mongoclient.connect(url,function(err,db){

              //   console.log(req.body)        pass this directly in $set inside updateOne
           

                if(err) throw err;
          
                var dbo = db.db("mydb")    
             
   dbo.collection("customers").updateOne({_id:mongodb.ObjectID(req.params.id)},{$set :req.body },function(err,data){

                        res.json({

                                message : "modified"
                        })

                        db.close();
                })
})
})


// ***************************************************************** using express ********************************************

app.get('/',function(req,res) {

        res.send("home page")
})

app.get('/about',function(req,res) {

        res.json({
             
          message : "success"
       })
})

// ******************************************************************* 

app.use(bodyParser.json())

app.post('/customers-create',function(req,res){

    mongoclient.connect(url,  function(err,db){

      if(err) throw err;

      var dbo = db.db("mydb")

      let insertData =  dbo.collection("customers").insertOne(req.body)

   insertData.then(function(data){

        res.json(data)
        db.close()
   })      
      })
      
    })

app.listen(3000)




// const fs = require('fs')

// const notes = require('./notes')

// const _ = require('lodash')

// const yargs = require('yargs')

// console.log('process',process.argv)
// console.log('yargs',yargs.argv)

// var argv = yargs.argv;
// var command = argv._[0]

// if(command == 'list'){

//   console.log('list all notes')
// }else if (command == 'read'){

// console.log('read notes')
// }else if (command == 'create'){

//  notes.createNote(argv.title,argv.body)
//   }else if (command == 'remove'){

//     console.log('note removed')
//     }
// else {
//   console.log('command not found')
// }

// var user = os.userInfo()

// fs.appendFile('message.txt', `Hello ${user.username} , you are ${notes.age} years old.`, (err) => {
//   if (err) throw err;
// });