mkdir C:\vmlauncher

regedit.exe /S %cd%\vmlaunch.reg

xcopy "%cd%\clilauncher.exe" C:\vmlauncher\ /y
xcopy "%cd%\libgcc_s_dw2-1.dll" C:\vmlauncher\ /y
xcopy "%cd%\mingwm10.dll" C:\vmlauncher\ /y
IF "%PROCESSOR_ARCHITECTURE%"=="x86" (GOTO 32BIT) ELSE (GOTO 64BIT)

:32BIT
xcopy "%cd%\vnc.exe" C:\windows\system32\ /y
xcopy "%cd%\putty.exe" C:\windows\system32\ /y
GOTO END

:64BIT
xcopy "%cd%\vnc.exe"  "%windir%\SysWOW64\" /y
xcopy "%cd%\putty.exe" "%windir%\SysWOW64\" /y
GOTO END

:END