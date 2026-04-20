import { formatDate } from "../../../../../utils/formatDate";

export const buildNoticeContent = (data) => {
  if (!data) return "";

  // Dynamic reference number based on date and name initials
  const refNo = `ADMIN/${data.department.substring(0, 3).toUpperCase()}/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  return `
INSTITUTIONAL ADMINISTRATION BUREAU
__________________________________________________________________

Ref No: ${refNo}                                  Date: ${formatDate(data.date)}


                          OFFICIAL NOTICE
                          ---------------

SUBJECT: FORMAL NOTICE REGARDING ${data.action.toUpperCase()} 

To,
Name: ${data.personName}
Designation: ${data.role}
Department: ${data.department}

This is to formally notify you that the Competent Authority has decided to ${data.action.toLowerCase()} you from your current responsibilities with immediate effect.

STATEMENT OF REASON:
"${data.reason}"

Accordingly, you are requested to comply with the administrative protocols associated with this action. Any institutional property currently in your possession must be returned to the department head immediately.

For any clarifications regarding this directive, you may contact the Administrative Office during working hours.


Authorized Signatory,

(Digitally Signed)
${data.adminName}
Administrative Department
`;
};