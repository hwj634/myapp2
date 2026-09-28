export type Notice = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

const notices: Notice[] = [
  {
    id: "1",
    title: "웹서버 보안 프로그래밍 개강 안내",
    author: "한우정",
    content: "강의 계획서를 참고해 주세요.",
    createdAt: "2026-9-1",
  },
  {
    id: "2",
    title: "GitHub Organization 초대 안내",
    author: "한우정",
    content:
      "과제 제출용 GitHub Organization 초대 메일을 확인하고 가입해주세요.",
    createdAt: "2026-9-1",
  },
  {
    id: "3",
    title: "5주차 실습 — 공지사항 게시판",
    author: "한우정",
    content:
      "이번 주부터 만드는 공지사항 게시판이 학기 내내 성장하는 코스 프로젝트입니다.",
    createdAt: "2026-9-1",
  },
];

let nextId = 4;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getNotices(): Promise<Notice[]> {
  await delay(600);
  return [...notices].sort((a, b) => (a.id < b.id ? 1 : -1));
  // 최신 글이 위로 오도록 정렬
  // [...notices]를 사용해 원본 배열을 복사한 뒤 정렬해야, 원본 배열이 바뀌지 않습니다.
  // sort()는 원본 배열을 바꾸기 때문에 [...notices]를 사용하지 않으면,
  // getNotices()를 여러 번 호출할 때마다 정렬 순서가 바뀌어 버립니다.
}

export async function getNotice(id: string): Promise<Notice | undefined> {
  await delay(400);
  return notices.find((n) => n.id === id);

  // find()는 조건에 맞는 첫 번째 요소를 반환합니다. 없으면 undefined를 반환합니다.r
}

export async function createNotice(input: {
  title: string;
  author: string;
  content: string;
  // createdAt은 서버에서 자동으로 생성되므로, 클라이언트에서 전달하지 않습니다.
  // id도 서버에서 자동으로 생성되므로, 클라이언트에서 전달하지 않습니다.
  // 따라서 input 타입에는 id와 createdAt이 없습니다.
}): Promise<Notice> {
  await delay(300);
  const notice: Notice = {
    id: String(nextId++),
    title: input.title,
    // title은 클라이언트에서 전달받은 값을 그대로 사용합니다.
    author: input.author,
    // content는 클라이언트에서 전달받은 값을 그대로 사용합니다.
    content: input.content,
    // createdAt은 서버에서 자동으로 생성되므로, 클라이언트에서 전달하지 않습니다.
    createdAt: new Date().toISOString().slice(0, 10),
    // createdAt은 "YYYY-MM-DD" 형식으로 생성합니다.
    // toISOString()은 "YYYY-MM-DDTHH:mm:ss.sssZ" 형식으로 생성하므로,
    // slice(0, 10)으로 앞의 10글자만 잘라서 "YYYY-MM-DD" 형식으로 만듭니다.
    // slice(0, 10)은 문자열의 앞에서부터 10글자만 잘라서 반환합니다.
    // slice()는 원본 문자열을 바꾸지 않고, 잘라낸 새로운 문자열을 반환합니다.
  };
  notices.push(notice);
  // push()는 배열의 끝에 요소를 추가합니다. 원본 배열이 바뀝니다.
  // push()는 원본 배열을 바꾸기 때문에, getNotices()를
  // 여러 번 호출할 때마다 새로운 공지사항이 추가됩니다.
  return notice;
}
