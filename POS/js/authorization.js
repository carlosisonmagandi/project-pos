// Step 1: Retrieve the record from local storage
const record = localStorage.getItem('sessionValue');

// Step 2: Convert the record into a data structure (assuming it's an array)
const recordArray = JSON.parse(record);

// Step 3: Check if the recordArray is not empty
if (recordArray && recordArray.length > 0) {
  // Step 4: Get the last item (last row) from the array
  const lastRecord = recordArray[recordArray.length - 1];

  // Step 5: Access the session value from the last record
  const lastSessionValue = lastRecord.value;

  // Step 6: Use the lastSessionValue as needed
  console.log('Last session value:', lastSessionValue);
  if (lastSessionValue==='False'){
    window.location.href = 'login.html';
  }
  
} else {
  console.log('No records found in local storage.');
}