const AdminModel = require('../Models/Admin');

// Add Admin - http://localhost:8000/api/admin/addadmin
exports.Addadmin = async (req, res, next) => {
    let admin = await AdminModel.findOne({Userid:req.body.Userid});
    if(admin){
        return res.status(400).json({success: false,message:"Admin already exists"});
        }
    try {
        admin = await AdminModel.create(req.body)
        res.status(200).json({
            success: true,
            message: "Admin Added Successfully",
            admin
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            Err: error
        })
    }
}


//Dashboard - http://localhost:8000/api/admin/dashboard
exports.AdminDashboard = async (req, res, next) => {
    try {
        let user = await AdminModel.findOne({ Userid: req.params.id });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Admin Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Admin Dashboard",
            user
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
