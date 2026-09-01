@echo off
setlocal

title Neko Hub
cd /d "%~dp0"
set "NEKO_URL=http://localhost:3100"

if /I "%~1"=="--help" goto :help

where node.exe >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed or is not available in PATH.
  echo Install Node.js 22.13 or newer, then run this file again.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo.
  echo npm was not found. Reinstall Node.js, then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\.bin\vinext.cmd" (
  echo Installing Neko Hub dependencies...
  call npm.cmd install
  if errorlevel 1 goto :failed
)

echo.
echo Starting Neko Hub...
echo The website will open at %NEKO_URL%
echo Live reload is enabled while this window stays open.
echo Close this window or press Ctrl+C to stop Neko Hub completely.
echo.

start "Neko Hub Browser Helper" /b node.exe "scripts\open-local.mjs" "%NEKO_URL%"
call npm.cmd run dev -- --port 3100 --strictPort

if errorlevel 1 goto :failed
exit /b 0

:failed
echo.
echo Neko Hub could not start. Review the error above.
echo.
pause
exit /b 1

:help
echo Double-click run.bat to start Neko Hub and open it in your browser.
exit /b 0
