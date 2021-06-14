import React, { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
    const [admin,setAdmin]=useState({});

    return (
        <AdminContext.Provider value={[admin,setAdmin]}>
            {props.children}
        </AdminContext.Provider>

    );
} 