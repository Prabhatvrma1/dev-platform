import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photourl?: string;
  age?: number;
  skills?: string[];
}

type UserState = {
  currentUser: User | null;
};

// Load user from localStorage if available
const loadUserFromStorage = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: UserState = {
  currentUser: loadUserFromStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;