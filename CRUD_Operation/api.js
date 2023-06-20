const express= require("express");
const app=express();
const mongoose= require("mongoose");
const {Schema}= mongoose;
const cors = require('cors');
const { Int32 } = require("mongodb");

app.use(express.json());
app.use(cors());

app.options('*', cors());
mongoose.connect("mongodb://0.0.0.0:27017/mydb" , {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const sch= new Schema({
    Username:{
        required:true,
        type:String
    },
    Password:{
        required:true,
        type:String
    }},
 { versionKey: false})
const monmodel=mongoose.model("users", sch);

const sch2= new Schema({
   
    project_id:{
        required:true,
        type:Number,
        unique:true,
        integer:true
    },
   
    project_name:{
        required:true,
        type:String,
        unique:true,
    },
    

    total_team_members:{
        required:true,
        type:Number,
        integer:true

    },
    start_date:{
        required:true,
        type:Date
    },
    end_date:{
        required:true,
        type:Date
    }},

    { versionKey: false})
    const monmodel1=mongoose.model("task", sch2);

//get
app.get('/fetch', async (req, res) => {
    try{
        const data = await monmodel.find();
        res.json(data)
        res.send(`Listed Documents..`)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get method for project database
app.get('/fetch1', async (req, res) => {
    try{
        const data = await monmodel1.find();
        res.json(data)
        console.log("good");
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




//post
app.post('/add', async (req, res) => {
    const data = new monmodel({
        Username: req.body.Username,
        Password: req.body.Password
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
        res.send(true)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//post method for project database
app.post('/add1', async (req, res) => {
    const data = new monmodel1({
        project_id:req.body.project_id,
        project_name: req.body.project_name, 
        total_team_members: req.body.total_team_members,
        start_date:req.body.start_date,
        end_date:req.body.end_date
    })
    try {
        const dataToSave = await data.save();
         res.status(200).json(true)
        // res.send(true)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get by ID Method
app.get('/getOne/:id', async (req, res) => {
    try{
        const data = await monmodel.findById(req.params.id);
        res.json(data)
        res.send(`getby id..`)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method in project database
app.get('/getOne1/:Projectid', async (req, res) => {
    try{
        const data = await monmodel1.find({project_id : req.params.project_id});
        res.json(data)
        res.send(`getby id..`)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})






// GET BY USER NAME
app.get('/getbyname/:Username', async (req, res) => {
    try{
        const data = await monmodel.find({Username : req.params.Username});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/api/login', async(req, res) => {
  
const { Username, Password } = req.query;

const user = await monmodel.findOne({ Username });
   res.set({
  "Allow-access-Allow-Origin": '*'
    })
 if (user && user.Password === Password) {
   
res.json(true)
 } 
 else{
// 
  res.json(false)
 }
 });


// GET BY PROJECT NAME 
app.get('/getbyname1/:Projectname', async (req, res) => {
    try{
        
        const data = await monmodel1.find({Projectname : req.params.project_name});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//GET bY PROJECT NAME USING regex
app.get('/getOne2/:project_name', async (req, res) => {
    try{
        const regex =  new RegExp(req.params.project_name, 'i');
        const data = await monmodel1.find({project_name: regex});

       // const data = await monmodel1.find({project_name: {$regex: req.params.project_name, $options: 'i'}});
        // res.status(200).json(true)
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// DELETE by name

app.delete('/delete/:project_name', async (req, res) => {
    try {
    const project_name = req.params.project_name;
    const deletedData = await monmodel1.findOneAndDelete({ project_name });
    
    if (!deletedData) {
    return res.status(404).json({ message: 'Data not found' });
    }
    else{
        res.json({ message: 'Data deleted successfully' });
    }
   
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    });


    //delete
app.delete('/delete1/:project_name', async (req, res) => {
    try{
        const data = await monmodel1.deleteOne({project_name : req.params.project_name});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//validation
app.get('/api/login', async(req, res) => {
  
const { Username, Password } = req.query;

const user = await monmodel.findOne({ Username });
   res.set({
  "Allow-access-Allow-Origin": '*'
    })
 if (user && user.Password === Password) {
   
res.json(true)
 } 
 else{
// 
  res.json(false)
 }
 });

//Update by ID Method
app.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await monmodel.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
        res.send(`Document has been updated..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }})

//Delete by ID Method
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await monmodel.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//listen
const port= 3001;
app.listen(port, () =>{
        console.log(`Server running on port ${port}`)
})

//search



    //

    app.get('/search1', async (req, res) => {
        try {
        const searchTerm = req.query.searchTerm; // Get the search term from the query string
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        
        // Search for documents that match the search term
        const data = await monmodel1.find({ project_name: regex });
        
        // Render the data in an HTML table
        res.send(data);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
        });
    