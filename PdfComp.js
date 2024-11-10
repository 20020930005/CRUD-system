import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function PdfComp({ pdfFile }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Callback when the document loads successfully
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1); // Reset to the first page on load
    }

    return (
        <div>
            {pdfFile ? (
                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
            ) : (
                <p>Pdf File Not Available</p>
            )}
            {numPages && (
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            )}
            <div>
                <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
                    Previous
                </button>
                <button onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PdfComp;
