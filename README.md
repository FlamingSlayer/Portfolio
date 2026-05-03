# 🎨 Portfolio - Futuristic Developer Portfolio

A stunning, interactive portfolio showcasing modern web technologies with 3D graphics, smooth animations, and real-time GitHub integration.

**[🌐 Live Demo](https://flamingprotfolio.netlify.app/) | [📧 Contact](https://t.me/FlamingSlayer_Bot) | [⭐ GitHub](https://github.com/FlamingSlayer)**

![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-v128-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## ✨ Features

- **Cosmic 3D Galaxy**: Rotating galaxy with 1000+ stars using Three.js
- **Live GitHub Integration**: Auto-fetch and display your repositories
- **Smart Project Filtering**: Filter projects by starred, recent, or view all
- **Smooth Animations**: GSAP-powered smooth transitions
- **Dark/Light Theme**: Toggle theme with localStorage persistence
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Glassmorphism Design**: Modern frosted glass effect with neon colors

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure |
| **CSS3** | Styling & animations |
| **JavaScript ES6+** | Interactivity |
| **Three.js v128** | 3D graphics |
| **GSAP v3.12.2** | Smooth animations |
| **FontAwesome 6.4.0** | Icons |
| **GitHub API** | Project data |

---

## 📁 Project Structure

```
Portfolio/
├── index.html       # Main HTML file
├── style.css        # All styling & animations
├── script.js        # Three.js, GitHub API, interactions
├── README.md        # Documentation
└── .gitignore       # Git rules
```

---

## 🚀 Quick Start

### 1️⃣ Clone Repository
```bash
git clone https://github.com/FlamingSlayer/Portfolio.git
cd Portfolio
```

### 2️⃣ Open in Browser
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 3️⃣ Customize for Your GitHub
Edit `script.js`:
```javascript
const GITHUB_USERNAME = 'YourUsername';
const GITHUB_API = 'https://api.github.com/users/YourUsername/repos';
```

### 4️⃣ Update Personal Info
Edit `index.html` - Update your email, GitHub, LinkedIn, Instagram links

### 5️⃣ Change Colors (Optional)
Edit `style.css` - Modify CSS variables:
```css
:root {
    --primary: #00f0ff;      /* Cyan */
    --secondary: #ff006e;    /* Pink */
    --accent: #8338ec;       /* Purple */
}
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `T` | Toggle Dark/Light Theme |
| `ESC` | Scroll to Top |

---

## 📊 GitHub API Integration

Projects auto-fetch from your GitHub profile:
```
Endpoint: https://api.github.com/users/YourUsername/repos
Features: Auto-load, filtering by stars/recent, language tags
```

---

## 🎨 Customization

### Change 3D Scene
Edit `createGalaxy()` in `script.js`:
- Modify star count (currently 1000)
- Change star colors
- Adjust rotation speed

### Modify Theme Colors
Edit CSS variables in `:root`:
```css
--primary: #00f0ff;      /* Main color */
--secondary: #ff006e;    /* Accent color */
--accent: #8338ec;       /* Highlight color */
```

### Update Contact Info
Edit contact section in `index.html`:
- Email address
- Phone (optional)
- Location
- Social media links

---

## 📱 Responsive Design

| Device | Breakpoint | Features |
|--------|-----------|----------|
| Desktop | 1200px+ | Full layout |
| Tablet | 768px - 1199px | Optimized grid |
| Mobile | < 768px | Single column |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| 3D scene not loading | Check Three.js CDN is accessible |
| Projects not showing | Verify GitHub username is correct |
| GitHub API error | Check rate limit (60 req/hour) |
| Theme not saving | Clear browser cache/LocalStorage |
| Mobile unresponsive | Enable JavaScript in browser |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 🙏 Acknowledgments

- Three.js team for 3D graphics library
- GSAP for smooth animations
- GitHub for API and hosting
- FontAwesome for icons
- Google Fonts for typography

---

## 📄 License

This project is open source under the **MIT License**.

---

## 👨‍💻 Author

**Vidhyan Jha** (FlamingSlayer)

- 🎓 3rd Year B.E. (Information Technology) Student
- 💻 Full-Stack Developer
- 🔗 **GitHub**: [@FlamingSlayer](https://github.com/FlamingSlayer)
- 📧 **Email**: vidhyanjha12345@gmail.com
- 💼 **LinkedIn**: [Vidhyan Jha](https://www.linkedin.com/in/vidhyanjha)
- 📸 **Instagram**: [@flaming_slayer_7](https://www.instagram.com/flaming_slayer_7/)

---

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/FlamingSlayer/Portfolio/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/FlamingSlayer/Portfolio/discussions)
- 📧 **Email**: vidhyanjha12345@gmail.com

---

**Built with ❤️ by Vidhyan Jha** | *"Crafting Efficient and Dynamic Web Experiences"*

If you find this helpful, please star ⭐ this repository!
