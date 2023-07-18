const authService = require("../services/authService")
const jwt = require("jsonwebtoken");
exports.JWT_SECRET = "6LcOfFEfAAAAAIrUouTq65var1smmy733rl2IVQ6";

exports.signIn = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            throw new Error("SIGNIN :: parametres invalides");
        }
        const token = await authService.signIn(username, password);
        res.status(200).json(JSON.stringify(token));
    } catch (e) {
        console.error(e);
        res.status(500).json({e})
    }
}

exports.signUp = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new Error("SIGNUP :: Invalid parameters");
      }
      const token = await authService.signUp(username, password);
      res.status(200).json(JSON.stringify(token));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };

  exports.verifyToken = async (token) => {
    try {
      const tokenReplace = token.replaceAll("\"","")
      const decodedToken = await jwt.verify(tokenReplace,this.JWT_SECRET)
      return decodedToken;
    } catch (error) {
      console.log("ERREUR")
      return error;
    }
};
  