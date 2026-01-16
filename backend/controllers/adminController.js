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