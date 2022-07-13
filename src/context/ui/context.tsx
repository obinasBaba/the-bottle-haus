import React, { FC, useCallback, useMemo } from 'react';

export interface State {
  navMenu: boolean;
  displayDropdown: boolean;
  displayModal: boolean;
  sidebarView: string;
  modalView: string;
  userAvatar: string;
}

const initialState = {
  navMenu: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  sidebarView: 'CART_VIEW',
  userAvatar: '',
};

type Action =
  | {
      type: 'OPEN_NAV_MENU';
    }
  | {
      type: 'CLOSE_NAV_MENU';
    }
  | {
      type: 'OPEN_DROPDOWN';
    }
  | {
      type: 'CLOSE_DROPDOWN';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    }
  | {
      type: 'SET_SIDEBAR_VIEW';
      view: SIDEBAR_VIEWS;
    }
  | {
      type: 'SET_USER_AVATAR';
      value: string;
    };

type MODAL_VIEWS =
  | 'SIGNUP_VIEW'
  | 'LOGIN_VIEW'
  | 'FORGOT_VIEW'
  | 'NEW_SHIPPING_ADDRESS'
  | 'NEW_PAYMENT_METHOD';

type SIDEBAR_VIEWS = 'CART_VIEW' | 'CHECKOUT_VIEW' | 'PAYMENT_METHOD_VIEW';

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_NAV_MENU': {
      return {
        ...state,
        navMenu: true,
      };
    }
    case 'CLOSE_NAV_MENU': {
      return {
        ...state,
        navMenu: false,
      };
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      };
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
        navMenu: false,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case 'SET_SIDEBAR_VIEW': {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
    case 'SET_USER_AVATAR': {
      return {
        ...state,
        userAvatar: action.value,
      };
    }
  }
}

export const UIProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openNavMenu = useCallback(() => dispatch({ type: 'OPEN_NAV_MENU' }), [dispatch]);
  const closeNavMenu = useCallback(() => dispatch({ type: 'CLOSE_NAV_MENU' }), [dispatch]);
  const toggleNavMenu = useCallback(
    () =>
      state.navMenu ? dispatch({ type: 'CLOSE_NAV_MENU' }) : dispatch({ type: 'OPEN_NAV_MENU' }),
    [dispatch, state.navMenu],
  );

  const toggleModal = useCallback(
    () =>
      state.displayModal ? dispatch({ type: 'CLOSE_MODAL' }) : dispatch({ type: 'OPEN_MODAL' }),
    [state.displayModal, dispatch],
  );

  const openDropdown = useCallback(() => dispatch({ type: 'OPEN_DROPDOWN' }), [dispatch]);
  const closeDropdown = useCallback(() => dispatch({ type: 'CLOSE_DROPDOWN' }), [dispatch]);

  const openModal = useCallback(() => dispatch({ type: 'OPEN_MODAL' }), [dispatch]);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch]);

  const setUserAvatar = useCallback(
    (value: string) => dispatch({ type: 'SET_USER_AVATAR', value }),
    [dispatch],
  );

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch],
  );

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: 'SET_SIDEBAR_VIEW', view }),
    [dispatch],
  );

  const value = useMemo(
    () => ({
      ...state,
      openNavMenu,
      closeNavMenu,
      toggleNavMenu,
      toggleModal,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
      boo: function () {
        return false;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );

  return <UIContext.Provider value={value} {...props} />;
};

type UiType = {
  toggleNavMenu: () => void;
  openModal: () => void;
  openNavMenu: () => void;
  closeNavMenu: () => void;
  closeModal: () => void;
  toggleModal: () => void;
} & State;

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as UiType;
};

export const ManagedUIContext: FC<{ children: React.ReactElement }> = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
