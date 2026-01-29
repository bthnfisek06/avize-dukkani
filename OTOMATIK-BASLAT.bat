@echo off
title NUVE - Otomatik Baslat
echo ========================================
echo NUVE AYDINLATMA - OTOMATIK BASLAT
echo ========================================
echo.
cd /d "%~dp0"
echo Klasor: %CD%
echo.

REM Node.js kontrol
node --version >nul 2>&1
if errorlevel 1 (
    echo [HATA] Node.js bulunamadi!
    echo Lutfen Node.js yukleyin: https://nodejs.org
    pause
    exit /b 1
)

REM node_modules kontrol
if not exist "node_modules" (
    echo [BILGI] Paketler yukleniyor...
    call npm install
    if errorlevel 1 (
        echo [HATA] Paket yukleme basarisiz!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo SUNUCU BASLATILIYOR...
echo ========================================
echo.
echo Tarayicida su adresi ac: http://localhost:3000
echo.
echo Sunucuyu durdurmak icin: Ctrl+C
echo.
echo ========================================
echo.

REM Sunucuyu baslat
start "" "http://localhost:3000"
timeout /t 3 /nobreak >nul
call npm run dev
