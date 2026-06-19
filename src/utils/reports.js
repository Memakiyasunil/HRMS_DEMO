// src/utils/reports.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Document, Packer, Paragraph, TextRun } from 'docx'; 
import { formattedCurrency } from './formatters';

/**
 * Export data to PDF (using jspdf-autotable)
 * @param {string} title - Report title
 * @param {Array<string>} headers - Column headers
 * @param {Array<Array<any>>} data - Row data
 * @param {string} filename - File name
 */
export const exportToPDF = (title, headers, data, filename = 'report.pdf') => {
    const doc = new jsPDF();
    doc.text(title, 14, 20);

    const body = data.map(row => row.map(cell => {
        if (typeof cell === 'number') {
            return formattedCurrency(cell);
        }
        return cell;
    }));

    doc.autoTable({
        startY: 25,
        head: [headers],
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [99, 102, 241] }, // Indigo (Primary accent)
    });

    doc.save(filename);
};

/**
 * Export data to Excel (XLSX)
 * @param {string} sheetName - Sheet name
 * @param {Array<Object>} data - Array of objects
 * @param {string} filename - File name
 */
export const exportToXLSX = (sheetName, data, filename = 'report.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Apply currency format to money columns
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    
    for(let R = range.s.r; R <= range.e.r; ++R) {
        for(let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = XLSX.utils.encode_cell({r: R, c: C});
            const cell = sheet[cellAddress];
            
            const headerCell = sheet[XLSX.utils.encode_cell({r: 0, c: C})];
            const header = headerCell ? headerCell.v.toLowerCase() : '';

            if (cell && (header.includes('salary') || header.includes('net') || header.includes('deduction')) && typeof cell.v === 'number') {
                cell.z = "Rp#,##0"; 
            }
        }
    }
    
    XLSX.writeFile(workbook, filename);
};


/**
 * Export simple text/report to DOCX
 * @param {string} content - Text content
 * @param {string} filename - File name
 */
export const exportToDOCX = async (content, filename = 'report.docx') => {
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun(content),
                    ],
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};