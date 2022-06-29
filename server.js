const express = require('express');
const app = express();
const { User, Story } = require('./db');
const path = require('path');
const { seedDatabase } = require('./seeder');

app.use('/dist', express.static('dist'));
app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
//get the list of users without bio
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['bio']
      } 
    }));
  }
  catch(ex){
    next(ex);
  }
});
//get a specific user with bio
app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});
//get the list of stories associated to the user with the id
app.get('/api/users/:id/stories', async(req, res, next)=> {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.send(stories);
  }
  catch(ex){
    next(ex);
  }
});
//create a user
app.post('/api/users', async(req, res, next) => {
  try{
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});
//delete the user with the id
app.delete('/api/users/:id', async(req, res, next) => {
  try{
    const userDeleted = await User.findByPk(req.params.id);
    await userDeleted.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex)
  }
});
//create a story with the specific user
app.post('/api/users/:id/stories', async(req, res, next) =>{
  try{
    res.status(201).send(await Story.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});
//get specific story
app.get('/api/stories/:id', async(req, res, next) => {
  try{
    const story = await Story.findByPk(req.params.id);
    res.send(story);
  }
  catch(ex){
    next(ex)
  }
});
//delete a story from a specific user
app.delete('/api/stories/:id', async(req, res, next) => {
  try{
    const storyDeleted = await Story.findByPk(req.params.id);
    await storyDeleted.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});
//update a story from a specific user
app.put('/api/stories/:id', async(req, res, next) => {
  try{
    const updateStory = await Story.findByPk(req.params.id);
    await updateStory.update(req.body);
    res.sendStatus(204)
  }
  catch(ex){
    next(ex)
  }
});
//handle errors
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err)
// });
// //error handling endware
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(err.message || 'Internal Server Error');
// });

const port = process.env.PORT || 3000;
const setup = async() => {
  await seedDatabase();
  app.listen(port, ()=> console.log(`listening on port ${port}`));
};
setup();
