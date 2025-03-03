
module.exports = (orders = []) => {
  // Validate orders parameter
  if (!Array.isArray(orders)) {
      console.error('Invalid orders data:', orders);
      orders = []; // Set default empty array if invalid
  }

  const formatDate = (date) => {
      try {
          return new Date(date).toLocaleDateString();
      } catch (error) {
          return 'Invalid Date';
      }
  };

  const formatCurrency = (amount) => {
      const num = Number(amount);
      return `₹${isNaN(num) ? '0.00' : num.toFixed(2)}`;
  };
  
  const formatItems = (items) => {
      if (!Array.isArray(items)) return '';
      return items
          .map(item => `${item.name || ''} × ${item.quantity || 0}`)
          .join('<br/>');
  };

  const startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
  let filteredOrders = orders.filter(order=>new Date(order.orderDate)>=startDate && new Date(order.orderDate)<= endDate);

  const totalValue = filteredOrders.reduce((sum, order) => 
      sum + (Number(order.totalOrderValue) || 0), 0);
  const totalBalance = filteredOrders.reduce((sum, order) => 
      sum + (Number(order.balanceAmount) || 0), 0);

    
    return `
      <!DOCTYPE html>
      
      <html>
        <head>
          <meta charset="utf-8">
          <title>Monthly Orders Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 40px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #16a085;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f5f5f5;
            }
            .summary {
              text-align: center;
              margin-top: 20px;
              font-weight: bold;
            }
            .page-number {
              text-align: center;
              font-size: 12px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Monthly Orders Report</h1>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Items</th>
                <th>Total Value</th>
                <th>Payment</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
        
              ${filteredOrders.map(order => `
                <tr>
                  <td>${order.orderId}</td>
                  <td>${formatDate(order.orderDate)}</td>
                  <td>${order.orderCustomerId}</td>
                  <td>${formatItems(order.itemDetails)}</td>
                  <td>${formatCurrency(order.totalOrderValue)}</td>
                  <td>${order.paymentMethod}</td>
                  <td>${formatCurrency(order.balanceAmount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
  
          <div class="summary">
            Total Orders: ${filteredOrders.length} | Total Value: ${formatCurrency(totalValue)} | Outstanding Balance: ${formatCurrency(totalBalance)}
          </div>
  
          <div class="page-number">
            Page 1
          </div>
        </body>
      </html>
    `;
  };