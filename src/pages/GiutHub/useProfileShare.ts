import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProfileShareLink } from "../../api/profileShares";

export function useProfileShare(canIssue: boolean, profileUserId?: number) {
  const [isOpen, setIsOpen] = useState(false);
  const inFlight = useRef(false);
  const issuance = useMutation({
    mutationKey: ["profile-share-issue", profileUserId ?? "me"],
    mutationFn: () => createProfileShareLink(profileUserId),
    retry: false,
    onSettled: () => { inFlight.current = false; },
  });

  const issueLink = () => {
    if (!canIssue || inFlight.current) return;
    inFlight.current = true;
    issuance.reset();
    issuance.mutate();
  };

  return {
    isOpen,
    issuance,
    canIssue,
    // POST는 effect가 아닌 사용자 동작에서만 실행한다. StrictMode에서도 이중 발급하지 않는다.
    openShare: () => {
      if (isOpen) return;
      setIsOpen(true);
      issueLink();
    },
    closeShare: () => setIsOpen(false),
    issueLink,
  };
}
