const Todo = require('../Models/toDO')

const createTodo = async(req,res)=>{
 
    try {
        
        const {title , desc} = req.body;

        const user = req.user._id

        const todo = await Todo({
            title,
            desc,
            user
        })
         
        await todo.save()
        res.status(200).json({
            success:true,
            message:'Todo created successfully',
            todo
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }




}

const getTodo = async(req , res)=>{
     
    try {
        
        const user = req.user._id;
        const todo = await Todo.find({user})

        res.status(200).json({
            success:true,
            todo
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const editTodo = async(req , res) =>{

    try {
        
        const todo = await Todo.findById(req.params.id)
        const {title , desc} = req.body;

        if(!title || !desc){
            return res.status(401).json({
               message:'Title and description are required'
            })
        }

        if(!todo){
            return res.status(401).json({
                success:false,
                message:"Todo Not Found"
            })
        }

        const editTodo = await Todo.findByIdAndUpdate(todo, {title,desc},{
           runValidators:true,
           new:true
        })
       

        await editTodo.save()
        res.status(200).json({
            success:true,
            message:'Todo update successfully'
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteTodo = async(req, res)=>{
   
    try {
        
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if(!todo){
            return res.status(401).json({
                message:'Todo Not Found',
                success:false
            })
        }

        res.status(200).json({
            success:true,
            message:'Todo Deleted',
            todo
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {createTodo,getTodo,editTodo,deleteTodo}