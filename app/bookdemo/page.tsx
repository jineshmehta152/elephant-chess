"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookDemoModal } from "@/components/ui/BookDemoModal";

export default function BookDemoPage() {
  const router = useRouter();
  const { openModal } = useBookDemoModal();

  useEffect(() => {
    openModal();
    router.replace("/");
  }, [openModal, router]);

  return (
    <div className="min-h-screen bg-[#0A1128] flex items-center justify-center text-white">
      <p className="font-bold text-sm">Opening Free Demo Modal...</p>
    </div>
  );
}
