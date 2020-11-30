const express=require("express")
const { createproduct, getproductbyslug, getproductdetailsbyid, getproductsofpage } = require("../controller/product")
//const { addcategory, getcat } = require("../controller/category")
const { requiresignin, adminMidddleware } = require("../middleware")
const router=express.Router()
const multer=require("multer")

const shortid=require("shortid")
const path=require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),"uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })


const upload=multer({storage})

router.post('/product/create',requiresignin,adminMidddleware,upload.array('productpicture'),createproduct)
router.get('/products/:slug',getproductbyslug)
router.get('/product/:productid',getproductdetailsbyid)
router.get('/productsofpage/:slug',getproductsofpage)

module.exports=router