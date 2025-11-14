# 🚀 Quick Start Guide

## Installation (2 minutes)

```bash
# Navigate to project
cd "pccoe new"

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:5173
```

## Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Layout

```
src/
├── pages/          # 7 main pages
├── components/     # 9 reusable components
├── utils/          # Storage & validation
├── data/           # JSON rule files
└── App.jsx         # Main router
```

## 🎯 Key Features Quick Tour

### 1. **Crop Recommendation** 🌾
- Fill form: Soil type, Location, Water level
- Get matching crops from JSON rules
- Save recommendations to browser storage

### 2. **Water Calculator** 💧
- Input crop type and area (hectares)
- See water requirement calculation
- View charts of usage history

### 3. **Climate Alerts** ⛈️
- Enter city name
- Get real-time weather from API
- See smart alerts (heatwave, frost, drought)

### 4. **Community Hub** 👥
- Create posts locally
- Edit/delete your posts
- See community stats

### 5. **Dashboard** 📊
- View all your data at once
- Multiple chart types
- Statistics cards

### 6. **Settings** ⚙️
- Dark/Light theme toggle
- Language (English/Hindi)
- Export/Import data
- Clear all data

## 💾 Data Storage

**All data stored in browser:**
- Crop recommendations
- Water calculations
- Community posts
- User settings

**No backend required!**

## 🔑 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Route definitions |
| `src/utils/storage.js` | LocalStorage wrapper |
| `src/data/cropRules.json` | Crop data |
| `src/data/waterUsageRules.json` | Water calculations |
| `public/sw.js` | Service worker (offline) |
| `public/manifest.json` | PWA config |

## ✨ Customization

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#10b981',  // Change this
      secondary: '#3b82f6',
    }
  }
}
```

### Add New Crops
Edit `src/data/cropRules.json`:
```json
{
  "name": "YourCrop",
  "soilTypes": ["loamy"],
  "locations": ["north"],
  "waterLevel": "medium"
}
```

### Change Language
Add to `src/pages/Settings.jsx`:
```js
const translations = {
  en: { /* English */ },
  hi: { /* Hindi */ },
  // Add your language here
}
```

## 🧪 Testing Features

### Test Crop Recommendation
1. Go to Crop Advisor page
2. Select: Loamy soil, North location, Medium water
3. Should recommend: Wheat or Corn

### Test Water Calculator
1. Go to Water Usage page
2. Select: Rice, Area: 1 hectare
3. Should show: ~2.66M liters

### Test Climate Alerts
1. Go to Climate Alerts
2. Enter city: "Mumbai"
3. Should show current weather + alerts

### Test Community
1. Go to Community Hub
2. Create a post
3. Should appear immediately
4. Edit/delete your post

### Test Dark Mode
1. Click moon icon in navbar
2. All pages should switch theme
3. Refresh - theme persists

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Styles not loading?
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Build errors?
```bash
# Check for syntax errors
npm run lint

# Clear cache and rebuild
npm run build
```

## 📊 Key Concepts

### Storage Pattern
```js
import { storage } from '../utils/storage';

// Save
storage.set('key', data);

// Get
const data = storage.get('key', defaultValue);

// Delete
storage.remove('key');
```

### Validation Pattern
```js
import { validation } from '../utils/validation';

if (validation.isNotEmpty(value)) {
  // Valid
}
```

### Component Pattern
```jsx
// All pages accept isDarkMode prop
<Home isDarkMode={isDarkMode} />
```

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repo"

# Build and deploy
npm run build
# Upload dist/ folder
```

### Deploy to Netlify
1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

## 📝 Tips & Tricks

### Enable Notifications
```js
// In Settings, toggle notifications ON
// Then use in any component:
const { addNotification } = useNotification();
addNotification("Success!", "success");
```

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`
3. Add navbar link in `Navbar.jsx`

### Style New Component
- Use Tailwind classes
- Import `isDarkMode` prop
- Use dark: prefix for dark mode

### Test Offline
1. Run `npm run build`
2. Run `npm run preview`
3. Open DevTools → Application → Service Workers
4. Check "Offline"
5. App still works!

## 🎓 Learning Resources

- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Recharts**: https://recharts.org
- **HeroIcons**: https://heroicons.com

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with clear message
5. Push and create PR

## ✅ Development Checklist

- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts server
- [ ] All pages load
- [ ] Dark mode toggle works
- [ ] Forms submit
- [ ] Data saves to storage
- [ ] Charts display
- [ ] PWA installable
- [ ] `npm run build` succeeds
- [ ] No console errors

## 📞 Get Help

- Check README.md for detailed docs
- Review UX_IMPROVEMENTS.md for features
- Look at component examples
- Check data files for structure
- Run lint: `npm run lint`

## 🎉 You're Ready!

Everything is set up and ready to customize. Happy coding! 🚀

**Questions?** Check the documentation files or review the component code - it's well commented!
