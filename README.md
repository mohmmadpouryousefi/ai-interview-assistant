# 🤖 AI Interview Assistant

![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

A cutting-edge AI-powered interview preparation platform designed to help job seekers practice and improve their interview skills through simulated interviews, personalized feedback, and performance tracking.

![AI Interview Assistant Demo](https://via.placeholder.com/800x400?text=AI+Interview+Assistant+Demo)

## ✨ Features

- **🎙️ Interactive AI Interviews**: Practice with realistic interview questions tailored to your field
- **📊 Performance Analytics**: Track your progress with comprehensive charts and statistics
- **📝 Detailed Feedback**: Receive instant AI-generated feedback on your responses
- **🔄 Interview History**: Review past interviews and see your improvement over time
- **👤 User Profile Management**: Customize your experience with personal preferences
- **🔒 Secure Authentication**: Protect your data with robust user authentication

## 🛠️ Tech Stack

- **Frontend**:

  - Next.js for server-side rendering and routing
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Recharts for data visualization
  - Axios for API requests
  - Context API for state management

- **Backend**:
  - Node.js & Express for the server
  - MongoDB for database
  - JWT for authentication
  - TypeScript for type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- MongoDB account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/mohmmadpouryousefi/ai-interview-assistant.git
   cd ai-interview-assistant
   ```

2. Install dependencies for the frontend

   ```bash
   npm install
   ```

3. Install dependencies for the backend

   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the backend server

   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Application Pages

- **Landing Page**: Introduction to the platform
- **Authentication**: Login and registration
- **Dashboard**: Overview of your progress and stats
- **Interview**: Practice interviews with AI
- **Profile**: Manage your user profile
- **History**: Review past interview sessions

## 📂 Project Structure

```
ai-interview-assistant/
├── backend/               # Backend code
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Entry point
│   └── ...
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context
│   ├── pages/             # Next.js pages
│   ├── services/          # API services
│   └── styles/            # Global styles
└── ...
```

## 🔮 Future Enhancements

- Voice analysis for speech pattern feedback
- Industry-specific interview modules
- Mock video interviews with facial recognition
- Interview collaboration with peers
- Integration with job platforms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Recharts](https://recharts.org/)
