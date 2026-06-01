import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const usersApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["Users", "UserDetail"],
    endpoints: (builder) => ({

        getUsers: builder.query({
            query: () => "/auth/users",
            providesTags: (result) => {
                const list = Array.isArray(result)
                    ? result
                    : result?.users ?? result?.data ?? [];

                return [
                    ...list.map(({ id }: { id: string }) => ({ type: "Users" as const, id })),
                    { type: "Users", id: "LIST" },
                ];
            },
        }),

        getUserDetails: builder.query({
            query: (id: string) => `/auth/get-user/${id}`,
            providesTags: (_result, _err, id) => [{ type: "UserDetail", id }],
        }),

        //role and permissions
        getRoles: builder.query({
            query: () => '/role-permission/roles',
        }),
        getPermissions:builder.query({
            query:()=>'/role-permission/permissions'
        }),
        createRoles:builder.mutation({
            query:(body)=>({
                url:"/role-permission/create-role",
                method:"POST",
                body
            })
        }),


        adminUpdateUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/auth/admin-user-update/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_result, _err, { id }) => [
                { type: "Users", id: "LIST" },
                { type: "UserDetail", id },
            ],
        }),

        createUser: builder.mutation({
            query: (body) => ({
                url: "/auth/create-user-for-login",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Users", id: "LIST" }],
        }),

        disbaleUser: builder.mutation({
            query: (user_id) => ({
                url: `/auth/user-disable/${user_id}`,
                method: "PUT",
            }),
            invalidatesTags: (_result, _err, user_id) => [
                { type: "Users", id: "LIST" },
                { type: "UserDetail", id: user_id },
            ],
        }),

        deleteUser: builder.mutation({
            query: (user_id) => ({
                url: `/auth/delete-user/${user_id}`,
                method: "PUT",
            }),
            invalidatesTags: (_result, _err, user_id) => [
                { type: "Users", id: "LIST" },
                { type: "UserDetail", id: user_id },
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserDetailsQuery,
    useGetRolesQuery,
    useAdminUpdateUserMutation,
    useCreateUserMutation,
    useDisbaleUserMutation,
    useDeleteUserMutation,
    useGetPermissionsQuery , 
    useCreateRolesMutation
} = usersApi;