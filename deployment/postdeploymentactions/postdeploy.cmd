IF EXIST "%DEPLOYMENT_TARGET%\Gruntfile.js" (
  pushd "%DEPLOYMENT_TARGET%"
  npm install -g grunt-cli
  IF !ERRORLEVEL! NEQ 0 goto error
  npm install
  IF !ERRORLEVEL! NEQ 0 goto error
  grunt --no-color
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)
