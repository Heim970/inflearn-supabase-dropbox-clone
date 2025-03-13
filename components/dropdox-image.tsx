"use client";

import { IconButton } from "node_modules/@material-tailwind/react";

export default function DropboxImage() {
  return (
    <div className="relative w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md">
      {/* Image */}
      <div>
        <img
          src="/images/cutedog.jpeg"
          className="w-full aspect-square rounded-2xl"
        />
      </div>
      {/* filename */}
      <div>cutedog.jpeg</div>

      <IconButton
        onClick={() => {}}
        color="red"
        className="absolute top-4 right-4 rounded-full"
      >
        <i className="fas fa-trash"></i>
      </IconButton>
    </div>
  );
}
