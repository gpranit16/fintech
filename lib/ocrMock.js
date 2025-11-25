/**
 * Mock OCR Service
 * Simulates document text extraction using OCR
 * Returns realistic dummy data based on document type
 */

const names = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh'];
const employers = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL', 'Tech Mahindra'];
const cities = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'];

export const performOCR = async (files) => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const name = names[Math.floor(Math.random() * names.length)];
  const employer = employers[Math.floor(Math.random() * employers.length)];
  
  return {
    success: true,
    extractedData: {
      // From ID Document (Aadhaar/PAN)
      name,
      idNumber: `XXXX${Math.floor(1000 + Math.random() * 9000)}X`,
      dateOfBirth: `${Math.floor(1985 + Math.random() * 15)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-15`,
      address: `${Math.floor(100 + Math.random() * 900)}, ${cities[Math.floor(Math.random() * cities.length)]} - ${Math.floor(400001 + Math.random() * 99999)}`,
      
      // From Salary Slip
      employer,
      designation: ['Senior Engineer', 'Team Lead', 'Manager', 'Consultant'][Math.floor(Math.random() * 4)],
      monthlySalary: Math.floor(40000 + Math.random() * 60000),
      employeeId: `EMP${Math.floor(10000 + Math.random() * 90000)}`,
      
      // From Bank Statement
      accountNumber: `XXXX${Math.floor(1000 + Math.random() * 9000)}`,
      bankName: ['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'][Math.floor(Math.random() * 5)],
      averageBalance: Math.floor(50000 + Math.random() * 150000),
      recentTransactions: Math.floor(15 + Math.random() * 35),
    },
    confidence: 0.85 + Math.random() * 0.13, // 0.85 - 0.98
    documentsProcessed: Object.keys(files).length
  };
};

export const detectDocumentQuality = (file) => {
  // Mock document quality analysis
  const quality = 0.7 + Math.random() * 0.3;
  
  return {
    quality,
    issues: quality < 0.8 ? ['low_resolution', 'slight_blur'] : [],
    readable: quality > 0.75,
    tampered: Math.random() < 0.05 // 5% chance of tamper flag
  };
};
