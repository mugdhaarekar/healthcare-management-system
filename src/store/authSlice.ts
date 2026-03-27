import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../types";
import {
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
} from "../lib/firebase";

const mapAuthErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  const message = error.message;

  if (message.includes("INVALID_IDP_RESPONSE") || message.includes("invalid_client")) {
    return "Google sign-in is not configured correctly in Firebase/Google Cloud (invalid_client). Verify OAuth client, authorized redirect URI, and enabled Google provider.";
  }

  if (message.includes("auth/popup-closed-by-user")) {
    return "Google sign-in popup was closed before completing authentication.";
  }

  if (message.includes("auth/network-request-failed")) {
    return "Network error during authentication. Check internet connection and try again.";
  }

  return message;
};
export const loginWithEmailThunk = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await loginWithEmail(email, password);
      const user: User = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };
      return user;
    } catch (error: unknown) {
      return rejectWithValue(mapAuthErrorMessage(error, "Login failed"));    
    }
  }
);

export const registerWithEmailThunk = createAsyncThunk(
  "auth/registerWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await registerWithEmail(email, password);
      const user: User = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };
      return user;
    } catch (error: unknown) {
      return rejectWithValue(mapAuthErrorMessage(error, "Registration failed"));    
    }
  }
);

export const loginWithGoogleThunk = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await loginWithGoogle();
      const user: User = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };      
      return user;
    } catch (error: unknown) {
      return rejectWithValue(mapAuthErrorMessage(error, "Google login failed"));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error: unknown) {
      return rejectWithValue(mapAuthErrorMessage(error, "Logout failed"));
    }
  }
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerWithEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWithEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerWithEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginWithGoogleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;