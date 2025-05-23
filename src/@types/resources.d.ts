interface Resources {
  "translations": {
    "loginTitle": "Login",
    "loginButton": "Login",
    "loginPlaceholderEmail": "m@example.com",
    "loginPlaceholderPassword": "Your password",
    "loginSuccess": "You are logged in!",
    "loginError": "Something went wrong!",
    "noAccount": "Don’t have an account?",
    "createAccount": "Create one",
    "signUpTitle": "Sign Up",
    "signUpFirstName": "First Name",
    "signUpFirstNamePlaceholder": "John",
    "signUpLastName": "Last Name",
    "signUpLastNamePlaceholder": "Doe",
    "signUpButton": "Create Account",
    "signUpSuccess": "Registration successful!",
    "signUpError": "Something went wrong during registration!",
    "alreadyHaveAccount": "Already have an account?",
    "logInLink": "Log in",
    "validation": {
      "firstName": {
        "required": "First name is required",
        "max": "First name must be at most 200 characters"
      },
      "lastName": {
        "required": "Last name is required",
        "max": "Last name must be at most 200 characters"
      },
      "email": {
        "required": "Email is required",
        "invalid": "Invalid email address",
        "tooLong": "Email is too long",
        "max": "Email must be at most 256 characters"
      },
      "password": {
        "required": "Password is required",
        "tooLong": "Password is too long",
        "min": "Password must be at least 5 characters",
        "max": "Password is too long"
      }
    },
    "errors": {
      "auth": {
        "invalid-credentials": "Invalid email or password",
        "email-is-already-taken": "Email is already taken"
      }
    }
  }
}

export default Resources;
