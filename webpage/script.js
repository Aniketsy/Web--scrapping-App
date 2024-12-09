const form = document.getElementById('scrape-form');
const dataOutput = document.getElementById('data-output');
const resultsDiv = document.getElementById('results');
const downloadLink = document.getElementById('download-link');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const selectors = document.getElementById('selectors').value;
    const outputFormat = document.getElementById('output-format').value;

    // Send data to server (e.g., using AJAX or fetch API)
    fetch('/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, selectors, outputFormat })
    })
    .then(response => response.json())
    .then(data => {
        resultsDiv.style.display = 'block';

        if (outputFormat === 'csv') {
            // Convert data to CSV
            const csvData = convertToJson(data);
            dataOutput.textContent = csvData;

            // Set download link for CSV
            downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
            downloadLink.download = 'scraped_data.csv';
        } else if (outputFormat === 'json') {
            // Display JSON data
            dataOutput.textContent = JSON.stringify(data, null, 2); // Pretty-print
        } else {
            // Display plain text
            dataOutput.textContent = data.join('\n');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while scraping.');
    });
});

// Function to convert JSON data to CSV (optional)
function convertToJson(data) {
    // Implement CSV conversion logic based on the structure of your scraped data
    // You can use libraries like Papa Parse for CSV conversion
    // ...
}
