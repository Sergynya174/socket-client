import { useRef, useEffect } from "react";

const useChatScroll = () => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight;
    }
  }, [ref.current?.scrollHeight]);
  return ref;
};

export default useChatScroll;
