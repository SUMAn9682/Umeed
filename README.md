# Umeed 🩸

> Revolutionizing healthcare with AI assistance and connecting blood donors with those in need

## Overview

Umeed is a comprehensive healthcare platform that leverages AI technology to provide medical assistance and facilitates blood donation connections. The project addresses two critical healthcare needs:

1. **AI-Powered Medical Assistant**: An intelligent chatbot built using Groq's API that can answer medical questions, analyze symptoms, and interpret medical documents via image and PDF uploads.

2. **Blood Bridge**: A life-saving feature that connects blood donors with people in need through a sophisticated location-based matching system and real-time notifications.

## Features

### AI Medical Assistant
- **Medical Consultation**: Get reliable answers to health-related questions and symptom analysis
- **Document Analysis**: Upload prescriptions and test reports as images or PDFs
- **Simplified Interpretations**: Receive easy-to-understand explanations of medical terminology and results

### Blood Bridge
- **Smart Donor Matching**: Hierarchical location-based search starting from city, expanding to district and state if necessary
- **Real-time Notifications**: Instant alerts to potential donors via Socket.io
- **Email Alerts**: Backup notification system using Nodemailer
- **Comprehensive Database**: Organized registry of donors and recipients

## Tech Stack

### Frontend
- **Next.js**: React framework for building the user interface
- **Shadcn UI**: Component library for consistent and elegant design
- **Tailwind CSS**: Utility-first CSS framework for styling

### Backend
- **Node.js & Express.js**: Server-side application framework
- **MongoDB**: NoSQL database for storing user information and donation records
- **Socket.io**: Real-time, bidirectional communication for instant notifications
- **Nodemailer**: Module for sending emails

### AI Integration
- **Groq API**: Powers the medical chatbot with advanced language processing capabilities

## Installation

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

## Usage

1. **Medical Assistant**:
   - Type your medical query or select the upload option
   - For document analysis, upload clear images of prescriptions or test reports

2. **Blood Bridge**:
   - Register as a donor with your blood type and location details
   - Or create a blood request specifying blood type and urgency
   - Receive notifications when matches are found

## Acknowledgements

We extend our heartfelt gratitude to **Groq** for their generous support as a sponsor of HackHazards hackathon. Their powerful API has been instrumental in bringing our medical AI assistant to life, enabling us to create a solution that can truly make a difference in healthcare accessibility.

## Contributors

- [Soham Sadhukhan](https://github.com/soham247)
- [Raj Dutta](https://github.com/Dutta2005)
- [Soumodwip Mondal](https://github.com/Soumodwip-Mondal)
- [Suman Paul](https://github.com/SUMAn9682)
