import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { migoDarkTheme } from './src/assets/themes/migoDarkTheme';
import App from './src/App';

export default function Main() {
  return (
    <PaperProvider theme={migoDarkTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
