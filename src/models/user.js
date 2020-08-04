
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const Task = require('./task')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true, // no same email will save
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 7,
    validate(value) {
      if (value.length < 6) {
        throw new Error('Password length should be of 6 characters')
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password does not contain word password')
      }
    }
  },
  tokens:[{
      token: {
        type:String,
        required:true
      }
  }],
  avatar:{
    type:Buffer
  }

},{
  timestamps:true
})

userSchema.virtual('tasks',{
 ref:"Task",
 localField:'_id',
 foreignField :'owner'
})
// hidding password and token code to come in response
userSchema.methods.toJSON = function(){
  const user = this
  const userObjects = user.toObject()
  delete userObjects.password
  delete userObjects.tokens
  delete userObjects.avatar
  return  userObjects
}

userSchema.methods.generateAuthToken = async function () {
 const user = this
 const token = jwt.sign({_id: user._id.toString()},process.env.JWT_TOKEN_SECRET_KEY)
 user.tokens = user.tokens.concat({token})
 await user.save()

 return token

}
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to Login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// hash the plain text password before saving
userSchema.pre('save', async function (next) { // middleware https://mongoosejs.com/docs/middleware.html
  const user = this
  // console.log("Just Before Saving !")
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }



  next() // next is provided when we are done // if we dont provide then it end up in infinte loop
})
// delete user tasks when user is removed

userSchema.pre("remove",async function(next){
  const user = this
  await Task.deleteMany({owner:user._id})
 next()

})
const User = mongoose.model('User', userSchema)
module.exports = User
// const me = new User({
//    name:'    Kanchan 20.    ',
//    email:"meena@gmail.com",
//    age:29,
//    password:"Password"
// })

// me.save().then((me)=>{
//    console.log(me)
// }).catch((e)=>{
//   console.log('Error',e)
// })