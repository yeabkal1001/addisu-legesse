"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  title: string;
  amharicTitle: string;
  album: string;
  year: string;
  duration: string;
  durationSec: number;
  views?: string;
  youtubeId: string;
  youtubeUrl: string;
  coverImage: string;
  description: string;
  scale?: string;
  startTime?: number;
}

export const OFFICIAL_TRACKS: Track[] = [
  {
    id: "ewedshalew",
    title: "Ewedshalew",
    amharicTitle: "",
    album: "Official Single",
    year: "2024",
    duration: "04:36",
    durationSec: 276,
    views: "8.5M+ Views",
    youtubeId: "SypilRQgD0I",
    youtubeUrl: "https://www.youtube.com/watch?v=SypilRQgD0I",
    coverImage: "/addisu%20legese%20thumbnails/ewedshalew%20official%20video%20thumbnail.jpg",
    description: "Heartfelt romantic ballad blending the traditional Ethiopian Tizita modal scale with modern acoustic warmth and lush keyboards.",
    scale: "Tizita Major",
  },
  {
    id: "enjori",
    title: "Enjori",
    amharicTitle: "",
    album: "Official Single",
    year: "2024",
    duration: "04:12",
    durationSec: 252,
    views: "8.2M+ Views",
    youtubeId: "DEG2HhDyxmw",
    youtubeUrl: "https://www.youtube.com/watch?v=DEG2HhDyxmw",
    coverImage: "/addisu%20legese%20thumbnails/enjori%20official%20video%20thumbnail.jpg",
    description: "Dynamic Afro-Ethio fusion featuring driving 6/8 polyrhythms, punchy horns, and energetic vocal improvisation.",
    scale: "Ambassel Groove",
  },
  {
    id: "enja",
    title: "Enja",
    amharicTitle: "",
    album: "AFRIMA Nominated Single",
    year: "2024",
    duration: "05:18",
    durationSec: 318,
    views: "6.4M+ Views",
    youtubeId: "5cmw_cIgjhA",
    youtubeUrl: "https://www.youtube.com/watch?v=5cmw_cIgjhA",
    coverImage: "/addisu%20legese%20thumbnails/enja%20official%20video%20thumbnail.jpg",
    description: "Celebrated masterpiece nominated for two All Africa Music Awards (AFRIMA) for Best Male Artist in Eastern Africa and Best Duo/Group in African Jazz.",
    scale: "Modal African Jazz",
  },
  {
    id: "etu",
    title: "Etu",
    amharicTitle: "",
    album: "Official Single",
    year: "2023",
    duration: "04:45",
    durationSec: 285,
    views: "5.1M+ Views",
    youtubeId: "GdRdp11m-aQ",
    youtubeUrl: "https://www.youtube.com/watch?v=GdRdp11m-aQ",
    coverImage: "/addisu%20legese%20thumbnails/etu%20officilal%20video%20thumbnail.jpg",
    description: "Soul-stirring ode honoring Ethiopian heritage with poignant vocal phrasing, traditional krar motifs, and cinematic orchestration.",
    scale: "Bati Lydian",
  },
  {
    id: "mastawesha-album",
    title: "Mastawesha (Full Album)",
    amharicTitle: "",
    album: "Mastawesha",
    year: "2025",
    duration: "56:20",
    durationSec: 3380,
    views: "Album Master",
    youtubeId: "EqKmcKxaH4o",
    youtubeUrl: "https://www.youtube.com/watch?v=EqKmcKxaH4o",
    coverImage: "/addisu%20legese%20thumbnails/aychew%20official%20video%20thumbnail.jpg",
    description: "Addisu Legesse's landmark 2025 studio album featuring 14 original compositions capturing the complete emotional spectrum of Ethiopian soul.",
    scale: "Ethio-Soul Odyssey",
  },
];

export const MASTAWESHA_TRACKLIST = [
  {
    num: "01",
    title: "Gena Gena",
    amharic: "",
    length: "03:42",
    sec: 222,
    scale: "Tizita Major",
    offset: 0,
    thumbnail: "/addisu%20legese%20thumbnails/gena%20gena%20mastawesha%20album%20song%20thumbnail.jpg",
  },
  {
    num: "02",
    title: "Nafkeshignal",
    amharic: "",
    length: "04:15",
    sec: 255,
    scale: "Bati Lydian",
    offset: 222,
    thumbnail: "/addisu%20legese%20thumbnails/nafkeshignal%20mastawesha%20album%20song%20thumbnail.jpg",
  },
  {
    num: "03",
    title: "Ker Ker Yilegnal",
    amharic: "",
    length: "03:58",
    sec: 238,
    scale: "Ambassel",
    offset: 477,
    thumbnail: "/addisu%20legese%20thumbnails/kir%20kir%20ylegnal%20mastawesha%20album%20song%20thumbnail.jpg",
  },
  {
    num: "04",
    title: "Min Godelena",
    amharic: "",
    length: "04:30",
    sec: 270,
    scale: "Tizita Minor",
    offset: 715,
    thumbnail: "/addisu%20legese%20thumbnails/min%20godelegne%20mastawesha%20album%20song%20thumbnail.jpg",
  },
  {
    num: "05",
    title: "Becha Ney Enji",
    amharic: "",
    length: "03:50",
    sec: 230,
    scale: "Anchihoye",
    offset: 985,
    thumbnail: "/addisu%20legese%20thumbnails/bcha%20ney%20enji%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "06",
    title: "Ayechew",
    amharic: "",
    length: "04:10",
    sec: 250,
    scale: "Ethio-Urban Soul",
    offset: 1215,
    thumbnail: "/addisu%20legese%20thumbnails/aychew%20official%20video%20thumbnail.jpg",
  },
  {
    num: "07",
    title: "Cher Cher",
    amharic: "",
    length: "03:35",
    sec: 215,
    scale: "Afro-Groove 6/8",
    offset: 1465,
    thumbnail: "/addisu%20legese%20thumbnails/cher%20cher%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "08",
    title: "Ale Fiker",
    amharic: "",
    length: "04:22",
    sec: 262,
    scale: "Tizita Major",
    offset: 1680,
    thumbnail: "/addisu%20legese%20thumbnails/ale%20fkr%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "09",
    title: "Sewedesh Lenur",
    amharic: "",
    length: "04:05",
    sec: 245,
    scale: "Ballad Acoustic",
    offset: 1942,
    thumbnail: "/addisu%20legese%20thumbnails/swedsh%20linur%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "10",
    title: "Argolegnal",
    amharic: "",
    length: "03:48",
    sec: 228,
    scale: "Modal Jazz",
    offset: 2187,
    thumbnail: "/addisu%20legese%20thumbnails/adrgolgnal%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "11",
    title: "Kelib New",
    amharic: "",
    length: "04:12",
    sec: 252,
    scale: "Bati Soul",
    offset: 2415,
    thumbnail: "/addisu%20legese%20thumbnails/kelib%20new%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "12",
    title: "Edil New",
    amharic: "",
    length: "03:55",
    sec: 235,
    scale: "Modern Fusion",
    offset: 2667,
    thumbnail: "/addisu%20legese%20thumbnails/edil%20new%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "13",
    title: "Lela",
    amharic: "",
    length: "04:02",
    sec: 242,
    scale: "Ambassel",
    offset: 2902,
    thumbnail: "/addisu%20legese%20thumbnails/lela%20mastawesha%20album%20thumbnail.jpg",
  },
  {
    num: "14",
    title: "Yene Nat",
    amharic: "",
    length: "04:45",
    sec: 285,
    scale: "Orchestral Finale",
    offset: 3144,
    thumbnail: "/addisu%20legese%20thumbnails/yene%20nat%20official%20video%20thumbnail.jpg",
  },
];

interface AudioContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isVideoModalOpen: boolean;
  playTrack: (track: Track, startSec?: number) => void;
  playTrackByIndex: (index: number) => void;
  playMastaweshaTrack: (trackIndex: number) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleVideoModal: () => void;
  openVideoModal: (track?: Track) => void;
  closeVideoModal: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(OFFICIAL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(OFFICIAL_TRACKS[0].durationSec);
  const [volume, setVolumeState] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const playerRef = useRef<any>(null);
  const isApiReadyRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (!playerRef.current) {
        playerRef.current = new window.YT.Player("youtube-player-mount", {
          height: "100%",
          width: "100%",
          videoId: currentTrack.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              isApiReadyRef.current = true;
              event.target.setVolume(volume);
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED, 3 = BUFFERING
              if (event.data === 1) {
                setIsPlaying(true);
                startProgressTimer();
              } else if (event.data === 2) {
                setIsPlaying(false);
                stopProgressTimer();
              } else if (event.data === 0) {
                setIsPlaying(false);
                stopProgressTimer();
                nextTrack();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      stopProgressTimer();
    };
  }, []);

  const startProgressTimer = () => {
    stopProgressTimer();
    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        try {
          const time = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || currentTrack.durationSec;
          setCurrentTime(time);
          if (dur > 0) setDuration(dur);
        } catch (e) {}
      }
    }, 500);
  };

  const stopProgressTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const playTrack = (track: Track, startSec: number = 0) => {
    // If PiP video was open, close it so they don't double play
    if (isVideoModalOpen) {
      setIsVideoModalOpen(false);
    }

    setCurrentTrack(track);
    setDuration(track.durationSec);
    setCurrentTime(startSec);

    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById({
        videoId: track.youtubeId,
        startSeconds: startSec,
      });
      playerRef.current.playVideo();
      setIsPlaying(true);
      startProgressTimer();
    } else {
      setIsPlaying(true);
    }
  };

  const playTrackByIndex = (index: number) => {
    const idx = (index + OFFICIAL_TRACKS.length) % OFFICIAL_TRACKS.length;
    playTrack(OFFICIAL_TRACKS[idx]);
  };

  const playMastaweshaTrack = (trackIndex: number) => {
    const albumTrack = MASTAWESHA_TRACKLIST[trackIndex];
    if (!albumTrack) return;

    const albumTrackAsTrack: Track = {
      id: `mastawesha-${albumTrack.num}`,
      title: albumTrack.title,
      amharicTitle: albumTrack.amharic,
      album: "Mastawesha (2025)",
      year: "2025",
      duration: albumTrack.length,
      durationSec: albumTrack.sec,
      views: "Mastawesha Master",
      youtubeId: "EqKmcKxaH4o",
      youtubeUrl: `https://www.youtube.com/watch?v=EqKmcKxaH4o&t=${albumTrack.offset}s`,
      coverImage: albumTrack.thumbnail,
      description: `Track ${albumTrack.num} from the official 2025 album Mastawesha. Composed in traditional ${albumTrack.scale} mode.`,
      scale: albumTrack.scale,
      startTime: albumTrack.offset,
    };

    playTrack(albumTrackAsTrack, albumTrack.offset);
  };

  const togglePlay = () => {
    if (!playerRef.current) {
      setIsPlaying(!isPlaying);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        stopProgressTimer();
      } else {
        if (isVideoModalOpen) {
          setIsVideoModalOpen(false);
        }
        playerRef.current.playVideo();
        setIsPlaying(true);
        startProgressTimer();
      }
    } catch (e) {
      setIsPlaying(!isPlaying);
    }
  };

  const pause = () => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      try {
        playerRef.current.pauseVideo();
      } catch (e) {}
    }
    setIsPlaying(false);
    stopProgressTimer();
  };

  const resume = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === "function") {
      try {
        playerRef.current.playVideo();
      } catch (e) {}
    }
    setIsPlaying(true);
    startProgressTimer();
  };

  const seekTo = (seconds: number) => {
    setCurrentTime(seconds);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      try {
        playerRef.current.seekTo(seconds, true);
      } catch (e) {}
    }
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(100, vol));
    setVolumeState(clamped);
    if (playerRef.current && typeof playerRef.current.setVolume === "function") {
      try {
        playerRef.current.setVolume(clamped);
        if (clamped > 0 && isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      } catch (e) {}
    }
  };

  const toggleMute = () => {
    if (playerRef.current && typeof playerRef.current.mute === "function") {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (e) {
        setIsMuted(!isMuted);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Synchronized Video Modal controls: pauses background audio when video modal opens to PREVENT DOUBLE AUDIO!
  const openVideoModal = (track?: Track) => {
    if (track && track.id !== currentTrack.id) {
      setCurrentTrack(track);
    }
    // Pause background audio
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      try {
        playerRef.current.pauseVideo();
      } catch (e) {}
    }
    setIsPlaying(false);
    stopProgressTimer();
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const toggleVideoModal = () => {
    if (isVideoModalOpen) {
      closeVideoModal();
    } else {
      openVideoModal();
    }
  };

  const nextTrack = () => {
    const currentIndex = OFFICIAL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIdx = (currentIndex + 1) % OFFICIAL_TRACKS.length;
    playTrack(OFFICIAL_TRACKS[nextIdx]);
  };

  const prevTrack = () => {
    const currentIndex = OFFICIAL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (currentIndex - 1 + OFFICIAL_TRACKS.length) % OFFICIAL_TRACKS.length;
    playTrack(OFFICIAL_TRACKS[prevIdx]);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isVideoModalOpen,
        playTrack,
        playTrackByIndex,
        playMastaweshaTrack,
        togglePlay,
        pause,
        resume,
        seekTo,
        setVolume,
        toggleMute,
        toggleVideoModal,
        openVideoModal,
        closeVideoModal,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
      {/* Hidden YouTube Player Iframe mount container */}
      <div
        id="youtube-player-mount-wrapper"
        className="fixed -bottom-[9999px] -right-[9999px] h-10 w-10 opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <div id="youtube-player-mount" />
      </div>
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
