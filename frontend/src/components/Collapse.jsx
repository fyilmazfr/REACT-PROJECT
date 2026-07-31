import { useEffect, useRef, useState } from "react";

export default function Collapse({
  title,
  children,
  isOpen,
  onToggle,
  minExpandedHeight = 0,
  onContentHeightChange,
}) {
  const [openLocal, setOpenLocal] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const open = typeof isOpen === "boolean" ? isOpen : openLocal;

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const nextHeight = contentRef.current.scrollHeight;

    setContentHeight(nextHeight);

    if (onContentHeightChange) {
      onContentHeightChange(nextHeight);
    }
  }, [children, onContentHeightChange, open]);

  const expandedHeight = Math.max(contentHeight, minExpandedHeight);

  function handleToggle() {
    if (onToggle) {
      onToggle();
    } else {
      setOpenLocal((prev) => !prev);
    }
  }

  return (
    <div className="collapse">
      <button
        type="button"
        className="collapse-header"
        onClick={handleToggle}
        aria-expanded={open}
      >
        <h3>{title}</h3>
        <span className={`collapse-icon ${open ? "open" : ""}`}>^</span>
      </button>

      <div
        className={`collapse-panel ${open ? "open" : ""}`}
        style={{ maxHeight: open ? `${expandedHeight}px` : "0px" }}
      >
        <div
          ref={contentRef}
          className="collapse-content"
          style={{ minHeight: open ? `${minExpandedHeight}px` : "0px" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}