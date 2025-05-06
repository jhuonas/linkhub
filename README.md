# LinkHub - Personal Link Sharing Platform

LinkHub is a personal link hub application, allowing users to create and share a collection of important links through a customized
profile page.

## 🚀 Features

- **User Authentication**: Register and login to manage your personal links
- **Link Management**: Create, edit, delete, and reorder your links
- **Link Status**: Activate or deactivate links without deleting them
- **Drag and Drop**: Easily reorder your links with intuitive drag and drop
- **Public Profile**: Share your links with a personalized public URL
- **Responsive Design**: Works on desktop and mobile devices  


## 📋 Project Structure

The project follows a clean, organized structure:

```
├── src/
│   ├── app/
│   │   ├── [username]/   # Public profile pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home/landing page
│   ├── components/       # Shared components
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## 🛠️ Technology Stack

- **Next.js**: React framework for building the UI
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling components
- **ESLint**: For code linting
- **PostCSS**: For CSS processing
- **localStorage API**: For data persistence (no backend required)  


## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager  


### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:jhuonas/linkhub.git
   cd linkhub
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.  


## 🧪 How to Use

1. **Register**: Create a new account with your email, password, and desired username
2. **Login**: Access your dashboard with your credentials
3. **Add Links**: Create new links with titles and URLs
4. **Manage Links**: Edit, activate/deactivate, or delete your links
5. **Reorder Links**: Drag and drop to change the order of your links
6. **Share Profile**: Share your public profile URL: `yourdomain.com/yourusername`  


## 🔒 Data Storage

LinkHub uses the browser's localStorage to store user data. The data structure example is:

```json
{
  "currentUser": {
    "email": "user@example.com",
    "username": "username"
  },
  "users": [
    {
      "email": "user@example.com",
      "password": "password",
      "username": "username",
      "links": [
        {
          "id": "1234567890",
          "title": "My Website",
          "url": "https://example.com",
          "status": "active",
          "order": 0
        }
      ]
    }
  ]
}
```

## 🔜 Future Enhancements

- Backend integration with a database for persistent storage
- Social media sharing options
- Custom themes and styling options
- Analytics for link clicks
- Password recovery functionality  


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
