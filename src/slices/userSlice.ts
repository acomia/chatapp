import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@all/store'

export interface CounterState {
  user: any
}

const initialState: CounterState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, } = userSlice.actions

export const getUser = (state:RootState) => state.user.user

export default userSlice.reducer