import { useRef, useState } from 'react'

const screens = ['login', 'bouquet', 'envelope', 'letter']

function App() {
  const [screen, setScreen] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicMessage, setMusicMessage] = useState('')
  const [showCard, setShowCard] = useState(false)
  const [toast, setToast] = useState('')
  const audioRef = useRef(null)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const playSong = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await audio.play()
      setMusicPlaying(true)
      setMusicMessage('')
    } catch {
      setMusicPlaying(false)
      setMusicMessage('Music could not start. Tap Play to try again.')
    }
  }

  const toggleSong = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (musicPlaying) {
      audio.pause()
      setMusicPlaying(false)
      setMusicMessage('Paused • For Janvi')
      return
    }

    await playSong()
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (username.trim().toLowerCase() !== 'janvi' || password.trim() !== '0811') {
      setLoginError(true)
      return
    }

    setLoginError(false)
    setScreen('bouquet')
    void playSong()
    showToast('Welcome, Janvi! Your song is playing 🎵')
  }

  const navigate = (nextScreen) => {
    if (screens.includes(nextScreen)) setScreen(nextScreen)
  }

  return (
    <main className="phone-shell relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden bg-[#fff9f5] sm:my-4 sm:min-h-[min(880px,calc(100vh-2rem))] sm:rounded-[38px] sm:border-[6px] sm:border-white sm:shadow-[0_24px_60px_rgba(120,40,65,0.28)]">
      <audio
        ref={audioRef}
        src="/princess-song.mpeg"
        loop
        preload="auto"
        onError={() => {
          setMusicPlaying(false)
          setMusicMessage('The song could not be loaded. Please check the audio file.')
        }}
      />

      {screen !== 'login' && (
        <div className="sticky top-0 z-30 border-b border-pink-200/80 bg-white/85 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 rounded-2xl border border-pink-300/70 bg-gradient-to-r from-[#fff0f5] via-[#ffe6ef] to-[#fff5e9] px-3 py-2 shadow-sm">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className={`cassette-reel flex h-7 w-11 shrink-0 items-center justify-around rounded-lg border border-[#9c2d48]/40 bg-[#f497b6] px-1.5 ${musicPlaying ? 'is-playing' : ''}`} aria-hidden="true">
                <span className="h-3 w-3 rounded-full border-2 border-[#5e2334] bg-white" />
                <span className="h-1.5 w-2 rounded bg-[#5e2334]/70" />
                <span className="h-3 w-3 rounded-full border-2 border-[#5e2334] bg-white" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-extrabold text-[#9c2d48]">Your Princess Day song 🎵</p>
                <p className="truncate text-[10px] text-[#8d4b5e]" aria-live="polite">
                  {musicMessage || (musicPlaying ? 'Playing • Tap to pause' : 'For Janvi')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void toggleSong()}
              className="shrink-0 rounded-xl bg-[#9c2d48] px-3 py-1.5 text-[11px] font-bold text-white transition active:scale-95"
              aria-label={musicPlaying ? 'Pause song' : 'Play song'}
            >
              {musicPlaying ? '❚❚ Pause' : '▶ Play'}
            </button>
          </div>
        </div>
      )}

      {screen === 'login' && (
        <section className="scrapbook-wallpaper relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-8">
          <div className="mb-4 flex items-center gap-1.5 rounded-full border border-pink-300 bg-white/90 px-4 py-1.5 text-xs font-bold tracking-wide text-[#9c2d48] shadow-sm">
            <span>🎀</span> Private Diary • Princess Day Edition <span>🎀</span>
          </div>

          <div className="relative w-full rounded-3xl border-2 border-dashed border-pink-300 bg-white/95 p-6 shadow-[0_12px_32px_rgba(185,43,39,0.12)]">
            <div className="absolute -top-2 left-5 h-4 w-16 rotate-[-12deg] rounded-sm bg-pink-200/80" />
            <div className="absolute -top-2 right-5 h-4 w-16 rotate-[10deg] rounded-sm bg-amber-100/90" />
            <div className="mb-5 text-center">
              <div className="float-gently mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-pink-200 bg-[#fbe7ee] text-3xl shadow-sm">💌</div>
              <h1 className="font-cursive text-5xl leading-tight text-[#9c2d48]">Hey Janvi...</h1>
              <p className="mt-1 text-xs font-semibold text-[#7d4253]">
                I made a small diary page just for you. Unlock it with your name &amp; secret code ✨
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="mb-1 ml-1 block text-xs font-bold text-[#9c2d48]">Your Name (Username)</label>
                <input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter janvi..."
                  className="w-full rounded-2xl border-2 border-pink-200 bg-[#fff8fa] px-4 py-3 text-sm font-bold text-[#5e2334] outline-none transition placeholder:text-pink-300 focus:border-[#9c2d48]"
                  required
                />
              </div>
              <div>
                <div className="mb-1 px-1">
                  <label htmlFor="password" className="text-xs font-bold text-[#9c2d48]">Secret Code (Password)</label>
                </div>
                <input
                  id="password"
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••"
                  className="w-full rounded-2xl border-2 border-pink-200 bg-[#fff8fa] px-4 py-3 text-sm font-bold tracking-widest text-[#5e2334] outline-none transition placeholder:text-pink-300 focus:border-[#9c2d48]"
                  required
                />
              </div>
              {loginError && (
                <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-center text-xs font-bold text-[#b92b27]">
                  Those details don’t match. Please try again 💗
                </p>
              )}
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d94e6f] to-[#b92b27] py-3.5 text-sm font-extrabold tracking-wide text-white shadow-[0_8px_20px_rgba(185,43,39,0.28)] transition active:scale-[0.98]">
                Open My Princess Mail <span>🌷</span>
              </button>
            </form>
          </div>
        </section>
      )}

      {screen === 'bouquet' && (
        <section className="scrapbook-wallpaper relative z-10 flex flex-1 flex-col items-center justify-between px-5 py-7 text-center">
          <span className="mt-2 rounded-full border border-pink-200 bg-white/90 px-3.5 py-1 text-[11px] font-bold text-[#9c2d48] shadow-sm">
            Happy Princess Day, Janvi 👑
          </span>
          <div className="my-auto flex flex-col items-center">
            <div className="float-gently flex h-72 w-72 items-center justify-center text-[120px] drop-shadow-[0_12px_18px_rgba(130,55,75,0.16)]" aria-label="A bouquet of flowers">
              💐
            </div>
            <div className="-mt-2 flex items-center justify-center gap-4">
              <p className="font-hand text-4xl font-bold tracking-wide text-[#3b232a]">for you!</p>
              <button
                type="button"
                onClick={() => navigate('envelope')}
                aria-label="Open your mail"
                className="pulse-heart relative flex h-24 w-24 items-center justify-center drop-shadow-[0_8px_16px_rgba(185,43,39,0.3)] transition active:scale-95"
              >
                <svg viewBox="0 0 100 92" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="clickHeartGradient" x1="0" y1="0" x2="100" y2="92" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#e87a96" />
                      <stop offset="1" stopColor="#b83b5e" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50 86 C50 86 8 58 8 29 C8 14 20 5 33 5 C42 5 48 10 50 16 C52 10 58 5 67 5 C80 5 92 14 92 29 C92 58 50 86 50 86 Z"
                    fill="url(#clickHeartGradient)"
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  <path
                    d="M50 80 C50 80 14 55 14 29 C14 18 23 11 33 11 C41 11 47 16 50 22 C53 16 59 11 67 11 C77 11 86 18 86 29 C86 55 50 80 50 80 Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
                <span className="relative z-10 flex flex-col text-sm font-bold italic leading-tight text-white drop-shadow-[0_1px_2px_rgba(94,35,52,0.8)]">Click<br />me</span>
              </button>
            </div>
          </div>
          <p className="text-xs font-semibold text-[#8d4b5e]">Tap the pink heart to see what arrived in your mailbox 💌</p>
        </section>
      )}

      {screen === 'envelope' && (
        <section className="starry-wallpaper relative z-10 flex flex-1 flex-col items-center justify-between px-4 py-6 text-center">
          <header className="mt-2">
            <h2 className="font-cursive text-5xl text-[#b92b27] drop-shadow-[0_2px_0_#fff]">You have a mail</h2>
            <p className="mt-1 text-xs font-bold text-[#8d4b5e]">Sent specially for Janvi ✨</p>
          </header>

          <div className="relative my-auto flex h-[350px] w-full max-w-[330px] select-none items-end justify-center">
            <div className="absolute bottom-[172px] h-[115px] w-[290px] rounded-t-2xl bg-[#9c1d19]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <div className="absolute bottom-0 h-[185px] w-[290px] rounded-b-2xl bg-[#7a1411] shadow-xl" />

            <button
              type="button"
              onClick={() => setShowCard(true)}
              aria-label="Open Princess Day card"
              className="group absolute bottom-[130px] left-1/2 z-10 h-[140px] w-[110px] -translate-x-1/2 rounded-lg border-2 border-amber-300 bg-white p-1 shadow-md transition duration-300 hover:-translate-y-3 active:scale-95"
            >
              <span className="block h-[110px] overflow-hidden rounded bg-amber-50">
                <img src="/princess-card.png" alt="Princess Day greeting card" className="h-full w-full object-cover object-top" />
              </span>
              <span className="mt-0.5 block font-hand text-[10px] font-bold text-[#9c2d48]">Princess Card 👑</span>
            </button>

            <button type="button" onClick={() => showToast('A little reminder: you are so loved 🌷')} aria-label="A flower for you" className="absolute bottom-[122px] left-[18px] z-20 flex h-24 w-16 flex-col items-center justify-center transition hover:-translate-y-2 active:scale-95">
              <span className="text-4xl drop-shadow">🌷</span>
              <span className="mt-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-[#9c2d48] shadow-sm">For you</span>
            </button>

            <button
              type="button"
              onClick={() => void toggleSong()}
              aria-label={musicPlaying ? 'Pause the song' : 'Play the song'}
              className="absolute bottom-[78px] left-[58px] z-20 flex h-[130px] w-[90px] flex-col justify-between rounded-xl border-2 border-[#4a1c2a] bg-gradient-to-b from-[#f7a8c4] to-[#e87ea4] p-2 shadow-lg transition duration-300 hover:-translate-y-3 active:scale-95"
            >
              <span className="rounded-md border border-pink-300 bg-white/95 px-1 py-1 text-center font-hand text-[10px] font-bold leading-none text-[#9c2d48]">Dilruba<br /><span className="text-[9px] text-[#7d4253]">Dilnasheen</span></span>
              <span className="mx-auto flex h-14 w-10 flex-col items-center justify-around rounded-lg bg-[#3b1c26] py-1"><i className="h-3.5 w-3.5 rounded-full border-2 border-[#f7a8c4] bg-white" /><i className="h-3.5 w-3.5 rounded-full border-2 border-[#f7a8c4] bg-white" /></span>
              <span className="rounded bg-[#4a1c2a]/80 px-1 py-0.5 text-[8px] font-extrabold text-white">🎵 Tap Song</span>
            </button>

            <button type="button" onClick={() => navigate('letter')} aria-label="See Princess Janvi in the mirror" className="absolute bottom-[82px] right-[18px] z-20 h-[130px] w-[102px] rotate-[4deg] rounded-lg border border-pink-200 bg-white p-1.5 pb-4 shadow-lg transition duration-300 hover:-translate-y-3 hover:rotate-0 active:scale-95">
              <span className="block h-[90px] overflow-hidden rounded bg-pink-50">
                <img src="/janvi-portrait.jpeg" alt="Pencil portrait of Janvi" className="h-full w-full object-cover object-top" />
              </span>
              <span className="mt-1 block font-hand text-[11px] font-bold text-[#9c2d48]">Princess Janvi ✨</span>
            </button>

            <div className="envelope-pocket pointer-events-none relative z-30 flex h-[185px] w-[290px] flex-col items-center justify-end rounded-b-2xl px-4 pb-5 shadow-[0_14px_28px_rgba(140,20,20,0.3)]">
              <p className="font-hand text-2xl leading-tight text-amber-100 drop-shadow">Click on items inside<br />envelope to open them</p>
            </div>
          </div>

          <button type="button" onClick={() => navigate('letter')} className="mb-2 flex w-full max-w-[310px] items-center justify-center gap-2 rounded-2xl border-2 border-[#9c2d48] bg-white px-5 py-3.5 text-sm font-extrabold text-[#9c2d48] shadow-md transition active:scale-95">
            Open Full Letter &amp; Mirror <span>➡️</span>
          </button>
        </section>
      )}

      {screen === 'letter' && (
        <section className="starry-wallpaper phone-scroll relative z-10 flex-1 overflow-y-auto px-4 pb-10 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <button type="button" onClick={() => navigate('envelope')} className="rounded-full border border-pink-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#9c2d48] shadow-sm transition active:scale-95">← Back to Envelope</button>
            <span className="rounded-full bg-[#9c2d48]/10 px-3 py-1 text-[11px] font-extrabold text-[#9c2d48]">Nov 18 • Princess Day 👑</span>
          </div>

          <div className="relative my-2 flex flex-col items-center">
            <span className="absolute -left-1 -top-3 text-5xl text-[#e889a8]" aria-hidden="true">✦</span>
            <span className="absolute -right-1 bottom-10 rotate-12 text-5xl text-[#e889a8]" aria-hidden="true">✦</span>
            <div className="vintage-mirror-outer h-[290px] w-[235px]">
              <div className="vintage-mirror-inner h-full w-full">
                <img src="/janvi-portrait.jpeg" alt="Pencil portrait sketch of Janvi, Princess Janvi" className="h-full w-full object-cover object-top" />
              </div>
            </div>
            <p className="mt-2 font-cursive text-3xl text-[#9c2d48]">Princess Janvi ✨</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-extrabold text-[#d65a7b]">
              <span className="rounded-full border border-pink-200 bg-white/95 px-3.5 py-1 shadow-sm">I believe in you!</span>
              <span className="rounded-full border border-pink-200 bg-white/95 px-3 py-1 shadow-sm">≥ω≤</span>
              <span className="rounded-full border border-pink-200 bg-white/95 px-3.5 py-1 text-[#9c2d48] shadow-sm">Always your best friend 🤍</span>
            </div>
          </div>

          <article className="mt-5 rounded-3xl border-2 border-pink-200 bg-white/95 p-5 shadow-[0_10px_28px_rgba(156,45,72,0.12)]">
            <header className="mb-4 border-b border-pink-100 pb-3.5 text-center">
              <h1 className="font-serif text-2xl font-bold leading-snug text-[#9c2d48]">Happy Princess Day, Janvi</h1>
              <p className="mt-1 font-serif text-xs italic text-[#9c5266]">Stronger, kinder &amp; brighter than any fairytale 👑</p>
            </header>
            <div className="space-y-3.5 font-hand text-[21px] leading-[1.45] text-[#4e1d2b]">
              <p>Janvi, I know you’re sad with me right now, and it hurts knowing you’re comparing me with the people who broke your trust in the past.</p>
              <p>Please hear me from my heart—<span className="font-bold text-[#9c2d48] underline decoration-2 decoration-pink-400">I am not like them.</span> I know how heavy it feels when people let you down, and I would never treat your trust carelessly or walk away when things get tough. You don’t have to guard your heart from me.</p>
              <p>More than anything, I admire the woman you are becoming. You want to stand on your own feet, build your own identity, and be a <span className="font-bold text-[#9c2d48]">strong, independent woman</span>—and I’m so proud of you for that. You don’t need anyone to rescue you because you’re strong enough to build your own empire.</p>
              <p>I just want to be the best friend walking beside you—cheering the loudest for your dreams, supporting every step you take, and reminding you on hard days that you are never alone.</p>
            </div>
            <footer className="mt-5 flex items-center justify-between gap-2 border-t border-dashed border-pink-200 pt-4">
              <div>
                <p className="font-hand text-xl font-bold text-[#9c2d48]">Always in your corner,</p>
                <p className="text-[11px] font-bold text-[#8d4b5e]">Your Best Friend 🌷</p>
              </div>
              <button type="button" onClick={() => showToast('Always with you, Princess Janvi 🤍👑')} className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#e87a96] to-[#b92b27] px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition active:scale-95">
                Forgive &amp; Smile? <span>🤍✨</span>
              </button>
            </footer>
          </article>
        </section>
      )}

      {showCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm" role="presentation" onClick={() => setShowCard(false)}>
          <div role="dialog" aria-modal="true" aria-label="Princess Day greeting card" className="relative w-full max-w-[360px] rounded-3xl border-2 border-pink-200 bg-white p-5 text-center shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setShowCard(false)} aria-label="Close card" className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-sm font-extrabold text-[#9c2d48]">✕</button>
            <img src="/princess-card.png" alt="Princess Day card for Janvi" className="mx-auto mb-3 max-h-[60vh] w-auto rounded-2xl border-2 border-amber-300 object-contain shadow-md" />
            <h3 className="font-serif text-lg font-bold text-[#9c2d48]">Hey Princess! 👑</h3>
            <p className="mt-1 font-hand text-lg text-[#5e2334]">You are beautiful, precious and deserve all the happiness in the world.</p>
          </div>
        </div>
      )}

      {toast && (
        <div role="status" className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#9c2d48] px-4 py-2 text-center text-xs font-bold text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  )
}

export default App
