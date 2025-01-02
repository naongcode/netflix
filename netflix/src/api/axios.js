import axios from "axios"

const instance = axios.create({
    baseURL : "https://api.themoivedb.org/3",
    params: {
        api_key: "17629fddd210feb41936f55e0eda83e4",
        language: "ko-KR",
    }
});

export default instance