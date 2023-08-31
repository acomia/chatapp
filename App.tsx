import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';

import Main from '@all/navigation/Main';
import {store} from '@all/store';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
