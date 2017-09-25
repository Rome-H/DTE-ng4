// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};
export const firebaseConfig = {
    apiKey: 'AIzaSyCo1VwAfgxTUAL3g6aau2BXtDrmI5z8dEQ',
    authDomain: 'myelements-51877.firebaseapp.com',
    databaseURL: 'https://myelements-51877.firebaseio.com',
    projectId: 'myelements-51877',
    storageBucket: 'myelements-51877.appspot.com',
    messagingSenderId: '489642273759'
};

export const REMOTE_UNLOCK_TTL = 600000;

export const apiUrl = 'http://localhost:5000/api/v1/datastructures/';
