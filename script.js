// Global variables
let excelFile = null;
let chartInstances = {
    savingsChart: null,
    statusChart: null
};

// File input handler
document.getElementById('excelFile').addEventListener('change', function(e) {
    excelFile = e.target.files[0];
    if (excelFile) {
        document.getElementById('fileStatus').textContent = `✓ File selected: ${excelFile.name}`;
        document.getElementById('loadBtn').disabled = false;
    }
});

// Load data button
document.getElementById('loadBtn').addEventListener('click', loadData);

/**
 * Load and process Excel data
 */
function loadData() {
    if (!excelFile) {
        alert('Please select a file first');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            if (jsonData.length === 0) {
                alert('No data found in Excel file');
                return;
            }

            // Process the data
            const processedData = processData(jsonData);
            
            // Update dashboard
            updateDashboard(processedData);
            
            document.getElementById('fileStatus').textContent = `✓ Data loaded successfully!`;
        } catch (error) {
            alert(`Error reading file: ${error.message}`);
            console.error(error);
        }
    };
    reader.readAsArrayBuffer(excelFile);
}

/**
 * Process raw Excel data
 */
function processData(rawData) {
    const utilities = rawData.map(row => {
        const utilizations = parseFloat(row['Utilizations'] || row['utilizations'] || 0);
        const savingsPerUse = parseFloat(row['Savings Per Use'] || row['savings per use'] || row['Savings Per Use ($)'] || 0);
        const createdDate = row['Created Date'] || row['created date'] || new Date().toISOString().split('T')[0];
        
        return {
            name: row['Utility Name'] || row['utility name'] || 'Unknown',
            createdDate: new Date(createdDate),
            utilizations: utilizations,
            savingsPerUse: savingsPerUse,
            totalSavings: utilizations * savingsPerUse
        };
    });

    // Calculate totals
    const totalUtilitiesCreated = utilities.length;
    const totalUtilizations = utilities.reduce((sum, u) => sum + u.utilizations, 0);
    const totalSavings = utilities.reduce((sum, u) => sum + u.totalSavings, 0);
    const averageSavings = totalUtilizations > 0 ? totalSavings / totalUtilizations : 0;

    // Group by year
    const savingsByYear = {};
    utilities.forEach(utility => {
        const year = utility.createdDate.getFullYear();
        if (!savingsByYear[year]) {
            savingsByYear[year] = 0;
        }
        savingsByYear[year] += utility.totalSavings;
    });

    // Count utilities by status (based on utilization)
    const activeUtilities = utilities.filter(u => u.utilizations > 0).length;
    const inactiveUtilities = utilities.filter(u => u.utilizations === 0).length;

    return {
        utilities,
        totalUtilitiesCreated,
        totalUtilizations,
        totalSavings,
        averageSavings,
        savingsByYear,
        activeUtilities,
        inactiveUtilities
    };
}

/**
 * Update all dashboard elements
 */
function updateDashboard(data) {
    // Update metric cards
    document.getElementById('utilitiesCreated').textContent = data.totalUtilitiesCreated;
    document.getElementById('totalUtilizations').textContent = data.totalUtilizations.toLocaleString();
    document.getElementById('totalSavings').textContent = `$${data.totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    document.getElementById('averageSavings').textContent = `$${data.averageSavings.toFixed(2)}`;

    // Update charts
    updateCharts(data);

    // Update table
    updateTable(data.utilities);
}

/**
 * Update charts
 */
function updateCharts(data) {
    updateSavingsChart(data.savingsByYear);
    updateStatusChart(data.activeUtilities, data.inactiveUtilities);
}

/**
 * Update year-wise savings chart
 */
function updateSavingsChart(savingsByYear) {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (chartInstances.savingsChart) {
        chartInstances.savingsChart.destroy();
    }

    const years = Object.keys(savingsByYear).sort();
    const savings = years.map(year => savingsByYear[year]);

    chartInstances.savingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Savings ($)',
                data: savings,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#4facfe'
                ],
                borderColor: '#667eea',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Savings ($)'
                    }
                }
            }
        }
    });
}

/**
 * Update status chart (Active vs Inactive utilities)
 */
function updateStatusChart(activeCount, inactiveCount) {
    const ctx = document.getElementById('statusChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (chartInstances.statusChart) {
        chartInstances.statusChart.destroy();
    }

    chartInstances.statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                data: [activeCount, inactiveCount],
                backgroundColor: [
                    '#48bb78',
                    '#cbd5e0'
                ],
                borderColor: 'white',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Update data table
 */
function updateTable(utilities) {
    const tbody = document.querySelector('#dataTable tbody');
    
    if (utilities.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-message">No utilities found</td></tr>';
        return;
    }

    // Sort utilities by name
    utilities.sort((a, b) => a.name.localeCompare(b.name));

    tbody.innerHTML = utilities.map(utility => `
        <tr>
            <td><strong>${utility.name}</strong></td>
            <td>${utility.createdDate.toLocaleDateString('en-US')}</td>
            <td>${utility.utilizations}</td>
            <td>$${utility.savingsPerUse.toFixed(2)}</td>
            <td><strong>$${utility.totalSavings.toFixed(2)}</strong></td>
        </tr>
    `).join('');
}

// Initial state
document.getElementById('loadBtn').disabled = true;