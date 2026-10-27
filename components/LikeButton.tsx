"use client";

import { startTransition, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { likeProductAction } from "@/lib/actions";

export function LikeButton({
  id,
  initialLikes,
}: {
  id: string;
  initialLikes: number;
}) {
  const [likes, setlikes] = useState(initialLikes);
  const [ispending, setIsPending] = useTransition();

  return (
    <Button
      variant="outline"
      disabled={ispending}
      onClick={() => {
        startTransition(async () => {
          const newLikes = await likeProductAction(id);
          setlikes(newLikes);
        });
      }}
    >
      {ispending ? "저장 중..." : `좋아요 (${likes})`}
    </Button>
  );
}
