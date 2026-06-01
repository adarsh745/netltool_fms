import { SetStateAction, useEffect, useState } from 'react'
import SkeletonTable from '../components/Loading/SkeletonTable'
import Button from '../components/UI/Button'
import CustomTable from '../components/UI/CustomTable'
import Modal from '../components/UI/Modal'
import OptionsContainer from '../components/UI/OptionsContainer'
import { useAdminUpdateUserMutation, useCreateUserMutation, useDeleteUserMutation, useDisbaleUserMutation, useGetRolesQuery, useGetUserDetailsQuery, useGetUsersQuery } from '../services/api/userSlice'
import CustomInput from '../components/Login/CustomInput'
import ConfirmationModal from '../components/UI/ConfirmationModal'

interface IUserModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string | null;
}

function UserFormModal({ isOpen, setIsOpen, id }: IUserModal) {
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    role_id: "",
    // company: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const { data, isLoading: userLoading, isError: userError } = useGetUserDetailsQuery(
    id ?? "",
    { skip: !isEdit }
  );

  const { data: roleData, isLoading: roleLoading, isError: roleError } = useGetRolesQuery("role");

  const [updateUser, { isLoading: updating, isError: isUpdateError, error: updateError }] =
    useAdminUpdateUserMutation();

  const [createUser, { isLoading: creating, isError: isCreateError, error: createError }] =
    useCreateUserMutation();

  const isBusy = updating || creating;

  useEffect(() => {
    if (!isEdit) {
      setFormData({ email: "", first_name: "", role_id: ""});
      return;
    }
    if (!data) return;
    setFormData({
      email: data.email ?? "",
      first_name: data.first_name ?? "",
      role_id: String(data.role_id ?? ""),
    //   company: data.company ?? "",
    });
  }, [data, isEdit]);

  // Surface RTK mutation errors into the form banner
  useEffect(() => {
    if (isUpdateError && updateError) {
      const msg =
        "data" in updateError
          ? (updateError.data as any)?.detail ?? "Failed to update user."
          : "Failed to update user.";
      setFormError(msg);
    }
    if (isCreateError && createError) {
      const msg =
        "data" in createError
          ? (createError.data as any)?.detail ?? "Failed to create user."
          : "Failed to create user.";
      setFormError(msg);
    }
  }, [isUpdateError, updateError, isCreateError, createError]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormError(null); // clear banner on any input change
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const payload = { ...formData, role_id: Number(formData.role_id) };

    try {
      if (isEdit) {
        await updateUser({id,body:payload}).unwrap();
      } else {
        await createUser(payload).unwrap();
      }
      setIsOpen(false);
    } catch (err: any) {
      const msg = err?.data?.detail ?? (isEdit ? "Failed to update user." : "Failed to create user.");
      setFormError(msg);
    }
  }

  return (
    <Modal key={id} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-full p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{isEdit ? "Edit User" : "Create User"}</h2>
          <p className="text-sm text-gray-500 mt-1">Admin can manage user details.</p>
        </div>

        {/* Fetch loading/error states */}
        {userLoading && (
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6" strokeWidth="2" className="stroke-gray-300" />
              <path d="M7.5 1.5a6 6 0 0 1 6 6" strokeWidth="2" strokeLinecap="round" className="stroke-gray-500" />
            </svg>
            Loading user details…
          </div>
        )}

        {userError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Failed to load user. Please close and try again.
          </div>
        )}

        {/* Mutation error banner */}
        {formError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="block text-sm mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
              required
              disabled={isBusy}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
              required
              disabled={isBusy}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">Role</label>
            {roleError ? (
              <p className="text-sm text-red-500">Failed to load roles.</p>
            ) : (
              <select
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
                disabled={roleLoading || isBusy}
              >
                <option value="">
                  {roleLoading ? "Loading roles…" : "Select Role"}
                </option>
                {roleData && roleData?.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* <div>
            <label className="block text-sm mb-2 font-medium">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
              disabled={isBusy}
            />
          </div> */}

          <div className="flex justify-end gap-3 pt-3">
            <Button
              variant="longOutline"
              text="Cancel"
              onClick={() => setIsOpen(false)}
              disabled={isBusy}
            />
            <Button
              variant="primary"
              type="submit"
              isLoading={isBusy}
              loadingText={isEdit ? "Updating…" : "Creating…"}
              text={isEdit ? "Update User" : "Create User"}
              disabled={isBusy}
            />
          </div>

        </form>
      </div>
    </Modal>
  );
}


function ManageUsers(){


    const {data , isLoading , isError , error} = useGetUsersQuery("users")

    console.log("this is user data" , data , isLoading , isError , error)

    const [isOpen , setIsOpen]  = useState(false);
    const [userId, setUserId] = useState<string|null>(null)
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    const [disableUser , {isLoading:disabling , isError:isDiableError , error:disableError}] = useDisbaleUserMutation()
    const [deleteUser , {isLoading:deleting , isError:isDeleteUser , error:deleteError}] = useDeleteUserMutation()

    const handleDisble=async()=>{
      try{
        await disableUser(userId).unwrap()
        setIsDisable(false)
      }catch(error){
        console.error("Error in disabling user" , error)
      }
    }

    const handleDeleting= async ()=>{
      try{
        await deleteUser(userId).unwrap()
        setIsDelete(false)
      }catch(error){
        console.error("Error in deleting user" , error)
      }
    }
    

   const column = [
  {
    key: "id",
    label: "#",
    render: (_: any, row: any) => (
      <span className="text-xs text-gray-400 font-mono">#{row.id}</span>
    ),
  },
  {
    key: "avatar_url",
    label: "",
    render: (_: any, row: any) => {
      const initials = `${row.first_name?.[0] ?? ""}${row.last_name?.[0] ?? ""}`.toUpperCase();
      return row.avatar_url ? (
        <img
          src={row.avatar_url}
          alt={initials}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
          {initials || "?"}
        </div>
      );
    },
  },
  {
    key: "name",
    label: "Name",
    render: (_: any, row: any) => (
      <div className="flex flex-col">
        <span
          className={`text-sm font-medium leading-tight ${
            row.is_deleted ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {row.first_name} {row.last_name}
        </span>
        {!row.is_register && (
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 font-medium mt-0.5">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Pending registration
          </span>
        )}
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (_: any, row: any) => (
      <span className={`text-sm ${row.is_deleted ? "text-gray-400 line-through" : "text-gray-600"}`}>
        {row.email}
      </span>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (_: any, row: any) => (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
        {row.role?.name ?? "—"}
      </span>
    ),
  },
  {
    key: "isActive",
    label: "Status",
    render: (_: any, row: any) => {
      if (row.is_deleted) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-500 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
            Deleted
          </span>
        );
      }
      if (!row.is_register) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            Pending
          </span>
        );
      }
      return row.is_active ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
          Inactive
        </span>
      );
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (_: any, row: any) => (
      <div className="flex items-center gap-2">
        <Button
          variant="longOutline"
          text="Edit"
          size="sm"
          isLoading={disabling}
          onClick={() => {
            setIsOpen(true);
            setUserId(row.id);
          }}
        />
        <Button
          variant="long"
          text={row.is_active ? "Disable" : "Activate"}
          size="sm"
          onClick={() => {
            setUserId(row.id);
            setIsDisable(true);
          }}
        />
        <Button
          variant="danger"
          text={row.is_deleted ? "Restore" : "Delete"}
          size="sm"
          onClick={() => {
            setUserId(row.id);
            setIsDelete(true);
          }}
        />
      </div>
    ),
  },
];
    

    if(isLoading){
        return <OptionsContainer>
            <SkeletonTable/>
        </OptionsContainer>
    }

    if(isError){
        return <OptionsContainer>
            <div>
                <h1>Something went wrong...</h1>
            </div>
        </OptionsContainer>
    }
 
    return <OptionsContainer>
        <UserFormModal isOpen={isOpen} setIsOpen={setIsOpen} id={userId} />
         <ConfirmationModal title="Please confirm Disable" heading='Are you sure want to disable' description={`${userId} will be disabled`} isOpen={isDisable} isLoading={disabling} setIsOpen={setIsDisable} onConfirm={handleDisble} onCancle={()=>{
          setUserId(null)
          setIsDisable(false)
         }} />
          <ConfirmationModal title="Please confirm Delete" heading='Are you sure want to Delete' description={`${userId} will be deleted`} isOpen={isDelete} isLoading={deleting} setIsOpen={setIsDelete} onConfirm={handleDeleting} onCancle={()=>{
          setUserId(null)
          setIsDelete(false)
         }} />
        <div className='p-6'>
            <div className="flex flex-row justify-between mb-4">
                    <div>
                       <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          Manage User and permissions
                       </h1>
                        <p className="text-sm text-gray-500">
                         Record, edit, and manage your Blog posts.
                        </p>
                    </div>
                     
                     <div >
                        <Button text=" + Create New User  "  variant="primary" onClick={()=>{
                            setUserId(null)
                            setIsOpen(true)
                            }}/>
                     </div>

                </div>
            <CustomTable columns={column} data={data.users}/>
        </div>
    </OptionsContainer>
}

export default ManageUsers