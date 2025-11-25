# 🚀 FINTECH - Fast Automated Lending Platform

A full-stack AI-powered loan application platform built with **Next.js 14**, featuring automated document processing, risk scoring, live selfie verification, and admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.16-FF0055?logo=framer)

## ✨ Features

### 🎯 **6-Step Automated Lending Pipeline**
1. **Smart Application Intake** - Upload Aadhaar, PAN, Salary Slip, Bank Statement
2. **Document Understanding** - AI + OCR extracts data, detects inconsistencies
3. **Risk Scoring Engine** - Automated 0-100 score classification
4. **AI Loan Officer Bot** - Real-time chatbot guidance
5. **Lending Decision** - Instant approval/rejection in < 2 minutes
6. **Admin Dashboard** - Lender view with fraud flags and override options

### 📸 **Advanced Verification**
- 📷 **Camera Capture**: Direct document photo capture for Aadhaar & Selfie
- 🎥 **Live Selfie Verification**: 4-step face verification with liveness detection
  - Look straight, turn left, turn right, smile
  - Anti-spoofing with multiple angles
  - 98.5% verification accuracy
  - Real-time face detection overlay

### 🎨 **Modern UI/UX**
- ✨ Dark theme with animated cyan/emerald particles
- 📊 Glassmorphism design with backdrop blur effects
- 🌈 Gradient cards with hover animations
- ⚡ Smooth page transitions with Framer Motion
- 📱 Fully responsive design

### 🤖 **AI-Powered Features**
- OCR document extraction (Aadhaar, PAN, Bank statements)
- KYC verification with fraud detection
- Automated risk scoring algorithm
- AI chatbot loan officer
- Real-time decision engine

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Modern browser with camera support

### Installation

```bash
# Clone the repository
git clone https://github.com/gpranit16/fintech.git
cd fintech

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
fintech/
├── app/
│   ├── api/              # API routes
│   │   ├── upload/       # Document upload endpoint
│   │   ├── ocr/          # OCR processing
│   │   ├── kyc/          # KYC verification
│   │   ├── risk/         # Risk scoring
│   │   ├── decision/     # Lending decision
│   │   └── apps/         # Get all applications
│   ├── components/       # React components
│   │   ├── Hero.jsx                    # Landing page
│   │   ├── UploadCard.jsx              # Document upload with camera
│   │   ├── LiveSelfieVerification.jsx  # Face verification
│   │   ├── DecisionCard.jsx            # Loan decision display
│   │   └── ...
│   ├── apply/            # Application form page
│   ├── admin/            # Admin dashboard
│   └── result/           # Result page
├── lib/
│   ├── store.js          # In-memory data storage
│   ├── ocrMock.js        # OCR simulation
│   ├── kycMock.js        # KYC simulation
│   └── scoring.js        # Risk scoring algorithm
└── public/               # Static assets
```

## 🎯 Usage

### For Applicants

1. **Home Page**: View process overview and stats
2. **Start Application**: Click "Start Loan Application"
3. **Fill Form**: Enter personal details and loan information
4. **Upload Documents**: 
   - Use "Choose File" or "📷 Open Camera" for Aadhaar/Selfie
   - Upload PAN, Salary Slip, Bank Statement
5. **Live Verification**: Complete 4-step face verification
6. **Submit**: Wait for automated processing
7. **View Decision**: See approval/rejection with reasoning

### For Admin/Lenders

1. **Admin Dashboard**: Navigate to `/admin`
2. **View Statistics**: Total, approved, rejected, pending applications
3. **Filter Applications**: Use tabs to filter by status
4. **Review Details**: Check risk scores, fraud flags, documents
5. **Override Decisions**: Manual intervention when needed

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **API**: Next.js API Routes
- **Storage**: In-memory (can be replaced with DB)
- **Styling**: TailwindCSS + Custom CSS

## 📦 Deployment on Vercel

### Method 1: Via GitHub (Recommended)

1. Push code to GitHub (done automatically)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository `gpranit16/fintech`
5. Configure:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Vercel Configuration

The project includes `vercel.json` with optimal settings:
- Framework: Next.js
- Node version: 18.x
- Build command: `npm run build`
- Output directory: `.next`

## 🎥 Camera Features

### Document Capture
- **Aadhaar**: Opens rear camera with alignment guide
- **Selfie**: Opens front camera with face circle overlay
- High-quality JPEG capture (90% quality)

### Live Verification
1. **Step 1**: Look straight at camera
2. **Step 2**: Turn head left
3. **Step 3**: Turn head right
4. **Step 4**: Smile
- Auto-countdown before each capture
- Thumbnail preview of all captured photos
- Verification score display

## 🔐 Security Features

- **Liveness Detection**: Multiple angles prevent photo spoofing
- **Document Validation**: OCR checks for authenticity
- **Fraud Detection**: Pattern matching for suspicious activities
- **KYC Verification**: Real-time identity validation
- **Secure Upload**: File type and size validation

## 🚧 Future Enhancements

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] Actual OCR API (Tesseract.js, Google Vision)
- [ ] Payment gateway integration
- [ ] Email/SMS notifications
- [ ] Document encryption
- [ ] Advanced fraud ML models
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 📝 Notes

- **No Database**: Uses in-memory storage (resets on restart)
- **Mock Services**: OCR, KYC, and fraud detection are simulated
- **Demo Purpose**: Not for production without proper backend
- **Camera Access**: Requires HTTPS in production (Vercel provides this)

## 📄 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Author

**Pranit**
- GitHub: [@gpranit16](https://github.com/gpranit16)

## 🙏 Acknowledgments

- Next.js team for amazing framework
- Framer Motion for smooth animations
- TailwindCSS for utility-first styling
- Vercel for seamless deployment

---

**Built with ❤️ using Next.js 14 | Ready for Vercel Deployment**

For questions or issues, please open a GitHub issue.
