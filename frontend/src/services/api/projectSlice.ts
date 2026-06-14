import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API_URL =
  ((import.meta as any).env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api") + "/projects";

export const fetchProjects =
  createAsyncThunk(
    "projects/fetchProjects",
    async (_, { rejectWithValue }) => {
      try {
        const response =
          await axios.get(
            `${API_URL}/`
          );

        return response.data.projects;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.detail || error.message || "Failed to fetch projects"
        );
      }
    }
  );

export const createProject =
  createAsyncThunk(
    "projects/createProject",
    async (data: any, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response =
          await axios.post(
            `${API_URL}/create`,
            data,
            { headers }
          );

        return response.data.project;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.detail || error.message || "Failed to create project"
        );
      }
    }
  );

export const deleteProject =
  createAsyncThunk(
    "projects/deleteProject",
    async (projectId: number, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response =
          await axios.delete(
            `${API_URL}/delete/${projectId}`,
            { headers }
          );

        return { projectId, message: response.data.message };
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.detail || error.message || "Failed to delete project"
        );
      }
    }
  );

interface ProjectState {
  projects: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState =
  {
    projects: [],
    loading: false,
    error: null,
  };

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProjects.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProjects.fulfilled,
        (state, action) => {
          state.loading = false;
          state.projects =
            action.payload;
        }
      )

      .addCase(
        fetchProjects.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      .addCase(
        createProject.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createProject.fulfilled,
        (state, action) => {
          state.loading = false;
          state.projects.push(
            action.payload
          );
        }
      )

      .addCase(
        createProject.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )

      .addCase(
        deleteProject.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteProject.fulfilled,
        (state, action) => {
          state.loading = false;
          state.projects = state.projects.filter(
            (p) => p.id !== action.payload.projectId
          );
        }
      )

      .addCase(
        deleteProject.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;