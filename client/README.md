# 🧳 PMS Guest Portal

A modern, responsive guest portal for Property Management System (PMS) built with Vue 3, TypeScript, and Tailwind CSS.

## 🌟 Features

- **User Authentication**: Simple email-based login system
- **Property Browsing**: View available properties with detailed information
- **Booking System**: Create bookings with form validation
- **Booking Management**: View and manage past and upcoming reservations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Data**: Powered by TanStack Query for efficient data fetching
- **Type Safety**: Full TypeScript support
- **State Management**: Pinia for predictable state management

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Data Fetching**: TanStack Query (Vue Query)
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Backend**: JSON Server (Mock API)

## 📦 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── assets/            # CSS and other assets
│   │   └── css/
│   │       └── main.css   # Global styles and Tailwind imports
│   ├── components/        # Reusable Vue components
│   │   ├── layouts/       # Layout components
│   │   └── ui/           # UI components (Alert, Loading, etc.)
│   ├── composables/       # Vue composables
│   │   └── useApi.ts     # TanStack Query hooks
│   ├── router/           # Vue Router configuration
│   ├── services/         # API service layer
│   ├── stores/           # Pinia stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── views/            # Page components
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration

server/
├── db.json               # Mock database
├── package.json          # Server dependencies
└── README.md            # Server setup instructions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pms-portal
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the mock API server** (in the `server` directory):
   ```bash
   cd server
   npm start
   # or
   json-server --watch db.json --port 4000
   ```
   The API will be available at `http://localhost:4000`

2. **Start the client development server** (in the `client` directory):
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Demo Accounts

Use these email addresses to log in:
- `guest123@example.com` (Zain Nasser)
- `guest456@example.com` (Kareem Khalid)
- `admin123@example.com` (Omar Ammar)

## 🎯 Available Scripts

### Client Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### Server Scripts

- `npm start` - Start JSON Server
- `json-server --watch db.json --port 4000` - Alternative start command

## 📱 Features Overview

### Authentication
- Email-based login (no password required for demo)
- Persistent sessions using localStorage
- Automatic redirect based on authentication state

### Property Management
- Browse available properties
- View property details (title, description, location, price)
- Filter by availability status
- Responsive property cards with images

### Booking System
- Create new bookings with validation
- Form includes guest name, check-in/out dates
- Real-time price calculation
- Date validation (no past dates, checkout after checkin)
- Booking confirmation

### Booking Management
- View all user bookings filtered by email
- Separate upcoming and past bookings
- Booking status tracking (pending, confirmed, cancelled)
- Booking statistics dashboard

## 🔧 Architecture Decisions

### State Management
- **Pinia**: Chosen for its simplicity and TypeScript support
- **TanStack Query**: Handles server state, caching, and synchronization
- Separation between client state (auth) and server state (data)

### API Layer
- **Service Layer Pattern**: Centralized API calls in `services/api.ts`
- **Composables**: TanStack Query hooks in `composables/useApi.ts`
- **Error Handling**: Consistent error handling across the application

### Component Architecture
- **Composition API**: Modern Vue 3 approach for better TypeScript support
- **Component Reusability**: Modular components for easy maintenance
- **Props/Emit Pattern**: Clear component communication

### Styling Strategy
- **Tailwind CSS**: Utility-first approach for rapid development
- **Custom Components**: Reusable style classes in CSS layer
- **Responsive Design**: Mobile-first approach

## 🚧 Known Limitations & Trade-offs

### Current Limitations
1. **Authentication**: Simplified email-only login (no password validation)
2. **Image Handling**: Basic error handling for broken images
3. **Offline Support**: No offline capabilities
4. **Real-time Updates**: No WebSocket support for live updates

### Technical Trade-offs
1. **Bundle Size vs Features**: Included full Vuetify for comprehensive UI components
2. **Type Safety vs Development Speed**: Comprehensive TypeScript types may slow initial development
3. **API Mocking**: JSON Server limitations for complex queries and relationships

## 🔮 Future Enhancements

### Short-term Improvements
- [ ] Add search and filtering for properties
- [ ] Implement booking cancellation
- [ ] Add image upload for properties
- [ ] Implement pagination for large datasets

### Long-term Enhancements
- [ ] Real authentication system with JWT
- [ ] Payment integration
- [ ] Real-time notifications
- [ ] Advanced booking management (modification, cancellation policies)
- [ ] Property ratings and reviews
- [ ] Calendar integration
- [ ] Multi-language support

## 🐛 Troubleshooting

### Common Issues

1. **API not connecting**
   - Ensure JSON Server is running on port 4000
   - Check if `http://localhost:4000` is accessible

2. **TypeScript errors**
   - Run `npm run type-check` to identify issues
   - Ensure all dependencies are installed

3. **Tailwind styles not loading**
   - Verify PostCSS configuration
   - Check if Tailwind directives are imported in main.css

4. **CORS issues**
   - JSON Server should handle CORS automatically
   - If issues persist, add CORS headers manually

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- TanStack team for the powerful data fetching library
- JSON Server for the simple mock API solution
