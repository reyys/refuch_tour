// user.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { addUser, removeUser } from '../actions/auth.action';

export interface authState {
  user: User | null;
}

export const initialState: authState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(removeUser, (state) => {
    return {
      user: null,
    };
  })
);
