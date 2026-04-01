/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Play, Users, Shield, Volume2, Monitor, X, Loader2 } from 'lucide-react';

export default function App() {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAprilFool, setShowAprilFool] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [is16kEnabled, setIs16kEnabled] = useState(true);
  const [is8bitAudio, setIs8bitAudio] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const gamingImages = [
    'https://picsum.photos/seed/gta1/1920/1080',
    'https://picsum.photos/seed/gaming2/1920/1080',
    'https://picsum.photos/seed/cyberpunk/1920/1080',
    'https://picsum.photos/seed/action/1920/1080'
  ];

  const teamMembers = [
    { name: 'RAHEE', role: 'Ideas And Concept' },
    { name: 'AIZA', role: 'Creative' },
    { name: 'THE HACKER X', role: 'Coding' },
    { name: 'RUNAV', role: 'Testing' },
    { name: 'ANUBHA', role: 'Music' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % gamingImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (code === '142026') {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, [code]);

  const handlePlay = () => {
    if (isUnlocked) {
      setIsLoading(true);
      setLoadingProgress(0);
      
      const duration = 16000; // 16 seconds
      const interval = 100;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setLoadingProgress((currentStep / steps) * 100);
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setIsLoading(false);
          setShowAprilFool(true);
        }
      }, interval);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white font-sans">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.img
          key={bgIndex}
          src={gamingImages[bgIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      {/* Overlay Effects */}
      <div className="absolute inset-0 vignette pointer-events-none" />
      <div className="scanline pointer-events-none" />

      {/* Login Screen */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          >
            <div className="w-full max-w-md space-y-8 text-center">
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-5xl font-black uppercase italic tracking-tighter text-white gta-text-shadow"
              >
                RAHEE GAMES
              </motion.h2>
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-[0.3em] text-yellow-400">
                  Identify Yourself
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="ENTER NAME"
                  className="w-full border-b-2 border-white bg-transparent py-4 text-center text-2xl font-black uppercase tracking-widest outline-none transition-colors focus:border-yellow-400"
                  onKeyDown={(e) => e.key === 'Enter' && userName.trim() && setShowLogin(false)}
                />
              </div>
              <button
                onClick={() => userName.trim() && setShowLogin(false)}
                disabled={!userName.trim()}
                className={`w-full py-4 text-xl font-black uppercase italic transition-all ${
                  userName.trim()
                    ? 'bg-white text-black hover:bg-yellow-400'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Login to World
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-8 md:p-16">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-start"
        >
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter gta-text-shadow text-white uppercase">
            THE RAHEE WORLD
          </h1>
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-black/50 px-4 py-1 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-bold tracking-widest uppercase text-yellow-400">
                RAHEE GAMES
              </span>
            </div>
            {userName && (
              <div className="bg-white/10 px-4 py-1 backdrop-blur-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
                  Welcome, <span className="text-white">{userName}</span>
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Menu Options */}
        <div className="flex flex-col gap-6 max-w-md">
          {!showAprilFool && !isLoading ? (
            <>
              <div className="space-y-4">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-400">
                  Enter Access Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="XXXXXX"
                  className="w-full border-b-2 border-white bg-transparent py-2 text-2xl font-bold tracking-[1em] outline-none transition-colors focus:border-yellow-400"
                />
              </div>

              <motion.button
                whileHover={isUnlocked ? { x: 20, backgroundColor: 'rgba(255,255,255,1)', color: '#000' } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={handlePlay}
                disabled={!isUnlocked}
                className={`group flex items-center gap-4 px-6 py-3 text-3xl font-black uppercase italic transition-all ${
                  isUnlocked 
                    ? 'cursor-pointer bg-white/10 text-white' 
                    : 'cursor-not-allowed opacity-30 grayscale'
                }`}
              >
                <Play className={`h-8 w-8 ${isUnlocked ? 'text-yellow-400' : 'text-gray-500'}`} />
                Play Now
              </motion.button>

              <motion.button
                whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                onClick={() => setShowTeam(true)}
                className="group flex items-center gap-4 px-6 py-3 text-3xl font-black uppercase italic bg-white/10 text-white transition-all"
              >
                <Users className="h-8 w-8 text-gray-400 group-hover:text-black" />
                View Team
              </motion.button>

              <motion.button
                whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                onClick={() => setShowSettings(true)}
                className="group flex items-center gap-4 px-6 py-3 text-3xl font-black uppercase italic bg-white/10 text-white transition-all"
              >
                <Settings className="h-8 w-8 text-gray-400 group-hover:text-black" />
                Settings
              </motion.button>
            </>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center gap-6 bg-black/80 p-12 backdrop-blur-xl border border-white/10">
              <div className="relative h-32 w-32">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-white/10"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <motion.circle
                    className="text-yellow-400"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * loadingProgress) / 100 }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-black uppercase italic tracking-widest text-white">Loading Assets...</h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">Loading Game Data {Math.round(loadingProgress)}%</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center gap-4 bg-yellow-400 p-8 text-black shadow-[0_0_50px_rgba(250,204,21,0.3)]"
            >
              <h2 className="text-5xl md:text-6xl font-black uppercase italic text-center leading-tight">
                April fool banaya<br/>bada maza aaya
              </h2>
              <p className="text-xl font-bold mt-4">You've been hacked by Rahee's Team.</p>
              <button 
                onClick={() => setShowAprilFool(false)}
                className="mt-6 bg-black px-8 py-3 font-black text-white uppercase italic hover:bg-zinc-900 transition-colors"
              >
                Back to Menu
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-4"
        >
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Game Status</span>
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest text-white/80">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>STORY MODE ACTIVE</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-[10px] text-gray-600 uppercase tracking-widest">
              © 2026 RAHEE GAMES. ALL RIGHTS RESERVED.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Modal */}
      <AnimatePresence>
        {showTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-3xl border border-white/10 bg-zinc-900/50 p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
              
              <button 
                onClick={() => setShowTeam(false)}
                className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-8 w-8" />
              </button>

              <h2 className="mb-12 text-5xl font-black uppercase italic text-white tracking-tighter flex items-center gap-4">
                The <span className="text-yellow-400">Elite</span> Core
                <Shield className="h-8 w-8 text-yellow-400 animate-pulse" />
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {teamMembers.map((member, idx) => (
                  <motion.div
                    key={member.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative border-l-2 border-white/5 pl-8 py-3 hover:border-yellow-400 transition-all duration-500"
                  >
                    <div className="absolute -left-[2px] top-0 h-0 w-[2px] bg-yellow-400 transition-all duration-500 group-hover:h-full" />
                    <h3 className="text-3xl font-black uppercase italic tracking-tight group-hover:text-white transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400/60 mt-2 group-hover:text-yellow-400 transition-colors">
                      {member.role}
                    </p>
                    <div className="mt-4 h-[1px] w-12 bg-white/10 group-hover:w-full transition-all duration-700" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs font-medium leading-relaxed text-gray-500 italic max-w-lg">
                  "This experience represents the pinnacle of interactive gaming. 
                  Our team is dedicated to pushing the boundaries of digital entertainment."
                </p>
                <div className="flex items-center gap-2 bg-yellow-400/5 px-4 py-2 border border-yellow-400/20">
                  <div className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Verified Developers</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-2xl border border-white/20 bg-zinc-900 p-8 shadow-2xl"
            >
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-white"
              >
                <X className="h-8 w-8" />
              </button>

              <h2 className="mb-8 text-4xl font-black uppercase italic text-yellow-400">Game Settings</h2>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <Monitor className="h-6 w-6 text-blue-400" />
                    <div>
                      <h3 className="font-bold uppercase tracking-widest">16K Resolution</h3>
                      <p className="text-xs text-gray-500">Ultra High Definition Rendering</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIs16kEnabled(!is16kEnabled)}
                    className={`px-6 py-1 text-sm font-black transition-all ${is16kEnabled ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-500'}`}
                  >
                    {is16kEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <Volume2 className="h-6 w-6 text-green-400" />
                    <div>
                      <h3 className="font-bold uppercase tracking-widest">8-Bit Audio</h3>
                      <p className="text-xs text-gray-500">Retro Style Sound Effects</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIs8bitAudio(!is8bitAudio)}
                    className={`px-6 py-1 text-sm font-black transition-all ${is8bitAudio ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-500'}`}
                  >
                    {is8bitAudio ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div className="pt-4">
                  <p className="text-[10px] leading-relaxed text-gray-600 uppercase tracking-widest">
                    These settings are optimized for high-end gaming hardware. 
                    Performance may vary on standard devices.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
