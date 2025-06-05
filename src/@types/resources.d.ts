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
    "signUpSuccess": "Signed up succesfully",
    "signUpError": "Something went wrong during event sign up",
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
      },
      "title": {
        "required": "Title is required",
        "max": "Title must be at most 255 characters"
      },
      "location": {
        "max": "Location must be at most 255 characters"
      },
      "startDate": {
        "required": "Start date is required"
      },
      "endDate": {
        "required": "End date is required"
      },
      "maxParticipants": {
        "min": "Max participants must be at least 1"
      },
      "minParticipants": {
        "min": "Min participants must be at least 1"
      },
      "price": {
        "min": "Price must be a non-negative number"
      }
    },
    "errors": {
      "auth": {
        "invalid-credentials": "Invalid email or password",
        "email-is-already-taken": "Email is already taken"
      },
      "noEventsFound": "No events found"
    },
    "header": {
      "pageNames": {
        "allEvents": "All events",
        "myEvents": "My events",
        "profile": "Profile",
        "userProfile": "User profile"
      }
    },
    "searchTitle": "Search by title or description",
    "datePickerPlaceholder": "Pick a date",
    "userFields": {
      "firstName": "First name",
      "lastName": "Last name",
      "email": "Email",
      "phone": "Phone number",
      "role": "Role"
    },
    "logout": "Logout",
    "search": "Search",
    "dateRange": "Date range",
    "createEvent": "Create event",
    "clear": "Clear",
    "loadingLabel": "Loading...",
    "participants": {
      "title": "Participants",
      "error": "Failed to load participants",
      "empty": "No participants yet"
    },
    "event": {
      "alreadyParticipated": "You participated",
      "eventEnded": "Event ended",
      "participating": "You are participating",
      "ongoing": "Event in progress",
      "alreadyParticipating": "Already participating",
      "participate": "Participate",
      "status": {
        "finished": "Finished",
        "ongoing": "Ongoing"
      },
      "showParticipants": "Show Participants",
      "signOut": "Unsubscribe"
    },
    "common": {
      "edit": "Edit",
      "public": "Public",
      "private": "Private",
      "participants": "participants",
      "registered": "registered",
      "price": "Price"
    }
  }
}

export default Resources;
