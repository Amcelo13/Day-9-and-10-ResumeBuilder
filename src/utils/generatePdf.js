import JsPDF from 'jspdf';
const generatePDF = () => {

    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#report')).then(() => {
        report.save('report.pdf');
    });
}
export {generatePDF}