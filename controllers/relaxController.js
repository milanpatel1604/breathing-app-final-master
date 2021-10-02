const RelaxTrack=require('../models/RelaxTracksModel');
const RelaxMelody=require('../models/relaxMelodiesModel');
const User=require('../models/userModel');

exports.allRelaxTracks=(req, res)=>{
    
    RelaxTrack.find({}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        console.log(docs);
        var result=[];
        var beginners=[];
        var self_calm=[];
        docs.forEach(async (element)=>{
            if(element.category_id.includes(process.env.RelaxBeginnersId)){
                await beginners.push({
                    title: element.title,
                    artist: element.artist,
                    image_url: process.env.DOMAIN + `/static/tracks/relaxImages/${element._id}.${element.image_extention}`,
                    track_id: element._id,
                    isPremium: element.isPremium
                })
            }
            if(element.category_id.includes(process.env.RelaxSelfCalmId)){
                await self_calm.push({
                    title: element.title,
                    artist: element.artist,
                    image_url: process.env.DOMAIN + `/static/tracks/relaxImages/${element._id}.${element.image_extention}`,
                    track_id: element._id,
                    isPremium: element.isPremium
                })
            }
        })
        await result.push({
            Beginners: beginners,
            'Self-Calm': self_calm,
        })
        return res.status(200).json({status:200, results: result});
    })
}

exports.getRelaxTrack= async (req, res)=>{
    const track_id=req.params.track_id;
    RelaxTrack.findOne({_id: track_id}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        return res.status(200).json({
            track_url: process.env.DOMAIN + `/static/tracks/relaxTracks/${docs._id}.${docs.track_extention}`,
            description: docs.description
        });
    })
}


exports.allRelaxMelodySounds=async (req, res)=>{
    RelaxMelody.find({}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        console.log(docs);
        var result=[];
        var Nature=[];
        var Musical=[];
        var Other=[];
        docs.forEach(async (element)=>{
            if(element.sound_category == 'Nature'){
                await Nature.push({
                    title: element.sound_title,
                    track_id: element._id,
                    track_url: process.env.DOMAIN + `/static/tracks/relaxTracks/${element._id}.${element.track_extention}`
                })
            }
            if(element.sound_category == 'Musical'){
                await Musical.push({
                    title: element.sound_title,
                    track_id: element._id,
                    track_url: process.env.DOMAIN + `/static/tracks/relaxTracks/${element._id}.${element.track_extention}`
                })
            }
            if(element.sound_category == 'Other'){
                await Other.push({
                    title: element.sound_title,
                    track_id: element._id,
                    track_url: process.env.DOMAIN + `/static/tracks/relaxTracks/${element._id}.${element.track_extention}`
                })
            }
        })
        await result.push({
            Nature: Nature,
            Musical: Musical,
            Other: Other
        })
        return res.status(200).json({status:200, results: result});
    })
}

//userspecific
exports.addRelaxFavorite= async (req, res)=>{
    const user_id=req.body.user_id;
    const track_id=req.body.track_id;
    const newFav= await User.updateOne({_id: user_id}, {
        $push: {
            relaxFavorite_id:track_id
        }
    }, (err, docs)=>{
        if(err){
            res.json(400).json({status:400, message:err});
        }
        else{
            res.status(201).json({status:201, message: "Added Successfully"});
        }
    })
}

exports.getRelaxFavorite=async (req, res)=>{
    const user_id=req.params.user_id;
    User.findOne({_id:user_id}, async (err, docs)=>{

        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        
        var favTracks=[];
        for(let i=0; i<docs.relaxFavorite_id.length; i++){
            await RelaxTrack.findOne({_id: docs.relaxFavorite_id[i]}, async (err, element)=>{
                if(err){
                    return res.status(400).json({status: 400, error: err});
                }
                await favTracks.push({
                    title: element.title,
                    artist: element.artist,
                    image_url: process.env.DOMAIN + `/static/tracks/relaxImages/${element._id}.${element.image_extention}`,
                    track_id: element._id,
                    isPremium: element.isPremium
                })
            })
        }
        await console.log(favTracks);
        return res.status(200).json({status:200, results: favTracks});
    })
}

exports.removeRelaxFavorite= async (req, res)=>{
    const user_id=req.body.user_id;
    const track_id=req.body.track_id;
    const rmvFav=await User.updateOne({_id: user_id}, {
        $pull: {
            relaxFavorite_id:track_id
        }
    }, (err, docs)=>{
        if(err){
            res.json(400).json({status:400, message:err});
        }
        else{
            res.status(202).json({status:202, message: "Removed Successfully"});
        }
    })
}