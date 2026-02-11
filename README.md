# 🎬 Dino Ventures – Mobile-First Video Player Application

A high-performance, mobile-first video player application inspired by the YouTube mobile experience.

This project was built as part of the Dino Ventures Frontend Engineer Assignment and implements all core requirements, including gesture-based interactions, smooth transitions, custom controls, and a persistent mini-player experience.

---

# 🚀 Live Demo

🔗 https://video-player-iota-khaki.vercel.app/
video-player
 

---

# 📌 Core Requirements – Fully Implemented

## 1️⃣ Home Page – Video Feed

- Scrollable list of videos grouped by category
- Mobile-first layout
- Clean, modern UI

### Each Video Card Includes:
- Thumbnail
- Title
- Duration
- Category badge

### Interactions:
- Clicking a video opens a full-page player
- Smooth animated transition between feed and player view
- High-performance rendering for smooth scrolling

---

## 2️⃣ Full-Page Video Player

### Playback
- Auto-play on open

### Custom Controls
- Play / Pause toggle
- Skip forward (+10 seconds)
- Skip backward (-10 seconds)
- Seekable progress bar
- Current time / Total duration display

### Responsiveness
- Fully responsive (mobile + desktop)
- Optimized touch interactions

### Format Support
- MP4 video playback
- HLS support 

---

## 3️⃣ In-Player Related Video List

While a video is playing:

- Swipe up / Scroll down gesture reveals related video list
- Videos filtered dynamically by same category
- Clicking a related video:
  - Instantly switches playback
  - Auto-plays selected video
  - Updates related list if category changes
- Smooth scrolling and fluid animations

---

## 4️⃣ Drag-to-Minimize Video Player (Picture-in-App Experience)

Gesture-based interaction:

- Drag video downward to minimize
- Video shrinks and docks into bottom mini-player

### Mini-Player Features
- Small playing video preview (continues playback)
- Video title
- Play / Pause control
- Close button

### Behavior
- Mini-player persists while browsing home page
- Tap to restore full-screen player
- Smooth docking and restoration animation

---

# ⭐ Bonus Features (As Per Assignment Document)

## Auto-Play Next with Countdown
- Automatically plays next video in the same category
- 2-second countdown before switching
- Cancel option available to stop auto-play

## Virtualization / Infinite Scrolling
- Efficient rendering for large datasets
- Optimized performance for smooth scrolling
- Prevents unnecessary DOM rendering

## Browser Picture-in-Picture (PiP API)
- Official Browser Picture-in-Picture support
- Allows video to continue playing outside the app 

## Enhanced Visual Feedback
- Animated visual feedback for +10 / -10 skip actions
- Smooth micro-interactions for better UX

---

# 🎯 Technical Expectations – Addressed

- Mobile-first responsive design
- Smooth 60fps animations
- Robust gesture handling
- Clean and maintainable architecture
- Component-based structure
- Strong TypeScript typing
- Performance optimization
- Fluid UI transitions

---

# 🛠 Tech Stack

- React
- TypeScript
- Vite
- Custom CSS / Styling
- Gesture handling logic
- Modular component architecture

---

# 📂 Project Structure

```
src/
 ├── components/
 │    ├── VideoCard
 │    ├── VideoPlayer
 │    ├── MiniPlayer
 │    ├── RelatedList
 │    └── Controls
 ├── data/
 ├── types/
 ├── pages/
 └── styles/
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/jainpoornimar/video-player.git
cd video-player
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

## 4️⃣ Build for Production

```bash
npm run build
```

## 5️⃣ Preview Production Build

```bash
npm run preview
```

---

# 📈 Performance & UX Focus

- Smooth gesture-based transitions
- High frame-rate animations
- Efficient rendering strategy
- Minimal re-renders
- Seamless mobile interaction experience

---

# 👩‍💻 Author

Poornima   
Frontend Developer (React + TypeScript)

GitHub: https://github.com/jainpoornimar  
Portfolio: https://jainpoornimar.github.io/portfolio/

---

# 📄 License

Created for technical evaluation and learning purposes.
