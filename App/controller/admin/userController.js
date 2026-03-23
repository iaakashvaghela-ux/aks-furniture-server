let userAdd=(req,res)=>{
    let obj={
        _status:true,
        _message:"User Added"
    }
    res.send(obj)
}
let userView=(req,res)=>{
    let obj={
        _status:true,
        _message:"User View"
    }
    res.send(obj)
}
let userDelete=(req,res)=>{
    let obj={
        _status:true,
        _message:"User Delete"
    }
    res.send(obj)
}
let userUpdate=(req,res)=>{
    let obj={
        _status:true,
        _message:"User Update"
    }
    res.send(obj)
}
let userChangeStatus=(req,res)=>{
    let obj={
        _status:true,
        _message:"User ChangeStatus"
    }
    res.send(obj)
}

module.exports={userAdd,userView,userDelete,userUpdate,userChangeStatus}