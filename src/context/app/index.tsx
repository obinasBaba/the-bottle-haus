import React, { FC, useMemo } from 'react';

export interface State {
  pathname: string;
  navBar: boolean;
  darkNavBar: boolean;
}

const initialState = {
  pathname: 'sld',
  navBar: true,
  darkNavBar: false,
};

type Action = {
  type: 'SHOW_NAV_BAR' | 'HIDE_NAV_BAR' | 'LIGHTEN_NAV_BAR' | 'DARKEN_NAV_BAR';
};

export const AppContext = React.createContext<State | any>(initialState);

AppContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'DARKEN_NAV_BAR': {
      return {
        ...state,
        darkNavBar: true,
      };
    }
    case 'LIGHTEN_NAV_BAR': {
      return {
        ...state,
        darkNavBar: false,
      };
    }
    case 'SHOW_NAV_BAR': {
      return {
        ...state,
        navBar: !state.navBar,
      };
    }

    case 'HIDE_NAV_BAR': {
      return {
        ...state,
        navBar: false,
      };
    }
    default:
      return state;
  }
}

const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const showNavBar = () => dispatch({ type: 'SHOW_NAV_BAR' });
  const hideNavBar = () => dispatch({ type: 'HIDE_NAV_BAR' });
  const lightenNavBar = () => dispatch({ type: 'LIGHTEN_NAV_BAR' });
  const darkenNavBar = () => dispatch({ type: 'DARKEN_NAV_BAR' });

  const value = useMemo(
    () => ({
      ...state,
    }),
    [state],
  );

  return (
    <AppContext.Provider
      value={{ ...state, showNavBar, hideNavBar, darkenNavBar, lightenNavBar }}
      {...props}
    />
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as any &
    State & {
      darkenNavBar: () => void;
      lightenNavBar: () => void;
    };
};
