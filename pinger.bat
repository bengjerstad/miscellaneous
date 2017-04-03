:THESTART
ping 2vgmq22-pc | find "TTL"
if not errorlevel 1 START Ring07.wav
rem ping LT05t002 | find "TTL"
rem if not errorlevel 1 START Ring07.wav
goto THESTART
