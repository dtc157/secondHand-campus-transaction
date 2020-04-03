module.exports =app=>{
    const express = require("express")
    const router =express.Router({
        mergeParams:true
    })

    //创建分类
    router.post('/',async (req,res)=>{

        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //根据id更新指定类
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    //根据id删除
    router.delete('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:"true",
            message:"删除成功"
        })
    })

    //查询分类列表
    router.get('/',async (req,res)=>{
        const queryOptions ={}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    //根据id查询分类信息
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    //设置通用类型接口，通过读取resource使用中间件暴露对应数据库模型及接口名
    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)//未安装--遵循db数据库单数，接口复数转化
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)


    //multer专门处理上传文件,未安装
    const multer = require('multer')
    const upload = multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
        const file = req.file
        file.url=`http://localhost:30000/uploads/${file.filename}`
        res.send(file)
    })

}