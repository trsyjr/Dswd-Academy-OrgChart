// OrgChart.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn, ZoomOut, RotateCcw, X, Mail, Phone, ChevronDown,
  User, Briefcase, CheckCircle2, Sparkles, Printer, Sliders,
  Check, Copy, UserX, Search
} from 'lucide-react';

import { orgData, CLASSIFICATION_STYLES } from '../data/orgData';
import tabgBg from '../assets/TABG.png';

// Fallback styling for vacant nodes
const DEFAULT_VACANT_STYLE = {
  bg: 'bg-slate-50/90 hover:bg-slate-100',
  border: 'border-slate-300 border-dashed',
  titleText: 'text-slate-700',
  nameText: 'text-slate-400 italic',
  tag: 'VACANT',
  tagBg: 'bg-slate-200',
  tagText: 'text-slate-700',
  accent: 'from-slate-400 to-slate-500'
};

function matchesSearch(item, query) {
  if (!query || !item) return false;
  const q = query.toLowerCase().trim();
  if (!q) return false;

  const title = (item.title || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const type = (item.type || '').toLowerCase();
  const profession = (item.profession || '').toLowerCase();
  const nickname = (item.nickname || '').toLowerCase();
  const email = (item.email || '').toLowerCase();
  const tasks = Array.isArray(item.tasks) ? item.tasks.join(' ').toLowerCase() : '';

  return (
    title.includes(q) ||
    name.includes(q) ||
    type.includes(q) ||
    profession.includes(q) ||
    nickname.includes(q) ||
    email.includes(q) ||
    tasks.includes(q)
  );
}

// --- DYNAMIC CONNECTOR COMPONENT ---
function TreeBranch({ children, count, gap = 64 }) {
  return (
    <div className="relative flex justify-center items-start w-full pt-10" style={{ gap: `${gap}px` }}>
      <svg className="absolute top-0 left-0 w-full h-10 pointer-events-none z-0">
        <g className="print-line" stroke="#64748b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="50%" y1="0" x2="50%" y2="20" />
          {count > 1 ? (
            <>
              <line
                x1={`${(1 / (2 * count)) * 100}%`}
                y1="20"
                x2={`${(1 - 1 / (2 * count)) * 100}%`}
                y2="20"
              />
              {Array.from({ length: count }).map((_, i) => (
                <line
                  key={i}
                  x1={`${((2 * i + 1) / (2 * count)) * 100}%`}
                  y1="20"
                  x2={`${((2 * i + 1) / (2 * count)) * 100}%`}
                  y2="40"
                />
              ))}
            </>
          ) : (
            <line x1="50%" y1="20" x2="50%" y2="40" />
          )}
        </g>
      </svg>
      {children}
    </div>
  );
}

// --- VERTICAL CONNECTOR ---
function VerticalLine({ height = 28, dashed = false }) {
  return (
    <svg className="w-2.5 pointer-events-none shrink-0" style={{ height: `${height}px` }}>
      <line
        className="print-line"
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#64748b"
        strokeWidth="2.5"
        strokeDasharray={dashed ? "5 5" : "none"}
      />
    </svg>
  );
}

export default function OrgChart() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [scale, setScale] = useState(0.45);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(20);
  const [showSliders, setShowSliders] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const panRef = useRef({ x: 0, y: 20 });
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    panRef.current = { x: panX, y: panY };
  }, [panX, panY]);

  // Clamps pan mathematical bounds without layout-thrashing getBoundingClientRect calls
  const clampPan = useCallback((targetX, targetY) => {
    if (!viewportRef.current || !contentRef.current) return { x: targetX, y: targetY };

    const vWidth = viewportRef.current.clientWidth || 1000;
    const vHeight = viewportRef.current.clientHeight || 1000;
    const cWidth = (contentRef.current.offsetWidth || 3000) * scale;
    const cHeight = (contentRef.current.offsetHeight || 3000) * scale;

    const maxPanX = Math.max(vWidth * 1.5, cWidth * 1.5);
    const maxPanY = Math.max(vHeight * 1.5, cHeight * 1.5);

    return {
      x: Math.min(Math.max(targetX, -maxPanX), maxPanX),
      y: Math.min(Math.max(targetY, -maxPanY), maxPanY),
    };
  }, [scale]);

  // Smooth wheel zooming & panning
  useEffect(() => {
    const container = viewportRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        setScale((prev) => Math.min(Math.max(parseFloat((prev - e.deltaY * 0.0015).toFixed(2)), 0.15), 1.5));
      } else {
        const clamped = clampPan(panRef.current.x - e.deltaX, panRef.current.y - e.deltaY);
        panRef.current = clamped;

        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(${clamped.x}px, ${clamped.y}px, 0px) scale(${scale})`;
        }

        setPanX(clamped.x);
        setPanY(clamped.y);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [clampPan, scale]);

  const handleDragStart = (clientX, clientY, target) => {
    if (target.closest('.interactive-node') || target.closest('button') || target.closest('input')) {
      return;
    }

    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
    };
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    handleDragStart(e.clientX, e.clientY, e.target);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
    }
  };

  const handleDragMove = useCallback((clientX, clientY) => {
    if (!isDraggingRef.current) return;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    const targetX = dragStartRef.current.panX + deltaX;
    const targetY = dragStartRef.current.panY + deltaY;

    const clamped = clampPan(targetX, targetY);
    panRef.current = clamped;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${clamped.x}px, ${clamped.y}px, 0px) scale(${scale})`;
      }
    });
  }, [clampPan, scale]);

  const handleMouseMove = (e) => handleDragMove(e.clientX, e.clientY);
  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    setPanX(panRef.current.x);
    setPanY(panRef.current.y);
  };

  const handleReset = () => {
    setScale(0.45);
    setPanX(0);
    setPanY(20);
    panRef.current = { x: 0, y: 20 };
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0px, 20px, 0px) scale(0.45)`;
    }
  };

  const handleNodeInspect = (item) => {
    setSelectedNode(item);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-100 text-slate-800 select-none relative overflow-hidden font-sans print:h-auto print:w-full print:bg-white print:overflow-visible">

      <style>{`
        @media print {
          @page {
            size: A3 landscape;
            margin: 0;
          }

          html, body, #root, main, header, footer, nav, div {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          html, body, #root {
            width: 420mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .print-header {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 22mm !important;
            background: #ffffff !important;
            border-bottom: 2px solid #cbd5e1 !important;
            z-index: 100 !important;
          }

          .print-viewport {
            position: absolute !important;
            top: 32mm !important; 
            left: 0 !important;
            width: 420mm !important;
            height: 260mm !important;
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            overflow: hidden !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          .print-area {
            transform: none !important;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            background: #ffffff !important;
          }

          .print-wrapper {
            transform: scale(0.32) !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            padding-top: 20px !important;
            display: flex !important;
            justify-content: center !important;
            background: #ffffff !important;
          }

          .print-clean-header {
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #0f172a !important;
            border: 2px solid #2563eb !important;
            box-shadow: none !important;
          }

          .print-clean-header span {
            color: #0f172a !important;
          }

          .print-tree-connector {
            background-color: #1e293b !important;
            background: #1e293b !important;
            width: 3.5px !important;
          }

          .print-tree-connector-h {
            background-color: #1e293b !important;
            background: #1e293b !important;
            height: 3.5px !important;
          }

          svg line, svg g {
            stroke: #1e293b !important;
            stroke-width: 4px !important;
          }

          .obd-print-spacer {
            margin-bottom: 40px !important;
          }
        }
      `}</style>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none z-0 no-print"
        style={{ backgroundImage: `url(${tabgBg})` }}
      />

      {/* Floating Canvas Controls */}
      <div className="fixed bottom-6 right-6 z-40 bg-white/95 border border-slate-200/80 backdrop-blur-md flex flex-col gap-3.5 p-4 rounded-2xl shadow-2xl no-print min-w-[300px] sm:min-w-[340px] transition-all duration-300">
        <div className="relative w-full">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nodes..."
              className="w-full pl-10 pr-9 py-2 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-slate-700">
          <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Sliders size={14} className="text-blue-600" /> Canvas Controls
          </span>

          <button 
            onClick={() => setShowSliders(!showSliders)} 
            className="group relative inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-black tracking-wider uppercase text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200"
          >
            <span>{showSliders ? 'Hide' : 'Show'}</span>
            <ChevronDown 
              size={13} 
              className={`transition-transform duration-300 ${showSliders ? 'rotate-180' : 'rotate-0'}`} 
            />
          </button>
        </div>

        <AnimatePresence>
          {showSliders && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col gap-3 text-xs font-bold text-slate-600 overflow-hidden pt-1"
            >
              <div>
                <div className="flex justify-between mb-1">
                  <span>Zoom Level</span>
                  <span className="font-extrabold text-blue-600">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="1.5"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(parseFloat(e.target.value).toFixed(2)))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Horizontal Slide</span>
                  <span className="font-extrabold text-blue-600">{Math.round(panX)}px</span>
                </div>
                <input
                  type="range"
                  min={-5000}
                  max={5000}
                  step="1"
                  value={panX}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    const { x } = clampPan(val, panY);
                    setPanX(x);
                    panRef.current.x = x;
                    if (contentRef.current) {
                      contentRef.current.style.transform = `translate3d(${x}px, ${panY}px, 0px) scale(${scale})`;
                    }
                  }}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Vertical Slide</span>
                  <span className="font-extrabold text-blue-600">{Math.round(panY)}px</span>
                </div>
                <input
                  type="range"
                  min={-5000}
                  max={5000}
                  step="1"
                  value={panY}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    const { y } = clampPan(panX, val);
                    setPanY(y);
                    panRef.current.y = y;
                    if (contentRef.current) {
                      contentRef.current.style.transform = `translate3d(${panX}px, ${y}px, 0px) scale(${scale})`;
                    }
                  }}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={() => setScale((s) => Math.min(parseFloat((s + 0.05).toFixed(2)), 1.5))}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(parseFloat((s - 0.05).toFixed(2)), 0.15))}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Reset Position"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl transition-all flex-1 flex justify-center shadow-md shadow-blue-500/20"
            title="Print Chart"
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="w-full pt-4 pb-3.5 px-6 text-center bg-white/80 border-b border-slate-200 shrink-0 z-10 backdrop-blur-md shadow-sm flex flex-col items-center print-header">
        <div className="inline-flex items-center gap-1.5 text-blue-700 text-xs font-extrabold tracking-wider uppercase mb-1 no-print">
          <Sparkles size={15} /> Interactive Bureau Directory
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-900 print:text-lg">
          DSWD ACADEMY DYNAMIC BUREAU DIRECTORY
        </h1>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-2 text-xs font-extrabold tracking-wider uppercase text-slate-800 print:text-[10px] print:mt-0">
          <span className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 print:border-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shadow-xs" /> Permanent
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-950 print:border-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 shadow-xs" /> Contract of Service
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-300 text-sky-950 print:border-sky-600">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-700 shadow-xs" /> Contractual
          </span>
          <span className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 print:border-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 shadow-xs" /> Vacant
          </span>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        className={`w-full flex-1 overflow-hidden relative flex items-start justify-center pt-8 z-1 print-viewport touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="w-full h-full flex items-start justify-center transform-gpu will-change-transform print-area">
          <div
            ref={contentRef}
            style={{ 
              transform: `translate3d(${panX}px, ${panY}px, 0px) scale(${scale})`,
              willChange: 'transform',
              transformOrigin: 'top center'
            }}
            className="p-8 flex justify-center items-start print-wrapper"
          >
            <OrgTree node={orgData} onInspect={handleNodeInspect} searchQuery={searchQuery} />
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <DetailModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- LEAF CARD WITH ENLARGED TEXT & IMAGES ---
function LeafCard({ item, onInspect, searchQuery = '' }) {
  if (!item) return null;

  const isVacant = item.type === 'vacant' || item.vacant === true;
  const styles = isVacant
    ? (CLASSIFICATION_STYLES?.vacant || DEFAULT_VACANT_STYLE)
    : (CLASSIFICATION_STYLES?.[item.type] || CLASSIFICATION_STYLES?.permanent || DEFAULT_VACANT_STYLE);

  const hasSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
  const isMatch = hasSearch && matchesSearch(item, searchQuery);

  const highlightClass = hasSearch
    ? isMatch
      ? 'ring-4 ring-yellow-400 ring-offset-2 scale-[1.05] shadow-2xl z-30 opacity-100 transition-all duration-300 pointer-events-auto cursor-pointer'
      : 'opacity-20 grayscale transition-all duration-300 pointer-events-none cursor-default'
    : 'cursor-pointer';

  return (
    <motion.div
      whileHover={hasSearch && !isMatch ? {} : { scale: 1.02 }}
      whileTap={hasSearch && !isMatch ? {} : { scale: 0.98 }}
      onClick={(e) => {
        if (hasSearch && !isMatch) return;
        e.stopPropagation();
        onInspect(item);
      }}
      className={`interactive-node w-[420px] min-w-[420px] max-w-[420px] h-[120px] p-4 rounded-2xl border-2 text-left shadow-md z-10 flex items-center gap-4 relative shrink-0 group ${styles.bg} ${styles.border} ${highlightClass}`}
    >
      {/* Enlarged Avatar / Profile Image */}
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-sm shrink-0"
        />
      ) : isVacant ? (
        <div className="w-20 h-20 rounded-xl bg-slate-200/80 border-2 border-slate-300 flex items-center justify-center text-slate-500 shrink-0 shadow-xs">
          <UserX size={36} />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-xl bg-slate-200/90 border-2 border-slate-300 flex items-center justify-center text-xl font-black text-slate-800 shrink-0 shadow-xs">
          {item.title ? item.title.split(' ')[0] : 'DSWD'}
        </div>
      )}

      {/* Bigger, High-Contrast Typography */}
      <div className="flex-1 min-w-0 pr-1 flex flex-col justify-center">
        {/* Job Title / Designation */}
        <div className="text-lg leading-tight font-black uppercase text-slate-900 tracking-tight truncate">
          {item.title}
        </div>
        
        {/* Full Name */}
        <div className={`text-xl font-extrabold leading-tight mt-1 truncate ${isVacant ? 'text-slate-400 italic' : 'text-blue-950'}`}>
          {isVacant ? (item.name || 'Unassigned / Vacant') : (item.name || '')}
        </div>
      </div>

      {/* Tag Badge */}
      {styles.tag && (
        <span className={`absolute -top-3.5 right-4 text-xs font-black px-3 py-0.5 rounded-md shadow-xs print:hidden ${styles.tagBg} ${styles.tagText}`}>
          {styles.tag}
        </span>
      )}
    </motion.div>
  );
}

// --- COLLAPSIBLE HEADER (EXACT 420px MATCH) ---
function CollapsibleHeader({ title, isOpen, onToggle }) {
  return (
    <div className="relative flex justify-center items-center shrink-0 z-20">
      <div 
        className="interactive-node w-[420px] min-w-[420px] max-w-[420px] h-[64px] py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 border-blue-500 text-white shadow-md flex items-center justify-center cursor-pointer transition-colors group relative print-clean-header print:py-2 print:px-3 shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="font-black text-base uppercase tracking-wider text-center break-words leading-tight px-2 print:text-xs">
          {title}
        </span>

        <div className="absolute left-1/2 -bottom-3.5 -translate-x-1/2 z-30 no-print">
          <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white text-white group-hover:bg-blue-500 flex items-center justify-center shadow-md transition-all">
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN ORGANIZATIONAL TREE ---
function OrgTree({ node, onInspect, searchQuery }) {
  const [showObd, setShowObd] = useState(true);

  if (!node) return null;

  return (
    <div className="flex flex-col items-center">
      
      {/* Executive level */}
      <div className="flex flex-col items-center z-10 relative">
        <LeafCard item={node.dir4} onInspect={onInspect} searchQuery={searchQuery} />
        <VerticalLine height={36} />
        <LeafCard item={node.dir3} onInspect={onInspect} searchQuery={searchQuery} />
      </div>

      {/* OBD Side Branch */}
      {node.obd && (
        <div className="relative flex flex-col items-center w-full obd-print-spacer">
          <div className="w-0.5 bg-slate-500 h-full absolute top-0 left-1/2 -translate-x-1/2 z-0 print-tree-connector" />

          <div className="relative z-10 my-8 w-full flex justify-center items-start">
            <div className="relative flex flex-col items-center">
              <VerticalLine height={48} />

              <div className="absolute top-[24px] left-1/2 w-[600px] h-[2.5px] bg-slate-500 z-0 pointer-events-none print-tree-connector-h" />

              <div className="absolute top-0 left-[820px] -translate-x-1/2 flex flex-col items-center">
                <CollapsibleHeader
                  title={node.obd.title}
                  isOpen={showObd}
                  onToggle={() => setShowObd((prev) => !prev)}
                />

                <AnimatePresence>
                  {showObd && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex flex-col items-center mt-4"
                    >
                      <VerticalLine height={20} dashed={true} />

                      <div className="relative flex justify-center items-start gap-10 pt-4">
                        <svg className="absolute top-0 left-0 w-full h-4 pointer-events-none z-0">
                          <g stroke="#64748b" strokeWidth="2.5" strokeDasharray="5 5" fill="none">
                            <line x1="16.6%" y1="0" x2="83.3%" y2="0" />
                            <line x1="16.6%" y1="0" x2="16.6%" y2="16" />
                            <line x1="50%" y1="0" x2="50%" y2="16" />
                            <line x1="83.3%" y1="0" x2="83.3%" y2="16" />
                          </g>
                        </svg>

                        {node.obd.cols?.map((col, cIdx) => (
                          <div key={cIdx} className="flex flex-col items-center relative shrink-0">
                            <div className="flex flex-col gap-4 relative z-10">
                              {col.map((staff, sIdx) => (
                                <React.Fragment key={sIdx}>
                                  <LeafCard item={staff} onInspect={onInspect} searchQuery={searchQuery} />
                                  {sIdx < col.length - 1 && (
                                    <div className="flex justify-center -my-2">
                                      <VerticalLine height={16} dashed={true} />
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div style={{ height: showObd ? '820px' : '80px' }} className="transition-all duration-300 w-full" />
        </div>
      )}

      {/* Divisions Section */}
      {node.divisions && (
        <TreeBranch count={node.divisions.length} gap={80}>
          {node.divisions.map((div) => (
            <div key={div.id} className="flex flex-col items-center flex-1 min-w-[940px]">
              <DivisionBranch division={div} onInspect={onInspect} searchQuery={searchQuery} />
            </div>
          ))}
        </TreeBranch>
      )}

    </div>
  );
}

// --- DIVISION BRANCH ---
function DivisionBranch({ division, onInspect, searchQuery }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-center w-full">
      <CollapsibleHeader
        title={division.title}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col items-center w-full"
          >
            {division.leads && (
              <div className="flex flex-col items-center relative">
                {division.leads.map((lead, idx) => (
                  <React.Fragment key={idx}>
                    <VerticalLine height={28} />
                    <LeafCard item={lead} onInspect={onInspect} searchQuery={searchQuery} />
                  </React.Fragment>
                ))}
              </div>
            )}

            {division.sections && (
              <TreeBranch count={division.sections.length} gap={60}>
                {division.sections.map((sec) => (
                  <div key={sec.id} className="flex flex-col items-center flex-1 min-w-[920px]">
                    <SectionBranch section={sec} onInspect={onInspect} searchQuery={searchQuery} />
                  </div>
                ))}
              </TreeBranch>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SECTION BRANCH (PAIRS ALIGNED WITH 420px CARDS) ---
function SectionBranch({ section, onInspect, searchQuery }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-center w-full">
      <CollapsibleHeader
        title={section.title}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col items-center w-full"
          >
            <VerticalLine height={28} />

            {section.pairs && (
              <div className="flex flex-col items-center relative w-full">
                {/* Center Stem Line */}
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-slate-500 z-0 print-tree-connector" />

                <div className="flex flex-col gap-6 w-full items-center">
                  {section.pairs.map((pair, idx) => (
                    <div key={idx} className="flex items-center justify-between relative w-[900px] shrink-0 z-10">
                      {/* Horizontal Connector Line through middle */}
                      <div className="absolute top-1/2 left-0 w-full h-[2.5px] -translate-y-1/2 bg-slate-500 z-0 pointer-events-none print-tree-connector-h" />

                      <div className="z-10 bg-white/10 rounded-2xl">
                        <LeafCard item={pair[0]} onInspect={onInspect} searchQuery={searchQuery} />
                      </div>

                      {pair[1] ? (
                        <div className="z-10 bg-white/10 rounded-2xl">
                          <LeafCard item={pair[1]} onInspect={onInspect} searchQuery={searchQuery} />
                        </div>
                      ) : (
                        <div className="w-[420px] shrink-0 pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>

                {section.bottomNode && (
                  <div className="flex flex-col items-center relative z-10">
                    <VerticalLine height={28} />
                    <LeafCard item={section.bottomNode} onInspect={onInspect} searchQuery={searchQuery} />
                  </div>
                )}
              </div>
            )}

            {section.stack && (
              <div className="flex flex-col items-center relative">
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-slate-500 z-0 print-tree-connector" />

                <div className="flex flex-col gap-5 relative z-10">
                  {section.stack.map((item, idx) => (
                    <LeafCard key={idx} item={item} onInspect={onInspect} searchQuery={searchQuery} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- PROFILE DETAIL MODAL ---
function DetailModal({ node, onClose }) {
  if (!node) return null;

  const isVacant = node.type === 'vacant' || node.vacant === true;
  const styles = isVacant
    ? (CLASSIFICATION_STYLES?.vacant || DEFAULT_VACANT_STYLE)
    : (CLASSIFICATION_STYLES?.[node.type] || CLASSIFICATION_STYLES?.permanent || DEFAULT_VACANT_STYLE);

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName, e) => {
    e.stopPropagation();
    if (!text || text === 'N/A' || text === 'Internal Ext.') return;

    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 no-print">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden relative z-10 text-slate-800"
      >
        <div className={`h-4 w-full bg-gradient-to-r ${styles.accent || 'from-blue-600 to-indigo-700'}`} />

        <div className="p-8 max-h-[85vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {node.image ? (
              <img
                src={node.image}
                alt={node.title}
                className="w-48 h-48 rounded-2xl object-cover border-2 border-slate-200 shadow-md shrink-0"
              />
            ) : isVacant ? (
              <div className="w-48 h-48 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-400 shrink-0 shadow-xs">
                <UserX size={64} />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-900 font-black text-4xl shrink-0 shadow-xs">
                {node.title ? node.title.substring(0, 3) : 'DSWD'}
              </div>
            )}

            <div className="text-center sm:text-left flex-1 pt-1">
              <span className={`inline-block text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 shadow-xs ${styles.tagBg || 'bg-blue-600'} ${styles.tagText || 'text-white'}`}>
                {isVacant ? 'VACANT POSITION' : (styles.label || styles.tag || 'STAFF')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide leading-tight">{node.title}</h2>
              <p className={`text-xl font-black mt-2 ${isVacant ? 'text-slate-400 italic' : 'text-slate-900'}`}>
                {isVacant ? 'Position Unassigned' : (node.name || 'DSWD Academy Staff')}
              </p>
            </div>
          </div>

          <hr className="border-slate-200 my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <User size={20} className="text-blue-600 shrink-0" />
              <div className="truncate">
                <span className="text-xs block text-slate-500 uppercase font-black">Nickname</span>
                <span className="font-extrabold text-slate-800 text-base">{node.nickname || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <Briefcase size={20} className="text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="text-xs block text-slate-500 uppercase font-black">Profession</span>
                <span className="font-extrabold text-slate-800 text-base">{node.profession || 'Government Staff'}</span>
              </div>
            </div>

            {/* CLICK-TO-COPY PHONE */}
            <div
              onClick={(e) => handleCopy(node.phone, 'phone', e)}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/80 border border-slate-200 hover:border-orange-300 cursor-pointer transition-all duration-200 relative"
              title="Click to copy phone number"
            >
              <div className="flex items-center gap-3.5 truncate pr-2">
                <Phone size={20} className="text-orange-600 shrink-0" />
                <div className="truncate">
                  <span className="text-xs block text-slate-500 uppercase font-black">Phone</span>
                  <span className="font-extrabold text-slate-800 text-base group-hover:text-orange-950 transition-colors">
                    {node.phone || 'Internal Ext.'}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                {copiedField === 'phone' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <Check size={14} /> Copied!
                  </span>
                ) : (
                  <Copy size={16} className="text-slate-400 group-hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>

            {/* CLICK-TO-COPY EMAIL */}
            <div
              onClick={(e) => handleCopy(node.email, 'email', e)}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all duration-200 relative"
              title="Click to copy email address"
            >
              <div className="flex items-center gap-3.5 truncate pr-2">
                <Mail size={20} className="text-sky-600 shrink-0" />
                <div className="truncate">
                  <span className="text-xs block text-slate-500 uppercase font-black">Email</span>
                  <span className="font-extrabold text-slate-800 text-base group-hover:text-sky-950 transition-colors">
                    {node.email || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                {copiedField === 'email' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <Check size={14} /> Copied!
                  </span>
                ) : (
                  <Copy size={16} className="text-slate-400 group-hover:text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          </div>

          {node.tasks && node.tasks.length > 0 && (
            <div className="mt-6">
              <span className="text-xs uppercase tracking-wider font-black text-slate-500 block mb-3">
                Core Duties & Functional Responsibilities ({node.tasks.length})
              </span>
              <div className="flex flex-col gap-2.5">
                {node.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}