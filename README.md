# Sakhi Suraksha 🌸

A mobile application designed to promote menstrual hygiene, safety, awareness, and support for women and girls. It combines health tracking, emergency assistance, and resource accessibility into one easy-to-use app.

## 🌟 Core Features

### 1️⃣ Home Screen
- Welcoming interface with clean layout and colorful UI
- 5 clear navigation buttons to key features

### 2️⃣ Track My Cycle
- Date picker for last period tracking
- Period prediction (default: +28 days)
- Cycle phase information
- Customizable cycle length

### 3️⃣ Find Nearby Stores
- Map integration to locate pharmacies and stores
- Store information and contact details
- Distance calculation and directions

### 4️⃣ Learn Menstrual Health
- Educational content about menstrual cycles
- Hygiene tips and best practices
- Myths vs. Facts section
- Product guide and disposal methods

### 5️⃣ Emergency Help
- SOS emergency contacts
- Location sharing capabilities
- One-tap calling to trusted contacts
- Safety tips and emergency procedures

### 6️⃣ Give Feedback
- Simple feedback form
- User suggestions and issue reporting

## 🚀 Deployment Options

### Option 1: EAS Build (Recommended for App Stores)

1. **Login to Expo:**
   ```bash
   npx expo login
   ```

2. **Configure EAS:**
   ```bash
   eas build:configure
   ```

3. **Build for Android (APK):**
   ```bash
   eas build --platform android --profile preview
   ```

4. **Build for Production (App Bundle):**
   ```bash
   eas build --platform android --profile production
   ```

5. **Submit to Google Play Store:**
   ```bash
   eas submit --platform android
   ```

### Option 2: Local Development Build

1. **Install Expo Go on your device**

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Scan QR code with Expo Go app**

### Option 3: Web Deployment

1. **Build for web:**
   ```bash
   npx expo export --platform web
   ```

2. **Deploy to hosting service (Netlify, Vercel, etc.)**

## 📱 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SakhiSuraksha
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

## 🛠️ Technical Stack

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation
- **Maps:** React Native Maps
- **Icons:** Expo Vector Icons
- **Location:** Expo Location

## 📋 Permissions Required

- **Location:** To find nearby stores
- **Phone:** For emergency calls
- **SMS:** For location sharing

## 🎯 Target Audience

- Girls and young women in rural or semi-urban areas
- Schools/colleges running menstrual health awareness programs
- NGOs or government bodies focused on women's health

## 🔮 Future Enhancements

- Cycle tracking history
- Voice assistant for accessibility
- Multi-language support
- E-commerce integration
- NGO partnerships
- QR code integration in hygiene kits

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please contact the development team.

---

**Empowering women through knowledge and support** 💪 