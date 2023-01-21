# Cookies_JWT
Redeem File of Created Your server with Json Web Token 🍃
![image](https://user-images.githubusercontent.com/74735976/213873368-826766e1-716a-4831-8208-47048e604850.png)
Script Session Cookies : 
```js
// cooking-login jwt
    const jwtlogin = (mytoken) => {
        // Decode JWT token
        const decoded = jwtDecode(mytoken)

        // set emails State
        setUser(decoded);

        // set cookie
        cookies.set("jwt_auth",mytoken, {
            expires: new Date(decoded.exp * 1000),
        })
    }
```
# Application Cookies : 
![image](https://user-images.githubusercontent.com/74735976/213873383-ae720586-4b08-4d85-a32d-d3ff2b4052a7.png)
