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
      login: "Something wen't wrong with the login process",
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
          ended: 'reset',
        },
      },
      completed: {
        title: 'Nicely done',
        message: `
          Hi thank you for joining and testing this alpha version of Digital Orientation.<br><br>

          Currently the app lacks the desired depth and all feedback is appreciated.<br><br>

          Thank you again // Jonatan Vahlberg
        `,
        go_back: 'Return',
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
      login: 'Något gick fel med inloggningen vänligen försök igen.',
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
          ended: 'Återställ',
        },
      },
      completed: {
        title: 'Bra Jobbat',
        message: `
          Hejsan tack så mycket för att du deltog i detta test av Digetal orientering systemet.<br><br> 
          
          I dagsläget sakar sidan mycket av den funktionalitet som jag skulle vilja implementera men den grundläggande tanken bakom sidan är detsama därför uppskatas all feedback som ni har.<br><br>

          Med Scouthälsningar <strong>Jonatan Vahlberg</strong>
        `,
        go_back: 'Gå Tillbaka',
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
