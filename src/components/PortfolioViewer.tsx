"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllProjects, getProjectGroup, workHistory } from "@/lib/projects";

const allProjects = getAllProjects();

let audioCtx: AudioContext | null = null;
function playClick(freq = 900, duration = 0.04, volume = 0.07) {
  if (typeof window === "undefined") return;
  if (!audioCtx) audioCtx = new AudioContext();
  const ctx = audioCtx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export default function PortfolioViewer() {
  const [selectedId, setSelectedId] = useState(allProjects[0]?.id ?? "");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [aKeyDown, setAKeyDown] = useState(false);
  const [dKeyDown, setDKeyDown] = useState(false);
  // sideWidth = 20px outer margin + 2-col content (2*(W-220)/10 + 20px gutter) + 20px gap to hero
  const [sideWidth, setSideWidth] = useState(304);

  const currentIndex = allProjects.findIndex((p) => p.id === selectedId);
  const currentProject = allProjects[currentIndex];
  const currentGroup = getProjectGroup(selectedId);
  const isVideo = !!currentProject?.videoUrl;
  const anyPanelOpen = aboutExpanded || detailsExpanded;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Recompute sideWidth on resize — grid: 10 cols, 20px gutters, 20px outer margin
  useEffect(() => {
    const compute = () => setSideWidth(60 + (window.innerWidth - 220) / 5);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const selectProject = useCallback((id: string) => {
    setSelectedId(id);
    setMediaProgress(0);
    setIsMuted(true);
    setMediaDuration(null);
  }, []);

  const navigateProject = useCallback(
    (dir: "prev" | "next") => {
      if (dir === "prev" && currentIndex > 0)
        selectProject(allProjects[currentIndex - 1].id);
      if (dir === "next" && currentIndex < allProjects.length - 1)
        selectProject(allProjects[currentIndex + 1].id);
    },
    [currentIndex, selectProject]
  );

  // Sync muted state to video element
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Video progress + auto-advance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let rafId: number;
    const tick = () => {
      if (video.duration) setMediaProgress((video.currentTime / video.duration) * 100);
      rafId = requestAnimationFrame(tick);
    };
    const onLoadedMetadata = () => setMediaDuration(video.duration);
    if (video.readyState >= 1) setMediaDuration(video.duration);
    const onPlay = () => { rafId = requestAnimationFrame(tick); };
    const onPause = () => cancelAnimationFrame(rafId);
    const onEnded = () => {
      cancelAnimationFrame(rafId);
      setMediaProgress(0);
      const next = (currentIndex + 1) % allProjects.length;
      selectProject(allProjects[next].id);
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    if (!video.paused) rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [currentProject?.videoUrl, currentIndex, selectProject]);

  // Image/gif timer + auto-advance
  useEffect(() => {
    if (isVideo) return;
    const DURATION = currentProject?.duration ?? 5000;
    setMediaDuration(DURATION / 1000);
    setMediaProgress(0);
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setMediaProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        setMediaProgress(0);
        const next = (currentIndex + 1) % allProjects.length;
        selectProject(allProjects[next].id);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [selectedId, isVideo, currentProject?.duration, currentIndex, selectProject]);

  // Keyboard navigation — A/D toggle panels with mutual exclusivity
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "a" || e.key === "A") {
        playClick(900);
        setAKeyDown(true);
        setAboutExpanded((v) => {
          if (!v) setDetailsExpanded(false);
          return !v;
        });
      } else if (e.key === "d" || e.key === "D") {
        playClick(900);
        setDKeyDown(true);
        setDetailsExpanded((v) => {
          if (!v) setAboutExpanded(false);
          return !v;
        });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        playClick(700, 0.03, 0.05);
        navigateProject("prev");
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        playClick(700, 0.03, 0.05);
        navigateProject("next");
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "a" || e.key === "A") setAKeyDown(false);
      if (e.key === "d" || e.key === "D") setDKeyDown(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [navigateProject]);

  return (
    <div className="h-screen overflow-hidden flex bg-gray-50 relative">

      {/* ── About pill — screen-edge anchored, 1-col wide ──────────────── */}
      <motion.button
        onClick={() => { playClick(); setAboutExpanded(true); setDetailsExpanded(false); }}
        className={`group absolute top-5 left-0 z-30 flex items-center justify-center gap-2 transition-colors duration-100 px-4 cursor-pointer shrink-0 ${aKeyDown ? "bg-gray-200" : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200"}`}
        style={{
          height: 34,
          width: "calc(20px + (100vw - 220px) / 10)",
          borderRadius: "0 17px 17px 0",
          pointerEvents: aboutExpanded ? "none" : "auto",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: aboutExpanded ? 0 : 1 }}
        transition={{ opacity: { duration: 0.12 } }}
      >
        <img src="/projects/avatar.png" alt="Vikas" className="rounded-full object-cover" style={{ width: 28, height: 28 }} />
        <span className={`transition-colors duration-100 text-base ${aKeyDown ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600 group-active:text-gray-700"}`}>A</span>
      </motion.button>

      {/* ── About panel — cols 1–2 (flex child, pushes hero) ──────────── */}
      <motion.div
        className="shrink-0 h-full overflow-hidden"
        animate={{ width: aboutExpanded ? sideWidth : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 55 }}
      >
        {/* Inner div is always sideWidth wide so content doesn't reflow during animation */}
        <div
          className="h-full overflow-y-auto flex flex-col cursor-pointer"
          style={{ width: sideWidth, padding: 20, gap: 40 }}
          onClick={() => setAboutExpanded(false)}
        >
          {/* Header — click to collapse */}
          <button
            onClick={(e) => { e.stopPropagation(); playClick(); setAboutExpanded(false); }}
            className={`group flex items-center justify-center gap-1.5 w-full px-5 py-1 rounded-[20px] transition-colors duration-100 shrink-0 cursor-pointer ${aKeyDown ? "bg-gray-200" : "bg-gray-50 hover:bg-gray-100 active:bg-gray-200"}`}
            style={{ height: 34 }}
          >
            <img src="/projects/avatar.png" alt="Vikas" className="rounded-full object-cover" style={{ width: 28, height: 28 }} />
            <span className={`transition-colors duration-100 text-base ${aKeyDown ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600 group-active:text-gray-700"}`}>A</span>
          </button>

          {/* Bio */}
          <p className="text-base text-gray-900 leading-[1.5]">Designing systems that turn complexity into clarity across AI, creativity and productivity.</p>

          {/* Work history entries */}
          {workHistory.map((entry) => (
            <div key={entry.company} className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">{entry.company}</span>
                  {entry.logoUrl ? (
                    <img
                      src={entry.logoUrl}
                      alt={entry.company}
                      className={`size-5 object-cover ${entry.logoRounded === false ? "" : "rounded"}`}
                    />
                  ) : (
                    <div className="size-5 rounded bg-gray-200 flex items-center justify-center text-[8px] font-medium text-gray-500">
                      {entry.logoFallback}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-base text-gray-400">
                  <span>{entry.role}</span>
                  <span>{entry.years}</span>
                </div>
              </div>
              {entry.description && (
                <p className="text-base text-gray-900 leading-[1.5]">{entry.description}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Project hero — cols 3–10 (or 1–8 when details open) ────────── */}
      <motion.div
        className="relative overflow-hidden flex-1 min-w-0"
        style={{ borderStyle: "solid", borderColor: "#e5e7eb" }}
        initial={false}
        animate={{
          marginTop: anyPanelOpen ? 20 : 0,
          marginBottom: anyPanelOpen ? 20 : 0,
          marginLeft: detailsExpanded ? 20 : 0,
          marginRight: anyPanelOpen ? 20 : 0,
          borderRadius: anyPanelOpen ? 20 : 0,
          borderWidth: anyPanelOpen ? 1 : 0,
        }}
        transition={{
          type: "spring", stiffness: 600, damping: 55,
          borderWidth: { duration: 0.08, ease: "easeIn" },
        }}
      >
        {/* Background media */}
        {currentProject?.videoUrl && (
          <video
            key={currentProject.videoUrl}
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentProject.videoUrl}
            autoPlay
            muted
            playsInline
          />
        )}
        {currentProject?.imageUrl && !currentProject.videoUrl && (
          <img
            key={currentProject.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
            src={currentProject.imageUrl}
            alt={currentProject.title}
          />
        )}
        {!currentProject?.videoUrl && !currentProject?.imageUrl && (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: currentProject?.bg ?? "#e5e7eb" }}
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(255,255,255,0.95) 89.9%)",
          }}
        />

        {/* Project info — bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0 flex flex-col gap-5"
          style={{ maxWidth: 692 }}
          animate={{ padding: anyPanelOpen ? 20 : 32 }}
          transition={{ type: "spring", stiffness: 600, damping: 55 }}
        >
          {/* Header: logo · project name · role · year */}
          {currentGroup && (
            <div className="flex items-center gap-2.5">
              <img
                src={currentGroup.logoUrl}
                alt={currentGroup.company}
                className="rounded object-cover shrink-0"
                style={{ width: 28, height: 27 }}
              />
              <span className="text-base font-medium text-gray-900 leading-6 whitespace-nowrap">
                {currentProject.title}
              </span>
              <span className="text-base text-gray-600 leading-6 whitespace-nowrap">
                {currentGroup.role}
              </span>
              {currentProject.year && (
                <span className="text-base text-gray-600 leading-6 whitespace-nowrap">
                  {currentProject.year}
                </span>
              )}
            </div>
          )}

          {/* Hook */}
          <p
            className="font-medium text-black leading-[1.2]"
            style={{ fontSize: 32, letterSpacing: "-0.96px" }}
          >
            {currentProject?.hook}
          </p>

          {/* Description */}
          <p className="text-base text-gray-900 leading-[1.5]">
            {currentProject?.description}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              className={`group flex items-center gap-1.5 transition-colors duration-100 border border-gray-300 rounded-full px-5 cursor-pointer ${dKeyDown ? "bg-gray-200" : "bg-transparent hover:bg-gray-100 active:bg-gray-200"}`}
              style={{ height: 34 }}
              onClick={() => {
                playClick();
                setDetailsExpanded((v) => {
                  if (!v) setAboutExpanded(false);
                  return !v;
                });
              }
              }
            >
              <span className="text-base text-gray-900">Show details</span>
              <span className={`text-base transition-colors duration-100 ${dKeyDown ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600 group-active:text-gray-700"}`}>D</span>
            </button>
            <button
              className="flex items-center gap-1.5 bg-transparent hover:bg-gray-100 active:bg-gray-200 transition-colors duration-100 border border-gray-300 rounded-full px-5 cursor-pointer"
              style={{ height: 34 }}
            >
              <span className="text-base text-gray-900">Try it</span>
              <ArrowUpRight size={16} className="text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Progress pills — bottom-right */}
        <motion.div
          className="absolute bottom-0 right-0 flex flex-col items-end gap-2.5"
          animate={{ padding: anyPanelOpen ? 20 : 32 }}
          transition={{ type: "spring", stiffness: 600, damping: 55 }}
        >
          <div className="flex gap-1" style={{ width: 200 }}>
            {allProjects.map((p, i) => (
              <div
                key={p.id}
                className="flex-1 h-[4px] relative rounded-full bg-gray-400 overflow-hidden"
              >
                {i < currentIndex && (
                  <div className="absolute inset-0 bg-gray-900 rounded-full" />
                )}
                {i === currentIndex && (
                  <div
                    className="absolute inset-y-0 left-0 bg-gray-900 rounded-full"
                    style={{ width: `${mediaProgress}%` }}
                  />
                )}
              </div>
            ))}
          </div>
          <span className="flex items-center gap-1 text-base text-gray-400">
            {mediaDuration !== null && (() => {
              const remaining = Math.max(0, mediaDuration * (1 - mediaProgress / 100));
              return (
                <>
                  <span className="tabular-nums">
                    {Math.floor(remaining / 60)}:{String(Math.floor(remaining % 60)).padStart(2, "0")}
                  </span>
                  <span>•</span>
                </>
              );
            })()}
            Use <ArrowLeft size={12} /> <ArrowRight size={12} /> to cycle through projects
          </span>
        </motion.div>
      </motion.div>

      {/* ── Details panel — cols 9–10 (flex child, pulls hero left) ────── */}
      <motion.div
        className="shrink-0 h-full overflow-hidden bg-gray-50"
        animate={{ width: detailsExpanded ? sideWidth - 20 : 0 }}
        transition={{ type: "spring", stiffness: 600, damping: 55 }}
        onClick={() => setDetailsExpanded(false)}
      >
        {/* Inner div is always (sideWidth - 20) wide; gap to hero comes from hero's marginRight */}
        <div
          className="h-full overflow-y-auto cursor-pointer"
          style={{ width: sideWidth - 20 }}
        >
          <div className="flex flex-col" style={{ paddingTop: 20, paddingRight: 20, paddingBottom: 20, paddingLeft: 0, gap: 40 }}>
            {currentProject?.details && Object.entries(currentProject.details).map(([key, value]) => (
              value && (
                <div key={key} className="flex flex-col gap-2.5">
                  <span className="text-base text-gray-400 capitalize">{key}</span>
                  <p className="text-base text-gray-900 leading-[1.5] whitespace-pre-line">{value}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
