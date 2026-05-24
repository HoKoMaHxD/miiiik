import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { surpriseConfig as config } from './config';

const capPositions = [
  { left: '8%', delay: 0, size: 46 },
  { left: '24%', delay: 4, size: 32 },
  { left: '53%', delay: 1.8, size: 40 },
  { left: '76%', delay: 5.4, size: 34 },
  { left: '91%', delay: 2.7, size: 48 },
];

const sparklePositions = [
  ['12%', '22%', 'bg-champagne'],
  ['86%', '28%', 'bg-blush'],
  ['26%', '70%', 'bg-mint'],
  ['72%', '78%', 'bg-lavender'],
  ['44%', '18%', 'bg-white'],
  ['58%', '62%', 'bg-champagne'],
];

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [fortune, setFortune] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 4300);
    return () => window.clearTimeout(timer);
  }, []);

  const celebrate = () => {
    setAccepted(true);
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.62 },
      colors: [config.colors.gold, config.colors.blush, config.colors.mint, '#11100d', '#ffffff'],
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.75 },
        colors: [config.colors.gold, config.colors.cream, config.colors.blush],
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.75 },
        colors: [config.colors.gold, config.colors.cream, config.colors.mint],
      });
    }, 220);
  };

  const revealFortune = () => {
    let next = randomFrom(config.fortunes);
    if (next === fortune && config.fortunes.length > 1) {
      next = randomFrom(config.fortunes.filter((item) => item !== fortune));
    }
    setFortune(next);
  };

  const playCelebration = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audio = new AudioContext();
    const now = audio.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((frequency, index) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = index % 2 ? 'triangle' : 'sine';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.18, now + index * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 0.32);
      osc.connect(gain).connect(audio.destination);
      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.34);
    });
  };

  return (
    <main className="dream-bg relative min-h-screen overflow-hidden text-ink">
      <AnimatePresence>{!introDone && <IntroScreen />}</AnimatePresence>

      <FloatingScene />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        aria-hidden={!introDone}
      >
        <Hero onCelebrate={celebrate} />
        <PersonalMessage />
        <CelebrationChoice onCelebrate={celebrate} />
        <AnimatePresence>
          {accepted && <Certificate onClose={() => setAccepted(false)} />}
        </AnimatePresence>
        <FinalMessage
          fortune={fortune}
          onRevealFortune={revealFortune}
          onPlayCelebration={playCelebration}
        />
      </motion.div>
    </main>
  );
}

function IntroScreen() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % config.loadingLines.length);
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="fixed inset-0 z-50 grid place-items-center bg-ink text-parchment"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="relative w-full max-w-sm px-6 text-center">
        <motion.div
          className="mx-auto mb-8 h-20 w-20 rounded-full border border-champagne/45 bg-champagne/10 shadow-glow"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.4, ease: 'linear', repeat: Infinity }}
        >
          <div className="mx-auto mt-7 h-6 w-12 rotate-[-12deg] bg-champagne shadow-lg" />
          <div className="mx-auto h-2 w-3 rounded-full bg-parchment" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            className="safe-word text-xl font-bold tracking-normal sm:text-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            {config.loadingLines[lineIndex]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-champagne"
            initial={{ width: '8%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.section>
  );
}

function FloatingScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {sparklePositions.map(([left, top, color], index) => (
        <span
          key={`${left}-${top}`}
          className={`absolute h-2.5 w-2.5 rotate-45 ${color} shadow-glow animate-sparkle`}
          style={{ left, top, animationDelay: `${index * 0.35}s` }}
        />
      ))}

      {capPositions.map((cap) => (
        <GraduationCap
          key={`${cap.left}-${cap.delay}`}
          className="absolute animate-drift opacity-55"
          style={{
            left: cap.left,
            top: '-10vh',
            width: cap.size,
            height: cap.size,
            animationDelay: `${cap.delay}s`,
            animationDuration: `${15 + cap.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero({ onCelebrate }) {
  return (
    <section className="relative z-10 flex min-h-screen items-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-ink/10 bg-white/45 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.18em] text-espresso shadow-soft">
            Class of {config.graduationYear}
          </p>
          <h1 className="safe-word font-display text-5xl font-extrabold leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
            {config.heroTitlePrefix},{' '}
            <span className="gold-text">{config.friendName}!</span>
            <span className="ml-2 inline-block">🎓</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-espresso/82 sm:text-xl">
            {config.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#message"
              className="rounded-lg border border-ink/15 bg-white/55 px-6 py-4 text-center text-base font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-champagne/40"
            >
              Read the note
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[520px]"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="absolute inset-4 rounded-full bg-champagne/25 blur-3xl" />
          <div className="glass-panel relative flex h-full items-center justify-center rounded-lg p-6">
            <BalloonCluster />
            <Diploma />
            <GraduationCap className="absolute left-1/2 top-[44%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72" />
            <div className="absolute bottom-8 left-1/2 w-[86%] -translate-x-1/2 rounded-lg border border-white/70 bg-white/55 px-5 py-4 text-center shadow-soft">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-espresso/70">
                Officially legendary
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-ink">
                {config.graduationYear}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BalloonCluster() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      {[
        ['left-[10%] top-[13%] bg-blush', 'h-20 w-16', '0s'],
        ['right-[13%] top-[10%] bg-mint', 'h-24 w-20', '0.6s'],
        ['right-[23%] top-[26%] bg-lavender', 'h-16 w-14', '1s'],
      ].map(([position, size, delay]) => (
        <div
          key={position}
          className={`absolute ${position} ${size} animate-floaty rounded-[50%] shadow-soft`}
          style={{ animationDelay: delay }}
        >
          <span className="absolute bottom-[-38px] left-1/2 h-10 w-px -translate-x-1/2 bg-ink/20" />
        </div>
      ))}
    </div>
  );
}

function Diploma() {
  return (
    <div
      className="absolute bottom-[30%] right-[13%] h-20 w-40 rotate-[-11deg] rounded-lg border border-ink/10 bg-parchment shadow-soft"
      aria-hidden="true"
    >
      <div className="absolute inset-x-4 top-5 h-1 rounded-full bg-ink/12" />
      <div className="absolute inset-x-6 top-9 h-1 rounded-full bg-ink/10" />
      <div className="absolute right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-champagne shadow-soft" />
      <div className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-ink" />
    </div>
  );
}

function GraduationCap({ className = '', style }) {
  return (
    <div className={className} style={style} aria-hidden="true">
      <div className="relative h-full w-full animate-floaty">
        <div className="cap-top absolute left-[9%] top-[13%] h-[42%] w-[82%] rounded-md bg-ink shadow-soft">
          <div className="absolute inset-[8%] rounded-sm border border-champagne/35" />
        </div>
        <div className="absolute left-[27%] top-[47%] h-[20%] w-[46%] rounded-b-lg bg-espresso shadow-soft" />
        <div className="absolute left-1/2 top-[35%] h-3 w-3 -translate-x-1/2 rounded-full bg-champagne shadow-glow" />
        <div className="absolute left-1/2 top-[37%] h-[35%] w-1 origin-top rotate-[28deg] bg-champagne" />
        <div className="absolute left-[66%] top-[67%] h-[19%] w-[8%] rounded-full bg-champagne shadow-glow" />
      </div>
    </div>
  );
}

function PersonalMessage() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 });

  const handleMove = (event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="message" className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-espresso/65">
            Five years later
          </p>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl">
            The funny part is how obvious this was.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-espresso/78">
            Some people hope for greatness. Some people keep showing up until it has no choice but to learn their name.
          </p>
        </div>

        <motion.article
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={resetTilt}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="glass-panel rounded-lg p-6 shadow-soft sm:p-9"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-lg border border-champagne/55 bg-parchment/75 p-6 sm:p-8">
            <p className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Dear {config.friendName},
            </p>
            <p className="mt-6 text-lg leading-9 text-espresso/86">{config.personalMessage}</p>
            <p className="mt-8 text-right font-display text-2xl font-extrabold text-ink">
              {config.senderName}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function CelebrationChoice({ onCelebrate }) {
  const stageRef = useRef(null);
  const [position, setPosition] = useState({ x: 55, y: 118 });
  const [rejectText, setRejectText] = useState(config.rejectButtonText);

  const moveButton = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const maxX = Math.max(bounds.width - 190, 8);
    const maxY = Math.max(bounds.height - 58, 8);
    setPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    });
    setRejectText(randomFrom(config.runawayTexts));
  };

  return (
    <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="safe-word font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {config.acceptQuestion}
        </motion.h2>

        <div
          ref={stageRef}
          className="relative mx-auto mt-10 h-64 max-w-2xl rounded-lg border border-ink/10 bg-white/42 shadow-soft backdrop-blur"
        >
          <button
            type="button"
            onClick={onCelebrate}
            className="absolute left-1/2 top-10 w-[min(86%,260px)] -translate-x-1/2 rounded-lg bg-ink px-5 py-4 text-base font-extrabold text-parchment shadow-soft transition hover:-translate-y-0.5 hover:bg-espresso focus:outline-none focus:ring-4 focus:ring-champagne/50"
          >
            {config.acceptButtonText} ✨
          </button>

          <motion.button
            type="button"
            onPointerEnter={moveButton}
            onPointerDown={moveButton}
            onFocus={moveButton}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
            className="absolute left-0 top-0 min-h-12 w-[min(178px,44vw)] rounded-lg border border-ink/12 bg-white px-4 py-3 text-sm font-extrabold text-espresso shadow-soft focus:outline-none focus:ring-4 focus:ring-blush/40"
          >
            {rejectText} 😤
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function Certificate({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 grid place-items-center bg-ink/72 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Graduation certificate"
      onClick={onClose}
    >
      <motion.div
        className="certificate-paper relative w-full max-w-3xl rounded-lg border-8 border-double border-ink p-5 shadow-glow sm:p-10"
        initial={{ opacity: 0, y: 40, scale: 0.92, rotate: -1 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg bg-ink px-3 py-1.5 text-sm font-extrabold text-parchment shadow-soft focus:outline-none focus:ring-4 focus:ring-champagne/50"
          aria-label="Close certificate"
        >
          ×
        </button>
        <div className="rounded-lg border border-champagne/80 px-5 py-10 text-center sm:px-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-espresso/70">
            This certifies that
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink sm:text-6xl">
            {config.certificateTitle}
          </h2>
          <p className="mt-8 text-lg font-bold text-espresso/75">Awarded to:</p>
          <p className="safe-word mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            {config.friendName}
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-espresso/82">
            {config.certificateReason}
          </p>
          <p className="mt-8 text-2xl font-extrabold text-ink">
            Class of {config.graduationYear}
          </p>
          <div className="mx-auto mt-8 h-px max-w-sm bg-ink/25" />
          <p className="mt-4 font-display text-2xl font-extrabold text-ink">
            Signed: {config.senderName}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FinalMessage({ fortune, onRevealFortune, onPlayCelebration }) {
  return (
    <section className="relative z-10 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="glass-panel rounded-lg px-5 py-10 sm:px-10 sm:py-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            {config.finalMessage}
          </p>
          <p className="mt-7 text-xl font-extrabold text-espresso/80">
            {config.finalSignature} 🎓
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRevealFortune}
              className="rounded-lg bg-champagne px-5 py-4 text-base font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-[#ffe58b] focus:outline-none focus:ring-4 focus:ring-ink/15"
            >
              Reveal your graduate fortune 🔮
            </button>
            <button
              type="button"
              onClick={onPlayCelebration}
              className="rounded-lg border border-ink/12 bg-white/70 px-5 py-4 text-base font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blush/35"
            >
              Play celebration sound 🎶
            </button>
          </div>

          <AnimatePresence mode="wait">
            {fortune && (
              <motion.p
                key={fortune}
                className="safe-word mx-auto mt-8 max-w-2xl rounded-lg border border-ink/10 bg-white/58 px-5 py-5 text-lg font-bold leading-8 text-espresso shadow-soft"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
              >
                {fortune}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default App;
