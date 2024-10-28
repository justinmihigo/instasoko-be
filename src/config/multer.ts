import { Request } from "express";
import multer from "multer"

const storage= multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
    // destination:function(req, file, cb){
    //     cb(null, './public/')
    // }
});

const fileFilter= (req:Request,file:any,cb:any)=>{
    if(
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp' || file.mimetype === 'image/gif' || file.mimetype==='image/svg' || file.mimetype==='image/tiff' ){
        cb(null,true)
    }else{
        cb({message:'Unsupported file type'}, false)
    }
}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter,
})

export default upload;