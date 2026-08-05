import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { migoDarkTheme } from './src/assets/themes/migoDarkTheme';
import App from './src/App';
import { store } from './src/store/store';
import { Provider } from 'react-redux';

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={migoDarkTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
