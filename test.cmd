@echo off
setlocal enabledelayedexpansion

set P=--project sample-project
set AUTH_VALUE=Bearer abc123

set EXIT_CODE=0

echo === Scenario: login-profile ===
call npx tsx src/main.ts --run scenario:login-profile %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: get-login-profile ===
call npx tsx src/main.ts --run scenario:get-login-profile %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: user-crud ===
call npx tsx src/main.ts --run scenario:user-crud %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: product-crud ===
call npx tsx src/main.ts --run scenario:product-crud %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: order-crud ===
call npx tsx src/main.ts --run scenario:order-crud %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: auth-flow ===
call npx tsx src/main.ts --run scenario:auth-flow %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Scenario: full-app ===
call npx tsx src/main.ts --run scenario:full-app %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: health-check ===
call npx tsx src/main.ts --run request:health-check %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: list-users ===
call npx tsx src/main.ts --run request:list-users %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: get-user ===
call npx tsx src/main.ts --run request:get-user %P% --path id=1
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: create-user ===
call npx tsx src/main.ts --run request:create-user %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: update-user ===
call npx tsx src/main.ts --run request:update-user %P% --path id=1
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: delete-user ===
call npx tsx src/main.ts --run request:delete-user %P% --path id=1
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: post-login ===
call npx tsx src/main.ts --run request:post-login %P% --body "{\"username\":\"administrator\",\"password\":\"dev-password\"}"
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: register ===
call npx tsx src/main.ts --run request:register %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: get-profile ===
call npx tsx src/main.ts --run request:get-profile %P% --header "Authorization=%AUTH_VALUE%"
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: update-profile ===
call npx tsx src/main.ts --run request:update-profile %P% --header "Authorization=%AUTH_VALUE%"
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: refresh-token ===
call npx tsx src/main.ts --run request:refresh-token %P% --header "Authorization=Bearer refresh_xyz789"
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: logout ===
call npx tsx src/main.ts --run request:logout %P% --header "Authorization=%AUTH_VALUE%"
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: list-products ===
call npx tsx src/main.ts --run request:list-products %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: get-product ===
call npx tsx src/main.ts --run request:get-product %P% --path id=101
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: create-product ===
call npx tsx src/main.ts --run request:create-product %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: update-product ===
call npx tsx src/main.ts --run request:update-product %P% --path id=101
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: delete-product ===
call npx tsx src/main.ts --run request:delete-product %P% --path id=101
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: list-orders ===
call npx tsx src/main.ts --run request:list-orders %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: get-order ===
call npx tsx src/main.ts --run request:get-order %P% --path id=1001
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: create-order ===
call npx tsx src/main.ts --run request:create-order %P%
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: update-order-status ===
call npx tsx src/main.ts --run request:update-order-status %P% --path id=1001
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: delete-order ===
call npx tsx src/main.ts --run request:delete-order %P% --path id=1001
if errorlevel 1 set EXIT_CODE=1

echo.
echo === Request: search ===
call npx tsx src/main.ts --run request:search %P% --query q=test
if errorlevel 1 set EXIT_CODE=1

echo.
if %EXIT_CODE% NEQ 0 (
    echo === Some tests failed ===
    exit /b 1
)
echo === All tests passed ===
