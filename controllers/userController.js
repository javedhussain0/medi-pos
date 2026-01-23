import User from "../modules/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req , res)=>{
    const {name, email, password, phone, avatar,role} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "User already exists"});
        }   
        user = new User({
            name,
            email,
            password,
            phone,
            avatar,
            role
        });
        await user.save();
        res.status(201).json({message : "User registered successfully"});
    }catch(error){
        res.status(500).json({message : "Registration failed"});
        console.error(error);

    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Please register first" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const updateMyProfile = async ()=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body
    ).select("-password");
    res.json(updatedUser);

  }catch(err){
    console.log(err);
    res.status(200).json({
      message:"cant update your profile "
    })

  }
  
}
export const changePassword = async (res,req)=>{
  const{oldPassword, newPassword}= req.body;
  try{
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(401).json({
        message: "old password is incorrect"
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res.json({message:"password updated successfully"});

    }

  }catch(err){
    console.log(err);
    res.status(200).json({
      message: "cant change your password"
    })
  }
}
