'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Menu, Clock, MapPin, Phone, Instagram, Facebook, ChevronRight, Flame, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

/* ═══════════════════════════════════════════════════════════════
   IMAGE URLs — imgur direct links (unoptimized)
   ═══════════════════════════════════════════════════════════════ */
const IMAGES = {
  logo: 'https://i.imgur.com/undefined.png',
  biscuit: 'https://i.imgur.com/lYs59d8.png',
  dirtyWaffle: 'https://i.imgur.com/7HwDSWu.png',
  fruityPebblePancakes: 'https://i.imgur.com/VAXcjcP.png',
  fruityPebbleWaffles: 'https://i.imgur.com/G9ros1o.png',
  dirtyBaconEgg: 'https://i.imgur.com/ExvzRys.png',
  dirtyGrits: 'https://i.imgur.com/N55yE9o.png',
  lambChops: 'https://i.imgur.com/OE9u0W5.png',
  shrimp: 'https://i.imgur.com/yZrySSq.png',
  texasToast: 'https://i.imgur.com/OJxx62n.png',
  dirtyWafflesFP: 'https://i.imgur.com/ocYoXO2.png',
};

const ORDER_URL = 'https://order.toasttab.com/online/dirty-breakfast';

/* ═══════════════════════════════════════════════════════════════
   FLOATING BREAKFAST EMOJIS
   ═══════════════════════════════════════════════════════════════ */
const FLOATING_EMOJIS = ['🧇', '🍳', '🥓', '🍳', '🧇', '🥞', '🫐', '🍓', '🍗', '🍳'];

function FloatingEmoji({ emoji, delay, duration, left, size }: {
  emoji: string; delay: number; duration: number; left: string; size: number;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed z-0 select-none opacity-[0.07]"
      style={{ left, fontSize: size, bottom: -40 }}
      animate={{
        y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 100 : 1200)],
        rotate: [0, 15, -10, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {emoji}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTRO ANIMATION — Logo frying + icing + site reveal
   ═══════════════════════════════════════════════════════════════ */
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'sizzle' | 'frying' | 'icing' | 'reveal'>('sizzle');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('frying'), 600);
    const t2 = setTimeout(() => setPhase('icing'), 2000);
    const t3 = setTimeout(() => setPhase('reveal'), 3400);
    const t4 = setTimeout(() => onComplete(), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D0D0D] overflow-hidden"
      animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sizzle sparks background */}
      <AnimatePresence>
        {(phase === 'sizzle' || phase === 'frying') && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-400"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${40 + Math.random() * 20}%`,
                  top: `${40 + Math.random() * 20}%`,
                }}
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], y: -(Math.random() * 80 + 40), scale: [0, 1.5, 0] }}
                transition={{ duration: 0.6, delay: i * 0.08, repeat: Infinity, repeatDelay: 0.3 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Heat glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,78,58,0.3) 0%, transparent 70%)' }}
        animate={{ scale: phase === 'frying' ? [1, 1.3, 1] : 1, opacity: phase === 'icing' ? 0 : 0.8 }}
        transition={{ duration: 1.5, repeat: phase === 'frying' ? Infinity : 0 }}
      />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Sizzle text */}
        <AnimatePresence>
          {phase === 'sizzle' && (
            <motion.p
              className="absolute -top-16 text-dirty-orange font-bold text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0.5], y: -5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              🔥 Sizzle sizzle...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Frying text */}
        <AnimatePresence>
          {phase === 'frying' && (
            <motion.p
              className="absolute -top-16 text-yellow-500 font-bold text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              🍳 Fry it up dirty!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Icing text */}
        <AnimatePresence>
          {phase === 'icing' && (
            <motion.p
              className="absolute -top-16 text-pink-300 font-bold text-sm tracking-[0.3em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              🍓 Drizzle the icing...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Logo image with frying effect */}
        <motion.div
          className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden"
          animate={
            phase === 'sizzle'
              ? { scale: [0.3, 0.5], filter: 'brightness(1)' }
              : phase === 'frying'
              ? { scale: [0.5, 1.05], filter: ['brightness(1)', 'brightness(1.3) sepia(0.4) saturate(1.5)', 'brightness(1.1) sepia(0.2) saturate(1.2)'] }
              : phase === 'icing'
              ? { scale: [1.05, 1], filter: 'brightness(1.05)' }
              : { scale: 1, filter: 'brightness(1)' }
          }
          transition={{ duration: phase === 'frying' ? 1.2 : 0.8, ease: 'easeOut' }}
        >
          <img
            src={IMAGES.logo}
            alt="Dirty Breakfast Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Frying brown overlay */}
          <AnimatePresence>
            {phase === 'frying' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-yellow-900/40 via-amber-800/30 to-orange-900/50 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Icing drips */}
        <AnimatePresence>
          {phase === 'icing' && (
            <>
              {[30, 45, 55, 70, 80].map((leftPct, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-b from-pink-300 to-pink-400 rounded-full"
                  style={{
                    left: `${leftPct}%`,
                    top: '38%',
                    width: 6 + Math.random() * 4,
                    height: 0,
                  }}
                  animate={{ height: [0, 30 + Math.random() * 50], opacity: [0.9, 0.5] }}
                  transition={{ duration: 1, delay: i * 0.12, ease: 'easeIn' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Brand name reveal */}
        <AnimatePresence>
          {(phase === 'icing' || phase === 'reveal') && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-dirty-purple via-dirty-magenta to-dirty-orange bg-clip-text text-transparent">
                DIRTY BREAKFAST
              </h1>
              <motion.p
                className="text-muted-foreground text-sm tracking-[0.3em] uppercase mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Est. 2023 • Cincinnati, OH
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom grease/butter pool */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to top, rgba(255,180,50,0.1), transparent)' }}
        animate={{ opacity: phase === 'frying' ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEAM EFFECT — for food cards
   ═══════════════════════════════════════════════════════════════ */
function SteamEffect() {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 w-3 bg-white/20 rounded-full blur-sm"
          style={{ left: `${25 + i * 25}%`, height: 20 }}
          animate={{ y: [0, -30, -50], opacity: [0, 0.5, 0], scale: [0.5, 1, 1.5] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

/* ─── Section Wrapper ─── */
function AnimatedSection({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOD IMAGE CARD — with steam & hover glow
   ═══════════════════════════════════════════════════════════════ */
function FoodCard({ src, alt, label, index = 0 }: { src: string; alt: string; label?: string; index?: number }) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/30 shadow-lg hover:shadow-[0_0_40px_rgba(106,47,191,0.4)] transition-all duration-500"
    >
      <SteamEffect />
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]">
            <span className="text-4xl">🍳</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6A2FBF]/60 via-transparent to-transparent" />
        {/* Sizzle sparks on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-yellow-300"
              style={{ left: `${15 + Math.random() * 70}%`, top: `${15 + Math.random() * 70}%` }}
              animate={{ opacity: [0, 1, 0], y: [0, -15], scale: [0.5, 1.5] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
      {label && (
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-sm font-semibold drop-shadow-lg truncate">{label}</p>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOUR ROW
   ═══════════════════════════════════════════════════════════════ */
function HourRow({ day, hours, isLate = false }: { day: string; hours: string; isLate?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${isLate ? 'bg-gradient-to-r from-dirty-purple/20 to-dirty-magenta/20 border border-dirty-purple/30' : ''}`}>
      <span className="font-semibold text-sm md:text-base">{day}</span>
      <div className="flex items-center gap-2">
        {isLate && (
          <Badge className="bg-dirty-orange text-white border-0 text-[10px] px-2 py-0">
            <Flame className="w-3 h-3 mr-1" />
            OPEN LATE
          </Badge>
        )}
        <span className={`text-sm md:text-base ${hours === 'CLOSED' ? 'text-dirty-red font-bold' : 'text-muted-foreground'}`}>
          {hours}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV LINKS
   ═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'This Is Us', href: '#about' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Brunch & Dinner', href: '#dinner' },
  { label: 'Contact Us', href: '#contact' },
];

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'menu', 'dinner', 'hours', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0D0D0D]/85 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-dirty-purple/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dirty-purple to-dirty-magenta flex items-center justify-center overflow-hidden shadow-lg shadow-dirty-purple/30 group-hover:shadow-dirty-purple/60 transition-shadow">
              {!logoError ? (
                <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover" onError={() => setLogoError(true)} />
              ) : (
                <Flame className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-wider bg-gradient-to-r from-dirty-purple via-dirty-magenta to-dirty-orange bg-clip-text text-transparent leading-tight">
                DIRTY BREAKFAST
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Est. 2023</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'text-white bg-dirty-purple/30 shadow-inner shadow-dirty-purple/20'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button asChild className="ml-3 bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full px-5 shadow-lg shadow-dirty-orange/20 hover:shadow-dirty-orange/40 transition-shadow">
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                Order Online <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#0D0D0D]/95 backdrop-blur-xl border-border/30">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-1 pt-8">
                  <div className="mb-6 flex items-center gap-2 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dirty-purple to-dirty-magenta flex items-center justify-center overflow-hidden">
                      {!logoError ? (
                        <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover" onError={() => setLogoError(true)} />
                      ) : (
                        <Flame className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-dirty-purple to-dirty-magenta bg-clip-text text-transparent">
                      DIRTY BREAKFAST
                    </span>
                  </div>
                  <Separator className="mb-4 bg-border/50" />
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <button
                        onClick={() => setTimeout(() => scrollTo(link.href), 100)}
                        className="text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-white hover:bg-dirty-purple/10 rounded-lg transition-all"
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  ))}
                  <Separator className="my-4 bg-border/50" />
                  <SheetClose asChild>
                    <Button asChild className="mx-4 bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full">
                      <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                        Order Online <ChevronRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a0a2e] to-[#0D0D0D]" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-dirty-purple/20 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-dirty-magenta/20 blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-dirty-orange/10 blur-[150px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Badge className="mb-6 bg-dirty-purple/30 text-dirty-purple border-dirty-purple/50 text-xs px-4 py-1.5">
                <Star className="w-3 h-3 mr-1" /> CINCINNATI&apos;S FAVORITE LATE-NIGHT SPOT
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
              <span className="text-white">Your Go-to Spot for</span><br />
              <span className="bg-gradient-to-r from-dirty-purple via-dirty-magenta to-dirty-orange bg-clip-text text-transparent">
                Breakfast, Brunch
              </span><br />
              <span className="text-white">&amp; Late Night Eats</span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-muted-foreground text-lg md:text-xl mb-4 max-w-xl mx-auto lg:mx-0">
              Southern cuisine made fresh daily. From sunrise to the late-night grind — we keep the kitchen hot.
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3} className="text-sm text-muted-foreground/70 mb-8 flex items-center justify-center lg:justify-start gap-2">
              <Clock className="w-4 h-4" /> Restaurant Est. 2023 — Open Late Thu-Sat
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full px-8 py-6 text-base shadow-lg shadow-dirty-orange/25 hover:shadow-dirty-orange/40 transition-shadow">
                <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                  Order Now <ChevronRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-8 py-6 text-base border-border/50 hover:bg-white/5 hover:text-white transition-all">
                View Menu
              </Button>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div variants={slideInRight} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="relative hidden lg:block">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-dirty-purple/40 to-dirty-magenta/40 blur-3xl rounded-full scale-75" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-dirty-purple/20 border border-dirty-purple/20">
                <div className="relative aspect-[3/4]">
                  {!imgError ? (
                    <img
                      src={IMAGES.shrimp}
                      alt="Signature Shrimp & Grits"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]">
                      <span className="text-6xl">🍤</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6A2FBF]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                      <p className="text-white font-bold text-lg">Signature Shrimp &amp; Grits</p>
                      <p className="text-white/70 text-sm">Our most requested dish</p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div className="absolute -top-4 -right-4 bg-dirty-orange text-white rounded-full px-4 py-2 font-bold text-sm shadow-lg" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                <Flame className="w-4 h-4 inline mr-1" /> HOT &amp; FRESH
              </motion.div>
              <motion.div className="absolute -bottom-4 -left-4 bg-dirty-magenta text-white rounded-full px-4 py-2 font-bold text-sm shadow-lg" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <Star className="w-4 h-4 inline mr-1" /> FAN FAVORITE
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-dirty-purple" animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BREAKFAST SECTION
   ═══════════════════════════════════════════════════════════════ */
function BreakfastSection() {
  const breakfastItems = [
    { src: IMAGES.biscuit, alt: 'Biscuit Sandwich', label: 'Biscuit Sandwich' },
    { src: IMAGES.dirtyWaffle, alt: 'Dirty Waffle Sandwich', label: 'Dirty Waffle Sandwich' },
    { src: IMAGES.fruityPebblePancakes, alt: 'Fruity Pebble Pancakes', label: 'Fruity Pebble Pancakes' },
    { src: IMAGES.fruityPebbleWaffles, alt: 'Fruity Pebble Waffles', label: 'Fruity Pebble Waffles' },
    { src: IMAGES.dirtyBaconEgg, alt: 'Dirty Bacon & Egg Waffle Sandwich', label: 'Bacon & Egg Waffle' },
  ];
  const menuItems = ['PANCAKES', 'WAFFLES', 'FRENCH TOAST', 'BISCUITS', 'SAUSAGE', 'BACON', 'EGGS', 'GRITS', 'BURRITOS', '& SO MUCH MORE'];

  return (
    <section id="menu" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#120822] to-[#0D0D0D]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dirty-purple/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-dirty-purple/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-4 bg-dirty-purple/20 text-dirty-purple border-dirty-purple/40 text-xs">🧇 BREAKFAST</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Breakfast.</span>{' '}
              <span className="bg-gradient-to-r from-dirty-purple to-dirty-magenta bg-clip-text text-transparent">EVERYDAY FAVORITES</span>
              <br />
              <span className="bg-gradient-to-r from-dirty-magenta to-dirty-orange bg-clip-text text-transparent">MADE FRESH</span>
            </motion.h2>
            <motion.div variants={fadeIn} className="mt-6 flex flex-wrap justify-center gap-2">
              {menuItems.map((item) => (
                <span key={item} className="text-xs md:text-sm text-muted-foreground border border-border/30 rounded-full px-3 py-1 hover:border-dirty-purple/50 hover:text-dirty-purple hover:bg-dirty-purple/5 transition-all cursor-default">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            <div className="col-span-2 md:col-span-2 md:row-span-2">
              <FoodCard src={breakfastItems[0].src} alt={breakfastItems[0].alt} label={breakfastItems[0].label} index={0} />
            </div>
            {breakfastItems.slice(1).map((item, i) => (
              <FoodCard key={item.alt} src={item.src} alt={item.alt} label={item.label} index={i + 1} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center">
            <Button asChild size="lg" className="bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full px-8 py-6 text-base shadow-lg shadow-dirty-orange/20 hover:shadow-dirty-orange/40 transition-shadow">
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                ORDER NOW <ChevronRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BRUNCH & DINNER SECTION
   ═══════════════════════════════════════════════════════════════ */
function BrunchDinnerSection() {
  const dinnerItems = [
    { src: IMAGES.lambChops, alt: 'Lamb Chops', label: 'Lamb Chops' },
    { src: IMAGES.dirtyGrits, alt: 'Dirty Grits', label: 'Dirty Grits' },
    { src: IMAGES.texasToast, alt: 'Texas Toast Sandwich', label: 'Texas Toast Sandwich' },
    { src: IMAGES.dirtyWafflesFP, alt: 'Dirty Waffles Fruity Pebbles', label: 'Fruity Pebble Waffles' },
    { src: IMAGES.shrimp, alt: 'Shrimp & Grits', label: 'Shrimp & Grits' },
  ];
  const menuItems = [
    'SALMON CROQUETTES', 'T BONES', 'RIB EYE', 'LAMB CHOPS', 'CATFISH', 'WINGS', 'CHICKEN STRIPS',
    'PORK CHOPS', 'SALMON', 'SHRIMP & GRITS', 'BISCUITS & GRAVY', '& MORE',
  ];

  return (
    <section id="dinner" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#1a0815] to-[#0D0D0D]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dirty-magenta/50 to-transparent" />
      <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-dirty-magenta/10 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-4 bg-dirty-magenta/20 text-dirty-magenta border-dirty-magenta/40 text-xs">🍗 BRUNCH &amp; DINNER</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Brunch &amp; Dinner</span><br />
              <span className="bg-gradient-to-r from-dirty-magenta to-dirty-red bg-clip-text text-transparent">NOT AN EARLY BIRD?</span><br />
              <span className="text-white">NO WORRIES...</span>
            </motion.h2>
            <motion.div variants={fadeIn} className="mt-6 flex flex-wrap justify-center gap-2">
              {menuItems.map((item) => (
                <span key={item} className="text-xs md:text-sm text-muted-foreground border border-border/30 rounded-full px-3 py-1 hover:border-dirty-magenta/50 hover:text-dirty-magenta hover:bg-dirty-magenta/5 transition-all cursor-default">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {dinnerItems.slice(0, 4).map((item, i) => (
              <FoodCard key={item.alt} src={item.src} alt={item.alt} label={item.label} index={i} />
            ))}
            <div className="col-span-2 md:col-span-2 md:row-span-1">
              <FoodCard src={dinnerItems[4].src} alt={dinnerItems[4].alt} label={dinnerItems[4].label} index={4} />
            </div>
            <FoodCard src={IMAGES.dirtyWaffle} alt="Dirty Waffle Sandwich" label="Dirty Waffle Sandwich" index={5} />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="text-center">
            <Button asChild size="lg" className="bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full px-8 py-6 text-base shadow-lg shadow-dirty-orange/20 hover:shadow-dirty-orange/40 transition-shadow">
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">
                CHECK OUT OUR MENU <ChevronRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOURS SECTION
   ═══════════════════════════════════════════════════════════════ */
function HoursSection() {
  const hours = [
    { day: 'Monday', time: 'CLOSED', isLate: false },
    { day: 'Tuesday', time: '7AM - 12AM', isLate: false },
    { day: 'Wednesday', time: '7AM - 12AM', isLate: false },
    { day: 'Thursday', time: '7AM - 2AM', isLate: true },
    { day: 'Friday', time: '7AM - 3:30AM', isLate: true },
    { day: 'Saturday', time: '8AM - 3:30AM', isLate: true },
    { day: 'Sunday', time: '9AM - 8PM', isLate: false },
  ];

  return (
    <section id="hours" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D1a] to-[#0D0D0D]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-4 bg-dirty-purple/20 text-dirty-purple border-dirty-purple/40 text-xs">
                <Clock className="w-3 h-3 mr-1" /> HOURS OF OPERATION
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">When We&apos;re </span>
              <span className="bg-gradient-to-r from-dirty-purple to-dirty-magenta bg-clip-text text-transparent">Serving</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg">
              Come hungry, leave happy. We keep the kitchen hot all week long.
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={scaleIn} className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/30 p-6 md:p-8 shadow-xl">
            <div className="space-y-2">
              {hours.map((h, i) => (
                <motion.div key={h.day} variants={fadeUp} custom={i}>
                  <HourRow day={h.day} hours={h.time} isLate={h.isLate} />
                  {i < hours.length - 1 && <Separator className="bg-border/20 my-1" />}
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} custom={hours.length} className="mt-8 p-4 rounded-xl bg-gradient-to-r from-dirty-orange/10 to-dirty-red/10 border border-dirty-orange/20 text-center">
              <p className="text-sm font-semibold text-dirty-orange flex items-center justify-center gap-2">
                <Flame className="w-4 h-4" /> Thursday through Saturday — We&apos;re open until 3:30 AM! <Flame className="w-4 h-4" />
              </p>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER SECTION
   ═══════════════════════════════════════════════════════════════ */
function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 4000); }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#1a0822] to-[#0a0a0a]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dirty-purple/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-dirty-purple/10 blur-[80px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-dirty-magenta/10 blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="mb-4 bg-dirty-purple/20 text-dirty-purple border-dirty-purple/40 text-xs">📍 CONTACT US</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Come Visit </span>
              <span className="bg-gradient-to-r from-dirty-purple to-dirty-magenta bg-clip-text text-transparent">Dirty Breakfast</span>
            </motion.h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            <motion.div variants={fadeUp} custom={0} className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 p-6 text-center hover:border-dirty-purple/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-dirty-purple/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-dirty-purple" />
              </div>
              <h3 className="font-bold text-white mb-2">Location</h3>
              <p className="text-muted-foreground text-sm">10981 Hamilton Ave<br />Cincinnati, Ohio 45231</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 p-6 text-center hover:border-dirty-magenta/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-dirty-magenta/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-dirty-magenta" />
              </div>
              <h3 className="font-bold text-white mb-2">Call Us</h3>
              <a href="tel:5133869720" className="text-muted-foreground text-sm hover:text-dirty-magenta transition-colors">513-386-9720</a>
            </motion.div>
            <motion.div variants={fadeUp} custom={2} className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/30 p-6 text-center hover:border-dirty-orange/30 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-dirty-orange/20 flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-5 h-5 text-dirty-orange" />
              </div>
              <h3 className="font-bold text-white mb-2">Follow Us</h3>
              <div className="flex items-center justify-center gap-3">
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-dirty-orange transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-dirty-orange transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-dirty-purple/10 via-dirty-magenta/10 to-dirty-orange/10 rounded-2xl border border-border/30 p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Stay in the Loop</h3>
              <p className="text-muted-foreground text-sm mb-6">Join our newsletter for exclusive deals, new menu drops &amp; late-night specials.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/80 border-border/50 text-white placeholder:text-muted-foreground rounded-full px-4 flex-1"
                />
                <Button type="submit" className="bg-dirty-orange hover:bg-dirty-orange/90 text-white font-bold rounded-full px-6 shrink-0">
                  {subscribed ? '✓ Joined!' : 'Join'}
                </Button>
              </form>
            </div>
          </motion.div>
        </AnimatedSection>

        <Separator className="bg-border/20 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-dirty-purple to-dirty-magenta flex items-center justify-center overflow-hidden">
              <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <span className="font-bold text-white tracking-wider text-xs">DIRTY BREAKFAST</span>
          </div>
          <p className="text-center text-xs text-muted-foreground/60">© 2023 DIRTY BREAKFAST CREATED BY WDBD</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground/60 hover:text-dirty-purple transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="text-muted-foreground/60 hover:text-dirty-magenta transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE HERO IMAGE
   ═══════════════════════════════════════════════════════════════ */
function MobileHeroImage() {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div variants={fadeUp} custom={2} className="relative lg:hidden mt-8">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-dirty-purple/20 border border-dirty-purple/20 mx-auto max-w-sm">
        <div className="relative aspect-[4/3]">
          {!imgError ? (
            <img src={IMAGES.shrimp} alt="Signature Shrimp & Grits" className="w-full h-full object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A2E] to-[#0D0D0D]">
              <span className="text-5xl">🍤</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#6A2FBF]/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10">
              <p className="text-white font-bold text-sm">Signature Shrimp &amp; Grits</p>
              <p className="text-white/70 text-xs">Our most requested dish</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [siteReady, setSiteReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setTimeout(() => setSiteReady(true), 100);
  }, []);

  return (
    <>
      {/* Intro Animation Overlay */}
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Site */}
      {siteReady && (
        <div className="min-h-screen flex flex-col bg-background" style={{ animation: 'fadeInSite 0.6s ease-out' }}>
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bacon-divider my-0" />
            </div>
            <MobileHeroImage />
            <BreakfastSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bacon-divider my-0" />
            </div>
            <BrunchDinnerSection />
            <HoursSection />
            <FooterSection />
          </main>
        </div>
      )}

      {/* Floating background emojis */}
      {siteReady && FLOATING_EMOJIS.map((emoji, i) => (
        <FloatingEmoji
          key={i}
          emoji={emoji}
          delay={i * 4}
          duration={18 + Math.random() * 10}
          left={`${5 + (i / FLOATING_EMOJIS.length) * 90}%`}
          size={20 + Math.random() * 24}
        />
      ))}


    </>
  );
}
