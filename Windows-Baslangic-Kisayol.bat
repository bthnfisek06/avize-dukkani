@echo off
REM Bu dosyayı Windows Başlangıç klasörüne kopyala
REM Windows Başlangıç klasörü: %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup

echo ========================================
echo NUVE - Windows Baslangic Kisayolu Olusturuluyor
echo ========================================
echo.

set "BASLANGIC_KLASORU=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "PROJE_KLASORU=%~dp0"
set "BAT_DOSYASI=%PROJE_KLASORU%OTOMATIK-BASLAT.bat"

echo Baslangic klasoru: %BASLANGIC_KLASORU%
echo Proje klasoru: %PROJE_KLASORU%
echo.

REM Kısayol oluştur
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%BASLANGIC_KLASORU%\Nuve-Baslat.lnk'); $Shortcut.TargetPath = '%BAT_DOSYASI%'; $Shortcut.WorkingDirectory = '%PROJE_KLASORU%'; $Shortcut.Save()"

if exist "%BASLANGIC_KLASORU%\Nuve-Baslat.lnk" (
    echo [BASARILI] Windows baslangic kisayolu olusturuldu!
    echo.
    echo Artik Windows acildiginda Nuve otomatik baslayacak.
    echo.
    echo Kisayolu kaldirmak icin:
    echo %BASLANGIC_KLASORU%\Nuve-Baslat.lnk dosyasini sil
) else (
    echo [HATA] Kisayol olusturulamadi!
    echo.
    echo Manuel olarak yapmak icin:
    echo 1. Windows tuşu + R
    echo 2. shell:startup yaz ve Enter
    echo 3. OTOMATIK-BASLAT.bat dosyasina sag tikla
    echo 4. "Kisayol olustur" sec
)

echo.
pause
