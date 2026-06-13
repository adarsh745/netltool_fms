import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000/projects";

export const fetchProjects =
  createAsyncThunk(
    "projects/fetchProjects",
    async () => {
      const response =
        await axios.get(
          `${API_URL}/`
        );

      return response.data.projects;
    }
  );

export const createProject =
  createAsyncThunk(
    "projects/createProject",
    async (data: any) => {
      const response =
        await axios.post(
          `${API_URL}/create`,
          data
        );

      return response.data.project;
    }
  );

interface ProjectState {
  projects: any[];
  loading: boolean;
}

const initialState: ProjectState =
  {
    projects: [],
    loading: false,
  };

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProjects.pending,
        (state) => {
          state.loading = true;
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
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        createProject.fulfilled,
        (state, action) => {
          state.projects.push(
            action.payload
          );
        }
      );
  },
});

export default projectSlice.reducer;