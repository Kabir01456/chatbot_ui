import { useCallback, useEffect, useRef, useState } from 'react';
import { userService } from '../services/userService';
import type { UserProfile } from '../types/user';
import { prefersReducedMotion } from '../utils/chatbotUtils';

const CLOSE_ANIMATION_MS = 300;

export function useChatbot(userFromHost?: UserProfile | null) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fetchedProfile, setFetchedProfile] = useState<UserProfile | null>(null);
  const requested = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const animating = useRef(false);

  const profile = userFromHost ?? fetchedProfile;

  const open = useCallback(() => {
    if (animating.current) return;
    window.clearTimeout(timer.current);
    setIsClosing(false);
    setIsOpen(true);
    if (!userFromHost && !requested.current) {
      requested.current = true;
      userService.getProfile().then(setFetchedProfile).catch(() => { requested.current = false; });
    }
  }, [userFromHost]);

  const close = useCallback(() => {
    if (animating.current) return;
    if (prefersReducedMotion()) return setIsOpen(false);
    animating.current = true;
    setIsClosing(true);
    timer.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      animating.current = false;
    }, CLOSE_ANIMATION_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { isOpen, isClosing, open, close, profile };
}
