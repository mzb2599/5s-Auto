export const getOrderByUser = (ordersData: Array<{ order }>, id: Number) => {
  let sum = 0;
  ordersData.forEach((order) => {
    if (order.orderCustomerId === id) {
      sum += order.totalOrderValue - order.discount;
    }
  });
  return sum;
};

export const getOrderValueByMonth = (orders) => {
  const orderValuesByMonth = orders?.reduce((acc, order) => {
    const monthYear = new Date(order.orderDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }

    acc[monthYear] += order.totalOrderValue;
    return acc;
  }, {});

  return (
    orderValuesByMonth &&
    Object.keys(orderValuesByMonth)?.map((month) => ({
      month: month,
      revenue: orderValuesByMonth[month],
    }))
  );
};

export const getOrderCountByMonth = (orders) => {
  const orderValuesByMonth = orders?.reduce((acc, order) => {
    const monthYear = new Date(order.orderDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }

    acc[monthYear] += 1;
    return acc;
  }, {});

  return orderValuesByMonth && Object.keys(orderValuesByMonth)?.map((month) => ({
    month: month,
    orderCount: orderValuesByMonth[month],
  }));
};

export const formatMonth = (dateString) => {
  const date = new Date(dateString + "-01"); // Add -01 to ensure it's a valid date
  const options = { month: "short", year: "2-digit" };
  return date.toLocaleDateString("en-US", options); // "Jan 24"
};

export const sortByMonth = (data) => {
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return data?.sort((a, b) => {
    const [monthA, yearA] = a?.month?.split(" "); // e.g., ["Jan", "24"]
    const [monthB, yearB] = b?.month?.split(" ");

    // Create Date objects with year and month for comparison
    const dateA = new Date(`20${yearA}`, monthMap[monthA]); // Assuming 20XX format for year
    const dateB = new Date(`20${yearB}`, monthMap[monthB]);

    return dateA - dateB; // Sort in ascending order
  });
};

export const getOrderCountByArea = (orders) => {
  const orderValuesByArea = orders?.reduce((acc, order) => {
    const area = order?.customerAddress?.split(",")[1].trim(); // Extract the area from the customer address

    if (!acc[area]) {
      acc[area] = 0;
    }

    acc[area] += 1;
    return acc;
  }, {});

  return (
    orderValuesByArea &&
    Object.keys(orderValuesByArea)?.map((area) => ({
      Area: area,
      orderCount: orderValuesByArea[area],
    }))
  );
};

export const getCustomerId = (CustomerData, orderCustomerId) => {
  return CustomerData.find((customer) => orderCustomerId == customer.id);
};

export const getTotalOrderValue = (itemDetails) => {
  return itemDetails?.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
};
