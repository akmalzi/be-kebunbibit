# User API

## AUTH
## LOGIN USER
ENDPOINT
```
/api/login
```
Request :
```json
{
    "username": "Test",
    "password": "Test123",
}
```
Response Body Success :
```json
{
    "data": "[Necessary data]"
}
```
Response Body Error :
```json
{
    "error": "[Any error]"
}
```
## REGISTER USER
Endpoint
```
/api/register
```
Request :
```json
{
    "first_name": "Test",
    "last_name": "testing",
    "email": "test@test.com",
    "username": "test123",
    "password": "test321"
}
```
Response Body Success:
```json
{
    "data": "[Necessary data]"
}
```
Response Body Error:
```json
{
    "error": "[Any error]"
}
```
## UPDATE USER
## GET USER
## LOGOUT USER