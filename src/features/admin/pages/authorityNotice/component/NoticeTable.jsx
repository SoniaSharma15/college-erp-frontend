import { useEffect, useState } from "react";
import { 
  FileText, 
  RefreshCcw, 
  Download, 
  User, 
  ShieldCheck, 
  Calendar,
  Building2,
  ChevronRight
} from "lucide-react";
import { getAllNotices } from "../api/noticeApi";
import { formatDate } from "../../../../../utils/formatDate";
import { generatePDF } from "../utils/genratePDF"; // Reusing the utility we fixed

const NoticeTable = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handler for individual row download
  const handleDownloadRow = (notice) => {
    // This creates a temporary hidden div or uses the data to trigger the existing PDF logic
    // For consistency, we use the same filename format as the preview
    const fileName = `${notice.action}_Notice_${notice.personName.replace(/\s+/g, '_')}.pdf`;
    
    // Note: Since this is a list, usually you'd redirect to a view page or 
    // have a hidden template to generate the PDF from.
    alert(`Initiating download for: ${fileName}`);
    // generatePDF("element-id", fileName); 
  };

  return (
    <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2rem] overflow-hidden mt-10 transition-all">
      
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <FileText className="text-indigo-600 w-6 h-6" />
            Audit Ledger
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Archive of Issued Notices</p>
        </div>

        <button
          onClick={fetchNotices}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 hover:border-indigo-200 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw size={14} className={`${loading ? 'animate-spin' : ''}`} />
          Sync
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Status/Action</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Subject Person</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Department</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Issued By</th>
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Dated</th>
              <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="6" className="px-6 py-8"><div className="h-4 bg-slate-100 rounded-full w-full"></div></td>
                </tr>
              ))
            ) : notices.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-20">
                  <div className="flex flex-col items-center gap-2 opacity-20">
                    <FileText size={48} />
                    <p className="font-bold uppercase text-xs tracking-tighter">No Archive Records</p>
                  </div>
                </td>
              </tr>
            ) : (
              notices.map((notice) => (
                <tr
                  key={notice._id}
                  className="group hover:bg-indigo-50/30 transition-colors"
                >
                  {/* Action Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight border shadow-sm
                      ${notice.action === 'Terminate' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        notice.action === 'Suspend' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-emerald-50 text-emerald-600 border-emerald-100'}
                    `}>
                      {notice.action}
                    </span>
                  </td>

                  {/* Person & Role */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700 leading-tight">{notice.personName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{notice.role}</p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={12} className="text-slate-300" />
                      {notice.department}
                    </div>
                  </td>

                  {/* Admin */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                      <ShieldCheck size={14} className="text-indigo-400" />
                      {notice.adminName}
                    </div>
                  </td>

                  {/* Formatted Date */}
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 italic">
                    {formatDate(notice.date)}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDownloadRow(notice)}
                        className="p-2 bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 rounded-lg transition-all shadow-sm"
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Meta */}
      {!loading && notices.length > 0 && (
        <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase italic">
            Showing {notices.length} recorded entries
          </p>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeTable;