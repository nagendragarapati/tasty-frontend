import axios from 'axios'

const endpoint = 'http://localhost:4000'


export const signUp = async (userData) => {
    try {
        const response = await axios.post(`${endpoint}/signUp`, userData);
        return response;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            return { data: { message: err.response.data.message } };
        } else {
            return { data: { message: "An error occurred. Please try again." } };
        }
    }
};


export const getAllRestaurants = async () => {
    try {
        const response = await axios.get(`${endpoint}/getAllRestaurants`)
        return response
    }
    catch (err) {
        console.log("getRestaurants error", err.message)
        return err

    }
}

export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`${endpoint}/getRestaurantById/${id}`)
        return response
    }
    catch (err) {
        console.log("getRestaurantById error", err.message)
        return err
    }
}