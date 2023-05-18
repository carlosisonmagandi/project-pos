// Retrieve data from local storage
const data = localStorage.getItem('allOrders');

// Check if data exists in local storage
if (data) {
  const records = JSON.parse(data);

  // Get the table body element
  const tableBody = document.querySelector('#datatablesSimple tbody');

  // Clear the existing table body
  tableBody.innerHTML = '';

  // Iterate over the records and create table rows
  records.forEach(record => {
    const row = document.createElement('tr');

    // Create table cells and populate with record data
    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = record.image;
    image.style.height='80px';
    image.style.height='80px';

    imageCell.appendChild(image);

    const orderNoCell = document.createElement('td');
    orderNoCell.textContent = record.orderNo;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = record.category;

    const titleCell = document.createElement('td');
    titleCell.textContent = record.title;

    const dateCell = document.createElement('td');
    dateCell.textContent = record.date;

    const qtyCell = document.createElement('td');
    qtyCell.textContent = record.quantity;

    

    // Append cells to the row
    row.appendChild(imageCell);
    row.appendChild(orderNoCell);
    row.appendChild(categoryCell);
    row.appendChild(titleCell);
    row.appendChild(dateCell);
    row.appendChild(qtyCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}