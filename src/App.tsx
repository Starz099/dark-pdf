import { Card } from "./components/ui/card";
import { PdfThemeConverter } from "./components/pdf-theme-converter";

const App = () => {
  return (
    <div className="space-y-4">
      <header className="border-border/60 bg-card/90 rounded-3xl border px-6 py-8 shadow-md backdrop-blur">
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-foreground text-4xl leading-tight font-semibold tracking-tight">
              PDF Theme Converter
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base">
              Convert your PDFs into an eye-friendly dark theme in seconds.
              Upload, switch, and download without leaving the browser.
            </p>
          </div>
        </div>
      </header>

      <main className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border-primary/10 bg-card/80 h-full border p-6 shadow-md backdrop-blur">
          <div className="mb-4 space-y-1">
            <p className="text-primary text-sm font-semibold">
              Switch the theme
            </p>
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Upload and convert
            </h2>
            <p className="text-muted-foreground text-sm">
              We generate a dark-mode-friendly copy and keep your original
              intact.
            </p>
          </div>
          <PdfThemeConverter />
        </Card>

        <div className="space-y-4">
          <Card className="border-border/80 bg-card/70 border p-5 shadow-sm">
            <h3 className="text-foreground text-lg font-semibold">
              Quick guide
            </h3>
            <ul className="text-muted-foreground mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span
                  className="bg-primary mt-1 h-2 w-2 rounded-full"
                  aria-hidden
                />
                Drop in a PDF you want to view in dark mode.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="bg-primary mt-1 h-2 w-2 rounded-full"
                  aria-hidden
                />
                We invert and rebalance colors for comfortable reading.
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="bg-primary mt-1 h-2 w-2 rounded-full"
                  aria-hidden
                />
                Download the dark copy instantly and share freely.
              </li>
            </ul>
          </Card>

          <Card className="border-border/80 bg-card/70 border p-5 shadow-sm">
            <h3 className="text-foreground text-lg font-semibold">
              Why switch?
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              A dark PDF reduces glare, saves battery on OLED screens, and keeps
              long reading sessions comfortable on your eyes.
            </p>
          </Card>
        </div>
      </main>

      <footer className="border-border/60 text-muted-foreground flex flex-col gap-2 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span>Made with love by Starz099.</span>
        <a
          href="https://starzz.dev/"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:text-primary/80 font-medium transition"
        >
          starzz.dev
        </a>
      </footer>
    </div>
  );
};

export default App;
