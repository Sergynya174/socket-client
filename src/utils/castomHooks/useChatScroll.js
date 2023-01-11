import { useRef, useEffect } from "react";

const useChatScroll = (state) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight;
    }
  }, [state]);
  return ref;
};

export default useChatScroll;
