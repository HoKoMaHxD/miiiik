# graduation-surprise

A custom interactive graduation surprise webpage built with React, Tailwind CSS, Framer Motion, and canvas-confetti.

## Customize

Edit `src/config.js` to change:

- Friend name
- Graduation year
- Sender name
- Personal message
- Button text
- Certificate copy
- Fortune messages
- Main colors

The most important placeholders are already set:

```js
friendName: 'Graduate',
graduationYear: '2026',
senderName: 'Your Friend',
```

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

The production files will be generated in `dist/`.

## Deploy

### Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Vite settings.
4. Deploy.

### Netlify

1. Push this project to GitHub.
2. Import the repository in Netlify.
3. Use `npm run build` as the build command.
4. Use `dist` as the publish directory.
5. Deploy.

### GitHub Pages

This project uses `base: './'` in `vite.config.js`, so the built files work from a GitHub Pages subpath.

1. Run `npm run build`.
2. Deploy the `dist/` folder with your preferred GitHub Pages workflow.

## Optional Sound File

The app currently creates a small celebration chime in the browser when the sound button is clicked. If you prefer a custom sound effect later, add an audio file to `public/` and update `playCelebration` in `src/App.jsx`.
