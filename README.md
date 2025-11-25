# FINTECH - Fast Automated Lending Prototype

A fully automated loan evaluation prototype built with Next.js, featuring document intake, OCR, KYC verification, fraud detection, risk scoring, and automated decision-making - all without a database.

## Features

✅ **No Database** - All data stored in-memory for fast prototyping
✅ **Mock Services** - OCR, KYC, and fraud detection simulated
✅ **Animated UI** - Beautiful Framer Motion animations throughout
✅ **Real-time Processing** - See your application processed in real-time
✅ **Admin Dashboard** - View all applications with filtering
✅ **Risk Scoring** - Automated 0-100 risk assessment
✅ **Instant Decisions** - Approval/rejection in under 2 minutes

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Framer Motion** (Animations)
- **TailwindCSS** (Styling)
- **React Hook Form** (Form handling)
- **React Dropzone** (File uploads)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Flowchart Image

Place your flowchart image at `public/flowchart.png`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Flow

1. **Landing Page** (`/`)
   - Hero section with flowchart
   - Feature highlights
   - Call-to-action button

2. **Application Form** (`/apply`)
   - Step 1: Personal information
   - Step 2: Document uploads (ID, Salary Slip, Bank Statement, Selfie)

3. **Processing & Results** (`/result`)
   - Real-time processing animation
   - OCR → KYC → Risk → Decision
   - Final decision with detailed breakdown

4. **Admin Dashboard** (`/admin`)
   - View all applications
   - Filter by status
   - Expandable rows with details
   - Statistics overview

## API Routes

- `POST /api/upload` - Upload documents
- `POST /api/ocr` - Extract data from documents
- `POST /api/kyc` - Perform KYC verification
- `POST /api/risk` - Calculate risk score
- `POST /api/decision` - Generate loan decision
- `GET /api/apps` - Get all applications

## Mock Logic

### OCR
- Randomly generates realistic applicant data
- Simulates document text extraction
- Confidence scores: 85-98%

### KYC
- Face match: 70-100%
- Liveness detection: 85% pass rate
- Document verification: 90% pass rate

### Fraud Detection
- 5% tamper detection rate
- Multiple fraud indicators
- Risk levels: low, medium, high

### Risk Scoring
- Income score (40% weight)
- Stability score (30% weight)
- KYC confidence (20% weight)
- Fraud penalty (10% weight)

### Decision Logic
- **70-100**: Instant Approval ✅
- **40-69**: Need More Documents ⚠️
- **0-39**: Rejection ❌

## Customization

### Modify Risk Calculation
Edit `lib/scoring.js` to adjust weights and thresholds.

### Change Mock Data
Edit `lib/ocrMock.js` and `lib/kycMock.js` to customize generated data.

### Adjust UI Animations
Components in `app/components/` use Framer Motion for animations.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy (no environment variables needed)

```bash
npm run build
npm start
```

## Project Structure

```
FINTECH/
├── app/
│   ├── api/          # API routes
│   ├── components/   # React components
│   ├── apply/        # Application form page
│   ├── result/       # Results page
│   ├── admin/        # Admin dashboard
│   ├── layout.jsx    # Root layout
│   ├── page.jsx      # Landing page
│   └── globals.css   # Global styles
├── lib/
│   ├── store.js      # In-memory storage
│   ├── ocrMock.js    # Mock OCR service
│   ├── kycMock.js    # Mock KYC service
│   └── scoring.js    # Risk scoring engine
├── public/
│   └── flowchart.png # Hero flowchart image
└── package.json
```

## Notes

- **No Persistence**: Data resets on server restart
- **Demo Purpose**: Not for production use
- **Mock Services**: All verification is simulated
- **No Authentication**: Admin dashboard is public

## License

MIT License - Free to use and modify

---

Built with ❤️ for fast prototyping and demo purposes.
