import React, { useState } from "react";
import NoticeForm from "../component/NoticeForm";
import NoticePreview from "../component/NoticePreview";
import NoticeTable from "../component/NoticeTable";
import { ShieldAlert, History as HistoryIcon, FileEdit } from "lucide-react";

const AuthorityNoticePage = () => {
  // This state is shared between the Form (input), Table (selection), and Preview (display)
  const [noticeData, setNoticeData] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3 text-slate-900">
              <ShieldAlert className="text-indigo-600 w-8 h-8" />
              Authority Notice Portal
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Generate, preview, and audit official institutional directives.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Active</span>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID SYSTEM --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input & Audit (7 Cols on Desktop) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. The Creation Form */}
            <section>
              <div className="flex items-center gap-2 mb-4 ml-2">
                <FileEdit size={18} className="text-indigo-500" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Drafting Terminal</h3>
              </div>
              <NoticeForm setNoticeData={setNoticeData} />
            </section>

            {/* 2. The Archive Table */}
            <section>
              <div className="flex items-center gap-2 mb-4 ml-2">
                <HistoryIcon size={18} className="text-indigo-500" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Issuance Archive</h3>
              </div>
              {/* IMPORTANT: onPreview prop connects the table to the previewer */}
              <NoticeTable onPreview={setNoticeData} />
            </section>
          </div>

          {/* RIGHT COLUMN: Live Preview (5 Cols on Desktop) */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="flex items-center gap-2 mb-4 ml-2">
              <ShieldAlert size={18} className="text-indigo-500" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Live Document Preview</h3>
            </div>
            {/* Displays whatever is in noticeData state (either from Form or Table click) */}
            <NoticePreview noticeData={noticeData} />
          </div>

        </div>

        {/* --- MOBILE FOOTER HELP --- */}
        <div className="mt-16 py-8 border-t border-slate-100 text-center lg:hidden">
          <p className="text-xs text-slate-400 font-medium italic">
            Note: Scroll down to view document preview or archive records.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthorityNoticePage;