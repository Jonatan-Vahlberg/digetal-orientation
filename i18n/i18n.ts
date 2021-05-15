export default {
  en: {
    login: {
      email: 'email',
      password: 'password',
      confirm: 'Confirm password',
      login: 'login',
      firstName: 'Firstname',
      lastName: 'Lastname',
      register: 'Register',
      or: {
        register: '...or register',
        login: '...or login',
      },
    },
    home: {
      code: 'Path code',
      findPath: 'Find path',
      logout: 'Logout',
      noroute: 'Code is not connected to a route.',
    },
    errors: {
      firstName: {
        required: 'Firstname is required',
      },
      lastName: {
        required: 'Lastname is required',
      },
      email: {
        valid: 'A valid email address is required',
      },
      password: {
        required: 'A password is required',
        valid: 'The password has to contain at least 8 chars',
        confirm: 'Passwords must match',
      },
    },
    route: {
      detail: {
        steps: 'steps',
        availableFrom: 'Available from',
        type: 'Route-type',
        routeId: 'Route-id',
        buttonStates: {
          unstarted: 'start',
          started: 'continue',
          done: 'reset',
        },
      },
    },
    step: {
      code: {
        inputPlaceholder: 'Enter code',
        sendCode: 'Send code',
        code_outside:
          'The code can not be submitted outside of the designated area.',
        code_incorrect: 'The code inputted does not match the designated code.',
      },
      next: 'Next',
      nodata: 'No data',
    },
  },
  sv: {
    login: {
      email: 'email',
      password: 'lösenord',
      confirm: 'Bekräfta lösenord',
      login: 'logga in',
      firstName: 'Förnamn',
      lastName: 'Efternamn',
      register: 'Registrera',
      or: {
        register: '...registrera dig',
        login: '...logga in',
      },
    },
    home: {
      code: 'Ban kod',
      findPath: 'Hitta Bana',
      logout: 'Logga ut',
      noroute: 'Koden kan inte kopplas till en bana.',
    },
    errors: {
      firstName: {
        required: 'Förnamn krävs',
      },
      lastName: {
        required: 'Efternamn krävs',
      },
      email: {
        valid: 'En giltig email adress krävs',
      },
      password: {
        required: 'Ett lösenord krävs',
        valid: 'Lösenordet måste vara minst 8 tecken långt',
        confirm: 'Lösenorden måste matcha',
      },
    },
    route: {
      detail: {
        steps: 'Antal steg',
        availableFrom: 'Tillgänglig',
        type: 'Bantyp',
        routeId: 'Ban-id',
        buttonStates: {
          unstarted: 'starta',
          started: 'Fortsätt',
          done: 'Återställ',
        },
      },
    },
    step: {
      code: {
        inputPlaceholder: 'Skriv in kod',
        sendCode: 'Skicka kod',
        code_outside: 'Koden accepteras endast inuti det angivna området',
        code_incorrect:
          'Koden som du har skrivit in stämmer inte överäns var god att kolla stavning.',
      },
      next: 'Nästa',
      nodata: 'Ingen data',
    },
  },
}
