import axios from "axios";

const apiGetWp = "http://localhost:4000/api/wp/getAll";

const GetWpService = async () =>{
    const response = await axios.get(apiGetWp);
    return response.data.data;
}

export default GetWpService ;