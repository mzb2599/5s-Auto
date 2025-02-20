import { useContext } from "react";
import { CustomerContext } from "../../context/Customer";

export const getCustomerNameById = (customerId: string): string => {
    const {CustomerData} = useContext(CustomerContext);
    const customerFound = CustomerData.find((customer) => customer.id === customerId);
    return customerFound ? customerFound.name : "Customer Not Found";
};