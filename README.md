![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 Umeed: AI-Powered Healthcare Assistant
> Revolutionizing healthcare with AI assistance and connecting blood donors with those in need.
---
## 📌 Problem Statement
**Problem Statement 1 – Weave AI magic with Groq**
---
## 🎯 Objective
Umeed addresses critical gaps in healthcare accessibility and emergency medical response through two integrated solutions:

1. **AI-powered medical assistance** for those without immediate access to healthcare professionals, providing reliable information and document interpretation.

2. **Emergency blood donation coordination** that connects donors with recipients during critical situations through a hierarchical location-based matching system.

This serves both rural and urban populations facing healthcare barriers, particularly in medical emergencies where timely blood donation can be life-saving.
---
## 🧠 Team & Approach
### Team Name:  
`Small Brains`
### Team Members:  
- [Soham Sadhukhan](https://github.com/soham247) 
- [Raj Dutta](https://github.com/Dutta2005) 
- [Soumodwip Mondal](https://github.com/Soumodwip-Mondal) 
- [Suman Paul](https://github.com/SUMAn9682) 

### Your Approach:  
- We chose this problem after witnessing the challenges faced by a team member's relative in finding blood donors during an emergency.
- Key challenges included creating a reliable medical AI assistant that provides accurate information while clearly indicating its limitations and keeping the context of previous conversations and also keeping the conversation history, and developing a real-time notification system that prioritizes geographical proximity.
- Our breakthrough came when we integrated Groq's API for medical information processing, significantly improving response quality and speed compared to our initial prototype.
---
## 🛠️ Tech Stack
### Core Technologies Used:
- **Frontend:** Next.js, Shadcn UI, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Communication:** Socket.io (real-time notifications), Nodemailer (email alerts)
- **Hosting:** Vercel (frontend), Render (backend)

### Sponsor Technologies Used:
- [✅] **Groq:** Used Groq's API to power our medical assistant chatbot, enabling fast and accurate responses to health queries and medical document analysis.
- [ ] **Monad:** 
- [ ] **Fluvio:** 
- [ ] **Base:** 
- [ ] **Screenpipe:** 
- [ ] **Stellar:** 
---
## ✨ Key Features
- ✅ **AI Medical Assistant**: Ask health questions, get symptom analysis, and receive medical advice powered by Groq's API
- ✅ **Document Analysis**: Upload medical documents (prescriptions, test reports) as images or PDFs for AI interpretation and simplification
- ✅ **Blood Bridge**: Sophisticated donor-recipient matching system that searches by city, district, and state
- ✅ **Real-time Notifications**: Instant alerts to potential donors through web notifications and email
- ✅ **User Dashboard**: Track donation history, medical queries, and manage profile information
- ✅ **Location-based Search**: Hierarchical location search algorithm prioritizing proximity for urgent needs
---
## 📽️ Demo & Deliverables
- **Demo Video Link:** [YouTube Demo of Umeed](https://youtube.com/your-demo-link)  
- **Pitch Deck Link:** [Umeed Presentation](https://docs.google.com/presentation/your-deck-link)  
---
## ✅ Tasks & Bonus Checklist
- [✅] **All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form**
- [✅] **All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points)**
- [✅] **All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points)**
---
## 🧪 How to Run the Project
### Requirements:
- Node.js v16+
- MongoDB
- Groq API key
- Environment variables setup

### Local Setup:
1. Clone this repository: 

```bash
git clone https://github.com/yourusername/Umeed.git
```

2. Navigate to project directory
```bash
cd Umeed
```

3. Install dependencies
```bash
 # for client directory
cd client 
npm install

 # for server directory
cd server
npm install
```

4. Set up environment variables
```bash
# for client directory
cd client 
cp .env.example .env
# Edit .env with your configurations

# for server directory
cd server 
cp .env.example .env
# Edit .env with your configurations
```
5. Start the project locally
```bash
 # client start
 cd client 
 npm run dev

 # server start
 cd server 
 npm run dev
```

### Environment Setup:
1. Create a `.env` file in `server` folder with the following variables:
```
PORT=8000
MONGODB_URI=<your mongo uri>
CORS_ORIGIN="http://localhost:3000"
ACCESS_TOKEN_SECRET=<a long string>
ACCESS_TOKEN_EXPIARY=86400s
REFRESH_TOKEN_SECRET=<a long string>
REFRESH_TOKEN_EXPIARY=864000s
NODE_ENV=development
GROQ_API_KEY=<your groq api key>
GROQ_MODEL_ID=<your groq model id>
MAILTRAP_USER=<your mailtrap user>
MAILTRAP_PASS=<your mailtrap password>
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525 # for production use 465
MAIL_FROM=<your email>
GMAIL_USER=<your email>
GMAIL_PASS=<your email app password>
FRONTEND_URL=<your frontend url>
CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
CLOUDINARY_API_KEY=<your cloudinary api key>
CLOUDINARY_API_SECRET=<your cloudinary api secret>
```
2. Create a `.env` file in `client` folder with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
---
## 🧬 Future Scope
- 🧠 **Custom ML Model Development**: Building our own machine learning model for more advanced disease prediction based on symptoms and medical history
- 🗣️ **AI Receptionist**: Implementing intelligent agents to facilitate interactions between doctors and patients, managing appointments and initial consultations
- 📊 **Health Analytics Dashboard**: Providing personalized health trends and insights based on user interactions and medical history
- 🌐 **Regional Language Support**: Expanding accessibility with support for local languages
- 📱 **Mobile Applications**: Native mobile apps for Android and iOS to increase accessibility
- 🔗 **Hospital Integration**: Direct integration with hospital systems for seamless blood request management and medical record sharing
---
## 📎 Resources / Credits
- **Groq API**: Special thanks to Groq for their powerful API that powers our medical assistant
- **Groq Documentation**: Reference for implementing document analysis features
- **MongoDB Atlas**: Cloud database service for storing user and donation data
- **Socket.io**: Real-time communication library
- **HackHazards Organizing Team**: For their support and providing this opportunity

### Acknowledgements
 We extend our heartfelt gratitude to **Groq** for their generous support as a sponsor of HackHazards hackathon. Their powerful API has been instrumental in bringing our medical AI assistant to life, enabling us 
 to create a solution that can truly make a difference in healthcare accessibility.

---
## 🏁 Final Words
Our journey through HackHazards has been incredibly rewarding. We faced significant challenges in ensuring medical information accuracy and building a reliable blood donation matching system, but seeing our solution come together was worth every obstacle. The most rewarding moment was when we successfully tested our blood donation notification system and witnessed how quickly it could potentially connect donors to recipients in emergencies.

We believe Umeed has the potential to save lives and improve healthcare accessibility, especially in underserved regions. We're committed to continuing its development beyond this hackathon.

Special thanks to all mentors who provided guidance, especially in optimizing our use of Groq's API for healthcare applications!
---
