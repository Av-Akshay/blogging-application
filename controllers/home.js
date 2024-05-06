const handelShowHomePage = (req, res)=>{
res.render("home",{
    user:req.user
})
};

module.exports = {handelShowHomePage}

