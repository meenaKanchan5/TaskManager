const bcrypt = require('bcryptjs')
const myFunction = async ()=>{
    const password = "Red12345!"
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Red12345!',hashedPassword)
    console.log(isMatch)
}
myFunction()

// jwt token
const jwt = require('jsonwebtoken')
const myJWTFunction = async ()=>{

    const token = jwt.sign({ _id:'abc123' },process.env.JWT_TOKEN_SECRET_KEY,{expiresIn:'30 minute'})
    console.log("token => ",token)

    const payload = jwt.verify(token,'')
    console.log(payload)

}
myJWTFunction()


const pet={
    name:"Cat"
}
pet.toJSON = function ()
{
    return {}
}
console.log(JSON.stringify(pet))

const Task = require('./models/task')
const User = require('./models/user')
const main = async()=>{
    // const task = await Task.findById('5f2057861d5efa55e4fa0cc2')
    // await task.populate('owner').execPopulate() // execpopulate owner who is associated with that id
    // console.log(task.owner)

    const user= await User.findById('5f20577d1d5efa55e4fa0cc0')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)


}
main()


// code for upload using multer

const multer = require('multer')
const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(doc|docx)$/)) // match is used to match regex
        {
             callback(new Error('Please upload a word doc'))
     }
        // if(!file.originalname.endsWith('.pdf'))
        // {
        //     callback(new Error('Please upload a PDF'))
        // }
        callback(undefined,true)

    }
})
app.post('/upload',upload.single('upload') ,(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


curl --request GET \
--url 'https://us17.api.mailchimp.com/3.0/' \
--user 'anystring:9a7d77bbd9386484c849f3f22a85c53d-us17'


//middleware program

// app.use((req,res,next)=>{

//      if(req.method === 'GET')
//      { res.send("GET REQUEST ARE DISABLE")

//      }else{
//          next()
//      }

//     //console.log(req.method,req.path)

// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is under maintainance')
// })

//mandrill


const mailchimpInstance   = 'us17',
    listUniqueId        = '8dec817664',
    mailchimpApiKey     = '9a7d77bbd9386484c849f3f22a85c53d-us17';
function addEmailToMailChimp()
{
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://us17.api.mailchimp.com/3.0/lists/8dec817664/members',
  'headers': {
    'Authorization': 'Basic a2FuY2hhbjEyMzQ6OWE3ZDc3YmJkOTM4NjQ4NGM4NDlmM2YyMmE4NWM1M2QtdXMxNw==',
    'Content-Type': 'application/json',
    'Cookie': 'ak_bmsc=25828E62B0401A47007A71FF27C5E4767D38DEA02C510000F738285F2DA98577~plBg5RLBGWXVp8sx7/KdrtGpx2He0SbP8XKbCgeLYwqiuopksrjPdJTu+eMjBrcNcgPpa0P+xrXUkRvE5UVVmE4+3VKnat4hW3J0C9X1FaQzAIl9RKnSawvpY/m6TqYjzeN6V+WlxjGnAG3ulJr+ePJzMwaAG0zYTNkGCEN35dg180L/0FMwIVrzLW21/aum5jT3kakiLYmpvSixgtqVD2wwSYDCcX63E7p1tD2iwdCqY=; bm_sv=70D0D39F965F7D8FA5CB0754278BFBBC~qeZgwiKMmp0DKdHfz0GCfiJG+ND2dT9N4sZxIL/Ic9ZHa5LJRabGPXlZUJ+LaGUJXqfmX6cL9/g6hvxBhoDaiua+NNI3CTC5t8UTL+vhf3iGwZiPTQkOj4vzCSw4NaF+jsR0MK+DBWZ1ro5mxx6KT1N+3ToaghUyAK3VsD0dF88='
  },
  body: JSON.stringify({"email_address":"abhinav.cgi@gmail.com","status":"subscribed"})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
})
}