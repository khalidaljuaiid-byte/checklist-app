const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCltlSCt4Z05MaYkLVUOWSEVD9DxyoXSsGuwZkvX9RmsWehyx-JKDCGkyDeSWh__J_7Ev16mfjcetN/pub?output=csv';

const departments = [
    "الإدارة التنفيذية",
    "إدارة المحتوى والمنشورات",
    "إدارة الإبداع",
    "إدارة المحتوى التعليمي",
    "إدارة المشاريع AIP Lab",
    "إدارة العلاقات العامة",
    "إدارة الأنشطة والفعاليات",
    "إدارة المتابعة والتطوير"
];

// Mock data for testing (remove when real URL is set)
const MOCK_DATA = `Timestamp,Name,Department
2023-10-27 10:00:00,أحمد,الإدارة التنفيذية
2023-10-27 10:05:00,سارة,إدارة الإبداع`;

async function fetchData() {
    try {
        // For now, we use mock data if the URL is the placeholder
        let csvText = "";
        if (GOOGLE_SHEET_CSV_URL.includes('YOUR_GOOGLE_SHEET')) {
            console.log("Using Mock Data");
            csvText = MOCK_DATA;
        } else {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            csvText = await response.text();
        }
        renderChecklist(csvText);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('checklist').innerHTML = '<div class="loading">حدث خطأ في تحميل البيانات</div>';
    }
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const data = [];

    // Helper to parse a CSV line correctly handling quotes
    const parseLine = (line) => {
        const result = [];
        let start = 0;
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                let field = line.substring(start, i).trim();
                if (field.startsWith('"') && field.endsWith('"')) {
                    field = field.substring(1, field.length - 1);
                }
                result.push(field);
                start = i + 1;
            }
        }
        // Add last field
        let lastField = line.substring(start).trim();
        if (lastField.startsWith('"') && lastField.endsWith('"')) {
            lastField = lastField.substring(1, lastField.length - 1);
        }
        result.push(lastField);
        return result;
    };

    // Skip header (index 0)
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const row = parseLine(lines[i]);

        // We expect: 0=Timestamp, 1=Name, 2=Department
        if (row.length >= 3) {
            data.push({
                name: row[1].trim(),
                department: row[2].trim()
            });
        }
    }
    return data;
}

function renderChecklist(csvText) {
    const responses = parseCSV(csvText);
    const container = document.getElementById('checklist');
    container.innerHTML = '';

    departments.forEach(dept => {
        // Find ALL responses for this department
        const deptResponses = responses.filter(r => r.department === dept || r.department.includes(dept));

        const isChecked = deptResponses.length > 0;

        // Create a list of names
        const responderNames = deptResponses.map(r => r.name).join('، ');

        const itemDiv = document.createElement('div');
        itemDiv.className = `checklist-item ${isChecked ? 'checked' : ''}`;

        itemDiv.innerHTML = `
            <div class="item-content">
                <span class="department-name">${dept}</span>
                ${isChecked ? `<span class="responder-name">${responderNames}</span>` : ''}
            </div>
            <div class="status-icon">
                ${isChecked ? '✓' : ''}
            </div>
        `;

        container.appendChild(itemDiv);
    });
}

// Initialize
fetchData();
