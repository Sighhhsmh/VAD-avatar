@echo off
setlocal

rem Get the directory of the batch file
set "batch_dir=%~dp0"

rem Change to the batch file directory
cd /d "%batch_dir%"

echo Now in the batch file directory: %cd%

rem Check if Python 3 is installed
where python > nul 2>&1
if %errorlevel% neq 0 (
    echo Python 3 is not installed. Installing...

    rem Download the latest stable Python 3 installer
    powershell -command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.12.2/python-3.12.2-amd64.exe' -OutFile 'python_installer.exe'}"

    rem Install Python 3 with default options
    start /wait python_installer.exe InstallAllUsers=1 PrependPath=1

    echo Python 3 has been installed.
) else (
    echo Python 3 is already installed. Proceeding with the script...
)

rem Check and install required Python libraries
set "required_libraries=pyautogui asyncio websockets"

for %%l in (%required_libraries%) do (
    python -c "import %%l" >nul 2>&1
    if errorlevel 1 (
        echo %%l is not installed. Installing...
        python -m pip install %%l
        if errorlevel 1 (
            echo Failed to install %%l. Please check your internet connection and try again.
            pause
            exit /b 1
        )
        echo %%l has been installed.
    ) else (
        echo %%l is already installed.
    )
)

rem List of prerequisite folders
set "prerequisites=assets main scripts style"

rem Check for prerequisite folders
for %%i in (%prerequisites%) do (
    if not exist "%%i" (
        echo Prerequisite folder "%%i" not found. Please make sure it is in the same directory as this script.
        pause
        exit /b 1
    )
)

rem Run Python command
start "" /B python -m http.server 8000
if %errorlevel% neq 0 (
    echo -
    echo -
    echo Error starting up a localhost server.
    echo Make sure python is installed or the PATH is configured correctly.
    echo -
    echo -
    pause
    exit /b %errorlevel%
)

timeout /nobreak /t 1 >nul

rem Change to the subdirectory
cd scripts
echo swicthed to scripts directory
start /B pythonw mouse_pos.py
echo websocket is live

timeout /t 2 /nobreak
echo waited 2 seconds

cd ..
cd main
echo swicthed directory to main

rem Launch VAD (Web)
start cmd /c start http://localhost:8000/main
echo launched webpage for permissions

echo -
echo -
echo -
echo -
echo -
echo - Keep this window open.
echo -
echo -
echo -
echo -
echo -

pause
exit /b 0
