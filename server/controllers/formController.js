const multer = require("multer");
const fs = require("fs");
const Form = require("./../models/formModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
})

exports.upload = multer({storage: storage});

exports.createFormData = async (req, res) => {
    try{
        // console.log(req.body, '>>>>>>>>>>>>>>>body');
        // console.log(req.file, '>>>>>>>>>>>>>>>file');
        
        let img = fs.readFileSync("uploads/" + req.file.filename);
        let encode_img = img.toString('base64');
        let file = {
            data: new Buffer(encode_img, "base64"),
            contentType: req?.file?.mimeType
        }


        const formData = {
            name: req?.body?.name,
            // file: {
            //     data: fs.readFileSync("uploads/" + req.file.filename),
            //     // data: req.file.buffer,
            //     contentType: req?.file?.mimeType
            // },
            file,
            fileName: req.file.filename
        }
        
        const newForm = await Form.create(formData)
        res.status(200).json({
            status: "success",
            data: {
                formData : newForm
            }
        })
    } catch (err) {
        console.log(err, '>>>>>>>>>>>>>>>>>>')
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}