# 🌱 Smart & Climate-Resilient Agriculture Advisor

A complete, offline-first web application built with React.js + Vite that empowers farmers with AI-driven insights, real-time climate data, and sustainable farming recommendations. The app uses LocalStorage for data persistence and includes full PWA support for offline functionality.

## ✨ Features

### 🏠 **Home Page**
- Beautiful hero section with call-to-action
- Feature showcase with smooth animations
- "How It Works" walkthrough
- Responsive mobile-first design

### 🌾 **Crop Recommendation**
- Form-based crop suggestion system
- Input: Soil type, location, water availability
- Intelligent matching based on local JSON rules
- Save recommendations to LocalStorage
- View all saved recommendations with timestamps

### 💧 **Water Usage Calculator**
- Calculate precise irrigation requirements
- Input: Crop type and farming area (hectares)
- Formula: Water requirement (mm) × area × 10000 / efficiency
- Visual charts showing water usage trends
- History of all calculations with chart visualization

### ⛈️ **Climate Alerts**
- Real-time weather data from OpenWeatherMap API
- Smart alert rules:
  - 🔥 **Heatwave**: Temp > 35°C
  - ❄️ **Frost**: Temp < 0°C
  - 🏜️ **Drought**: Low humidity + high temp
  - ⛈️ **Heavy Rain**: Rainfall with wind
- Cache weather data in LocalStorage
- City-based weather lookup

### 👥 **Community Hub**
- Local forum for farmers to share experiences
- Add, edit, and delete posts
- Real-time local storage sync
- Community statistics
- Anonymous posting support

### 📊 **Dashboard**
- Comprehensive overview of all data
- Statistics cards (recommendations, calculations, posts)
- Charts powered by Recharts:
  - Pie chart: Crop recommendations distribution
  - Line chart: Water usage trends
  - Bar chart: Water usage by irrigation method
- Recent activity feed

### ⚙️ **Settings**
- **Display**: Dark/Light theme toggle
- **Language**: English and Hindi support
- **Notifications**: Enable/disable alerts
- **Auto Sync**: Automatic data synchronization
- **Data Management**:
  - 📥 Export all data as JSON
  - 📤 Import from backup file
  - 🗑️ Clear all data
- App information and version

## 🛠️ Tech Stack

- **Framework**: React 19.2 + Vite 7.2
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: HeroIcons
- **API**: OpenWeatherMap (Weather data)
- **Storage**: LocalStorage (No backend required)
- **PWA**: Service Worker + Web App Manifest
- **Build**: Vite with optimized chunking

## 📦 Project Structure

```
pccoe-new/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service worker for offline support
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Footer
│   │   ├── Card.jsx           # Card container
│   │   ├── Button.jsx         # Button with variants
│   │   ├── Input.jsx          # Enhanced text input
│   │   ├── Select.jsx         # Select dropdown
│   │   ├── Modal.jsx          # Modal dialog
│   │   ├── Notification.jsx   # Toast notifications
│   │   └── Loading.jsx        # Loading spinner
│   ├── pages/                 # Application pages
│   │   ├── Home.jsx           # Landing page
│   │   ├── CropRecommendation.jsx
│   │   ├── WaterCalculator.jsx
│   │   ├── ClimateAlerts.jsx
│   │   ├── CommunityHub.jsx
│   │   ├── Dashboard.jsx
│   │   └── Settings.jsx
│   ├── utils/
│   │   ├── storage.js         # LocalStorage API wrapper
│   │   └── validation.js      # Form validation utilities
│   ├── data/
│   │   ├── cropRules.json     # Crop recommendation rules
│   │   └── waterUsageRules.json # Water calculation formulas
│   ├── App.jsx                # Main app with routing
│   ├── index.css              # Global styles & animations
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm 8+ or higher

### Installation

```bash
# Clone or navigate to the project
cd "pccoe new"

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

## 🧮 Data Files Reference

### cropRules.json
Defines crop recommendations with:
- Soil type compatibility (clayey, loamy, sandy-loam)
- Location suitability (north, central, south, all)
- Water requirements (low, medium, high)
- Season information
- Crop descriptions

### waterUsageRules.json
Water calculation parameters:
- Crop-specific water requirements (mm)
- Irrigation methods (flood, sprinkler, drip, rainfed)
- Efficiency rates (0.45 - 1.0)
- Formula: `(requirement × 10000 × area) / efficiency`

## 💾 LocalStorage Schema

```javascript
// Crop Recommendations
cropRecommendations: [
  {
    id: number,
    crop: string,
    soilType: string,
    location: string,
    waterLevel: string,
    farmerName: string,
    date: string,
    description: string
  }
]

// Water Usage History
waterUsageHistory: [
  {
    id: number,
    crop: string,
    area: number,
    waterRequirement: number,
    irrigationMethod: string,
    efficiency: string,
    totalWater: number,
    waterPerHectare: number,
    date: string
  }
]

// Community Posts
communityPosts: [
  {
    id: number,
    name: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string
  }
]

// Settings
settings: {
  language: "en" | "hi",
  notifications: boolean,
  autoSync: boolean,
  darkMode: boolean
}
```

## 🌐 OpenWeatherMap Integration

The Climate Alerts page uses the free tier of OpenWeatherMap API:

```javascript
// Get weather for a city
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

**Alert Rules:**
- Temperature > 35°C → Heatwave warning
- Temperature < 0°C → Frost alert
- Humidity < 30% + Temp > 25°C → Drought risk
- Rain condition + Wind > 5 m/s → Heavy rainfall alert

## 🎨 UI/UX Enhancements

### Animations
- ✨ **Fade In**: Smooth content appearance
- 📥 **Slide Down**: Notification entry animation
- 📤 **Slide Up**: Card entry animation
- 🎯 **Bounce In**: Icon and button animations
- 🔄 **Pulse**: Loading state indicator
- ⚡ **Hover Effects**: Interactive feedback

### Accessibility
- ♿ WCAG 2.1 compliance
- Keyboard navigation support
- Focus indicators for all interactive elements
- Reduced motion support (prefers-reduced-motion)
- Color contrast ratios met
- Semantic HTML structure
- ARIA labels where needed

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly button sizes (min 48px height)
- Optimized font sizes for all devices

## 📱 PWA Features

- **Offline Support**: Service Worker caches app shell
- **Install**: Add to home screen on mobile
- **App Manifest**: Custom app name, icon, colors
- **Service Worker**: Network-first strategy with fallback
- **Automatic Updates**: Cache invalidation on app updates

## 🔐 Data Privacy

- ✅ **All data stored locally** - No server/backend required
- ✅ **No personal data sent online** - Climate API only receives city name
- ✅ **Export/Import**: Full data backup control
- ✅ **Data Deletion**: One-click clear all data
- ✅ **Browser storage**: Uses standard browser LocalStorage

## 📊 Sample Data

### Crops Included
Rice, Wheat, Corn, Cotton, Sugarcane, Pulses, Vegetables, Groundnut

### Supported Locations
- North India
- Central India
- South India

### Supported Soil Types
- Clayey
- Loamy
- Sandy-Loam

## 🚀 Performance

- **Bundle Size**: ~660KB (199KB gzipped) after optimization
- **Code Splitting**: Vendor, Charts, and Icons chunks
- **Lazy Loading**: Route-based code splitting ready
- **Image Optimization**: SVG icons (HeroIcons)
- **CSS**: Tailwind CSS with PurgeCSS tree-shaking

## 🐛 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with PWA support

## 📝 Development

### Run ESLint
```bash
npm run lint
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Tailwind CSS for utility-first styling
- Recharts for beautiful charts
- HeroIcons for icon set
- React and Vite communities

## 📞 Support

For issues, feature requests, or questions:
- Create an issue on GitHub
- Check existing documentation
- Review sample data in `src/data/`

## 🎯 Roadmap

- [ ] Multi-language support expansion
- [ ] Mobile app (React Native)
- [ ] Backend sync (optional)
- [ ] Machine learning predictions
- [ ] Video tutorials
- [ ] Community moderation features
- [ ] Advanced analytics dashboard
- [ ] Government subsidy information

---

**Made with ❤️ for sustainable farming** 🌾

Last Updated: November 2025
