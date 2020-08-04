

const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  description:{
    type:String,
    trim:true,
    required:true
  },
  completed:{
    type:Boolean,
    default:false,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  }
},{
  timestamps:true
})
taskSchema.pre('save', async function(next){ // middleware https://mongoosejs.com/docs/middleware.html
  const task = this
  // /console.log("Just Before Saving !")
  next() // next is provided when we are done // if we dont provide then it end up in infinte loop
})
const Task = mongoose.model('Task',taskSchema)
//   const taskapp = new Task({
//     description:'  Food Cooked By Abhinav   ',

//   })
//   taskapp.save().then((taskapp)=>{
//     console.log(taskapp)
//   }).catch((e)=>{
//     console.log("Error",e)
//   })
module.exports = Task

