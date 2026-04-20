import { useEffect, useState } from "react";
import { 
  FileText, 
  RefreshCcw, 
  User, 
  ShieldCheck, 
  Building2,
  Eye
} from "lucide-react";
import { getAllNotices } from "../api/noticeApi";
import { formatDate } from "../../../../../utils/formatDate";

const NoticeTable = ({ onPreview }) => {
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

  return (
    <div className="bg-white border border-slate-200 shadow-xl rounded-[2rem] overflow-hidden mt-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FileText className="text-indigo-600 w-5 h-5" />
            Recent Issuances
          </h2>
        </div>
        <button
          onClick={fetchNotices}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Notice Info</th>
              <th className="px-6 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient</th>
              <th className="px-6 py-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan="3" className="text-center py-10 animate-pulse text-slate-400">Syncing...</td></tr>
            ) : notices.map((notice) => (
              <tr key={notice._id} className="group hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    notice.action === 'Terminate' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                  }`}>
                    {notice.action}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">{formatDate(notice.date)}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-700">{notice.personName}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{notice.department}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onPreview(notice)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm font-bold text-xs"
                  >
                    <Eye size={14} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticeTable;