const MeditationTrack=require('../models/MeditationTracksModel');
const User=require('../models/userModel');
const LiveTrack=require('../models/LiveTracksModel');

const dotenv = require("dotenv").config();


exports.allMeditationTracks=async (req, res)=>{
    
    MeditationTrack.find({}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        var result=[];
        var beginners=[];
        var stress=[];
        docs.forEach(async (element)=>{
            if(element.category_id.includes(process.env.MeditationBeginnersId)){
                await beginners.push({
                    title: element.title,
                    artist: element.artist,
                    image_url: process.env.DOMAIN + `/static/tracks/meditationImages/${element._id}.${element.image_extention}`,
                    track_id: element._id,
                    isPremium: element.isPremium
                })
            }
            if(element.category_id.includes(process.env.MeditationStressId)){
                await stress.push({
                    title: element.title,
                    artist: element.artist,
                    image_url: process.env.DOMAIN + `/static/tracks/meditationImages/${element._id}.${element.image_extention}`,
                    track_id: element._id,
                    isPremium: element.isPremium
                })
            }
        })
        await result.push({
            Beginners: beginners,
            Stress:stress,
        })
        return res.status(200).json({status:200, results: result});
    })
}

exports.getMeditationTrack= async (req, res)=>{
    const track_id=req.params.track_id;
    MeditationTrack.findOne({_id: track_id}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        return res.status(200).json({
            track_url: process.env.DOMAIN + `/static/tracks/meditationTracks/${docs._id}.${docs.track_extention}`,
            description: docs.description
        });
    })
}


// Daily live meditation
exports.allLiveTracks=(req, res)=>{
    
    LiveTrack.find({}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        console.log(docs);
        var result=[];
        docs.forEach(async (element)=>{
            await result.push({
                title: element.title,
                artist: element.artist,
                image_url: process.env.DOMAIN + `/static/tracks/liveImages/${element._id}.${element.image_extention}`,
                date: element.date,
                startTime: element.startTime,
                endTime: element.endTime,
                track_duration: element.track_duration,
                track_id: element._id,
            })
        })
        return res.status(200).json(result);
    })
}

exports.getLiveTrack= async (req, res)=>{
    const track_id=req.params.track_id;
    LiveTrack.findOne({_id: track_id}, async (err, docs)=>{
        if(err){
            return res.status(400).json({status: 400, error: err});
        }
        return res.status(200).json({
            track_url: process.env.DOMAIN + `/static/tracks/liveTracks/${docs._id}.${docs.track_extention}`,
            description: docs.description
        });
    })
}

//userspecific
exports.addMeditationFavorite= async (req, res)=>{
    const user_id=req.body.user_id;
    const track_id=req.body.track_id;
    const newFav= await User.updateOne({_id: user_id}, {
        $push: {
            meditationFavorite_id:track_id
        }
    })
    res.json(newFav);
}