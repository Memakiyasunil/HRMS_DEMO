// src/utils/swal.js
export const showSwal = (title, text, icon, timer = 0) => {
  if (typeof Swal !== 'undefined') {
    Swal.fire({ 
      title, 
      html: text, 
      icon, 
      timer: timer > 0 ? timer : undefined,
      showConfirmButton: timer === 0,
      customClass: { 
        popup: 'rounded-xl shadow-lg bg-white border border-slate-200',
        title: 'text-xl font-bold text-slate-800',
        htmlContainer: 'text-slate-600',
        confirmButton: 'focus:outline-none bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700',
      },
      buttonsStyling: false,
      background: '#FFFFFF',
      color: '#1E293B',
    });
  } else {
    console.warn(`[Swal Mock] Title: ${title}, Text: ${text}, Icon: ${icon}`);
    alert(`${title}\n${text}`);
  }
};