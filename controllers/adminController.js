import User from "../modules/User";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = async (res,req)=>{
  const { name, email, password, phone, avatar, role}= req.body;
  try{
    let admin = await Admin.findOnde({email});
    if(admin){
      return res.status(201).json({
        message: "admin already registered"
      });
    }
    admin = new Admin({
      name,
      email,
      password,
      phone,
      avatar,
      role
    });
    await Admin.save();
    res.status(202).json({message: "Admin registered successfully"});
  }catch(error){
    res.status(402).json({message : "Registration failed"});
    console.eror(error);
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





export const getAllUsers = async(res , req)=>{
  
  try{
    const {page =1, limit = 10, search = ""}= req.query;
  const query={
    $or : [
      
        {name :{$regex : search, $options : "i"}},
        {email :{$regex : search, $options : "i"}},
        {mobile :{$regex : search, $options : "i"}},
      
    ]
    
  }
  const users = await User.find(query)
  .select("-password")
  .skip((page-1)*limit) 
  .limit(Number(limit))
  .sort({createdAt : -1});
  const total = await User.countDocuments(query);
  res.status(200).json({

    total,
    page : Number(page),
    totalPages : Math.ceil(total/limit),
    users,
  });

  }catch(eror){
    console.log(eror);
    res.status(404).josn({
      message : "failed to fetch  users of the medipos"
    })
  }
}