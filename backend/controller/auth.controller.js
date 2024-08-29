const Usermodel = require("../dbModels/Usermodel");
const bcryptjs = require("bcryptjs");
const generateToken = require("../JWT-token/generateToken");

//SIGN UP USER
const signup = async (req, res) => {
  try {
    const { name, userName, password, confirmPassword } = req.body;

    //checking for passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match" });
    }

    const user = await Usermodel.findOne({ userName });
    //checking for username duplicate
    if (user) {
      return res.status(400).json({ error: "Username already exits" });
    }

    //hashing the user password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public`;

    const newUser = new Usermodel({
      name: name,
      userName: userName,
      password: hashPassword,
      profilePic: profilePic,
    });

    if (newUser) {
      // Generate JWT token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }

    console.log("user created successfully =>", newUser._id);
  } catch (err) {
    console.log(`there was an error => ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//LOGIN USER
const login = async (req, res) => {
  try {
    const { userName, password } = await req.body;

    const user = await Usermodel.findOne({ userName: `${userName}` });

    console.log(user);
    //checking password
    const checkPass = await bcryptjs.compare(password, user?.password || "");

    if (!user.userName || !checkPass) {
      return res.status(400).json({ error: "invalid username or password" });
    }

    generateToken(user._id, res);

    console.log(`user logged in successfully`);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log(`there was an error while logging in=> ${err}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//LOGOUT USER
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "`logged out successfully" });
  } catch (err) {
    console.log(`there was an error while logging out=> ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
