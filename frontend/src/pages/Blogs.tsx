import { useNavigate } from 'react-router-dom'
import { useState } from "react";

import LoginBar from "../components/Home/LoginBar"
import Button from "../components/UI/Button"
import CustomTable from "../components/UI/CustomTable"
import OptionsContainer from "../components/UI/OptionsContainer"
import { useDeleteBlogMutation, useGetBlogByIdQuery, useGetBlogsQuery } from '../services/api/blogSlice'
import BlogsTableSkeleton from '../components/Loading/SkeletonTable'
import SkeletonTable from '../components/Loading/SkeletonTable'

import { MoreVertical, Rows, User, Calendar, Edit, Eye, Trash2, Copy } from "lucide-react";
//@ts-ignore
import viewIcon from "../assets/View.svg";
//@ts-ignore
import editIcon from "../assets/Edit.svg";
//@ts-ignore
import copyIcon from "../assets/Copy.svg";
//@ts-ignore
import shareIcon from "../assets/Share.svg";
//@ts-ignore
import deleteIcon from "../assets/Delete.svg";
import { dateFromMatter } from '../utils/DateFomatter';
import Modal from '../components/UI/Modal';

const blogData = [
  { id: 1, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 2, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 3, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 4, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 5, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 6, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 7, title: "Getting Started with React", author: "John Doe", date: "2024-01-15", actions: "Edit" },
  { id: 8, title: "Advanced TypeScript Patterns", author: "Jane Smith", date: "2024-01-20", actions: "Edit" },
  { id: 9, title: "Web Performance Optimization", author: "Mike Johnson", date: "2024-01-25", actions: "Edit" },
]

const Blogs = () => {

  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState("")
  const [confirModal, setConfirmModal] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedId, setselectedId] = useState<null | string>(null)

  // service apis
  const { data, isLoading, isError, error } = useGetBlogsQuery("blogs")
  console.log("Blogs data: ", data, isLoading,)
  const [deleteBlog, { isLoading: deleting, isError: deleteError }] = useDeleteBlogMutation()

  const handleCreateNewBlog = () => {
    navigate("/blog-editor");
  };

  // handle copy button 
  async function handleCopyLink(id: string) {
    const url = `${window.location.origin}/blog/${id}`;
    await navigator.clipboard.writeText(url);
  }


  const column = [
    { key: "id", label: "id", width: "60px" },
    {
      key: "title", label: "Title",
      wrap: true,
      width: "30%",
      render: (value: any, row: any) => (
        <button
          onClick={() => navigate(`/blog/${row.id}`)}
          className='text-left font-medium hover:text-neutral-700 hover:underline whitespace-normal break-words w-full'>
          {value}
        </button>
      )
    },
    {
      key: "author_id", label: "Author",
      width: "15%",
      render: (value: any, row: any) => (
        <p className="whitespace-normal break-words">{row?.user?.first_name}</p>
      )
    },
    {
      key: "summary",
      label: "Summary",
      wrap: true,
      width: "35%",
      render: (_: any, row: any) => {
        return (
          <p className="whitespace-normal break-words text-gray-500">
            {row?.summary ? `${row.summary.slice(0, 80)}...` : "—"}
          </p>
        );
      },
    },
    {
      key: "created_at", label: "Date",
      width: "120px",
      render: (_: any, row: any) => (
        <p className="whitespace-nowrap">{dateFromMatter(row.created_at)}</p>
      )
    },
    {
      key: "status", label: "status",
      width: "100px",
      render: (value: any, row: any) => (
        <p className='bg-green-100 text-green-800 text-xs px-2.5 py-1.5 rounded-lg text-center font-medium'>Published</p>
      )
    },
    {
      key: "actions",
      label: "Actions",
      width: "80px",
      render: (_: any, row: any) => (
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu(
                openMenu === row.id
                  ? null
                  : row.id
              );
            }}
            className="rounded border border-gray-300 p-2 hover:bg-gray-100"
          >
            <MoreVertical size={16} />
          </button>

          {openMenu === row.id && (
            <div className="absolute right-0 top-12 z-50 w-52 rounded-md border border-gray-200 bg-white shadow-lg">

              <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100" onClick={() => navigate(`/blog/${row.id}`)}>
                <img
                  src={viewIcon}
                  alt="view"
                  className="h-4 w-4"
                />
                View Blog
              </button>

              <button
                onClick={() =>
                  navigate(`/blog-editor/${row.id}`)
                }
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <img
                  src={editIcon}
                  alt="edit"
                  className="h-4 w-4"
                />
                Edit Blog
              </button>

              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-all duration-300"
                onClick={() => {
                  setCopiedId(row.id);
                  handleCopyLink(row.id);

                  setTimeout(() => {
                    setCopiedId("");
                  }, 2000);
                }}
              >
                <img
                  src={copyIcon}
                  alt="copy"
                  className={`h-4 w-4 transition-all duration-300 ${copiedId === row.id ? "scale-110 opacity-70" : "scale-100 opacity-100"
                    }`}
                />

                <span
                  className={`transition-all duration-300 ${copiedId === row.id
                    ? "text-green-600 font-medium"
                    : "text-gray-700"
                    }`}
                >
                  {copiedId === row.id ? "✓ Copied!" : "Copy Link"}
                </span>
              </button>

              <button className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50" onClick={() => {
                setConfirmModal(true)
                setSelectedTitle(row?.title)
                setselectedId(row.id)
                setOpenMenu(null)
              }}>
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="h-4 w-4"
                />
                Delete Blog
              </button>

            </div>
          )}
        </div>
      ),
    },
  ];

  const renderMobileCard = (row: any) => {
    const timeAgo = dateFromMatter(row.created_at);

    return (
      <div className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col font-sans hover:border-gray-300 hover:shadow-md transition-all select-none gap-2">
        {/* Header Row: Blog ID and status badge */}
        <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-0.5">
          <span className="font-mono text-gray-500 font-bold">#{row.id}</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-150">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Published
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
          {row.title}
        </h3>

        {/* Author & Date Row */}
        <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <User size={13} className="text-gray-400 stroke-[2.25]" />
            {row?.user?.first_name || "Author"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} className="text-gray-400 stroke-[2.25]" />
            {timeAgo}
          </span>
        </div>

        {/* Summary (restricted to 2 lines) */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5 mb-1">
          {row.summary || "No description available."}
        </p>

        {/* Actions Footer - Bottom Action Bar with 4 evenly spaced icon buttons */}
        <div className="grid grid-cols-4 border-t border-gray-100 -mx-4 -mb-4 mt-auto overflow-hidden rounded-b-xl">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog-editor/${row.id}`);
            }}
            className="flex items-center justify-center py-3.5 text-gray-500 hover:text-[#4F46E5] hover:bg-gray-50 transition-colors cursor-pointer select-none active:bg-gray-100"
            title="Edit Blog"
          >
            <Edit size={15} className="stroke-[2.25]" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${row.id}`);
            }}
            className="flex items-center justify-center py-3.5 text-gray-500 hover:text-[#4F46E5] hover:bg-gray-50 transition-colors cursor-pointer select-none active:bg-gray-100"
            title="View Blog"
          >
            <Eye size={15} className="stroke-[2.25]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCopiedId(row.id);
              handleCopyLink(row.id);
              setTimeout(() => setCopiedId(""), 2000);
            }}
            className="relative flex items-center justify-center py-3.5 text-gray-500 hover:text-green-600 hover:bg-gray-50 transition-colors cursor-pointer select-none active:bg-gray-100"
            title="Copy Link"
          >
            <Copy size={15} className={`stroke-[2.25] transition-transform duration-250 ${copiedId === row.id ? "text-green-600 scale-110" : ""}`} />
            {copiedId === row.id && (
              <span className="absolute text-[9px] font-bold text-green-600 bg-green-50 border border-green-200 px-1 rounded -translate-y-6">Copied</span>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal(true);
              setSelectedTitle(row?.title);
              setselectedId(row.id);
            }}
            className="flex items-center justify-center py-3.5 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer select-none active:bg-red-100"
            title="Delete Blog"
          >
            <Trash2 size={15} className="stroke-[2.25]" />
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <OptionsContainer>
      <SkeletonTable />
    </OptionsContainer>
  }

  if (isError) {
    <OptionsContainer>
      <div>
        <h1>Something went wrong</h1>
        <p></p>
      </div>
    </OptionsContainer>
  }

  return <div>

    {/* model to confirmation delete */}
    <Modal
      isOpen={confirModal}
      onClose={() => {
        setConfirmModal(false)
        setSelectedTitle("")
        setselectedId(null)
      }}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Delete Blog
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this blog ? <br />{selectedTitle} <br /> This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setConfirmModal(false)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <Button
            text='Delete blog'
            onClick={async () => {
              try {
                await deleteBlog(selectedId); // your delete API call
                setConfirmModal(false);
              } catch (error) {
                console.error(error);
              }
            }}
            variant='danger'
            isLoading={deleting}
          />


        </div>
      </div>
    </Modal>
    <OptionsContainer>
      <div className="p-6" >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Blogs / Notes
            </h1>
            <p className="text-sm text-gray-500">
              Record, edit, and manage your Blog posts.
            </p>
          </div>

          <div >
            <Button text=" + Create New Blog  " onClick={handleCreateNewBlog} variant="primary" />
          </div>

        </div>

        <div>
            <CustomTable columns={column} data={data?.blogs || []} renderMobileCard={renderMobileCard} />
        </div>
      </div>
    </OptionsContainer>
  </div>
}

export default Blogs


