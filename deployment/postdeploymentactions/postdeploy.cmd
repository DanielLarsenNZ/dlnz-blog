:Deployment

:: Install and run grunt
IF EXIST "%DEPLOYMENT_TARGET%\Gruntfile.js" (
  pushd "%DEPLOYMENT_TARGET%"
  ::@echo on
  grunt --no-color clean common dist  
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

@echo off

goto end


:error
echo An error has occurred during post deployment.
call :exitSetErrorLevel
:exitSetErrorLevel
exit /b 1

:end
