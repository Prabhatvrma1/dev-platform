const auth = (req, res, next) => { 
    console.log("auth middleware");
    const token = "xyz";
    const isadminauth = token === "xyz";
    if (!isadminauth) {
        return res.status(401).send("unauthorized");
    }
    else{
        next();
    }
};

module.exports = auth;