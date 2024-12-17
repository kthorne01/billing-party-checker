const form = document.getElementById('consolidationForm');
const resultDiv = document.getElementById('result');
const nonOrgResultDiv = document.getElementById('nonOrgResult'); // Use the existing div

// Event listener for the "Check Invoice Issuer" button
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  // Use input date and ensure UTC processing
  const inputDate = document.getElementById('consolidationDate').value;
  const consolidationDate = new Date(inputDate + 'T00:00:00Z'); // Force UTC time
  
  const day = consolidationDate.getUTCDate(); // Use UTC to avoid time zone issues
  
  // Cutoff day logic
  const cutoffDay = 20; // Cutoff is the 20th

  // Logic for determining the message
  let message;
  if (day <= cutoffDay) {
    message = `We will invoice the customer for this month, and the customer does not need to pay AWS directly for any invoices issued after this date while onboarded with us.`;
  } else {
    message = `AWS will invoice the customer for this month, and we will take over the customer's AWS billing beginning with next month's billing period.`;
  }

  // Display the result
  resultDiv.textContent = message;
  nonOrgResultDiv.textContent = ''; // Clear the Non-Org result if displayed previously
});

// Event listener for the "Non-Org Import Invoicing Information" button
const nonOrgButton = document.getElementById('nonOrgImportButton');

nonOrgButton.addEventListener('click', function () {
  const nonOrgMessage = `Customers that onboard via Non-Org Import will always receive two invoices for the month they onboard.<br><br>
  One invoice will be from AWS for the time of the month before the customer onboarded with us.<br><br>
  The second invoice will be from us for the remaining days in the month after they joined the new organization we created for them.`;

  // Display the Non-Org Import result
  nonOrgResultDiv.innerHTML = nonOrgMessage; // Use innerHTML to render <br> tags
  resultDiv.textContent = ''; // Clear the Check Invoice Issuer result
});
