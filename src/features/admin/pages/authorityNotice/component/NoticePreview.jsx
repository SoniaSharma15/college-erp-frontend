import React from "react";
import { generatePDF } from "../utils/genratePDF";
import { formatDate } from "../../../../../utils/formatDate";
import { FileText, Download, Printer, ShieldAlert, BadgeCheck, CalendarDays } from "lucide-react";

const NoticePreview = ({ noticeData }) => {
  if (!noticeData) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-12 flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <FileText className="text-slate-300 w-12 h-12" />
        </div>
        <h3 className="text-slate-900 font-bold text-lg">No Preview Available</h3>
        <p className="text-slate-500 max-w-[200px] text-sm mt-1">
          Complete the form on the left to generate the official notice preview.
        </p>
      </div>
    );
  }

  const handleDownload = async () => {
    const fileName = `${noticeData.action}_Notice_${noticeData.personName.replace(/\s+/g, '_')}.pdf`;
    await generatePDF("notice-preview", fileName);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 80vh Scrollable Viewport Wrapper */}
      <div className="max-h-[80vh] overflow-y-auto rounded-[2rem] shadow-inner bg-slate-100/50 p-4 border border-slate-200 custom-scrollbar">
        
        {/* Document Container */}
        <div
          id="notice-preview"
          className="bg-white shadow-2xl border border-slate-100 p-8 md:p-12 min-h-[842px] relative overflow-hidden flex flex-col mx-auto"
          style={{ 
            fontFamily: "'Times New Roman', Times, serif",
            width: "100%", 
            maxWidth: "800px" // Keeps it looking like an A4 sheet
          }}
        >
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
            <h1 className="text-9xl font-black -rotate-45 uppercase">OFFICIAL</h1>
          </div>

          {/* Header Section */}
          <div className="relative border-b-4 border-double border-slate-800 pb-6 text-center">
            <h1 className="text-3xl font-black tracking-[0.2em] text-slate-900 uppercase">
              Official Notice
            </h1>
            <p className="text-sm font-bold text-slate-500 mt-2 tracking-widest uppercase">
              Administrative Authority of the Institute
            </p>
            <div className="flex justify-center mt-3">
               <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
            </div>
          </div>

          {/* Content Body */}
          <div className="mt-12 text-lg text-slate-800 leading-relaxed flex-grow">
            <p className="indent-12 text-justify">
              This is to formally notify that 
              <span className="font-bold border-b border-slate-400 mx-1 px-1 capitalize">
                {noticeData.personName}
              </span> 
              bearing the designation of 
              <span className="font-bold mx-1 capitalize italic text-slate-700">
                {noticeData.role}
              </span> 
              within the 
              <span className="font-bold mx-1 uppercase tracking-tight text-slate-700">
                {noticeData.department}
              </span> 
              department, has been 
              <span className={`mx-2 px-2 py-0.5 rounded font-black text-white uppercase tracking-tighter ${
                noticeData.action === 'Terminate' ? 'bg-rose-600' : 'bg-indigo-600'
              }`}>
                {noticeData.action}
              </span> 
              from their duties with immediate effect.
            </p>

            {/* Reason Block */}
            <div className="mt-10 space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 underline decoration-indigo-200 decoration-4 underline-offset-4 uppercase text-sm">
                <ShieldAlert size={18} className="text-rose-500" /> 
                Grounds for Action:
              </h4>
              <div className="border-l-4 border-slate-200 pl-6 py-2 italic text-slate-600 text-justify">
                {noticeData.reason}
              </div>
            </div>

            <p className="mt-10 text-sm italic text-slate-500">
              This document serves as an official record and requires strict adherence to the directives mentioned herein.
            </p>
          </div>

          {/* Footer Section */}
          <div className="mt-20 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-8 border-t border-slate-100 pt-8">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date of Issuance</p>
              <div className="flex items-center gap-2 font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <CalendarDays size={16} className="text-indigo-500" />
                {formatDate(noticeData.date)}
              </div>
            </div>

            <div className="text-center group">
              <div className="relative mb-2">
                <img
                  src="/stamp.jpg"
                  alt="Official Stamp"
                  className="w-24 mx-auto opacity-80 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <BadgeCheck className="absolute -right-2 -top-2 text-indigo-600 bg-white rounded-full shadow-sm" size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Signatory</p>
              <p className="text-sm font-black text-slate-900 mt-1 border-t border-slate-900 pt-1 px-4 min-w-[150px]">
                {noticeData.adminName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
        >
          <Download size={18} /> Export PDF
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
        >
          <Printer size={18} /> Print
        </button>
      </div>
    </div>
  );
};

export default NoticePreview;