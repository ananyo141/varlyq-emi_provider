import axios from "./axios";
import Endpoints from "./Endpoints";

export default class Network{

    static async  login(userName,password)
    {
        var req={"userName":userName,"password":password};
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(Endpoints.loginUrl,JSON.stringify(req), requestOptions);
        return response.data;
    }

    static async getMeta() {
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.get(Endpoints.metaUrl, requestOptions);
        return response.data;
    }


    static async fetchUser(userId,userType,page,pageSize)
    {
        var req={"page":page,"pageSize":pageSize,"userType":userType};
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(Endpoints.fetchUserUrl+"/"+userId, req,requestOptions);
        return response.data;
    }

    static async createUser(body)
    {
        var req=body;
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(Endpoints.createUserUrl,req, requestOptions);
        return response.data;

    }

    static async blockUnblockUser(id) {
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.get(Endpoints.blockUnblockUserUrl+"/"+id, requestOptions);
        return response.data;
    }

    static async editUser(formData, userId) {
        var req=formData;
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(Endpoints.editUserUrl+"/"+userId,req, requestOptions);
        return response.data;
    }

    static async fetchUserDetail(userId)
    {
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.get(Endpoints.fetchUserDetailUrl+"/"+userId, requestOptions);
        return response.data;
    }

    static async transferPoints(transferFromId,transferToId,description,points) {
        var req={"points":points,"transferToId":transferToId,"transferFromId":transferFromId,"description":description}
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await axios.post(Endpoints.transferPointsUrl,req, requestOptions);
        return response.data;
    }

    static async withdrawPoints(withdrawFromId, withdrawToId, description, points) {
        var req={"points":points,"withdrawToId":withdrawToId,"withdrawFromId":withdrawFromId,"description":description}
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },

        };
        const response = await axios.post(Endpoints.withdrawPointsUrl,req, requestOptions);
        return response.data;
    }


    static async fetchTransactions(page, pageSize, userId) {
        var req={"page":page,"pageSize":pageSize};
        let requestOptions = {
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json'
            },

        };
        const response = await axios.post(Endpoints.fettchTransactionUrl+"/"+userId,req, requestOptions);
        return response.data;
    }
}
