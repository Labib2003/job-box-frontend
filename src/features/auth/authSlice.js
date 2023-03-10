import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user: { email: "", role: "" },
  isLoading: false,
  isError: false,
  error: "",
};

// firebase thunk apis
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data, thunkApi) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return response.user.email;
  }
);
export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
  const response = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  return response.user.email;
});

// user thunk apis
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (email, thunkApi) => {
    const response = await fetch(`https://job-box-backend.onrender.com/api/users/${email}`);
    const data = await response.json();

    if (data.success) {
      console.log("user found in db");
      return data;
    } else {
      console.log("unregistered user");
      return email;
    }
  }
);

// actual slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    // create user
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        // email is returned from the thunkApi as payload
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user = initialState.user;
      });

    // login
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        // email is returned from the thunkApi as payload
        state.user.email = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user = initialState.user;
      });

    // get user
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        if (action.payload.success) {
          state.user = action.payload.data;
        } else {
          state.user.email = action.payload;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user = initialState.user;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
