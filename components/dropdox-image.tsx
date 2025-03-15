"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "actions/storageAction";
import { queryClient } from "config/ReactQueryClientProvider";
import { IconButton, Spinner } from "@material-tailwind/react";
import { getImageUrl } from "utils/supabase/storage";

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });

  const formattedDate = new Date(image.updated_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img
          src={getImageUrl(image.name)}
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* filename */}
      <div className="">{image.name}</div>
      {/* updated_at */}
      <div className="text-xs">수정된 시간: {formattedDate}</div>

      <IconButton
        onClick={() => {
          deleteFileMutation.mutate(image.name);
        }}
        color="red"
        className="absolute top-4 right-4 rounded-full"
      >
        {deleteFileMutation.isPending ? (
          <Spinner />
        ) : (
          <i className="fas fa-trash"></i>
        )}
      </IconButton>
    </div>
  );
}
