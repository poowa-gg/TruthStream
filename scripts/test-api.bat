@echo off
echo 🧪 Testing TruthStream API...

:: Test if server is running
echo 📡 Testing API endpoints...
echo.

echo 🏠 Testing root endpoint:
curl -s http://localhost:3000/ | echo.

echo.
echo 🏥 Testing health endpoint:
curl -s http://localhost:3000/api/health | echo.

echo.
echo 📊 Testing user stats:
curl -s http://localhost:3000/api/user/stats | echo.

echo.
echo 🎯 Testing challenges:
curl -s http://localhost:3000/api/challenges | echo.

echo.
echo ✅ API test complete!
echo.
echo 🔗 You can also test in your browser:
echo - http://localhost:3000
echo - http://localhost:3000/api/health
echo - http://localhost:3000/api/user/stats
echo.
pause