# 🚀 FINTECH Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1️⃣ Install Dependencies
Open terminal in the FINTECH folder and run:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- Framer Motion (animations)
- TailwindCSS (styling)
- React Hook Form
- React Dropzone
- Canvas Confetti
- Lucide React (icons)

### 2️⃣ Add Flowchart Image
**IMPORTANT**: Place your flowchart image at:
```
public/flowchart.png
```

You can download the flowchart from your Canva project and save it as `flowchart.png` in the `public` folder.

### 3️⃣ Run Development Server
```bash
npm run dev
```

The app will start at: **http://localhost:3000**

## 📱 Application Pages

### Landing Page (/)
- Beautiful hero section with animated flowchart
- Feature highlights
- Statistics display
- CTA button to start application

### Apply Page (/apply)
- **Step 1**: Personal information form
  - Name, Email, Phone, Loan Amount
- **Step 2**: Document uploads
  - ID Document (Aadhaar/PAN)
  - Salary Slip
  - Bank Statement
  - Selfie photo
- Drag & drop file upload with validation

### Result Page (/result)
- Real-time processing animation
- 5 processing steps:
  1. Document Upload ✓
  2. OCR Processing 🔍
  3. KYC Verification 👤
  4. Risk Assessment 📊
  5. Final Decision ✅
- Detailed results with:
  - Risk gauge (0-100 score)
  - KYC verification status
  - Fraud detection results
  - Loan decision card
  - Extracted data display

### Admin Dashboard (/admin)
- View all applications
- Statistics overview
- Filter by status:
  - All
  - Approved
  - Rejected
  - Pending
- Expandable rows with details
- Direct link to full reports

## 🎯 Testing the App

### Test Application Flow:
1. Go to http://localhost:3000
2. Click "Start Application"
3. Fill in personal details:
   - Name: "Rajesh Kumar"
   - Email: "rajesh@example.com"
   - Phone: "+91 9876543210"
   - Loan Amount: "500000"
4. Click "Next"
5. Upload 4 documents (any image/PDF files)
6. Click "Submit Application"
7. Watch the real-time processing
8. See your decision!

### View Admin Dashboard:
- Go to http://localhost:3000/admin
- See all applications
- Filter by status
- Click on any row to expand details

## 🎨 Features Showcase

### Animations
- ✨ Smooth page transitions
- 🎭 Framer Motion micro-interactions
- 📊 Animated risk gauge
- 🎉 Confetti on approval
- 💫 Loading spinners and progress bars

### Mock Services
- **OCR**: Extracts realistic dummy data
- **KYC**: Face match, liveness, ID verification
- **Fraud Detection**: Document tampering, metadata checks
- **Risk Scoring**: 0-100 scale with breakdown
- **Auto Decision**: Approval/rejection logic

### Decision Rules
| Risk Score | Decision | Loan Offer |
|-----------|----------|------------|
| 70-100 | ✅ Instant Approval | High amount, low interest |
| 40-69 | ⚠️ Need Documents | Conditional approval |
| 0-39 | ❌ Rejection | Improvement needed |

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"
5. Done! ✅

No environment variables or database setup required!

## 🔧 Customization

### Change Mock Data
Edit these files to customize generated data:
- `lib/ocrMock.js` - OCR extracted data
- `lib/kycMock.js` - KYC verification logic
- `lib/scoring.js` - Risk calculation formula

### Adjust Risk Weights
In `lib/scoring.js`, modify:
```javascript
const rawScore = (
  incomeScore * 0.4 +      // Change weights here
  stabilityScore * 0.3 +
  kycConfidence * 0.2 -
  fraudPenalty * 0.1
);
```

### Modify UI Colors
In `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',      // Change theme colors
  secondary: '#8b5cf6',
  success: '#10b981',
  // ...
}
```

## ⚠️ Important Notes

1. **No Database**: All data is stored in memory and will reset when server restarts
2. **Demo Only**: This is a prototype, not production-ready
3. **Mock Services**: All verification is simulated
4. **No Authentication**: Admin dashboard is publicly accessible

## 📝 Project Structure

```
FINTECH/
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── upload/            # File upload endpoint
│   │   ├── ocr/               # OCR processing
│   │   ├── kyc/               # KYC verification
│   │   ├── risk/              # Risk calculation
│   │   ├── decision/          # Loan decision
│   │   └── apps/              # Get applications
│   ├── components/            # React components
│   │   ├── Hero.jsx          # Landing page hero
│   │   ├── UploadCard.jsx    # File upload component
│   │   ├── MotionCard.jsx    # Animated card
│   │   ├── RiskGauge.jsx     # Risk score gauge
│   │   ├── KycStatus.jsx     # KYC status display
│   │   └── DecisionCard.jsx  # Decision result card
│   ├── apply/                 # Application form page
│   ├── result/                # Results page
│   ├── admin/                 # Admin dashboard
│   ├── layout.jsx            # Root layout
│   ├── page.jsx              # Landing page
│   └── globals.css           # Global styles
├── lib/
│   ├── store.js              # In-memory storage
│   ├── ocrMock.js           # Mock OCR service
│   ├── kycMock.js           # Mock KYC/fraud detection
│   └── scoring.js           # Risk scoring engine
├── public/
│   └── flowchart.png        # Hero image (add this!)
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Flowchart not showing
- Make sure `flowchart.png` exists in `public/` folder
- Check file name is exactly `flowchart.png` (lowercase)
- Try refreshing the page

## 📞 Support

For issues or questions:
1. Check the README.md
2. Review the code comments
3. Check console for errors
4. Review Next.js documentation

## 🎉 Demo Tips

For best demo experience:
1. Use high-quality images for uploads
2. Test with different loan amounts
3. Show the admin dashboard
4. Demonstrate the real-time processing
5. Highlight the animations
6. Show multiple applications to showcase filtering

---

**Ready to go! Run `npm run dev` and open http://localhost:3000** 🚀
