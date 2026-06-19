// src/utils/swal.js
// Custom function to display SweetAlert2 (assumes Swal is loaded via index.html)
export const showSwal = (title, text, icon, timer = 0) => {
  if (typeof Swal !== 'undefined') {
    Swal.fire({ 
      title, 
      html: text, 
      icon, 
      timer: timer > 0 ? timer : undefined,
      showConfirmButton: timer === 0,
      customClass: { 
        popup: 'rounded-xl shadow-lg bg-slate-800 border border-slate-700',
        title: 'text-xl font-bold text-slate-100',
        htmlContainer: 'text-slate-300',
        confirmButton: 'focus:outline-none bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700',
      },
      buttonsStyling: false,
      background: '#1E293B',
      color: '#F1F5F9',
    });
  } else {
    // Fallback if Swal is not defined
    console.warn(`[Swal Mock] Title: ${title}, Text: ${text}, Icon: ${icon}`);
    alert(`${title}\n${text}`);
  }
};
