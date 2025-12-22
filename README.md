# My Portfolio

A modern, responsive portfolio website built with React and Vite.

## Features

- 🎨 Modern and beautiful UI design
- 📱 Fully responsive (works on all devices)
- ⚡ Fast loading with Vite
- 🎯 Smooth scrolling navigation
- 📧 Contact form
- 🌈 Gradient animations and effects

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` folder. You can preview the production build with:

```bash
npm run preview
```

## Customization

### Update Your Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Change "Your Name" to your actual name
   - Update the subtitle and description

2. **About Section** (`src/components/About.jsx`):
   - Update the about text
   - Modify the stats (projects, experience, clients)

3. **Skills Section** (`src/components/Skills.jsx`):
   - Add or remove skills
   - Update skill categories

4. **Projects Section** (`src/components/Projects.jsx`):
   - Replace with your actual projects
   - Add project links and GitHub repositories

5. **Contact Section** (`src/components/Contact.jsx`):
   - Update email, phone, and location
   - Connect the form to a backend service (currently shows an alert)

6. **Footer** (`src/components/Footer.jsx`):
   - Update social media links
   - Change copyright text

### Styling

- Main colors are defined in `src/index.css` as CSS variables
- Each component has its own CSS file for styling
- You can easily change colors by modifying the CSS variables

## Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## License

This project is open source and available for personal use.

