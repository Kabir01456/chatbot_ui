import { useCallback, useEffect, useRef, useState } from 'react';
import { userService } from '../services/userService';
import type { UserProfile } from '../types/user';
import { prefersReducedMotion } from '../utils/chatbotUtils';

const CLOSE_ANIMATION_MS = 160;

/** Widget open/close state plus lazy loading of the authenticated user's profile (on first open). */
export function useChatbot(userFromHost?: UserProfile | null) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState<UserProfile | null>(null);
  const requested = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const profile = userFromHost ?? fetchedProfile;

  const open = useCallback(() => {
    window.clearTimeout(timer.current);
    setIsClosing(false);
    setIsOpen(true);
    if (!userFromHost && !requested.current) {
      requested.current = true;
      // A failed profile fetch is non-fatal: the chat falls back to a generic greeting.
      userService.getProfile().then(setFetchedProfile).catch(() => { requested.current = false; });
    }
  }, [userFromHost]);

  const close = useCallback(() => {
    if (prefersReducedMotion()) return setIsOpen(false);
    setIsClosing(true);
    timer.current = window.setTimeout(() => { setIsOpen(false); setIsClosing(false); }, CLOSE_ANIMATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { isOpen, isClosing, open, close, profile };
}
