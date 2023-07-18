const postService = require("../services/postService");
const post = require("../models/post");

exports.savePost = async (req, res) => {
  try {
    const { idcreator, datepost, textpost } = req.body;
    if (!idcreator || !datepost || !textpost) {
      throw new Error("SAVEPOST :: paramètres invalides");
    }
    const newPost = {
      idcreator,
      datepost,
      textpost,
    };
    console.log(newPost);
    const createdPost = await postService.createPost(newPost); 
    return createdPost;
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Vérifier si le post existe
    const existingPost = await postService.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post introuvable' });
    }

    const userIdIndex = existingPost.arraylike.indexOf(userId);
    if (userIdIndex === -1) {
      console.log("like");
      existingPost.arraylike.push(userId);
    } else {
      console.log("dislike");
      existingPost.arraylike.splice(userIdIndex, 1);
    }

    const updatedPost = await existingPost.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du like au post' });
  }
};

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      // Vérifier si le post existe
      const existingPost = await postService.findById(postId);
      if (!existingPost) {
        return res.status(404).json({ error: 'Post introuvable' });
      }
  
      // Supprimer le post
      await postService.deletePost(postId);
      res.status(200).json({ message: 'Post supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du post' });
    }
  };
  exports.modifyPost = async (req, res) => {
    try {
        const { postId, textpost } = req.body;
        console.log(textpost,postId)
      // Vérifier si le post existe
      const existingPost = await postService.findById(postId);
      if (!existingPost) {
        console.log("vide")
        return res.status(404).json({ error: 'Post introuvable' });
      }
      existingPost.textpost = textpost;
      const updatedPost = await postService.updatePost(postId,existingPost);
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la modification du post' });
    }
  };