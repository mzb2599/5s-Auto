export const getCurrentMonthCustomers = (ordersData) => {
  // Use a Set to store unique customer IDs
  const uniqueCustomers = ordersData?.reduce((acc, order) => {
    // Check if the order is from the current month and year
    if (
      new Date(order.orderDate).getMonth() === new Date().getMonth() &&
      new Date(order.orderDate).getFullYear() === new Date().getFullYear()
    ) {
      // Add the customer to the accumulator if not already present
      if (!acc.has(order.orderCustomerId)) {
        acc.add(order.orderCustomerId);
      }
    }
    return acc;
  }, new Set());

  // Return the count of unique customers
  return uniqueCustomers?.size;
};

export const getLastOrderDate = (orderData, customerId) => {
  let customerOrders = orderData?.map(
    (order) => order.customerId === customerId
  );
  return customerOrders?.reduce((latest, currentOrder) => {
    // Compare dates by converting to Date objects
    const latestDate = new Date(latest.orderDate);
    const currentDate = new Date(currentOrder.orderDate);

    // Return the order with the later date
    return currentDate > latestDate ? currentOrder : latest;
  });

  // Return the orderDate of the latest order
  //return customerOrders?.orderDate;
};
