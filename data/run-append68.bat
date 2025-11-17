@echo off
echo Adding new categories and tools to the AI directory...
echo.

echo Appending new categories...
node append-categories68.js
if %errorlevel% neq 0 (
    echo Error appending categories
    pause
    exit /b %errorlevel%
)

echo Appending new tools...
node append-tools68.js
if %errorlevel% neq 0 (
    echo Error appending tools
    pause
    exit /b %errorlevel%
)

echo.
echo Successfully added new categories and tools!
echo Remember to review the changes and restart your development server.
pause