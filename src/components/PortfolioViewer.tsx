"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllProjects, getProjectGroup, workHistory } from "@/lib/projects";

const allProjects = getAllProjects();

export default function PortfolioViewer() {
  const [selectedId, setSelectedId] = useState(allProjects[0]?.id ?? "");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);

  const currentIndex = allProjects.findIndex((p) => p.id === selectedId);
  const currentProject = allProjects[currentIndex];
  const currentGroup = getProjectGroup(selectedId);
  const isVideo = !!currentProject?.videoUrl;

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      const next = currentIndex + 1;
      if (next < allProjects.length) selectProject(allProjects[next].id);
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
    setMediaDuration((currentProject?.duration ?? 5000) / 1000);
    setMediaProgress(0);
    const DURATION = currentProject?.duration ?? 5000;
    const TICK = 50;
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += TICK;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setMediaProgress(pct);
      if (elapsed >= DURATION) {
        clearInterval(interval);
        setMediaProgress(0);
        const next = currentIndex + 1;
        if (next < allProjects.length) selectProject(allProjects[next].id);
      }
    }, TICK);
    return () => clearInterval(interval);
  }, [selectedId, isVideo, currentProject?.duration, currentIndex, selectProject]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "a" || e.key === "A") {
        setAboutExpanded((v) => !v);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigateProject("prev");
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigateProject("next");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateProject]);

  return (
    <div className="h-screen overflow-hidden relative bg-gray-50">

      {/* ── About Vikas — expanded left panel ─────────────────────────── */}
      <motion.div
        className="absolute left-5 top-5 w-[264px] flex flex-col gap-10 overflow-y-auto"
        style={{ pointerEvents: aboutExpanded ? "auto" : "none" }}
        initial={false}
        animate={aboutExpanded ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 320, damping: 22, delay: 0.06 },
          },
          closed: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.15, ease: "easeIn" },
          },
        }}
      >
        {/* Header — click to collapse */}
        <button
          onClick={() => setAboutExpanded(false)}
          className="flex items-center justify-center gap-1.5 w-full px-5 py-1 rounded-[20px] bg-gray-50 shrink-0 cursor-pointer"
          style={{ height: 34 }}
        >
          <img src="/projects/avatar.png" alt="Vikas" className="rounded-full object-cover" style={{ width: 28, height: 28 }} />
          <span className="text-gray-400 text-xs">A</span>
        </button>

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
      </motion.div>

      {/* ── About Vikas — collapsed pill (locked at top-left) ────────── */}
      <motion.button
        onClick={() => setAboutExpanded(true)}
        className="absolute top-5 left-5 z-20 flex items-center justify-center gap-1.5 bg-gray-50 rounded-full px-5 cursor-pointer"
        style={{ height: 34, width: "calc((100vw - 220px) / 10)", pointerEvents: aboutExpanded ? "none" : "auto" }}
        initial={{ opacity: 0, y: -6 }}
        animate={{
          opacity: aboutExpanded ? 0 : 1,
          y: 0,
        }}
        transition={{
          opacity: { duration: 0.12 },
          y: { type: "spring", stiffness: 300, damping: 28, delay: 0.15 },
        }}
      >
        <img src="/projects/avatar.png" alt="Vikas" className="rounded-full object-cover" style={{ width: 28, height: 28 }} />
        <span className="text-gray-400 text-xs">A</span>
      </motion.button>

      {/* ── Main project area ──────────────────────────────────────────── */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ borderStyle: "solid", borderColor: "#e5e7eb" }}
        initial={false}
        animate={aboutExpanded ? "open" : "closed"}
        variants={{
          open: {
            left: 304,
            top: 20,
            right: 20,
            bottom: 20,
            borderRadius: 20,
            borderWidth: 1,
            transition: { type: "spring", stiffness: 260, damping: 24 },
          },
          closed: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: 0,
            borderWidth: 0,
            transition: {
              type: "spring", stiffness: 520, damping: 38,
              borderWidth: { duration: 0.08, ease: "easeIn" },
            },
          },
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
        <div
          className="absolute bottom-0 left-0 p-5 flex flex-col gap-5"
          style={{ maxWidth: 692 }}
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
        </div>

        {/* Progress pills — bottom-right */}
        <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2.5">
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
          <span className="flex items-center gap-1 text-xs text-gray-400">
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
        </div>
      </motion.div>
    </div>
  );
}
