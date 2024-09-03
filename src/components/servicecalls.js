import axios from 'axios'

const endpoint='http://localhost:4000'

export const getAllRestaurants=async()=>{
    try{
        const response=await axios.get(`${endpoint}/getAllRestaurants`)
        return response
    }
    catch(err){
        console.log("getRestaurants error",err.message)
        return err

    }
}