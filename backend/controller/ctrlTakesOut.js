const TakeOut = require('../models/takeoutModel');

// fetch takes out by given query. If there is no query, get all
module.exports.fetchTakesOut = async (req, res) => {
    try { 
        const takesOut = await TakeOut.find({});
        res.send(takesOut);
    } catch (error) {
        res.status(404).send({nessage: 'Takes Out Not Found. Error: ' + error.message});
    }
}
 
module.exports.addTakeOut = async (req, res) => {
    try {  
        const takeOffUnit = req.body;
        const findQuery = {
            week_start: {
                $lte: takeOffUnit.week_start,  
            },
            week_end: {
                $lte: takeOffUnit.week_end, 
            },
        }; 
        // check if the take off is registered  
        const exist = await TakeOut.find(findQuery);  
        if (exist.length > 0) { // add product to week take off 
            const updatedTO = await TakeOut.findOneAndUpdate(findQuery, {
                $push: {
                    products: {$each: takeOffUnit.products}
                }
            }); 
            res.send(updatedTO);
        } else { // register the take off 
            const takeOff = await new TakeOut(req.body);     
            const tkoff = await takeOff.save();      
            res.send(tkoff);
        }
    } catch (error) {
        res.status(404).send({message: 'Can Not Add Take Off. Error: ' + error.message});
    }
}