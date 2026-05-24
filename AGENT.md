Build me a beautiful, modern, interactive graduation congratulations webpage.

This should be a single-page website that I can deploy on GitHub Pages, Netlify, or Vercel and send to my friend as a link.

Purpose:
A close friend I have known for over 5 years recently graduated college. I want to make something personal, cute, funny, and meaningful. It should feel like a small digital gift, not a generic greeting card.

Project name:
graduation-surprise

General style:
- Modern, polished, premium-looking design
- Cute graduation celebration theme
- Warm, emotional, and slightly funny
- Mobile responsive
- Smooth animations
- Fun interactive elements
- Use a black, gold, cream, and soft pastel color palette
- Make it feel joyful but not childish
- Avoid anything too cringe or overly dramatic
- The final feeling should be: “funny at first, beautiful in the middle, heartfelt at the end”

Tech requirements:
- Build with React
- Use Tailwind CSS
- Use Framer Motion for animations
- Use canvas-confetti or a similar lightweight confetti library
- Optional: Use React Three Fiber / Three.js only if it improves the page without making it too complicated
- Keep the code clean and easy to customize
- Make it easy to change:
  - friend’s name
  - graduation year
  - personal message
  - sender name
  - button text
  - colors
- Add comments in the code where I should customize things
- Make the app deployable on GitHub Pages, Netlify, or Vercel

Important placeholders:
FRIEND_NAME = "Graduate"
GRAD_YEAR = "2026"
SENDER_NAME = "Your Friend"

Page flow:

1. Opening/loading screen:
Create a short animated intro before the main page appears.

Use rotating/fading lines like:
- “Loading celebration…”
- “Verifying diploma energy…”
- “Calculating future success…”
- “Confirming main character status…”

After a few seconds, smoothly reveal the main page.

2. Main hero section:
Show a beautiful graduation-themed scene.

Include:
- Floating balloons
- Falling confetti or sparkles
- Floating graduation caps
- A nice 3D-style graduation cap or diploma illustration
- Big title:
  “Congratulations, [FRIEND_NAME]! 🎓”
- Subtitle:
  “You did it. You survived the deadlines, the exams, the group projects, and everything in between.”

Make the hero section visually impressive.

3. Personal message card:
Create a card that slightly tilts with mouse movement on desktop.
On mobile, use a gentle floating animation instead.

The card should say:

“Over 5 years of friendship, and I’m still so proud of you. Watching you reach this moment makes me genuinely happy. I hope this next chapter brings you success, peace, happiness, and everything you have been working toward. You deserve all of it.”

Make this part feel sincere and warm.

4. Funny interaction section:
Add this question:

“Do you officially accept being celebrated today?”

Add two buttons:

Button 1:
“YES, I am iconic ✨”

Button 2:
“No, I refuse 😤”

The second button should run away when the user tries to hover over it or click it.

The runaway button should move to random safe positions on the screen and change its text randomly each time.

Use these funny text options:
- “Too slow 😭”
- “Not ready”
- “My GPA said no”
- “Still recovering from finals”
- “Catch me first”
- “Absolutely not”
- “Not ready”

Make sure the runaway button works on desktop and mobile.

5. When the user clicks “Yes, you may 🥹”:
Trigger a big confetti explosion.

Then show a beautiful modal or section with a fake certificate.

Certificate text:

“Certificate of Absolute Greatness”

“Awarded to: [FRIEND_NAME]”

“For officially surviving college, deadlines, exams, group projects, and suspicious levels of stress.”

“Class of [GRAD_YEAR]”

At the bottom:
“Signed: [SENDER_NAME]”

Make the certificate look elegant, like black/gold/cream paper with nice borders.

6. Final message after certificate:
Show a final heartfelt/funny message:

“May your future be bright, your happiness be loud, your peace be protected, and your bank account stop playing games.”

Then add:

“I’m really proud of you. Congratulations again 🎓”

7. Graduate fortune feature:
Add a small interactive feature with a button:

“Reveal your graduate fortune 🔮”

When clicked, show a random message from this list:
- “A suspiciously good opportunity is coming your way.”
- “LinkedIn is not ready for your success.”
- “Your future self is already proud of you.”
- “Main character era: officially activated.”
- “You are about to succeed aggressively.”
- “Your hard work is about to pay you back.”
- “Peace, success, and better sleep are loading.”

The fortune should animate in nicely.

8. Optional music/sound:
Add a small button:
“Play celebration sound 🎶”

Do not autoplay audio.
Use a simple celebration sound effect if available, or create a placeholder where I can add an audio file later.

9. Design details:
- Background should feel dreamy and celebratory
- Use layered gradients
- Use soft shadows
- Use glassmorphism cards if it looks good
- Use small animated sparkles
- Use tasteful emojis
- Add hover effects on buttons
- Add smooth page transitions
- Add responsive design for phone screens
- Make sure text is readable

10. Deployment:
Include clear instructions in the README for:
- Installing dependencies
- Running locally
- Building the project
- Deploying to GitHub Pages, Netlify, or Vercel

Create a README.md with:
- Project name: graduation-surprise
- Description: A custom interactive graduation surprise webpage
- How to customize the friend name/message
- How to deploy

Deliverables:
- Complete working React project
- Clean folder structure
- package.json
- README.md
- All necessary components
- Responsive styling
- No broken imports
- No placeholder errors
- The final site should be ready to deploy

Before finishing:
Review the UI like a senior frontend designer.
Improve:
- spacing
- colors
- animations
- mobile layout
- button behavior
- emotional tone
- overall wow factor

Make the final result feel unique, memorable, and personal.