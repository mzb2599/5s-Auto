import React from "react";
import PastCustomers from "./PastCustomers.tsx";
import { useParams } from "react-router-dom";
const AreawiseCustomer=()=>{
    const Areaname=useParams();
    return(
        <PastCustomers area={Areaname.area}/>
    )
}

export default AreawiseCustomer;