// const data = {
//     labels: ['Dairy', 'Meat and Seafood', 'Bakery', 'Frozen Foods','Beverages','Canned Goods','Snacks','Condiments','Breakfast Cereal','Pasta and Grains','Baking Supplies','Spices and Seasonings','Cleaning Supplies','Personal Care'],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };
  
//   const config = {
//     type: 'pie',
//     data: data
//   };
  
//   window.addEventListener('DOMContentLoaded', (event) => {
//     const ctx = document.getElementById('myChartItem').getContext('2d');
//     new Chart(ctx, config);
//   });
  
// Retrieve data from local storage
const localStorageData = JSON.parse(localStorage.getItem('allOrders'));

if (localStorageData && localStorageData.length > 0) {
  const categoryQuantityMap = new Map();

  // Iterate over the orders and calculate the total quantity for each category
  localStorageData.forEach((order) => {
    const { category, quantity } = order;
    if (category && quantity && !isNaN(quantity)) {
      if (categoryQuantityMap.has(category)) {
        const currentQuantity = categoryQuantityMap.get(category);
        categoryQuantityMap.set(category, currentQuantity + parseInt(quantity));
      } else {
        categoryQuantityMap.set(category, parseInt(quantity));
      }
    }
  });

  // Find the most selling category based on quantity
  let mostSellingCategory = null;
  let highestQuantity = -1;

  for (const [category, quantity] of categoryQuantityMap.entries()) {
    if (quantity > highestQuantity) {
      mostSellingCategory = category;
      highestQuantity = quantity;
    }
  }

  console.log('Most Selling Category:', mostSellingCategory);
  console.log('Quantity:', highestQuantity);

  // Prepare data for the pie chart
  const data = {
    labels: [...categoryQuantityMap.keys()],
    datasets: [{
      label: 'Category Quantities',
      data: [...categoryQuantityMap.values()],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        // Add more colors if needed
      ],
      hoverOffset: 4
    }]
  };

  // Chart configuration
  const config = {
    type: 'pie',
    data: data
  };

  // Render the chart
  window.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChartItem');
    if (ctx) {
      setTimeout(() => {
        new Chart(ctx, config);
      }, 0);
    } else {
      console.error('Unable to find canvas element with ID "myChartItem".');
    }
  });
} else {
  console.error('Invalid or missing data in local storage.');
}

