//CRUD create read update and delete

// /Users/kmeena/mongodb/bin/mongod.exe --dbpath=/Users/kmeena/mongodbData to run mongo server
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb') // object distructuring

const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// creating own id s
const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURl,{useNewUrlParser:true ,useUnifiedTopology: true },(error,client)=>{
    if(error)
    {
       return console.log("Unable to connect to database")
    }
    // console.log("connected correctly")
    // adding collection
    const db = client.db(databaseName)

 //***  */ delete an element from the  document

    //deleteOne(filter, options, callback){Promise} _id: new ObjectID("5f19d1b5ec27a076bc6729b6")
    db.collection('users').deleteOne({_id: new ObjectID("5f1ae909ed29872580bc9bad")}).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })
    //deleteMany(filter, options, callback){Promise} "age" : 29
    db.collection('users').deleteMany({age: 29}).then((result)=>{
        console.log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })

    //***  */ update an element inside document
  //  updateMany(filter, update, options, callback){Promise.<Collection~updateWriteOpResult>}
//   db.collection('task').updateMany({
//     completed:false
//   },
//   {
//       $set:{
//         completed:true
//       }
//   }).then((result)=>{
//     console.log(result)
//   }).catch((error)=>{
//       console.log(error)
//   })

    //updateOne(filter, update, options, callback){Promise}
//     db.collection('users').updateOne({_id: new ObjectID("5f19d1b5ec27a076bc6729b6")},
//     {
//         $inc:{
//             age:1
//         }
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

//    db.collection('users').updateOne({_id: new ObjectID("5f19d1b5ec27a076bc6729b6")},
//     {
//         $set:{
//             name:"Abhinav Singh"
//         }
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

    // ****** reading an element inside the document

    //find(query, options){Cursor}
    // db.collection('users').find({age:29}).toArray((error,users)=>{
    //   console.log(users)
    // })
    // db.collection('users').find({age:29}).count((error,users)=>{
    //     console.log(users)
    // })
// db.collection('task').findOne({ _id: new ObjectID('5f1aea58e4f3152c483deed1')},(error, result)=>{
// if(error){
//   return  console.log("unable to find id in task")
// }
// console.log("Find By _ID")
// console.log( result)

// })
// db.collection('task').find({completed: true}).toArray((error,tasks)=>{
//     if(error){
//         return  console.log("unable to find completed task")
//     }
//     console.log("List All Completed tasks")
//     console.log(tasks)
// })

     // findOne(query, options, callback){Promise}
    // // finding user by name , or age
    // db.collection('users').findOne({name:'kanchan'},(error,user)=>{
    //     if(error)
    //     {return console.log("Unable to find user")}
    //     console.log(user, user._id)
    // })

    // // finding user by _id  we need to pass id to objectid fucntion since its a binary value
    // db.collection('users').findOne({_id: new ObjectID('5f19d1b5ec27a076bc6729b6')},(error,user)=>{
    //     if(error)
    //     {return console.log("Unable to find user")}
    //     console.log(user, user._id)
    // })
    // ************** creating documemnt or collection in database

    // inset only one document in collection
    // db.collection('users').insertOne({
    //    // _id: id,//
    //     name:'Vikram Dixit',
    //     age:29
    // },(error,result)=>{
    //     if(error)
    //     {
    //         return console.log("unable to insert user");
    //     }
    //     console.log(result.ops)
    // })

    //inserting multiple documents into collection
    // db.collection('users').insertMany([
    //     {
    //         name:"kanchan2.0",
    //         age: 20
    //     },
    //     {
    //         name:"kanchan 3.0",
    //         age: 18
    //     }

    // ], (error,result)=>{
    //     if(error)
    //     {
    //         return console.log("unable to insert many documents")
    //     }
    //      console.log(result.ops)
    // } )

    // db.collection('task').insertMany(
    //     [
    //         {
    //             description:"Task one is in progress",
    //             completed:false
    //         },
    //         {
    //             description:"Task two is in progress",
    //             completed:true
    //         },
    //         {
    //             description:"Task three is in progress",
    //             completed:false
    //         }

    //     ],(error,result)=>{
    //         if(error)
    //         {
    //             return console.log("unable to insert document in task ")
    //         }
    //         console.log(result.ops)

    //     }
    // )

})
