import { useReducer } from 'react';

export type SharedState = {
  token: string;
};

export const initialState: SharedState = {
  token: '',
};
type SetToken = { type: 'set_token'; payload: string };
export type SharedAction = SetToken;

const reducers = {
  set_token: (state: SharedState, action: SetToken): SharedState => ({ ...state, token: action.payload }),
};

export function SharedReducer(state: SharedState, action: SharedAction) {
  const updateState = reducers[action.type] || (() => state);
  return updateState(state, action);
}

export function useSharedStore() {
  const [sharedState, dispatch] = useReducer(SharedReducer, initialState);

  const setToken = (payload: string) => {
    dispatch({ type: 'set_token', payload });
  };

  return { sharedState, setToken };
}

export type SharedStoreActions = ReturnType<typeof useSharedStore>;
