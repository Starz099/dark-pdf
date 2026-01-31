import { PDFDocument } from "pdf-lib";
import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure pdf.js worker
GlobalWorkerOptions.workerSrc = workerSrc;

export async function convertPdfTheme(
  pdfFile: File,
  onProgress?: (currentPage: number, totalPages: number) => void,
): Promise<Blob> {
  const arrayBuffer = await pdfFile.arrayBuffer();

  const pdfDoc = await getDocument({ data: arrayBuffer }).promise;
  const newPdfDoc = await PDFDocument.create();

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2 });

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    if (!context) throw new Error("Failed to get canvas context");

    // Render page to canvas
    await page.render({
      canvasContext: context,
      canvas,
      viewport,
    }).promise;

    // Get image data and invert colors
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Invert RGB, keep alpha
      data[i] = 255 - data[i]; // R
      data[i + 1] = 255 - data[i + 1]; // G
      data[i + 2] = 255 - data[i + 2]; // B
    }

    context.putImageData(imageData, 0, 0);

    // Convert canvas to image and embed in PDF
    const imageUrl = canvas.toDataURL("image/png");
    const image = await newPdfDoc.embedPng(imageUrl);

    const pdfPage = newPdfDoc.addPage([canvas.width, canvas.height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });

    // Report progress after page is fully processed
    onProgress?.(pageNum, pdfDoc.numPages);
  }

  const pdfBytes = await newPdfDoc.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
}

export function downloadPdf(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
