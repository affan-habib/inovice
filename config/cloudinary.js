const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "green-valley-grocery",
    api_key: "464957263269397",
    api_secret: "z6amayFJIvPraCDy6hxxt3e4Zq0",
})

exports.uploads = (file, folder) =>{
    return new Promise(resolve=>{
        cloudinary.uploader.upload(file, (result)=>{
            resolve({
                url: result.url,
                public_id: result.public_id
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
}