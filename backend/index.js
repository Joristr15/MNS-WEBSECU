const connectDB = require('./mongo/mongoose');
const userCtrl = require('../backend/controllers/userController');
const postCtrl = require('../backend/controllers/postController');
const postService = require('../backend/services/postService');
const middleware = require('./middleware/middleware');
const sanitize = require('express-mongo-sanitize');
const cors = require('cors');
const express = require('express')
const app = express()
const port = 3000


connectDB();
app.use(express.json());
app.use(cors())
app.use(sanitize());
app.delete('/post/:id', postCtrl.deletePost);
app.put('/modifypost', postCtrl.modifyPost);
app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})
app.post('/savePost',postCtrl.savePost);
app.post('/signIn',userCtrl.signIn);
app.post('/signUp',userCtrl.signUp);
app.get('/postAll', (req, res) => {
    postService.getAllPosts().then((listePost) => {
      res.status(200).json(listePost);
    }).catch((error) => {
      res.status(500).json({ error: 'Erreur lors de la vérification du token' });
    });
});
app.get('/verifToken', (req, res) => {
  const token = req.headers.authorization;
  userCtrl.verifyToken(token)
    .then((decodedToken) => {
      res.status(200).json(decodedToken);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Erreur lors de la vérification du token' });
    });
});
app.put('/like', postCtrl.likePost);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})