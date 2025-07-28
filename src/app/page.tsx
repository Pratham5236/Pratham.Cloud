'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  const codeLines = [
    '$ ssh pratham@homebase',
    '$ docker ps -a',
    '$ flutter build ipa',
    '$ python3 manage.py runserver',
    '$ go build -o server main.go',
    '$ bun build && bun start',
    '✓ AWS EC2 instances running',
    '✓ Production deployment successful',
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-foreground/5 flex items-center justify-center p-4'>
      <div className='max-w-4xl w-full'>
        <div className='bg-foreground/95 rounded-lg shadow-2xl border border-foreground/20 overflow-hidden'>
          <div className='bg-foreground/90 px-4 py-3 flex items-center gap-2 border-b border-background/20'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-red-500'></div>
              <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
              <div className='w-3 h-3 rounded-full bg-green-500'></div>
            </div>
            <div className='flex-1 text-center'>
              <span className='text-background/70 text-sm font-mono'>
                admin@pratham.cloud: ~/portfolio
              </span>
            </div>
          </div>

          <div className='p-6 font-mono text-sm'>
            {codeLines.map((line, index) => (
              <div
                key={index}
                className='mb-2 animate-in slide-in-from-left duration-500'
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <span className='text-background/90'>{line}</span>
              </div>
            ))}

            <div className='mt-6 pt-4 border-t border-background/20'>
              <div className='text-background/60 text-base mb-4'>
                <span className='text-purple-400'>// </span>
                <span>Pratham Gajjar - Software Developer</span>
              </div>
              <div className='text-background/70 text-lg mb-2'>
                <span className='text-orange-400'>let</span>{' '}
                <span className='text-cyan-400'>mut</span>{' '}
                <span className='text-yellow-400'>portfolio</span>{' '}
                <span className='text-background/70'>=</span>{' '}
                <span className='text-green-400'>"under_development"</span>
                <span className='text-background/70'>;</span>
              </div>
              <div className='text-background/50 text-sm italic mb-6'>
                <span className='text-orange-400'>⚡ Blazingly fast</span>
                <span className='text-background/50'> • </span>
                <span className='text-red-400'>Memory safe</span>
                <span className='text-background/50'> • </span>
                <span className='text-cyan-400'>Zero-cost abstractions</span>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-3'>
                  <h3 className='text-cyan-400 font-semibold'>
                    // Core Technologies
                  </h3>
                  <div className='text-background/80 space-y-1'>
                    <div>→ JavaScript/TypeScript & Node.js</div>
                    <div>→ Flutter & Dart</div>
                    <div>→ Python & Go</div>
                    <div>→ PostgreSQL & PocketBase</div>
                    <div>→ AWS & Azure Cloud</div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h3 className='text-yellow-400 font-semibold'>
                    // Specializations
                  </h3>
                  <div className='text-background/80 space-y-1'>
                    <div>→ Backend Architecture</div>
                    <div>→ Real-time Systems</div>
                    <div>→ Linux Server Management</div>
                    <div>→ Mobile Development</div>
                    <div>→ DevOps & Docker</div>
                  </div>
                </div>
              </div>

              <div className='space-y-4 py-6'>
                <h3 className='text-purple-400 font-semibold'>// Tech Stack</h3>
                <div className='flex flex-wrap gap-2 text-xs'>
                  <span className='bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30'>
                    TypeScript
                  </span>
                  <span className='bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30'>
                    Node.js
                  </span>
                  <span className='bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30'>
                    Flutter
                  </span>
                  <span className='bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/30'>
                    Python
                  </span>
                  <span className='bg-orange-500/20 text-orange-300 px-2 py-1 rounded border border-orange-500/30'>
                    AWS
                  </span>
                  <span className='bg-blue-600/20 text-blue-300 px-2 py-1 rounded border border-blue-600/30'>
                    PostgreSQL
                  </span>
                  <span className='bg-gray-500/20 text-gray-300 px-2 py-1 rounded border border-gray-500/30'>
                    Docker
                  </span>
                  <span className='bg-red-500/20 text-red-300 px-2 py-1 rounded border border-red-500/30'>
                    Linux (arch btw :)
                  </span>
                </div>
              </div>

              <div className='space-y-4 py-6 border-t border-background/20'>
                <h3 className='text-green-400 font-semibold'>
                  // Current Status
                </h3>
                <div className='text-background/80 space-y-2'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                    <span>Data engineering with ICD Technologies & Scikiq</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></span>
                    <span>Getting ahead of AI</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-purple-400 rounded-full animate-pulse'></span>
                    <span>Open to collaboration & freelance projects</span>
                  </div>
                </div>
              </div>

              <div className='pt-4 border-t border-background/20'>
                <div className='flex items-center justify-between'>
                  <div className='text-background/60 text-xs space-y-1'>
                    <div>Last updated: {currentTime}</div>
                    <div>Version: 1.0.0-alpha</div>
                    <div>Build: Next.js 15.4.4 • React 19 • TypeScript</div>
                  </div>
                  <a
                    href='https://github.com/Pratham5236'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-background/70 hover:text-background transition-colors group'
                  >
                    <svg
                      className='w-5 h-5 group-hover:scale-110 transition-transform'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                    </svg>
                    <span className='text-sm'>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <div className='text-foreground/60 font-mono text-sm'>
            <span className='text-cyan-400'>pratham</span>
            <span className='text-foreground/40'>.</span>
            <span className='text-yellow-400'>cloud</span>
            <span className='text-foreground/40'>
              {' '}
              - Remaining of the few true software engineers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
