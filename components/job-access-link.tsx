"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  jobId: string | number;
  children: ReactNode;
  className?: string;
};

export default function JobAccessLink({
  jobId,
  children,
  className,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/jobs/${jobId}`)}`
      );
      return;
    }

    router.push(`/jobs/${jobId}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
