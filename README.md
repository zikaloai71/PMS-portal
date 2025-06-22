# 🧳 PMS Guest Portal

A modern, responsive guest portal for Property Management System (PMS) built with Vue 3, TypeScript, Vuetify, and Tailwind CSS.


## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PMS-portal
   ```

2. **Install server dependencies and start the mock API**
   ```bash
   cd server
   npm install
   npm start
   ```
   The API server will start at `http://localhost:4000`

3. **Install client dependencies (in a new terminal)**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Demo Accounts

Use these email addresses to log in (no password required):
- `admin123@example.com` - Omar Ammar (Admin)
- `guest123@example.com` - Zain Nasser (Guest)  
- `guest456@example.com` - Kareem Khalid (Guest)



## 🌟 Features

- **User Authentication**: Simple email-based login system with persistent sessions
- **Property Browsing**: View available properties
- **Booking System**: Create bookings with comprehensive form validation
- **Booking Management**: View and filtering past and upcoming reservations
- **Responsive Design**: Mobile-first approach with Vuetify and Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application
- **State Management**: Pinia for predictable state management
- **Notifications**: Global notification system for user feedback

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **UI Framework**: Vuetify
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Pinia
- **Data Fetching**: TanStack Query (Vue Query)
- **HTTP Client**: Axios
- **Routing**: Vue Router 4
- **Icons**: Material Design Icons (@mdi/font)
- **Utilities**: VueUse Core
- **Build Tool**: Vite


## 📦 Code Structure Explanation

The project follows a clean architecture pattern with clear separation of concerns:

```
client/
├── public/                    # Static assets
│   └── logo.png              # Application logo
├── src/
│   ├── assets/               # Images and static resources
│   │   ├── logo.png          
│   │   └── property-image.webp
│   ├── components/           # Reusable Vue components
│   │   ├── BookingCard.vue   # Individual booking display
│   │   ├── BookingModal.vue  # Booking creation modal
│   │   ├── GlobalNotifications.vue  # Toast notifications
│   │   ├── LoginDialog.vue   # Authentication modal
│   │   ├── PropertyCard.vue  # Property display card
│   │   └── ui/              # Shared UI components
│   │       ├── AlertMessage.vue     # Alert component
│   │       ├── AlertMessage-new.vue # Updated alert component
│   │       └── LoadingSpinner.vue   # Loading indicator
│   ├── composables/          # Vue composition functions
│   │   ├── index.ts         # Composables barrel export
│   │   ├── useAuth.ts       # Authentication logic
│   │   └── useProperty.ts   # Property-related logic
│   ├── entities/            # TypeScript type definitions
│   │   ├── index.ts         # Types barrel export
│   │   ├── property.ts      # Property-related types
│   │   └── user.ts          # User-related types
│   ├── layouts/             # Layout components
│   │   ├── AppLayout.vue    # Main application layout
│   │   └── components/      # Layout-specific components
│   │       ├── Footer.vue   # Application footer
│   │       └── Navbar.vue   # Navigation bar
│   ├── lib/                 # Library configurations
│   │   ├── axios.ts         # Axios HTTP client setup
│   │   ├── config.ts        # App configuration constants
│   │   ├── index.ts         # Library barrel export
│   │   ├── pinia.ts         # Pinia store configuration
│   │   ├── query.ts         # TanStack Query setup
│   │   └── vuetify.ts       # Vuetify UI framework setup
│   ├── router/              # Vue Router configuration
│   │   ├── index.ts         # Router instance
│   │   ├── paths.ts         # Route path constants
│   │   └── routes.ts        # Route definitions
│   ├── services/            # API service layer
│   │   ├── authService.ts   # Authentication API calls
│   │   ├── index.ts         # Services barrel export
│   │   ├── propertyService.ts # Property API calls
│   │   └── userService.ts   # User API calls
│   ├── stores/              # Pinia state stores
│   │   ├── auth.ts          # Authentication state
│   │   └── notification.ts  # Notification state
│   ├── utils/               # Utility functions
│   │   └── index.ts         # Utilities barrel export
│   ├── views/               # Page-level components
│   │   ├── BookingsView.vue # Bookings management page
│   │   ├── NotFoundView.vue # 404 error page
│   │   └── PropertiesView.vue # Properties listing page
│   ├── App.vue              # Root component
│   ├── main.css             # Global styles and Tailwind imports
│   └── main.ts              # Application entry point
└── Configuration Files:
    ├── index.html           # HTML template
    ├── package.json         # Dependencies and scripts
    ├── tailwind.config.js   # Tailwind CSS configuration
    ├── tsconfig.json        # TypeScript configuration
    ├── tsconfig.app.json    # App-specific TypeScript config
    ├── vite.config.ts       # Vite build configuration
    ├── postcss.config.js    # PostCSS plugin configuration
    └── env.d.ts             # TypeScript environment declarations

server/
├── db.json                  # Mock database with sample data
├── package.json             # Server dependencies
└── README.md               # Server-specific documentation
```

### Architecture Patterns

#### 1. **Composition API Architecture**
- Uses Vue 3's Composition API for better TypeScript integration
- Composables (`useAuth`, `useProperty`) encapsulate reusable logic
- Custom hooks for data fetching and state management

#### 2. **Service Layer Pattern**
- Centralized API calls in `services/` directory
- Separation between data fetching and business logic
- Consistent error handling across all API interactions

#### 3. **State Management Strategy**
- **Pinia** for client-side state (authentication, notifications)
- **TanStack Query** for server state (caching, synchronization, background updates)
- Clear separation between local and remote state

#### 4. **Component Organization**
- **Views**: Page-level components with routing
- **Components**: Reusable UI components
- **Layouts**: Application structure and navigation
- **UI Components**: Generic, reusable elements

#### 5. **Type Safety**
- Comprehensive TypeScript types in `entities/`
- Strict typing for API responses and component props
- Type-safe routing and state management



## 📱 Features Overview

### 🔐 Authentication System
- **Email-based Login**: Simplified authentication using email only
- **Persistent Sessions**: User sessions stored in localStorage
- **Role-based Access**: Support for admin and guest user roles
- **Auto-redirect**: Automatic navigation based on authentication state
- **Global Auth State**: Pinia store manages authentication across the app

### 🏠 Property Management
- **Property Browsing**: Grid view of available properties with images
- **Detailed Information**: Title, description, location, price per night, and availability
- **Dynamic Images**: Integration with external image sources (Unsplash)
- **Property Cards**: Responsive cards with hover effects and call-to-action buttons
- **Error Handling**: Graceful fallback for broken property images

### 📅 Booking System
- **Booking Creation**: Modal-based booking form with comprehensive validation
- **Date Selection**: Interactive date pickers with validation rules
- **Guest Information**: Required guest name and contact details
- **Price Calculation**: Real-time price calculation based on dates and property rates
- **Date Validation**: 
  - No past dates allowed for check-in
  - Check-out must be after check-in
- **Booking Confirmation**: Success Toast Notifications with booking details

### 📊 Booking Management
- **Personal Dashboard**: View all bookings filtered by user email
- **Booking Categorization**: Separate sections for upcoming and past bookings
- **Booking Status**: Visual indicators for pending, confirmed, and cancelled bookings
- **Booking Details**: Complete booking information including dates, property, and pricing
- **Responsive Design**: Mobile-optimized booking cards and layouts

### 🔔 Notification System
- **Toast Notifications**: Non-intrusive success, error, and info messages
- **Global State**: Centralized notification management via Pinia
- **Auto-dismiss**: Automatic notification cleanup
- **Action Feedback**: Immediate user feedback for all actions

### 🎨 User Interface
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Error States**: User-friendly error messages and fallback content
- **Accessibility**: Semantic HTML and keyboard navigation support

## � Notes: Trade-offs, Enhancements & Known Limitations

### 🔄 Trade-offs Made

#### 1. **Authentication Simplicity vs Security**
- **Trade-off**: Implemented email-only authentication for demo purposes
- **Benefit**: Faster development and easier testing
- **Cost**: Not production-ready, lacks proper security measures
- **Rationale**: Focus on core functionality demonstration rather than authentication complexity

#### 2. **UI Framework Choice (Vuetify + Tailwind)**
- **Trade-off**: Used both Vuetify and Tailwind CSS together
- **Benefit**: Rich component library + utility-first styling flexibility
- **Cost**: Larger bundle size, potential style conflicts
- **Rationale**: Vuetify provides comprehensive components, Tailwind offers customization control

#### 3. **Data Fetching Strategy**
- **Trade-off**: TanStack Query for server state management
- **Benefit**: Excellent caching, background updates, optimistic updates
- **Cost**: Additional learning curve, more complex setup
- **Rationale**: Provides production-level data fetching patterns





