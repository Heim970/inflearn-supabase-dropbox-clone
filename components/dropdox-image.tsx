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
