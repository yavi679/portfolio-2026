"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Mail, Linkedin } from "lucide-react";
import { projectGroups, aboutProject, getAllProjects } from "@/lib/projects";

function getFormattedDate() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  const day = now.getDate();
  const weekday = now.toLocaleString("en-US", { weekday: "short" });
  return { date: `${month} ${day}`, weekday };
}

export default function PortfolioViewer() {
  const [selectedId, setSelectedId] = useState("smart-templates");
  const [highlightIndex, setHighlightIndex] = useState(4);
  const [pressedDir, setPressedDir] = useState<"up" | "down" | null>(null);

  const allProjects = getAllProjects();
  const currentProject = allProjects.find((p) => p.id === selectedId)!;
  const currentProjectIndex = allProjects.findIndex((p) => p.id === selectedId);
  const highlights = currentProject.highlights;
  const highlightCount = highlights.length;
  const progressPct = highlightCount > 0 ? ((highlightIndex + 1) / highlightCount) * 100 : 0;

  const { date, weekday } = getFormattedDate();

  function selectProject(id: string) {
    setSelectedId(id);
    setHighlightIndex(0);
  }

  function navigateProject(dir: "up" | "down") {
    const next = dir === "up" ? currentProjectIndex - 1 : currentProjectIndex + 1;
    if (next >= 0 && next < allProjects.length) {
      selectProject(allProjects[next].id);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPressedDir("up");
        const prev = currentProjectIndex - 1;
        if (prev >= 0) selectProject(allProjects[prev].id);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setPressedDir("down");
        const next = currentProjectIndex + 1;
        if (next < allProjects.length) selectProject(allProjects[next].id);
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") setPressedDir(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentProjectIndex, allProjects]);

  function navigateHighlight(dir: "prev" | "next") {
    if (dir === "prev" && highlightIndex > 0) setHighlightIndex((h) => h - 1);
    if (dir === "next" && highlightIndex < highlightCount - 1) setHighlightIndex((h) => h + 1);
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top bar — date */}
      <div className="flex items-center justify-center gap-8 min-h-[10vh] shrink-0">
        {/* p-ui-medium: 16px / 500 / lh-24 */}
        <span className="text-slate-600 text-base font-medium leading-6">{date}</span>
        <span className="text-slate-400 text-base font-medium leading-6">{weekday}</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-8 px-8 min-h-0">
        {/* Left — project nav */}
        <div className="flex-[1] flex flex-col min-h-0">
          <nav className="overflow-y-auto flex flex-col">
            {/* About Vikas — standalone at top */}
            <button
              onClick={() => selectProject(aboutProject.id)}
              className={`w-full text-left px-4 py-2 rounded-md text-base font-medium leading-6 transition-colors ${
                selectedId === aboutProject.id
                  ? "bg-slate-300 text-slate-600"
                  : "text-slate-400 hover:bg-slate-200 hover:text-slate-500 active:bg-slate-300 active:text-slate-600"
              }`}
            >
              {aboutProject.title}
            </button>

            {/* Company groups */}
            {projectGroups.map((group) => (
              <div key={group.company}>
                <div className="px-4 h-10 flex items-center text-slate-400 text-base font-normal leading-7">
                  {group.company}
                </div>
                {group.projects.map((project) => {
                  const isSelected = project.id === selectedId;
                  return (
                    <button
                      key={project.id}
                      onClick={() => selectProject(project.id)}
                      className={`w-full text-left px-4 py-2 rounded-md text-base font-medium leading-6 transition-colors ${
                        isSelected
                          ? "bg-slate-300 text-slate-600"
                          : "text-slate-400 hover:bg-slate-200 hover:text-slate-500 active:bg-slate-300 active:text-slate-600"
                      }`}
                    >
                      {project.title}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Up / Down project navigation */}
          <div className="flex gap-1 mt-2 shrink-0">
            <button
              onClick={() => navigateProject("up")}
              disabled={currentProjectIndex === 0}
              className={`flex-1 h-10 flex items-center justify-center rounded-md text-slate-500 active:bg-slate-200 disabled:opacity-40 transition-colors outline-none ${
                pressedDir === "up" ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <ArrowUp size={16} />
            </button>
            <button
              onClick={() => navigateProject("down")}
              disabled={currentProjectIndex === allProjects.length - 1}
              className={`flex-1 h-10 flex items-center justify-center rounded-md text-slate-500 active:bg-slate-200 disabled:opacity-40 transition-colors outline-none ${
                pressedDir === "down" ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              <ArrowDown size={16} />
            </button>
          </div>
        </div>

        {/* Middle — media + highlight controls */}
        <div className="flex-[3] flex flex-col items-center gap-5 min-h-0 pb-6">
          {/* Media placeholder */}
          <div className="flex-1 w-full bg-slate-200 rounded-lg min-h-0" />

          {/* Highlight navigation */}
          {highlightCount > 0 && (
            <div className="w-full max-w-lg shrink-0 flex flex-col gap-2.5 pb-2">
              <div className="flex items-center justify-between">
                {/* p-ui-medium: 16px / 500 / lh-24 */}
                <span className="text-slate-500 text-base font-medium leading-6">
                  {highlights[highlightIndex]?.title}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateHighlight("prev")}
                    disabled={highlightIndex === 0}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-40 transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  {/* p-ui-medium */}
                  <span className="text-slate-400 text-base font-medium leading-6 w-10 text-center">
                    {highlightIndex + 1}/{highlightCount}
                  </span>
                  <button
                    onClick={() => navigateHighlight("next")}
                    disabled={highlightIndex === highlightCount - 1}
                    className="text-slate-400 hover:text-slate-600 disabled:opacity-40 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="h-0.5 w-full bg-slate-100 rounded-full relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-slate-800 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right — project details */}
        <div className="flex-[1] flex flex-col justify-between pb-6">
          {/* p-ui-medium: 16px / 500 / lh-24 */}
          <p className="text-slate-500 text-base font-medium leading-6">
            {currentProject.description}
          </p>
          {currentProject.publications && currentProject.publications.length > 0 && (
            <div className="flex flex-col items-start gap-0.5">
              {/* p: 16px / 400 / lh-28 */}
              <span className="text-slate-500 text-base font-normal leading-7">Published in</span>
              <div className="flex gap-2.5 flex-wrap">
                {currentProject.publications.map((pub) => (
                  // p-ui-medium
                  <span key={pub} className="text-slate-500 text-base font-medium leading-6">
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar — name + socials */}
      <div className="flex items-center justify-center gap-5 min-h-[10vh] shrink-0">
        {/* p-ui-medium: 16px / 500 / lh-24 */}
        <span className="text-slate-500 text-base font-medium leading-6">Vikas Yadav</span>
        <div className="flex items-center">
          <a
            href="mailto:hello@vikasyadav.com"
            className="flex items-center justify-center size-8 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://linkedin.com/in/vikasyadav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-8 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
