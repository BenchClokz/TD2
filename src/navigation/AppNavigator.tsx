import React, { useMemo, useState } from 'react';
import { AppNavigation, Route, RouteParams, ScreenName } from './types';
import HomeExercisesScreen from '../screens/exercises/HomeExercisesScreen';
import Exercise1PaperScreen from '../screens/exercises/Exercise1PaperScreen';
import Exercise2ApiScreen from '../screens/exercises/Exercise2ApiScreen';
import Exercise3SqliteScreen from '../screens/exercises/Exercise3SqliteScreen';

const INITIAL_ROUTE: Route<'Home'> = {
  name: 'Home',
  params: undefined,
};

function AppNavigator() {
  const [stack, setStack] = useState<Route[]>([INITIAL_ROUTE]);
  const currentRoute = stack[stack.length - 1];

  const navigation: AppNavigation = useMemo(
    () => ({
      navigate: <T extends ScreenName>(name: T, params: RouteParams[T]) => {
        setStack(prevStack => {
          if (name === 'Home') {
            return [{ name: 'Home', params: undefined }];
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

  if (currentRoute.name === 'Exercise1Paper') {
    return <Exercise1PaperScreen navigation={navigation} />;
  }

  if (currentRoute.name === 'Exercise2Api') {
    return <Exercise2ApiScreen navigation={navigation} />;
  }

  if (currentRoute.name === 'Exercise3Sqlite') {
    return <Exercise3SqliteScreen navigation={navigation} />;
  }

  return <HomeExercisesScreen navigation={navigation} />;
}

export default AppNavigator;
