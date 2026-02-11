import React, { useMemo, useState } from 'react';
import { AppNavigation, Route, RouteParams, ScreenName } from './types';
import HomeScreen from '../screens/HomeScreen';
import AddContactScreen from '../screens/AddContactScreen';
import DetailsScreen from '../screens/DetailsScreen';

const INITIAL_ROUTE: Route<'Home'> = {
  name: 'Home',
  params: {},
};

function AppNavigator() {
  const [stack, setStack] = useState<Route[]>([INITIAL_ROUTE]);

  const currentRoute = stack[stack.length - 1];

  const navigation: AppNavigation = useMemo(
    () => ({
      navigate: <T extends ScreenName>(name: T, params: RouteParams[T]) => {
        setStack(prevStack => {
          if (name === 'Home') {
            return [{ name: 'Home', params: params as RouteParams['Home'] }];
          }

          return [...prevStack, { name, params } as Route<T>];
        });
      },
      goBack: () => {
        setStack(prevStack => (prevStack.length > 1 ? prevStack.slice(0, -1) : prevStack));
      },
    }),
    [],
  );

  if (currentRoute.name === 'AddContact') {
    return <AddContactScreen navigation={navigation} />;
  }

  if (currentRoute.name === 'Details') {
    return <DetailsScreen navigation={navigation} route={currentRoute} />;
  }

  return <HomeScreen navigation={navigation} route={currentRoute} />;
}

export default AppNavigator;
