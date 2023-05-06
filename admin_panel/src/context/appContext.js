import { createContext, useEffect, useState } from "react";
import React from "react";
import Network from "../network/Network";

const AppContext = React.createContext({});

const token = localStorage.getItem("accessToken");
const id = localStorage.getItem('userId');

export const AppProvider = ({children}) => {

    const getMeta = async () => {
        const res = await Network.getMeta();
        console.log(res);
        setStateList(res.states);
    }

    useEffect(() => {
        getMeta();
        initialize();
    }, [])

    function initialize() {
        setUser(JSON.parse(localStorage.getItem("user")));
        setUserId(localStorage.getItem("userId"));

    }

    const [userId, setUserId] = useState(id);
    const [user, setUser] = useState({});
    const [stateList, setStateList] = useState([]);
    return (
        <AppContext.Provider
            value={{
                userId,
                stateList,
                setUserId,
                setUser,
                user
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
