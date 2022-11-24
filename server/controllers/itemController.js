const Item = require("./../models/itemsModel");

exports.createItem = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                item: newItem
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        })
    }
}

exports.getAllItems = async (req, res) => {
    // console.log(req.query, '>>>>>>>>>>>>')
    try{
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page-1)*limit;

        const totItems = await Item.countDocuments();
        const items = await Item.find().skip(skip).limit(limit).sort('name')

        res.status(200).json({
            status: "success",
            length: items.length,
            results: totItems,
            data: {
                items
            }
        })
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}