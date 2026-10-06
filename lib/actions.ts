"use server";

import { revalidatePath } from "next/cache";
import { likeProduct as likeProductinDb } from "./products";
import { createNotice } from "./notices";
import { redirect } from "next/navigation";
export async function likeproductAction(id: string) {
  const newLikes = await likeProductinDb(id);
  revalidatePath(`/products/${id}`);
  return newLikes;
}

export async function createNoticeAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim(); // 제목 입력값 가져오기
  const author = String(formData.get("author") ?? "").trim(); // 작성자 입력값 가져오기
  const content = String(formData.get("content") ?? "").trim(); // 내용 입력값 가져오기

  if (!title || !author || !content) {
    // 제목, 작성자, 내용 중 하나라도 비어있으면 에러를 던집니다.
    // trim()을 사용해 공백만 있는 경우도 체크합니다.
    // 예를 들어, title이 "   "이면 trim() 후에는 ""가 되어 false로 평가됩니다.
    throw new Error("제목, 작성자, 내용을 모두 입력해주세요.");
    // 에러 메시지는 클라이언트에서 catch할 때 사용됩니다.
  }

  const notice = await createNotice({ title, author, content }); // createNotice 함수를 호출해 새 공지사항을 생성합니다.
  revalidatePath("/notices");
  // 공지사항 목록 페이지를 다시 렌더링하도록 경로를 재검증합니다.
  redirect(`/notices/${notice.id}`); // 새로 생성된 공지사항 페이지로 리다이렉트합니다.
}
