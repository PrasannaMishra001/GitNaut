import React, { useEffect, useMemo, useRef, useState } from 'react';

type RainColumn = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  length: number;
  chars: string[];
};

const charset = '0123456789ABCDEF+-*/<>_{}[]()#@$%';

const createColumn = (id: number, left: number): RainColumn => {
  const length = Math.floor(Math.random() * 12) + 8;
  const chars = Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]);
  const duration = Math.random() * 10 + 12;

  return {
    id,
    left,
    duration,
    delay: -Math.random() * duration,
    size: Math.random() * 6 + 11,
    length,
    chars
  };
};

export const RustyRain: React.FC = () => {
  const [columns, setColumns] = useState<RainColumn[]>([]);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      const columnWidth = 88;
      const count = Math.max(6, Math.floor(window.innerWidth / columnWidth));
      const nextColumns = Array.from({ length: count }, (_, index) =>
        createColumn(index, index * columnWidth)
      );
      setColumns(nextColumns);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    if (!layerRef.current) return;
    const nodes = layerRef.current.querySelectorAll<HTMLElement>('.rusty-rain-column');
    nodes.forEach((node) => {
      const left = node.dataset.left || '0px';
      const duration = node.dataset.duration || '12s';
      const delay = node.dataset.delay || '0s';
      const size = node.dataset.size || '12px';
      node.style.setProperty('--rr-left', left);
      node.style.setProperty('--rr-duration', duration);
      node.style.setProperty('--rr-delay', delay);
      node.style.setProperty('--rr-size', size);
    });
  }, [columns]);

  const renderedColumns = useMemo(
    () =>
      columns.map((column) => (
        <div
          key={column.id}
          className="rusty-rain-column"
          data-left={`${column.left}px`}
          data-duration={`${column.duration}s`}
          data-delay={`${column.delay}s`}
          data-size={`${column.size}px`}
        >
          {column.chars.map((char, index) => (
            <span
              key={`${column.id}-${index}`}
              className={index === 0 ? 'rusty-rain-char rusty-rain-head' : 'rusty-rain-char'}
            >
              {char}
            </span>
          ))}
        </div>
      )),
    [columns]
  );

  return (
    <div ref={layerRef} className="rusty-rain-layer" aria-hidden="true">
      {renderedColumns}
    </div>
  );
};
