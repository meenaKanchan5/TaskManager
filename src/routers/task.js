const express = require('express')
const Task = require('../models/task')
// creating taskRouter
const taskRouter = new express.Router()
const auth = require('../middleware/auth')
taskRouter.post('/tasks', auth , async (req,res)=>{
    //example with async
   //  const task = new Task (req.body)

   const task = new Task({
       ...req.body,
       owner: req.user._id
   })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
    //example with promise
    //  console.log(req.body)
    //  //res.send(req.body)
    //  const task = new Task(req.body)
    //  task.save().then(()=>{
    //     res.status(201).send(task)
    //  }).catch((e)=>{
    //     res.status(400).send(e)
    //  })
    })

    // adding filter in
    // GET/ tasks?completed = true
    //GET /tasks?limit= 10 & skip = 10 limit will limit thte number of data which we need to show on page one and skip is used to skip data
    // GET /tasks?sortBy=createdAt:asec
    taskRouter.get('/tasks', auth, async (req,res)=>{
        //example with async
        // for filter code
        const match = {}
        const sort={}
        if(req.query.completed)
        {
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy)
        {
            const parts= req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] ==='desc' ? -1 : 1
        }
         try{
        // /   const task = await Task.find({})
         //  const task = await Task.find({owner:req.user._id})
          //alternative of above
        //   await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path:'tasks',
            match,
            options:{ // pagination
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

           res.status(200).send(req.user.tasks)
         }
         catch(e)
         {
             res.status(500).send()
         }
        //example with promise
        // Task.find({}).then((tasks)=>{
        //     res.status(200).send(tasks)
        // }).catch((e)=>{
        //     res.status(500).send()
        // })
    })
    taskRouter.get('/tasks/:id', auth , async (req,res)=>{
         //example with async
        const _id = req.params.id
        try{
           // const task = await Task.findById(_id)
            const task= await Task.findOne({_id, owner:req.user._id})

            if(!task)
            {
                return res.status(404).send()
            }
            res.status(200).send(task)
        }catch(e)
        {
            res.status(500).send(e)
        }

        //example with promise
        // Task.findById(_id).then((tasks)=>{
        //     if(!tasks)
        //     {
        //         return res.status(404).send()
        //     }
        //     res.send(tasks)
        // }).catch((e)=>{
        //     res.status(500).send()
        // })
    })



    // update task
    taskRouter.patch('/tasks/:id',auth,async(req,res)=>{
        const update = Object.keys(req.body)
        const allowUpdates = ['description','completed']
        const isValidOptions = update.every((updates)=> allowUpdates.includes(updates))
        if(!isValidOptions)
        {
            return res.status(400).send({error:'Invalid Options'})
        }
        try{
        const _id = req.params.id
        // code for middleware
        const task = await Task.findOne({_id, owner:req.user._id})
        // const task = await Task.findByIdAndUpdate(_id, req.body ,{new:true, runValidators: true })
        if(!task)
        {
            return res.status(404).send({error: 'Task not found'})
        }
        update.forEach((response)=> task[response]= req.body[response])
        await task.save()
        res.status(200).send(task)
        }
         catch(e){
            res.status(400).send(e)
        }
    })

    // delete task

    taskRouter.delete('/tasks/:id',auth,async(req,res)=>{
        try{
            const _id = req.params.id
            const task = await Task.findOneAndDelete({_id,  owner:req.user._id})
            if(!task)
            {
                 res.status(404).send({error:"Task Not Found"})
            }
            res.status(200).send(task)
        }
        catch(e){
            res.status(500).send(e)
        }
    })
    module.exports = taskRouter