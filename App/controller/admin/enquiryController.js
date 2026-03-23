let enquiryCreate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Enquiry Added"
    }
    res.send(obj)
}
let enquiryView=(req,res)=>{
    let obj={
        _status:true,
        _message:"Enquiry View"
    }
    res.send(obj)
}
let enquiryDelete=(req,res)=>{
    let obj={
        _status:true,
        _message:"Enquiry Delete"
    }
    res.send(obj)
}
let enquiryUpdate=(req,res)=>{
    let obj={
        _status:true,
        _message:"Enquiry Update"
    }
    res.send(obj)
}
let enquiryChangeStatus=(req,res)=>{
    let obj={
        _status:true,
        _message:"Enquiry ChangeStatus"
    }
    res.send(obj)
}

module.exports={enquiryCreate,enquiryView,enquiryDelete,enquiryUpdate,enquiryChangeStatus}