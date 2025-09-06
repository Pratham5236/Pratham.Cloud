import { useEffect, useState } from 'react';

export const MatrixRain = () => {
  const [characters, setCharacters] = useState<
    Array<{ id: number; char: string; left: number; delay: number }>
  >([]);

  useEffect(() => {
    const matrixChars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newCharacters = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
    }));
    setCharacters(newCharacters);
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none overflow-hidden opacity-20'>
      {characters.map((char) => (
        <div
          key={char.id}
          className='matrix-char text-green-400 absolute text-xs'
          style={{
            left: `${char.left}%`,
            animationDelay: `${char.delay}s`,
            animationDuration: `${10 + Math.random() * 5}s`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

export const ScanLine = () => <div className='scan-line' />;

export const TerminalTyper = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <span className='text-green-400'>
      {displayText}
      <span className='animate-pulse'>|</span>
    </span>
  );
};
