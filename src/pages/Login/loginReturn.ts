const key = "giut-login-return";
const sharedProfilePath = /^\/api\/profile\/shares\/[A-Za-z0-9_-]{43}$/;

export function saveSharedProfileReturn(token: string, storage: Pick<Storage, "setItem"> = sessionStorage): void {
  const path = `/api/profile/shares/${token}`;
  if (sharedProfilePath.test(path)) storage.setItem(key, path);
}

export function consumeLoginReturn(storage: Pick<Storage, "getItem" | "removeItem"> = sessionStorage): string | null {
  const path = storage.getItem(key);
  storage.removeItem(key);
  return path && sharedProfilePath.test(path) ? path : null;
}

export function completePendingLogin(isAuthenticated: boolean, storage: Pick<Storage, "getItem" | "removeItem"> = sessionStorage): string | null {
  if (storage.getItem("kakao-login-pending") !== "true") return null;
  storage.removeItem("kakao-login-pending");
  if (!isAuthenticated) return null;
  return consumeLoginReturn(storage) ?? "/student-verification";
}
