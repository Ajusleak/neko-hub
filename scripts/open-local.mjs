import { spawn } from "node:child_process";

const url = process.argv[2] || "http://localhost:3100";
const deadline = Date.now() + 30_000;

while (Date.now() < deadline) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1_500) });
    if (response.ok) {
      spawn("rundll32.exe", ["url.dll,FileProtocolHandler", url], {
        stdio: "ignore",
        windowsHide: false,
      }).unref();
      process.exit(0);
    }
  } catch {}

  await new Promise((resolve) => setTimeout(resolve, 400));
}

console.error("Neko Hub did not become ready within 30 seconds.");
process.exit(1);
