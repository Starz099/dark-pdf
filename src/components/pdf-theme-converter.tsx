import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { convertPdfTheme, downloadPdf } from "../lib/pdfThemeConverter";

export const PdfThemeConverter = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [convertedPdf, setConvertedPdf] = useState<{
    blob: Blob;
    filename: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsConverting(true);
    try {
      const blob = await convertPdfTheme(file);
      const newFilename = file.name.replace(".pdf", "-dark.pdf");
      setConvertedPdf({ blob, filename: newFilename });
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert PDF. Please try another file.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedPdf) {
      downloadPdf(convertedPdf.blob, convertedPdf.filename);
    }
  };

  return (
    <div className="space-y-5">
      <Input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isConverting}
        className="hidden"
        ref={fileInputRef}
      />

      <div
        className="border-primary/40 bg-muted/30 rounded-2xl border px-4 py-5 shadow-sm"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
              Theme switcher
            </p>
            <p className="text-foreground text-lg font-semibold">
              Select a PDF
            </p>
            <p className="text-muted-foreground text-sm">
              {fileName
                ? fileName
                : "Choose a .pdf file — we keep your original intact."}
            </p>
          </div>
          <Button
            type="button"
            disabled={isConverting}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto"
          >
            {isConverting ? "Converting..." : "Upload PDF"}
          </Button>
        </div>
      </div>

      {isConverting && (
        <div className="border-primary/20 bg-primary/5 text-primary rounded-xl border px-4 py-3 text-sm">
          Converting to a dark-friendly theme...
        </div>
      )}

      {convertedPdf && (
        <div className="border-primary/20 bg-primary/5 flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-primary text-sm font-semibold">
              Dark copy ready
            </p>
            <p className="text-muted-foreground text-xs">
              {convertedPdf.filename}
            </p>
          </div>
          <Button onClick={handleDownload} disabled={isConverting}>
            Download PDF
          </Button>
        </div>
      )}

      {!isConverting && !convertedPdf && (
        <p className="text-muted-foreground text-xs">
          Tip: We keep your original file intact and only generate a dark-mode
          version.
        </p>
      )}
    </div>
  );
};
