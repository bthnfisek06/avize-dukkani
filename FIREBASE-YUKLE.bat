@echo off
echo ========================================
echo Firebase Paketi Yukleniyor...
echo ========================================
echo.

cd /d "%~dp0"

echo Proje klasorune gidiliyor...
echo.

echo npm install komutu calistiriliyor...
npm install

echo.
echo ========================================
if %ERRORLEVEL% == 0 (
    echo BASARILI! Firebase paketi yuklendi.
) else (
    echo HATA! Bir sorun olustu. Lutfen hata mesajini kontrol edin.
)
echo ========================================
echo.
pause
