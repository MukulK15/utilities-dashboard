# 🚀 Utilities Innovation Dashboard

A modern, interactive dashboard to track team innovation utilities and their cost savings impact. Built with vanilla HTML, CSS, and JavaScript with Excel integration.

## 📊 Features

### Key Metrics Display
- **Number of utilities created** - Total count of all innovation utilities
- **Total utilizations** - Sum of all times utilities were used
- **Total savings** - Calculated using the formula: `utilizations × savings_per_use`
- **Average savings** - Per utilization metric

### Visual Analytics
- **Year-wise Savings Chart** - Bar chart showing savings trend by creation year
- **Utilities Status Distribution** - Doughnut chart showing Active vs Inactive utilities

### Data Management
- **Detailed Data Table** - Shows all utilities with their metrics
- **Excel Integration** - Upload and process .xlsx, .xls, or .csv files
- **Automatic Calculations** - Real-time data processing and visualization

## 🚀 Quick Start

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Excel file with utility data (see format below)

### File Format

Your Excel file should contain the following columns:

| Column | Data Type | Example | Required |
|--------|-----------|---------|----------|
| Utility Name | Text | "Time Tracking Utility" | ✅ Yes |
| Created Date | Date (YYYY-MM-DD) | "2023-01-15" | ✅ Yes |
| Utilizations | Number | 45 | ✅ Yes |
| Savings Per Use | Currency/Number | 25 | ✅ Yes |

### Usage Steps

1. **Open the Dashboard**
   - Open `index.html` in your web browser
   - You'll see the dashboard with 4 empty metric cards

2. **Upload Your Excel File**
   - Click the "📁 Upload Excel File" button
   - Select your CSV or Excel file
   - File name will appear when selected

3. **Load and Visualize**
   - Click the "Load Data" button
   - Dashboard will instantly populate with:
     - Metric cards with calculated values
     - Year-wise savings bar chart
     - Active/Inactive utilities doughnut chart
     - Detailed utilities data table

4. **View Results**
   - Scroll through the dashboard to see all metrics
   - Charts are interactive (hover for details)
   - Table is sortable by clicking column headers

## 📁 Project Structure

```
utilities-dashboard/
├── index.html          # Main dashboard page
├── styles.css          # Dashboard styling
├── script.js           # Data processing and visualization
├── sample-data.csv     # Example data file
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (Vanilla)** - No frameworks, pure JS for data processing
- **XLSX Library** - Excel file parsing (CDN link)
- **Chart.js** - Interactive data visualization (CDN link)

## 📈 Calculations

### Total Savings Formula
```
Total Savings = Utilizations × Savings Per Use
```

For example:
- Utility A: 45 utilizations × $25 per use = **$1,125 total savings**
- Utility B: 78 utilizations × $35 per use = **$2,730 total savings**

### Year-wise Savings
The dashboard automatically groups utilities by their creation year and sums up total savings for each year. This shows the savings impact over time.

### Average Savings Per Utilization
```
Average Savings = Total Savings / Total Utilizations
```

### Utility Status
- **Active Utilities**: Those with 1 or more utilizations
- **Inactive Utilities**: Those with 0 utilizations

## 💡 Sample Data

A `sample-data.csv` file is included with example utilities:

| Utility | Created | Uses | Savings/Use | Total |
|---------|---------|------|-------------|-------|
| Time Tracking Utility | 2023-01-15 | 45 | $25 | $1,125 |
| Document Automation Tool | 2023-03-20 | 78 | $35 | $2,730 |
| Email Template Generator | 2023-06-10 | 120 | $15 | $1,800 |
| Code Snippet Library | 2023-08-05 | 65 | $20 | $1,300 |
| Meeting Scheduler | 2024-01-12 | 92 | $18 | $1,656 |
| Report Generator | 2024-02-28 | 58 | $30 | $1,740 |
| Data Validation Script | 2024-05-14 | 103 | $22 | $2,266 |
| API Integration Tool | 2024-07-22 | 45 | $40 | $1,800 |

**Total Utilities**: 8  
**Total Utilizations**: 606  
**Total Savings**: $14,417  
**Average Savings**: $23.77 per use

## 🎨 Design Features

### Visual Design
- **Modern Gradient Background** - Purple gradient for professional look
- **Card-based Layout** - Organized, easy-to-scan interface
- **Responsive Grid** - Adapts to different screen sizes
- **Color Coding**:
  - Blue (#667eea) - Primary metrics
  - Green (#48bb78) - Active/positive indicators
  - Gray (#cbd5e0) - Inactive/neutral indicators

### Interactive Elements
- **Hover Effects** - Cards lift on hover
- **Smooth Animations** - Slide-in effects on load
- **Interactive Charts** - Hover to see values
- **Disabled States** - Load button disabled until file selected

## 📱 Responsive Design

The dashboard works seamlessly on:
- **Desktop** (1920px and above) - Full layout with side-by-side charts
- **Tablets** (768px - 1024px) - Single column layout
- **Mobile** (320px - 767px) - Optimized for small screens

## 🐛 Troubleshooting

### File Won't Load
**Problem**: "Error reading file" message  
**Solution**: 
- Ensure file is in .xlsx, .xls, or .csv format
- Check that column names match exactly (case-sensitive)
- Try converting Excel to CSV if issues persist

### Data Not Displaying
**Problem**: Metric cards show "0" after loading  
**Solution**:
- Verify all required columns exist in spreadsheet
- Check date format is YYYY-MM-DD
- Ensure Utilizations and Savings Per Use are numeric values
- Remove any empty rows in Excel file

### Charts Not Showing
**Problem**: Empty chart areas  
**Solution**:
- Ensure you have at least one utility with data
- Check browser console (F12) for JavaScript errors
- Verify internet connection (CDN libraries)

### Calculations Look Wrong
**Problem**: Savings values don't match expected values  
**Solution**:
- Check that Savings Per Use is numeric (not formatted as text)
- Verify Utilizations column contains numbers
- Ensure no extra spaces or characters in cells

## 🔒 Privacy & Security

- **Client-side Processing**: All data is processed in your browser
- **No Server Upload**: Your Excel data is never sent to any server
- **No Data Storage**: Dashboard doesn't store any information
- **Completely Offline**: Can be used without internet connection*

*First load requires internet for CDN libraries; subsequent uses work offline

## 📝 Tips for Best Results

1. **Date Format**: Always use YYYY-MM-DD (e.g., 2024-01-15)
2. **Currency Values**: Use numeric values (25, not $25)
3. **Whole Numbers**: Utilizations should be integers
4. **Unique Names**: Give each utility a unique, descriptive name
5. **Annual Updates**: Update the spreadsheet regularly for accurate trends

## 🚀 Future Enhancements

Potential features for future versions:
- Export dashboard as PDF report
- Monthly savings trends (in addition to yearly)
- Top utilities ranking
- Savings goal tracking
- Data backup to local storage
- Team member contribution tracking
- Utility category grouping
- ROI calculations

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the sample data for format reference
3. Open browser console (F12) to see error messages
4. Ensure all files are in the same directory

## 📄 License

Free to use and modify for your team's needs.

## 🙏 Credits

Built with:
- [XLSX.js](https://github.com/SheetJS/sheetjs) - Excel file parsing
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Google Fonts - Segoe UI](https://fonts.google.com/) - Typography

---

**Happy tracking!** 🎉