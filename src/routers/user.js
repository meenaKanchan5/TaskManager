const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
// sharp for  image resize
const sharp = require('sharp')
// creating router
const router = new express.Router()
//file upload using multer
const multer = require('multer')


// data hiding

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch (e) {
        res.status(400).send(e)
    }
    // console.log(req.body)
    // const user = new User(req.body)
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

// authenticating user
router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (e) {
        res.status(400).send(e)
    }
})
// logout code

router.post('/users/logout', auth , async  (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()

    }
})

//logout all session

router.post('/users/logoutAll', auth , async(req,res)=>{
 try{
    req.user.tokens = []
    await req.user.save()
    res.send({message:"All User Logouts"})
 }
 catch(e)
 {
     res.status(500).send()

 }
})

router.get('/users', async (req, res) => {// auth is middleware
    //example with async

    try {
        const user = await User.find({})
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send()
    }
    //example with promise
    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })

})
router.get('/users/me', auth, async (req, res) => {// auth is middleware
    //example with async

    res.send(req.user)
    // try {
    //     const user = await User.find({})
    //     res.status(200).send(user)
    // } catch (e) {
    //     res.status(500).send()
    // }
    //example with promise
    // User.find({}).then((users)=>{
    //     res.status(200).send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })

})

router.get('/users/:id', async (req, res) => {
    //example with async
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }

    //example with promise
    // User.findById(_id).then((user)=>{
    //     console.log(user)
    //     if(!user)
    //     {
    //     return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })

})

// updat euser
router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name', 'email', 'password', 'age']
    const isValidOptions = updates.every((update) => allowedUpdated.includes(update))
    if (!isValidOptions) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
    try {
        // Model.findByIdAndUpdate()
       // const _id = req.params.id

      //  const user = await User.findById(_id)

        updates.forEach((response) => req.user[response] = req.body[response])
        await req.user.save()

        // const user = await User.findByIdAndUpdate(_id, req.body,  {new:true,runValidators:true }) //findByIdAndUpdate bypasses moongo this will not work for encrypt password since it's escaping middle due to moogoose scaping default functionality
        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})
// delet euser

router.delete('/users/me', auth, async (req, res) => {
    try {
      //  const user = await User.findByIdAndDelete(req.user._id)
        //if (!user) { return res.status(404).send({ error: "User Not Found" }) }
        await req.user.remove() // to delelte user

        res.status(200).send(req.user)

    } catch (e) {
        res.status(500).send(e)
    }
})
// upload profile image avatar
const upload = multer({
   // dest:'Avatar', commenting this to store images into db
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback)
    {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
                callback( new Error('Supported extension are .jpg, .jpeg, .png'))
        }
        callback(undefined,true)

    }
})
// validation of file upload
router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
   // req.user.avatar = req.file.buffer
    const buffer= await sharp(req.file.buffer).resize({
        width:250,
        height:250
    }).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

// deleteing avatar
router.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


// get avatar

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e)
    {
        res.status(400).send()
    }
})
module.exports = router