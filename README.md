# Flaming - Futuristic Developer Portfolio

A cutting-edge, interactive developer portfolio showcasing modern web technologies with immersive 3D visuals and real GitHub integration.

## 🎨 Features

### **3D Graphics & Animations**
- **Three.js 3D Scene**: Cosmic galaxy with rotating wireframe sphere
- **Particle Effects**: Dynamic floating particles with depth
- **Smooth Animations**: GSAP-powered animations for seamless interactions
- **Glassmorphism Design**: Modern frosted glass effect with neon accent colors

### **GitHub Integration**
- **Live Project Fetching**: Auto-loads projects from GitHub profile
- **Smart Filtering**: Filter projects by stars, recent updates, or view all
- **Dynamic Cards**: Detailed project information with language tags and stats
- **Direct Links**: Easy access to GitHub repositories

### **Modern UI/UX**
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Responsive Design**: Fully responsive on desktop, tablet, and mobile
- **Smooth Scrolling**: Silky scroll navigation with GSAP
- **Floating Action Button**: Smart scroll-to-top button with lazy loading
- **Ripple Effects**: Interactive button feedback with ripple animations

### **Developer Experience**
- **Clean Code**: Well-organized, commented code structure
- **Performance**: Optimized animations and lazy loading
- **SEO Ready**: Semantic HTML and accessibility features
- **Keyboard Shortcuts**: ESC to scroll top, T to toggle theme

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **3D Graphics**: Three.js (v128)
- **Animations**: GSAP (v3.12.2) with ScrollToPlugin
- **Icons**: FontAwesome (v6.4.0)
- **Fonts**: Google Fonts (Poppins, Space Mono)
- **API**: GitHub REST API v3

## 📁 Project Structure

```
ProtFolio/
├── index.html       # Main HTML structure
├── style.css        # Complete styling with animations
├── script.js        # Three.js, GitHub API, interactivity
└── README.md        # This file
```

## 🚀 Features in Detail

### Three.js 3D Scene
- Cosmic galaxy background with 1000 stars
- Central rotating wireframe icosahedron
- Ambient and point lighting for depth
- Responsive canvas that resizes with window

### GitHub API Integration
```javascript
// Fetches projects from FlamingSlayer
const GITHUB_API = 'https://api.github.com/users/FlamingSlayer/repos';
```
- Displays: Name, Description, Stars, Language, Forks, Watchers
- Filter options: All Projects, ⭐ Starred, 📅 Recent
- Language-specific icons for visual appeal

### Contact Form
- Full validation for name, email, message
- Form submission handling with notifications
- Input sanitization for security

## 🎯 Browser Support
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/FlamingSlayer/ProtFolio.git
cd ProtFolio
```

2. Open in browser:
```bash
# Simply open index.html in your browser
start index.html  # Windows
open index.html   # macOS
```

3. No build process or dependencies required!

## 📊 GitHub Integration

The portfolio automatically fetches your latest projects from GitHub. To use with your own GitHub profile:

1. Update the GitHub username in `script.js`:
```javascript
const GITHUB_USERNAME = 'YourUsername';
const GITHUB_API = 'https://api.github.com/users/YourUsername/repos';
```

## 🎨 Customization

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #00f0ff;      /* Cyan */
    --secondary: #ff006e;    /* Pink */
    --accent: #8338ec;       /* Purple */
}
```

### Modify 3D Scene
Edit `createGalaxy()` and `createParticleField()` in `script.js`:
- Add more stars
- Change colors and sizes
- Adjust rotation speeds

### Update Personal Info
Edit contact section in `index.html`:
- Email
- GitHub links
- Social media profiles

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle dark/light theme |
| `ESC` | Scroll to top |

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Performance

- **Lazy Loading**: Images and components load on demand
- **Optimized Animations**: 60fps performant animations
- **Minimal Dependencies**: Only essential libraries loaded
- **Cached Data**: GitHub data fetched once per session

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vidhyan Jha**
- GitHub: [@FlamingSlayer](https://github.com/FlamingSlayer)
- Email: vidhyanjha@gmail.com
- LinkedIn: [Vidhyan Jha](https://www.linkedin.com/in/vidhyanjha)
- Instagram: [@flaming_slayer_7](https://www.instagram.com/flaming_slayer_7/)

## 🎓 Educational Value

This portfolio is a great example of:
- Modern web design principles
- Three.js 3D graphics implementation
- Third-party API integration
- Responsive design patterns
- JavaScript best practices
- CSS animations and transitions
- GitHub API usage

## 🤝 Contributing

Feel free to fork this project and make improvements!

## 📞 Support

For issues or questions, please create an issue on GitHub.

---

**Built with ❤️ by Flaming** | *"Crafting Efficient and Dynamic Web Experiences"*
