@echo off
echo ========================================
echo NUVE AYDINLATMA - SUNUCU BASLATILIYOR
echo ========================================
echo.
cd /d "%~dp0"
echo Klasor: %CD%
echo.
echo Node.js kontrol ediliyor...
node --version
if errorlevel 1 (
    echo HATA: Node.js bulunamadi! Lutfen Node.js yukleyin.
    pause
    exit /b 1
)
echo.
echo npm paketleri kontrol ediliyor...
if not exist "node_modules" (
    echo node_modules bulunamadi. Paketler yukleniyor...
    call npm install
    if errorlevel 1 (
        echo HATA: Paket yukleme basarisiz!
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
call npm run dev
pause
