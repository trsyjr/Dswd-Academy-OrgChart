import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, Plus, Trash2, 
  User, Briefcase, Mail, Phone, Calendar, Sparkles, Building2
} from 'lucide-react';
import { orgData, CLASSIFICATION_STYLES } from './orgData';

// --- HELPER TO EXTRACT ALL POSITIONS FLAT FROM ORGDATA ---
function extractAllPositions(data) {
  const list = [];

  // 1. Executive
  if (data.dir4) list.push({ ...data.dir4, location: 'Office of the Bureau Director' });
  if (data.dir3) list.push({ ...data.dir3, location: 'Office of the Bureau Director' });

  // 2. Office of the Bureau Director Columns
  if (data.obd?.cols) {
    data.obd.cols.forEach((col, colIdx) => {
      col.forEach((item) => {
        list.push({ ...item, location: `OBD - Column ${colIdx + 1}` });
      });
    });
  }

  // 3. Divisions & Sections
  if (data.divisions) {
    data.divisions.forEach((div) => {
      if (div.leads) {
        div.leads.forEach((lead) => {
          list.push({ ...lead, location: div.title });
        });
      }

      if (div.sections) {
        div.sections.forEach((sec) => {
          // Pairs layout
          if (sec.pairs) {
            sec.pairs.forEach((pair) => {
              pair.forEach((item) => {
                if (item) list.push({ ...item, location: `${div.title} ➔ ${sec.title}` });
              });
            });
          }
          if (sec.bottomNode) {
            list.push({ ...sec.bottomNode, location: `${div.title} ➔ ${sec.title}` });
          }
          // Stack layout
          if (sec.stack) {
            sec.stack.forEach((item) => {
              list.push({ ...item, location: `${div.title} ➔ ${sec.title}` });
            });
          }
        });
      }
    });
  }

  return list;
}

export default function PositionsList() {
  const initialPositions = useMemo(() => extractAllPositions(orgData), []);
  
  // State for all positions with mutable tasks
  const [positions, setPositions] = useState(initialPositions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [newTaskInput, setNewTaskInput] = useState({});

  // Add Task to Specific Position
  const handleAddTask = (posIndex) => {
    const taskText = newTaskInput[posIndex]?.trim();
    if (!taskText) return;

    setPositions((prev) =>
      prev.map((pos, idx) => {
        if (idx === posIndex) {
          return {
            ...pos,
            tasks: [...(pos.tasks || []), taskText]
          };
        }
        return pos;
      })
    );

    setNewTaskInput((prev) => ({ ...prev, [posIndex]: '' }));
  };

  // Delete Task from Specific Position
  const handleDeleteTask = (posIndex, taskIndex) => {
    setPositions((prev) =>
      prev.map((pos, idx) => {
        if (idx === posIndex) {
          return {
            ...pos,
            tasks: pos.tasks.filter((_, tIdx) => tIdx !== taskIndex)
          };
        }
        return pos;
      })
    );
  };

  // Filter Positions by Search Query & Type
  const filteredPositions = positions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* --- HEADER --- */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-700 text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles size={14} /> Comprehensive Directory & Tasks
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-wide">
              DSWD ACADEMY POSITIONS & DUTIES
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Pulling real-time structure from <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">orgData.js</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              Total Records: {filteredPositions.length}
            </span>
          </div>
        </div>

        {/* --- SEARCH & FILTERS --- */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by position title, employee name, or division..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={16} className="text-slate-400 shrink-0" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
            >
              <option value="all">All Classifications</option>
              <option value="permanent">Permanent</option>
              <option value="cos">COS Staff</option>
              <option value="contractual">Contractual</option>
            </select>
          </div>
        </div>

        {/* --- POSITIONS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPositions.map((pos, pIdx) => {
            const styles = CLASSIFICATION_STYLES[pos.type] || CLASSIFICATION_STYLES.permanent;

            return (
              <div
                key={pIdx}
                className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Top Accent Line */}
                <div className={`h-2.5 w-full bg-gradient-to-r ${styles.accent || 'from-blue-500 to-indigo-600'}`} />

                <div className="p-5 flex-1 flex flex-col space-y-4">
                  
                  {/* Position Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {pos.image ? (
                        <img
                          src={pos.image}
                          alt={pos.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-600 shrink-0">
                          {pos.title.substring(0, 3)}
                        </div>
                      )}

                      <div>
                        <h2 className={`text-base font-black leading-tight ${styles.titleText}`}>
                          {pos.title}
                        </h2>
                        <p className="text-xs font-bold text-slate-600 mt-0.5">
                          {pos.name || 'Unassigned / Vacant'}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${styles.tagBg} ${styles.tagText}`}>
                      {styles.tag || 'STAFF'}
                    </span>
                  </div>

                  {/* Location Info */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Building2 size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{pos.location}</span>
                  </div>

                  {/* Employee Metadata */}
                  {(pos.email || pos.phone || pos.profession) && (
                    <div className="grid grid-cols-1 gap-1.5 text-[11px] font-medium text-slate-600 pt-1">
                      {pos.email && (
                        <div className="flex items-center gap-2 truncate">
                          <Mail size={12} className="text-sky-600 shrink-0" />
                          <span className="truncate">{pos.email}</span>
                        </div>
                      )}
                      {pos.phone && (
                        <div className="flex items-center gap-2 truncate">
                          <Phone size={12} className="text-emerald-600 shrink-0" />
                          <span>{pos.phone}</span>
                        </div>
                      )}
                      {pos.profession && (
                        <div className="flex items-center gap-2 truncate">
                          <Briefcase size={12} className="text-amber-600 shrink-0" />
                          <span>{pos.profession}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <hr className="border-slate-100" />

                  {/* Tasks Section */}
                  <div className="flex-1 flex flex-col space-y-2">
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      Assigned Functional Tasks ({pos.tasks?.length || 0})
                    </span>

                    <div className="space-y-1.5 flex-1">
                      {pos.tasks && pos.tasks.length > 0 ? (
                        pos.tasks.map((task, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 group"
                          >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                              <span className="leading-snug">{task}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteTask(pIdx, tIdx)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition-opacity p-0.5"
                              title="Delete task"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs italic text-slate-400 p-2">No specific tasks defined yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Add New Task Input */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Add custom duty..."
                      value={newTaskInput[pIdx] || ''}
                      onChange={(e) =>
                        setNewTaskInput({ ...newTaskInput, [pIdx]: e.target.value })
                      }
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTask(pIdx)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button
                      onClick={() => handleAddTask(pIdx)}
                      className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shrink-0 shadow-xs"
                      title="Add task"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}