import multer from 'multer'

const public = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, '/public/img')
    },
    filename: function (req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
    
})

const upload = multer({storage: public})

export default upload