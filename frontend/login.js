document.addEventListener('DOMContentLoaded', function() {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");

    signupBtn.onclick = () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    };

    loginBtn.onclick = () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    };

    signupLink.onclick = () => {
        signupBtn.click();
        return false;
    };

    document.querySelector('form.login').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.querySelector('form.login input[type="text"]').value;
        const password = document.querySelector('form.login input[type="password"]').value;

        const response = await fetch('http://localhost:8080/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.id_token);
            alert('Login successful!');
        } else {
            alert('Login failed!');
        }
    });
});