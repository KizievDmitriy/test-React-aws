import './App.css';
import Amplife from 'aws-amplify'
import awsconfig from './aws-exports'
import {AmplifySigneOute, withAuthenticator} from '@aws-amplify/ui-react'

Amplife.configure(awsconfig)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AmplifySigneOute/>
        <h2>My App Content</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
