import { useEffect, useRef, useState } from 'react';
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
  const [celebrated, setCelebrated] = useState(false);
  const [celebrationBurstId, setCelebrationBurstId] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 4300);
    return () => window.clearTimeout(timer);
  }, []);

  const celebrate = () => {
    setCelebrated(true);
    setCelebrationBurstId((current) => current + 1);
    confetti({
      particleCount: 150,
      spread: 84,
      origin: { y: 0.62 },
      colors: [config.colors.gold, config.colors.blush, config.colors.mint, '#11100d', '#ffffff'],
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 64,
        angle: 60,
        spread: 66,
        origin: { x: 0, y: 0.75 },
        colors: [config.colors.gold, config.colors.cream, config.colors.blush],
      });
      confetti({
        particleCount: 64,
        angle: 120,
        spread: 66,
        origin: { x: 1, y: 0.75 },
        colors: [config.colors.gold, config.colors.cream, config.colors.mint],
      });
    }, 220);
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
        <Hero />
        <PersonalMessage />
        <CelebrationChoice
          onCelebrate={celebrate}
          celebrated={celebrated}
          celebrationBurstId={celebrationBurstId}
        />
        <FinalMessage />
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
      className="dream-bg fixed inset-0 z-50 grid place-items-center overflow-hidden px-4 text-ink"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="absolute left-[12%] top-[18%] h-2 w-2 rotate-45 bg-champagne shadow-glow" />
      <div className="absolute right-[16%] top-[20%] h-3 w-3 rotate-45 bg-blush shadow-soft" />
      <div className="absolute bottom-[20%] left-[20%] h-2.5 w-2.5 rotate-45 bg-mint shadow-soft" />
      <div className="absolute bottom-[15%] right-[24%] h-2 w-2 rotate-45 bg-lavender shadow-soft" />

      <div className="relative w-full max-w-xl text-center">
        <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-espresso/62">
          A little graduation note is opening
        </p>

        <div className="relative mx-auto mb-8 h-72 w-full max-w-sm">
          <motion.div
            className="absolute left-1/2 top-4 h-44 w-64 -translate-x-1/2 rounded-lg border border-ink/10 bg-white/82 p-5 text-left shadow-soft"
            initial={{ y: 78, rotate: -2, opacity: 0.75 }}
            animate={{ y: [78, 14, 18], rotate: [-2, 1, 0], opacity: 1 }}
            transition={{ duration: 3.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-espresso/58">
              For {config.friendName}
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold leading-none text-ink">
              خريجة {config.graduationYear}
            </p>
            <div className="mt-5 space-y-2">
              <span className="block h-2 w-full rounded-full bg-champagne/70" />
              <span className="block h-2 w-4/5 rounded-full bg-blush/45" />
              <span className="block h-2 w-2/3 rounded-full bg-mint/50" />
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 h-36 w-72 -translate-x-1/2 overflow-hidden rounded-lg border border-ink/10 bg-champagne shadow-soft">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-parchment" />
            <div
              className="absolute left-1/2 top-[-54px] h-40 w-40 -translate-x-1/2 rotate-45 rounded-md bg-[#f2cf69]"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#ead096]/80" />
            <div className="absolute bottom-8 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border-4 border-parchment bg-ink shadow-soft">
              <span className="absolute left-1/2 top-1/2 block h-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne" />
            </div>
          </div>

          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-parchment shadow-soft"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            sealed with hype
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            className="safe-word mx-auto min-h-16 max-w-md font-display text-3xl font-extrabold leading-tight tracking-normal text-ink sm:text-5xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            {config.loadingLines[lineIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="mx-auto mt-7 h-2 max-w-xs overflow-hidden rounded-full bg-white/70 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-ink"
            initial={{ width: '8%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
          />
        </div>

        <p className="mt-4 text-sm font-bold text-espresso/62">Almost ready...</p>
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

function Hero() {
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
            خريجة {config.graduationYear}
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
              اقرأي الملاحظة.
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
                صرتي أسطورة رسمياً!
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
  const balloons = [
    { position: 'left-[10%] top-[13%]', color: 'bg-blush', size: 'h-20 w-16', delay: '0s' },
    { position: 'right-[13%] top-[10%]', color: 'bg-mint', size: 'h-24 w-20', delay: '0.6s' },
    { position: 'right-[23%] top-[26%]', color: 'bg-lavender', size: 'h-16 w-14', delay: '1s' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      {balloons.map((balloon, index) => (
        <motion.div
          key={balloon.position}
          className={`absolute ${balloon.position} ${balloon.size} ${balloon.color} rounded-[50%] shadow-soft`}
          animate={{ opacity: 1, scale: [1, 1.05, 1], y: [0, -10, 0] }}
          transition={{ duration: 4.2, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute left-[28%] top-[20%] h-5 w-3 rounded-full bg-white/55 blur-[1px]" />
          <span className="absolute bottom-[-38px] left-1/2 h-10 w-px -translate-x-1/2 bg-ink/20" />
        </motion.div>
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
            ملاحظة عالسريع
          </p>
          <div className="max-w-xl space-y-5 text-xl font-semibold leading-9 text-espresso/82 sm:text-2xl sm:leading-10">
            <p>صح إن الحياة تتغير والناس تلهى بمشاغلها، بس هذا الإنجاز يظل عظيم وما يمر مرور الكرام.</p>
            <p>فرحتي لك كبيرة، وهذي طريقتي البسيطة عشان أقول لك ألف مبروك :)</p>
          </div>
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
              عزيزتي {config.friendName},
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

function CelebrationChoice({ onCelebrate, celebrated, celebrationBurstId }) {
  const stageRef = useRef(null);
  const rejectButtonRef = useRef(null);
  const [position, setPosition] = useState({ x: 55, y: 136 });
  const [rejectText, setRejectText] = useState(config.rejectButtonText);

  const moveButton = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const buttonBounds = rejectButtonRef.current?.getBoundingClientRect();
    const buttonWidth = buttonBounds?.width ?? 210;
    const buttonHeight = buttonBounds?.height ?? 64;
    const safeTop = 124;
    const padding = 10;
    const maxX = Math.max(bounds.width - buttonWidth - padding, padding);
    const maxY = Math.max(bounds.height - buttonHeight - padding, safeTop);

    setPosition({
      x: Math.floor(padding + Math.random() * (maxX - padding)),
      y: Math.floor(safeTop + Math.random() * (maxY - safeTop)),
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
          className="relative mx-auto mt-10 h-72 max-w-2xl overflow-hidden rounded-lg border border-ink/10 bg-white/42 shadow-soft backdrop-blur"
        >
          <AnimatePresence>
            {celebrationBurstId > 0 && <PartyBurst key={celebrationBurstId} />}
          </AnimatePresence>

          <button
            type="button"
            onClick={onCelebrate}
            className="absolute left-1/2 top-10 w-[min(86%,260px)] -translate-x-1/2 rounded-lg bg-ink px-5 py-4 text-base font-extrabold text-parchment shadow-soft transition hover:-translate-y-0.5 hover:bg-espresso focus:outline-none focus:ring-4 focus:ring-champagne/50"
          >
            {config.acceptButtonText} ✨
          </button>

          <AnimatePresence>
            {!celebrated && (
              <motion.button
                ref={rejectButtonRef}
                type="button"
                onPointerEnter={moveButton}
                onPointerDown={moveButton}
                onFocus={moveButton}
                animate={{ x: position.x, y: position.y }}
                exit={{ opacity: 0, scale: 0.8, y: position.y + 18 }}
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className="absolute left-0 top-0 flex h-16 w-[min(210px,54vw)] items-center justify-center rounded-lg border border-ink/12 bg-white px-4 text-center text-[13px] font-extrabold leading-tight text-espresso shadow-soft focus:outline-none focus:ring-4 focus:ring-blush/40 sm:text-sm"
              >
                {rejectText} 😤
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {celebrated && (
              <motion.div
                className="absolute inset-x-4 top-32 mx-auto max-w-sm rounded-lg border border-champagne/55 bg-parchment/88 px-5 py-5 text-center shadow-soft backdrop-blur"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
              >
                <p className="safe-word text-sm font-extrabold uppercase tracking-[0.14em] text-espresso/62">
                  قبلت
                </p>
                <p className="safe-word mt-1 text-base font-extrabold leading-6 text-ink">
                  {config.celebrationAcceptedText}
                </p>
                <p className="safe-word mt-3 text-xs font-bold leading-5 text-espresso/60">
                  {config.celebrationReplayHint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PartyBurst() {
  const items = [
    { icon: '🎈', left: '10%', delay: 0 },
    { icon: '🥳', left: '24%', delay: 0.08 },
    { icon: '🎉', left: '39%', delay: 0.16 },
    { icon: '✨', left: '56%', delay: 0.04 },
    { icon: '🎊', left: '72%', delay: 0.2 },
    { icon: '🎈', left: '86%', delay: 0.12 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <motion.span
          key={`${item.icon}-${item.left}`}
          className="absolute bottom-0 text-2xl drop-shadow-sm sm:text-3xl"
          style={{ left: item.left }}
          initial={{ opacity: 0, y: 28, scale: 0.75, rotate: -10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [28, -70, -150, -250],
            scale: [0.75, 1.2, 1.05, 0.95],
            rotate: [-10, 8, -6, 12],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, delay: item.delay, ease: 'easeOut' }}
        >
          {item.icon}
        </motion.span>
      ))}
    </div>
  );
}

function FinalMessage() {
  const [hype, setHype] = useState('');

  const generateHype = () => {
    let next = randomFrom(config.hypeMessages);
    if (next === hype && config.hypeMessages.length > 1) {
      next = randomFrom(config.hypeMessages.filter((message) => message !== hype));
    }

    setHype(next);
    confetti({
      particleCount: 42,
      spread: 52,
      startVelocity: 24,
      origin: { y: 0.78 },
      colors: [config.colors.gold, config.colors.blush, config.colors.mint, '#ffffff'],
    });
  };

  return (
    <section className="relative z-10 px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="glass-panel relative overflow-hidden rounded-lg px-6 py-10 text-center shadow-soft sm:px-12 sm:py-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute right-6 top-6 h-14 w-14 rounded-full bg-champagne/45 blur-2xl" />
          <div className="absolute bottom-5 left-8 h-20 w-20 rounded-full bg-blush/35 blur-3xl" />

          <div className="relative mx-auto max-w-xl">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-espresso/62">
              {config.hypeTitle}
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              {config.hypePrompt}
            </h2>

            <button
              type="button"
              onClick={generateHype}
              className="mt-8 rounded-lg bg-ink px-6 py-4 text-base font-extrabold text-parchment shadow-soft transition hover:-translate-y-0.5 hover:bg-espresso focus:outline-none focus:ring-4 focus:ring-champagne/50"
            >
              {config.hypeButtonText} ✨
            </button>

            <AnimatePresence mode="wait">
              <motion.p
                key={hype || 'hype-placeholder'}
                className="safe-word mx-auto mt-7 min-h-16 max-w-md rounded-lg border border-champagne/45 bg-white/58 px-5 py-5 text-2xl font-extrabold leading-tight text-ink shadow-soft sm:text-3xl"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
              >
                {hype || 'اضغطي لجرعة حماس! 🎉'}
              </motion.p>
            </AnimatePresence>

            <p className="safe-word mt-8 text-lg font-extrabold text-espresso/72">
              {config.finalCongratulations}, {config.friendName} 🎓
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default App;
