// 프로필 작성 전에는 사용자 ID가 없을 수 있다. 토큰 자체를 queryKey에 넣지 않고
// 인증 provider/자격 증명 세대마다 만든 불투명한 메모리 키로 캐시를 구분한다.
export function createAuthQueryScope() {
  let lastCredential: string | null | undefined;
  let sessionKey = "";
  return {
    resolve(credential: string | null, userId?: number): string {
      if (!sessionKey || credential !== lastCredential) {
        lastCredential = credential;
        sessionKey = crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint32Array(4)), value => value.toString(16)).join("-");
      }
      const identity = Number.isSafeInteger(userId) && (userId ?? 0) > 0 ? userId : "unresolved";
      return `auth-session:${sessionKey}:user:${identity}`;
    },
  };
}
