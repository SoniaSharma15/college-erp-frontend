import NoticeForm from "../component/NoticeForm";
import NoticePreview from "../component/NoticePreview";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import NoticeTable from "../component/NoticeTable";
const AuthorityNoticePage = () => {
  const [noticeData, setNoticeData] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 ">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 ">
              <ShieldAlert className="text-indigo-600 w-8 h-8" />
              Administrative Actions
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Issue formal authority notices and administrative directives.
            </p>
          </div>
                </div>

        {/* Responsive Grid System */}
        {/* grid-cols-1: Stacks components on Mobile/Tablet 
            lg:grid-cols-2: Side-by-side on Desktop
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Form Section */}
          <div className="w-full">
            <NoticeForm setNoticeData={setNoticeData} />
          </div>

          {/* Preview Section */}
          <div className="w-full sticky top-8">
            <NoticePreview noticeData={noticeData} />
          </div>

        </div>
        {/* Previous Notices Table */}

<div className="mt-10">

  <NoticeTable />

</div>
        {/* Footer info for mobile users */}
        <div className="mt-12 text-center lg:hidden">
          <p className="text-xs text-slate-400 font-medium italic">
            Note: Scroll down to view the document preview after filling the form.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthorityNoticePage;