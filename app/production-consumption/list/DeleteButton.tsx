// "use client";
// import { PRODUCTION_API } from "@/app/APIs";
// import DeleteDialog from "@/app/components/DeleteDialog";
// import apiClient from "@/app/services/api-client";
// import { deleteMessage } from "@/app/utils/utils";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const DeleteButton = ({ id }: { id: number }) => {
//   const router = useRouter();
//   const [isDeleting, setDeleting] = useState(false);

//   const handleDelete = async (id: number) => {
//     try {
//       setDeleting(true);
//       await apiClient.delete(`${PRODUCTION_API}/${id}`);
//       toast.success(deleteMessage);
//       router.refresh();
//     } catch (err) {
//       setDeleting(false);
//       console.error("failed to delete item", err);
//       toast.error((err as AxiosError).message);
//     }
//   };

//   return (
//     <DeleteDialog isDeleting={isDeleting} handleDelete={handleDelete} id={id} />
//   );
// };

// export default DeleteButton;

import React from "react";

const DeleteButton = () => {
  return <div>DeleteButton</div>;
};

export default DeleteButton;
