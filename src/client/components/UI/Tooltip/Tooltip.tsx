import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
export interface TooltipProps {
  label?: React.ReactNode;
  showHelpCursor?: boolean;
}

export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  label,
  showHelpCursor = true,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current && triggerRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const rightAdjust = Math.max(0, tooltipRect.right - windowWidth);
      const leftAdjust = Math.max(0, 0 - tooltipRect.left);
      const bottomAdjust = Math.max(0, tooltipRect.bottom - windowHeight);
      const topAdjust = Math.max(0, 0 - tooltipRect.top);

      tooltipRef.current.style.marginRight = `${rightAdjust}px`;
      tooltipRef.current.style.marginLeft = `${leftAdjust}px`;
      tooltipRef.current.style.marginBottom = `${bottomAdjust}px`;
      tooltipRef.current.style.marginTop = `${topAdjust}px`;
    }
  }, [tooltipRef, triggerRef]);

  const onMouseOverHandler = () => {
    setIsTooltipVisible(true);
  };

  const onMouseOutHandler = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className={classNames('relative', {
        'cursor-help': showHelpCursor,
      })}
      onMouseOut={onMouseOutHandler}
      onMouseOver={onMouseOverHandler}
      ref={triggerRef}
    >
      {children}
      {isTooltipVisible && (
        <div
          className="absolute rounded bg-black bg-opacity-60 px-3 py-1 text-xs text-white transition-all"
          ref={tooltipRef}
        >
          {label}
        </div>
      )}
    </div>
  );
};
