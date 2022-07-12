import React, { FC, useMemo } from 'react';

export interface State {
  pathname: string;
}

const initialState = {
  pathname: 'sld',
};

type Action = {
  type: 'NOT_IMP';
};

export const AppContext = React.createContext<State | any>(initialState);

AppContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'NOT_IMP': {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
