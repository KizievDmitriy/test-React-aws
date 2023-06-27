import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';




function App({signOut, user}) {
  return (
    <div className="App">
      <header>My header</header>
      <main>
        <h1>My content</h1>
        {user.attributes.email}
        <button onClick={signOut}>Sign Out</button>
      </main>
    </div>
  );
}

export default withAuthenticator(App);
