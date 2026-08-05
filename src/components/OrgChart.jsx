// OrgChart.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn, ZoomOut, RotateCcw, X, Mail, Phone, ChevronDown,
  User, Briefcase, CheckCircle2, Sparkles, Printer, Sliders, ListChecks,
  Check, Copy
} from 'lucide-react';

import { orgData, CLASSIFICATION_STYLES } from '../data/orgData';
import tabgBg from '../assets/TABG.png';

// --- DYNAMIC CONNECTOR COMPONENT ---
function TreeBranch({ children, count, gap = 48 }) {
  return (
    <div className="relative flex justify-center items-start w-full pt-8" style={{ gap: `${gap}px` }}>
      <svg className="absolute top-0 left-0 w-full h-8 pointer-events-none z-0">
        <g className="print-line" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="50%" y1="0" x2="50%" y2="16" />
          {count > 1 ? (
            <>
              <line
                x1={`${(1 / (2 * count)) * 100}%`}
                y1="16"
                x2={`${(1 - 1 / (2 * count)) * 100}%`}
                y2="16"
              />
              {Array.from({ length: count }).map((_, i) => (
                <line
                  key={i}
                  x1={`${((2 * i + 1) / (2 * count)) * 100}%`}
                  y1="16"
                  x2={`${((2 * i + 1) / (2 * count)) * 100}%`}
                  y2="32"
                />
              ))}
            </>
          ) : (
            <line x1="50%" y1="16" x2="50%" y2="32" />
          )}
        </g>
      </svg>
      {children}
    </div>
  );
}

// --- VERTICAL CONNECTOR ---
function VerticalLine({ height = 24, dashed = false }) {
  return (
    <svg className="w-2 pointer-events-none shrink-0" style={{ height: `${height}px` }}>
      <line
        className="print-line"
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray={dashed ? "4 4" : "none"}
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

  // Dynamic bounds state
  const [bounds, setBounds] = useState({
    minX: -1000,
    maxX: 1000,
    minY: -800,
    maxY: 400
  });

  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const updateBounds = useCallback(() => {
    if (!viewportRef.current || !contentRef.current) return bounds;

    const vRect = viewportRef.current.getBoundingClientRect();
    const cRect = contentRef.current.getBoundingClientRect();

    const calculatedMaxX = Math.max(300, Math.round((cRect.width + vRect.width * 0.5) / 2));
    
    // Scale-aware vertical bounds adjustment to prevent bottom whitespace overrun
    const effectiveHeight = cRect.height * scale;
    const calculatedMinY = Math.round(-effectiveHeight * 0.65);
    const calculatedMaxY = Math.max(200, Math.round(vRect.height * 0.35));

    const newBounds = {
      minX: -calculatedMaxX,
      maxX: calculatedMaxX,
      minY: calculatedMinY,
      maxY: calculatedMaxY
    };

    setBounds(newBounds);
    return newBounds;
  }, [bounds, scale]);

  const clampPan = useCallback((targetX, targetY) => {
    const currentBounds = updateBounds();
    return {
      x: Math.min(Math.max(targetX, currentBounds.minX), currentBounds.maxX),
      y: Math.min(Math.max(targetY, currentBounds.minY), currentBounds.maxY),
    };
  }, [updateBounds]);

  useEffect(() => {
    updateBounds();
  }, [scale, updateBounds]);

  // Handle Zoom & Pan via Wheel
  useEffect(() => {
    const container = viewportRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        setScale((prev) => Math.min(Math.max(parseFloat((prev - e.deltaY * 0.0015).toFixed(2)), 0.15), 1.5));
      } else {
        setPanX((prevX) => {
          setPanY((prevY) => {
            const clamped = clampPan(prevX - e.deltaX, prevY - e.deltaY);
            return clamped.y;
          });
          const clamped = clampPan(prevX - e.deltaX, panY);
          return clamped.x;
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [panY, clampPan]);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (e.target.closest('button') || e.target.closest('input')) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX,
      panY,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const targetX = dragStartRef.current.panX + deltaX;
    const targetY = dragStartRef.current.panY + deltaY;

    const { x, y } = clampPan(targetX, targetY);

    setPanX(x);
    setPanY(y);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setScale(0.45);
    setPanX(0);
    setPanY(20);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-100 text-slate-800 select-none relative overflow-hidden font-sans print:h-auto print:w-full print:bg-white print:overflow-visible">
      
      {/* PRINT STYLES */}
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
            height: 20mm !important;
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
            transform: scale(0.38) !important;
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
            width: 3px !important;
          }

          .print-tree-connector-h {
            background-color: #1e293b !important;
            background: #1e293b !important;
            height: 3px !important;
          }

          svg line, svg g {
            stroke: #1e293b !important;
            stroke-width: 3.5px !important;
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
      <div className="fixed bottom-6 right-6 z-40 bg-white/95 border border-slate-200/80 backdrop-blur-md flex flex-col gap-3 p-3.5 rounded-2xl shadow-2xl no-print min-w-[260px] transition-all duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-slate-700">
          <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-slate-800">
            <Sliders size={14} className="text-blue-600" /> Canvas Controls
          </span>

          <button 
            onClick={() => setShowSliders(!showSliders)} 
            className="group relative inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-wider uppercase text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200"
          >
            <span>{showSliders ? 'Hide' : 'Show'}</span>
            <ChevronDown 
              size={12} 
              className={`transition-transform duration-300 ${showSliders ? 'rotate-180' : 'rotate-0'}`} 
            />
          </button>
        </div>

        {/* SLIDERS */}
        <AnimatePresence>
          {showSliders && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col gap-2.5 text-[11px] font-bold text-slate-600 overflow-hidden pt-1"
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
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Horizontal Slide</span>
                  <span className="font-extrabold text-blue-600">{Math.round(panX)}px</span>
                </div>
                <input
                  type="range"
                  min={bounds.minX}
                  max={bounds.maxX}
                  step="1"
                  value={panX}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    const { x } = clampPan(val, panY);
                    setPanX(x);
                  }}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Vertical Slide</span>
                  <span className="font-extrabold text-blue-600">{Math.round(panY)}px</span>
                </div>
                <input
                  type="range"
                  min={bounds.minY}
                  max={bounds.maxY}
                  step="1"
                  value={bounds.maxY - (panY - bounds.minY)}
                  onChange={(e) => {
                    const rawVal = parseFloat(e.target.value);
                    const invertedY = bounds.maxY - (rawVal - bounds.minY);
                    const { y } = clampPan(panX, invertedY);
                    setPanY(y);
                  }}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100">
          <button
            onClick={() => setScale((s) => Math.min(parseFloat((s + 0.05).toFixed(2)), 1.5))}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(parseFloat((s - 0.05).toFixed(2)), 0.15))}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition-colors flex-1 flex justify-center active:scale-95"
            title="Reset Position"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => window.print()}
            className="p-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl transition-all flex-1 flex justify-center shadow-md shadow-blue-500/20"
            title="Print Chart"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="w-full pt-4 pb-3 px-6 text-center bg-white/80 border-b border-slate-200 shrink-0 z-10 backdrop-blur-md shadow-sm flex flex-col items-center print-header">
        <div className="inline-flex items-center gap-1.5 text-blue-700 text-xs font-bold tracking-wider uppercase mb-1 no-print">
          <Sparkles size={14} /> Interactive Bureau Directory
        </div>
        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900 print:text-base">
          DSWD ACADEMY DYNAMIC BUREAU DIRECTORY
        </h1>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-800 print:text-[9px] print:mt-0">
          <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 print:border-amber-600">
            <span className="w-2 h-2 rounded-full bg-amber-600 shadow-xs" /> Permanent
          </span>
          <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-950 print:border-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-700 shadow-xs" /> Contract of Service
          </span>
          <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100/80 border border-sky-300 text-sky-950 print:border-sky-600">
            <span className="w-2 h-2 rounded-full bg-sky-700 shadow-xs" /> Contractual
          </span>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`w-full flex-1 overflow-hidden relative flex items-start justify-center pt-6 z-1 print-viewport ${
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
            className="p-8 flex justify-center items-start print-wrapper transition-transform duration-75 ease-out"
          >
            <OrgTree node={orgData} onInspect={setSelectedNode} />
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

// --- LEAF CARD (ENLARGED CARD & IMAGE AVATARS) ---
function LeafCard({ item, onInspect, width = 'w-64' }) {
  const styles = CLASSIFICATION_STYLES[item.type] || CLASSIFICATION_STYLES.permanent;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        e.stopPropagation();
        onInspect(item);
      }}
      className={`${width} min-h-[76px] p-3.5 rounded-2xl border-2 text-left cursor-pointer shadow-md z-10 flex items-center gap-4 relative group ${styles.bg} ${styles.border}`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-xl bg-slate-200/90 border-2 border-slate-300 flex items-center justify-center text-xs font-black text-slate-700 shrink-0 shadow-xs">
          {item.title ? item.title.substring(0, 3) : 'DSWD'}
        </div>
      )}

      <div className="flex-1 min-w-0 pr-1">
        <div className={`text-[13px] leading-snug font-black break-words ${styles.titleText}`}>
          {item.title}
        </div>
        {item.name && (
          <div className={`text-[11px] leading-tight font-semibold mt-0.5 break-words ${styles.nameText}`}>
            {item.name}
          </div>
        )}
      </div>

      {styles.tag && (
        <span className={`absolute -top-2.5 right-3 text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs print:hidden ${styles.tagBg} ${styles.tagText}`}>
          {styles.tag}
        </span>
      )}
    </motion.div>
  );
}

// --- COLLAPSIBLE HEADER ---
function CollapsibleHeader({ title, isOpen, onToggle, width = 'w-80' }) {
  return (
    <div className="relative flex justify-center items-center shrink-0 z-20">
      <div 
        className={`${width} py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-blue-500 text-white shadow-md flex items-center justify-center cursor-pointer transition-colors group relative print-clean-header print:py-1.5 print:px-2`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="font-black text-[12px] uppercase tracking-wider text-center break-words leading-tight px-2 print:text-[10px]">
          {title}
        </span>

        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 z-30 no-print">
          <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white text-white group-hover:bg-blue-500 flex items-center justify-center shadow-md transition-all">
            <ChevronDown 
              size={14} 
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN ORGANIZATIONAL TREE ---
function OrgTree({ node, onInspect }) {
  const [showObd, setShowObd] = useState(true);

  return (
    <div className="flex flex-col items-center">
      
      {/* Executive level */}
      <div className="flex flex-col items-center z-10 relative">
        <LeafCard item={node.dir4} onInspect={onInspect} width="w-88" />
        <VerticalLine height={32} />
        <LeafCard item={node.dir3} onInspect={onInspect} width="w-88" />
      </div>

      {/* OBD Side Branch */}
      <div className="relative flex flex-col items-center w-full obd-print-spacer">
        <div className="w-0.5 bg-slate-500 h-full absolute top-0 left-1/2 -translate-x-1/2 z-0 print-tree-connector" />

        <div className="relative z-10 my-6 w-full flex justify-center items-start">
          <div className="relative flex flex-col items-center">
            <VerticalLine height={40} />

            <div className="absolute top-[20px] left-1/2 w-[520px] h-[2px] bg-slate-500 z-0 pointer-events-none print-tree-connector-h" />

            <div className="absolute top-0 left-[580px] -translate-x-1/2 flex flex-col items-center">
              <CollapsibleHeader
                title={node.obd.title}
                isOpen={showObd}
                onToggle={() => setShowObd(!showObd)}
                width="w-88"
              />

              <AnimatePresence>
                {showObd && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex flex-col items-center mt-3"
                  >
                    <VerticalLine height={16} dashed={true} />

                    <div className="relative flex justify-center items-start gap-8 pt-4">
                      <svg className="absolute top-0 left-0 w-full h-4 pointer-events-none z-0">
                        <g stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" fill="none">
                          <line x1="16.6%" y1="0" x2="83.3%" y2="0" />
                          <line x1="16.6%" y1="0" x2="16.6%" y2="16" />
                          <line x1="50%" y1="0" x2="50%" y2="16" />
                          <line x1="83.3%" y1="0" x2="83.3%" y2="16" />
                        </g>
                      </svg>

                      {node.obd.cols.map((col, cIdx) => (
                        <div key={cIdx} className="flex flex-col items-center relative shrink-0">
                          <div className="flex flex-col gap-3.5 relative z-10">
                            {col.map((staff, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <LeafCard item={staff} onInspect={onInspect} width="w-60" />
                                {sIdx < col.length - 1 && (
                                  <div className="flex justify-center -my-1.5">
                                    <VerticalLine height={12} dashed={true} />
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

        <div style={{ height: showObd ? '680px' : '80px' }} className="transition-all duration-300 w-full" />
      </div>

      {/* Divisions Section */}
      <TreeBranch count={node.divisions.length} gap={56}>
        {node.divisions.map((div) => (
          <div key={div.id} className="flex flex-col items-center flex-1 min-w-[560px]">
            <DivisionBranch division={div} onInspect={onInspect} />
          </div>
        ))}
      </TreeBranch>

    </div>
  );
}

// --- DIVISION BRANCH ---
function DivisionBranch({ division, onInspect }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-center w-full">
      <CollapsibleHeader
        title={division.title}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        width="w-[420px]"
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
                    <VerticalLine height={24} />
                    <LeafCard item={lead} onInspect={onInspect} width="w-68" />
                  </React.Fragment>
                ))}
              </div>
            )}

            <TreeBranch count={division.sections.length} gap={36}>
              {division.sections.map((sec) => (
                <div key={sec.id} className="flex flex-col items-center flex-1 min-w-[260px]">
                  <SectionBranch section={sec} onInspect={onInspect} />
                </div>
              ))}
            </TreeBranch>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SECTION BRANCH ---
function SectionBranch({ section, onInspect }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col items-center w-full">
      <CollapsibleHeader
        title={section.title}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        width="w-80"
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
            <VerticalLine height={24} />

            {section.pairs && (
              <div className="flex flex-col items-center relative w-full">
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-slate-500 z-0 print-tree-connector" />

                <div className="flex flex-col gap-5 w-full items-center">
                  {section.pairs.map((pair, idx) => (
                    <div key={idx} className="flex items-center justify-center relative w-full gap-12 z-10">
                      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-2 pointer-events-none z-0">
                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#64748b" strokeWidth="2" />
                      </svg>

                      <LeafCard item={pair[0]} onInspect={onInspect} width="w-52" />
                      {pair[1] && <LeafCard item={pair[1]} onInspect={onInspect} width="w-52" />}
                    </div>
                  ))}
                </div>

                {section.bottomNode && (
                  <div className="flex flex-col items-center relative z-10">
                    <VerticalLine height={24} />
                    <LeafCard item={section.bottomNode} onInspect={onInspect} width="w-52" />
                  </div>
                )}
              </div>
            )}

            {section.stack && (
              <div className="flex flex-col items-center relative">
                <div className="absolute top-0 bottom-4 left-1/2 -translate-x-1/2 w-0.5 bg-slate-500 z-0 print-tree-connector" />
                
                <div className="flex flex-col gap-4 relative z-10">
                  {section.stack.map((item, idx) => (
                    <LeafCard key={idx} item={item} onInspect={onInspect} width="w-56" />
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

// --- PROFILE DETAIL MODAL (ENLARGED AVATAR) ---
function DetailModal({ node, onClose }) {
  const styles = CLASSIFICATION_STYLES[node.type] || CLASSIFICATION_STYLES.permanent;
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
        className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden relative z-10 text-slate-800"
      >
        <div className={`h-3.5 w-full bg-gradient-to-r ${styles.accent || 'from-blue-600 to-indigo-700'}`} />

        <div className="p-7 max-h-[85vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Modal Image Enlarged to w-40 h-40 */}
            {node.image ? (
              <img
                src={node.image}
                alt={node.title}
                className="w-40 h-40 rounded-2xl object-cover border-2 border-slate-200 shadow-md shrink-0"
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-900 font-black text-3xl shrink-0 shadow-xs">
                {node.title ? node.title.substring(0, 3) : 'DSWD'}
              </div>
            )}

            <div className="text-center sm:text-left flex-1 pt-1">
              {styles.label && (
                <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2 shadow-xs ${styles.tagBg || 'bg-blue-600'} ${styles.tagText || 'text-white'}`}>
                  {styles.label}
                </span>
              )}
              <h2 className="text-2xl font-black text-slate-900 tracking-wide leading-tight">{node.title}</h2>
              <p className="text-lg font-semibold text-slate-700 mt-1">{node.name || 'DSWD Academy Position'}</p>
            </div>
          </div>

          <hr className="border-slate-200 my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <User size={18} className="text-blue-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] block text-slate-500 uppercase font-extrabold">Nickname</span>
                <span className="font-bold text-slate-800 text-sm">{node.nickname || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Briefcase size={18} className="text-emerald-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] block text-slate-500 uppercase font-extrabold">Profession</span>
                <span className="font-bold text-slate-800 text-sm">{node.profession || 'Government Staff'}</span>
              </div>
            </div>

            {/* CLICK-TO-COPY PHONE */}
            <div
              onClick={(e) => handleCopy(node.phone, 'phone', e)}
              className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-50/80 border border-slate-200 hover:border-orange-300 cursor-pointer transition-all duration-200 relative"
              title="Click to copy phone number"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <Phone size={18} className="text-orange-600 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] block text-slate-500 uppercase font-extrabold">Phone</span>
                  <span className="font-bold text-slate-800 text-sm group-hover:text-orange-950 transition-colors">
                    {node.phone || 'Internal Ext.'}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                {copiedField === 'phone' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check size={12} /> Copied!
                  </span>
                ) : (
                  <Copy size={14} className="text-slate-400 group-hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>

            {/* CLICK-TO-COPY EMAIL */}
            <div
              onClick={(e) => handleCopy(node.email, 'email', e)}
              className="group flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 cursor-pointer transition-all duration-200 relative"
              title="Click to copy email address"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <Mail size={18} className="text-sky-600 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] block text-slate-500 uppercase font-extrabold">Email</span>
                  <span className="font-bold text-slate-800 text-sm group-hover:text-sky-950 transition-colors">
                    {node.email || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center">
                {copiedField === 'email' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <Check size={12} /> Copied!
                  </span>
                ) : (
                  <Copy size={14} className="text-slate-400 group-hover:text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          </div>

          {node.tasks && node.tasks.length > 0 && (
            <div className="mt-6">
              <span className="text-[10px] uppercase tracking-wider font-black text-slate-500 block mb-2.5">
                Core Duties & Functional Responsibilities ({node.tasks.length})
              </span>
              <div className="flex flex-col gap-2">
                {node.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
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