import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});

app.get("/autocomplete", async (req, res) => {
    console.log('req.headers: ', req.headers)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.location}&key=${process.env.APP_GOOGLE_KEY}`);
    const completion = await response.data
    console.log('req.body: ', req.query.location)
    //console.log('completion: ', await completion.data)
    res.json(completion)
})

app.get("/geolocation", async (req, res) => {
    console.log('req.body: ', req.query.cityname)
    
    try{
        if(req.query.cityname === undefined){
            throw new Error('City name is not defined')
        }
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.cityname}&key=${process.env.APP_GOOGLE_KEY}`);
        const city = await response.data.results[0].geometry.location
        console.log('completion: ', await response.data.results[0].geometry.location )
        res.json(city)
    } catch (error) {
        console.log('error: ', error)
    }
    // const city = await response.data.results[0].geometry.location
    // console.log('completion: ', await response.data.results[0].geometry.location )
    
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});