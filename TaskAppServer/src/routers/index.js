const { Router } = require('express');
const router = Router();

const schemaTask = require('../config/schema');

router.get('/',async(req,res) => {
  const task = await schemaTask.find();
  res.json(task);
});

router.get('/get',async(req,res)=>{
  const task = await schemaTask.find();
  res.json(task);
});

router.get('/getInfo/:id',async(req,res)=>{
  const { id } = req.params;
  const task = await schemaTask.findById(id);
  res.json(task);
});

router.post('/add',async(req,res)=>{
  const { title, description } = req.body;
  const task = new schemaTask({title, description});
  const rs = await task.save();
  res.json(rs);
});

router.put('/edit/:id',async(req,res)=>{
  const { id } = req.params;
  const rs = await schemaTask.update({_id:id},req.body);
  res.json(rs);
});

router.put('/updateStatus/:id',async(req,res)=>{
  const { id } = req.params;
  const task = await schemaTask.findById(id);
  task.status = !task.status;
  const rs = await task.save();
  res.json(rs);
});

router.delete('/delete/:id',async(req,res)=>{
  const { id } = req.params;
  const rs = await schemaTask.remove({_id: id});
  res.json(rs);
});

module.exports = router;