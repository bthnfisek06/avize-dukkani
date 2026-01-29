@echo off
echo ========================================
echo NUVE - OTOMATIK BASLAT KURULUMU
echo ========================================
echo.
echo Bu script Windows baslangic klasorune kisayol ekleyecek.
echo Boylece Windows her acildiginda Nuve otomatik baslayacak.
echo.
pause

set "BASLANGIC_KLASORU=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "PROJE_KLASORU=%~dp0"
set "BAT_DOSYASI=%PROJE_KLASORU%OTOMATIK-BASLAT-VE-AC.bat"

echo.
echo Baslangic klasoru: %BASLANGIC_KLASORU%
echo Proje klasoru: %PROJE_KLASORU%
echo.

REM Kısayol oluştur
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%BASLANGIC_KLASORU%\Nuve-Otomatik-Baslat.lnk'); $Shortcut.TargetPath = '%BAT_DOSYASI%'; $Shortcut.WorkingDirectory = '%PROJE_KLASORU%'; $Shortcut.WindowStyle = 7; $Shortcut.Save()"

if exist "%BASLANGIC_KLASORU%\Nuve-Otomatik-Baslat.lnk" (
    echo.
    echo [BASARILI] Otomatik baslatma kuruldu!
    echo.
    echo Artik Windows acildiginda Nuve otomatik baslayacak.
    echo Tarayici otomatik acilacak: http://localhost:3000
    echo.
    echo Otomatik baslatmayi kaldirmak icin:
    echo 1. Windows tusu + R
    echo 2. shell:startup yaz ve Enter
    echo 3. Nuve-Otomatik-Baslat.lnk dosyasini sil
    echo.
) else (
    echo.
    echo [HATA] Kisayol olusturulamadi!
    echo.
    echo Manuel olarak yapmak icin:
    echo 1. Windows tusu + R
    echo 2. shell:startup yaz ve Enter
    echo 3. OTOMATIK-BASLAT-VE-AC.bat dosyasina sag tikla
    echo 4. "Kisayol olustur" sec
    echo.
)

pause
