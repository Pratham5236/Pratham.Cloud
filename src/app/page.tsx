'use client';

import { useEffect, useState, useRef } from 'react';
import {
  ASCII_ART,
  COMMANDS_INFO,
  FUNNY_COMMANDS,
  PROJECT_CATEGORIES,
  STATUS_ICONS,
} from '@/utils/constants';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'live' | 'development' | 'archived';
  url?: string;
  category: 'web' | 'mobile' | 'backend' | 'crypto' | 'system';
  highlights: string[];
  stats?: string;
}

interface TerminalLine {
  id: string;
  content: string;
  type: 'command' | 'output' | 'system' | 'error' | 'success';
  timestamp: Date;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 'mandir-ae',
      title: 'BAPS Hindu Mandir - Public Website',
      description:
        'Serving millions of visitors globally with real-time updates',
      tech: ['Next.js', 'Firebase', 'TypeScript', 'PHP', 'Elasticsearch'],
      status: 'live',
      url: 'https://mandir.ae',
      category: 'web',
      highlights: [
        'Millions of visitors',
        'Real-time updates',
        'Multi-language support',
      ],
      stats: '🌍 Global reach • 🚀 99.9% uptime',
    },
    {
      id: 'mandir-ops',
      title: 'Mandir Operations Dashboard',
      description: 'Internal operations management system for Abu Dhabi Mandir',
      tech: ['Next.js', 'PHP', 'PostgreSQL', 'Azure'],
      status: 'live',
      url: 'https://operations.mandir.ae',
      category: 'web',
      highlights: [
        'Daily registrations',
        'Entry/Exit system',
        'Weather updates',
        'Broadcast messaging',
      ],
      stats: '📊 Real-time ops • 🔐 Secure access',
    },
    {
      id: 'krypsm',
      title: 'Krypsm - Crypto Trading Platform',
      description:
        'FIU-registered cryptocurrency trading platform with mobile apps',
      tech: ['Flutter', 'PocketBase', 'JavaScript', 'AWS EC2'],
      status: 'live',
      url: 'https://krypsm.com',
      category: 'crypto',
      highlights: [
        'FIU registered (28th in India)',
        'Real-time trading',
        'Mobile apps on both stores',
      ],
      stats: '💰 Live trading • 📱 Cross-platform',
    },
    {
      id: 'bits-events',
      title: 'BITS Dubai Events Ecosystem',
      description: 'Multi-site platform for university events management',
      tech: ['Next.js', 'PocketBase', 'Ubuntu', 'Nginx'],
      status: 'live',
      category: 'web',
      highlights: [
        '6000+ students registered',
        'Dynamic event creation',
        'Real-time management',
      ],
      stats: '🎓 6000+ users • 🏆 Multi-event platform',
    },
    {
      id: 'flutter-tracker',
      title: 'Live Tracking System',
      description: 'Real-time employee location tracking with WebSockets',
      tech: ['Flutter', 'WebSockets', 'Google Maps', 'Node.js'],
      status: 'archived',
      category: 'mobile',
      highlights: [
        'Real-time tracking',
        'Custom markers',
        'WebSocket integration',
      ],
      stats: '📍 Real-time • 🗺️ Google Maps',
    },
    {
      id: 'voip-server',
      title: 'Custom VoIP Server',
      description: 'Private voice communication server built on Linux',
      tech: ['Linux', 'SIP', 'Network Engineering', 'Security'],
      status: 'development',
      category: 'system',
      highlights: ['Secure calls', 'Custom protocol', 'Linux optimization'],
      stats: '🔒 Private • 📞 Voice over IP',
    },
  ];

  const commands = {
    help: `Available commands:`,
    whoami: 'Pratham Gajjar - Full Stack Developer & Cloud Architect',
    pwd: '/home/pratham/portfolio',
    ls: 'projects/ skills/ contact/ resume.pdf about.md README.md package.json',
  };

  const showHelp = () => {
    addToHistory('Available commands:', 'output');
    addToHistory(
      '┌─────────────────────────────────────────────────────────────┐',
      'output'
    );
    addToHistory(
      '│ 🎯 Navigation & Info                                        │',
      'output'
    );
    addToHistory(
      '│   help        - Show this help menu                        │',
      'output'
    );
    addToHistory(
      '│   clear       - Clear terminal screen                      │',
      'output'
    );
    addToHistory(
      '│   whoami      - Display user information                   │',
      'output'
    );
    addToHistory(
      '│   about       - Extended user information                  │',
      'output'
    );
    addToHistory(
      '│   infra       - Show infrastructure & hosting details      │',
      'output'
    );
    addToHistory(
      '│   neofetch    - Show system information with ASCII art     │',
      'output'
    );
    addToHistory(
      '│   pwd         - Print working directory                    │',
      'output'
    );
    addToHistory(
      '│   ls          - List directory contents                    │',
      'output'
    );
    addToHistory(
      '│                                                             │',
      'output'
    );
    addToHistory(
      '│ 📁 Portfolio & Content                                      │',
      'output'
    );
    addToHistory(
      '│   projects    - Show project showcase                      │',
      'output'
    );
    addToHistory(
      '│   skills      - Display technical skills                   │',
      'output'
    );
    addToHistory(
      '│   contact     - Show contact information                   │',
      'output'
    );
    addToHistory(
      '│   resume      - Download resume                            │',
      'output'
    );
    addToHistory(
      '│                                                             │',
      'output'
    );
    addToHistory(
      '│ 🎨 ASCII Art & Visual                                       │',
      'output'
    );
    addToHistory(
      '│   ascii       - Show ASCII art options                     │',
      'output'
    );
    addToHistory(
      '│   ascii logo  - Display portfolio logo                     │',
      'output'
    );
    addToHistory(
      '│   ascii github- GitHub logo art                            │',
      'output'
    );
    addToHistory(
      '│   ascii computer - Computer ASCII art                      │',
      'output'
    );
    addToHistory(
      '│   ascii server- Server rack art                            │',
      'output'
    );
    addToHistory(
      '│                                                             │',
      'output'
    );
    addToHistory(
      '│ 🎮 System & Fun Commands                                    │',
      'output'
    );
    addToHistory(
      '│   htop        - Show system processes                      │',
      'output'
    );
    addToHistory(
      '│   matrix      - Enter the Matrix                           │',
      'output'
    );
    addToHistory(
      '│   coffee      - Brew some coffee                           │',
      'output'
    );
    addToHistory(
      '│   cowsay      - Make the cow say something                 │',
      'output'
    );
    addToHistory(
      '│   sl          - Steam locomotive                           │',
      'output'
    );
    addToHistory(
      '│   fortune     - Get a programming quote                    │',
      'output'
    );
    addToHistory(
      '│   joke        - Random programming joke                    │',
      'output'
    );
    addToHistory(
      '│   date        - Show current date and time                 │',
      'output'
    );
    addToHistory(
      '│   uptime      - System uptime information                  │',
      'output'
    );
    addToHistory(
      '│   weather     - Check the weather in Cloud City            │',
      'output'
    );
    addToHistory(
      '│                                                             │',
      'output'
    );
    addToHistory(
      '│ 💻 Development Tools (try them!)                            │',
      'output'
    );
    addToHistory(
      '│   apt         - Package management info                    │',
      'output'
    );
    addToHistory(
      '│   git         - Version control info                       │',
      'output'
    );
    addToHistory(
      '│   vim         - Text editor info                           │',
      'output'
    );
    addToHistory(
      '│   docker      - Containerization info                      │',
      'output'
    );
    addToHistory(
      '│   ssh         - Secure shell info                          │',
      'output'
    );
    addToHistory(
      '│   curl        - Data transfer tool info                    │',
      'output'
    );
    addToHistory(
      '│   wget        - File download tool info                    │',
      'output'
    );
    addToHistory(
      '│                                                             │',
      'output'
    );
    addToHistory(
      '│ 🤡 Easter Eggs (try these for fun!)                        │',
      'output'
    );
    addToHistory(
      '│   sudo rm -rf /                                            │',
      'output'
    );
    addToHistory(
      '│   hack nasa                                                │',
      'output'
    );
    addToHistory(
      '│   sudo make me a sandwich                                  │',
      'output'
    );
    addToHistory(
      '│   fork bomb                                                │',
      'output'
    );
    addToHistory(
      '└─────────────────────────────────────────────────────────────┘',
      'output'
    );
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Initialize terminal with welcome message
    const welcomeLines: TerminalLine[] = [
      {
        id: '1',
        content:
          '╔══════════════════════════════════════════════════════════════╗',
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '2',
        content:
          "║                🚀 Welcome to Pratham's Terminal Portfolio    ║",
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '3',
        content:
          '║                 Building the future, one commit at a time   ║',
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '4',
        content:
          '╚══════════════════════════════════════════════════════════════╝',
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '5',
        content: '',
        type: 'output',
        timestamp: new Date(),
      },
      {
        id: '6',
        content:
          'Type "help" to see available commands or try some fun ones like "matrix" or "coffee"!',
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '6.5',
        content:
          '🏠 Proudly hosted on custom home infrastructure with Cloudflare protection - type "infra" to learn more!',
        type: 'system',
        timestamp: new Date(),
      },
      {
        id: '7',
        content: '',
        type: 'output',
        timestamp: new Date(),
      },
    ];

    setHistory(welcomeLines);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addToHistory = (content: string, type: TerminalLine['type']) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
    };
    setHistory((prev: TerminalLine[]) => [...prev, newLine]);
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    addToHistory(`pratham@cloud:~$ ${cmd}`, 'command');

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Check for funny commands first
    const funnyCommand = FUNNY_COMMANDS.find((fc) => fc.cmd === command);
    if (funnyCommand) {
      addToHistory(funnyCommand.response, 'success');
      return;
    }

    // Check for development tools commands
    if (COMMANDS_INFO[command as keyof typeof COMMANDS_INFO]) {
      addToHistory(`💻 ${command.toUpperCase()}:`, 'output');
      addToHistory(
        `📝 ${COMMANDS_INFO[command as keyof typeof COMMANDS_INFO]}`,
        'output'
      );
      addToHistory('', 'output');
      addToHistory(
        '💡 This is a development tool commonly used in Linux/Unix environments.',
        'system'
      );
      return;
    }

    // Handle cowsay with optional text
    if (command.startsWith('cowsay')) {
      const text = cmd.slice(6).trim() || 'hello';
      addToHistory(' _______', 'output');
      addToHistory(`< ${text} >`, 'output');
      addToHistory(' -------', 'output');
      addToHistory('        \\   ^__^', 'output');
      addToHistory('         \\  (oo)\\_______', 'output');
      addToHistory('            (__)\\       )\\/\\', 'output');
      addToHistory('                ||----w |', 'output');
      addToHistory('                ||     ||', 'output');
      return;
    }

    // Fun Easter eggs
    if (command === 'matrix') {
      addToHistory('🔴 Taking the red pill...', 'system');
      addToHistory('Welcome to the Matrix, Neo.', 'success');
      addToHistory('01001000 01100101 01101100 01101100 01101111', 'output');
      addToHistory('Wake up...', 'system');
      return;
    }

    if (command === 'coffee') {
      addToHistory('☕ Brewing some coffee...', 'system');
      addToHistory('      (  )   (   )  )', 'output');
      addToHistory('       ) (   )  (  (', 'output');
      addToHistory('       ( )  (    ) )', 'output');
      addToHistory('       _____________', 'output');
      addToHistory('      <_____________> ___', 'output');
      addToHistory('      |             |/ _ \\', 'output');
      addToHistory('      |               | | |', 'output');
      addToHistory('      |               |_| |', 'output');
      addToHistory('   ___|             |\\___/', 'output');
      addToHistory('  /    \\___________/    \\', 'output');
      addToHistory('  \\_____________________/', 'output');
      addToHistory('', 'output');
      addToHistory('💡 Caffeine levels restored!', 'success');
      return;
    }

    switch (command) {
      case 'help':
        showHelp();
        addToHistory('', 'output');
        addToHistory(
          '🎯 Pro tip: Use arrow keys to navigate command history!',
          'system'
        );
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'whoami':
        addToHistory(commands.whoami, 'output');
        addToHistory('🔥 Passionate about building scalable systems', 'output');
        addToHistory(
          '🌍 Currently working with ICD Technologies & Scikiq',
          'output'
        );
        break;
      case 'pwd':
        addToHistory(commands.pwd, 'output');
        break;
      case 'ls':
        addToHistory('total 42', 'output');
        addToHistory(
          'drwxr-xr-x  8 pratham pratham  4096 Sep  6 2025 .',
          'output'
        );
        addToHistory(
          'drwxr-xr-x  3 root    root     4096 Sep  1 2025 ..',
          'output'
        );
        addToHistory(
          'drwxr-xr-x  2 pratham pratham  4096 Sep  6 2025 projects/',
          'output'
        );
        addToHistory(
          'drwxr-xr-x  2 pratham pratham  4096 Sep  6 2025 skills/',
          'output'
        );
        addToHistory(
          'drwxr-xr-x  2 pratham pratham  4096 Sep  6 2025 contact/',
          'output'
        );
        addToHistory(
          '-rw-r--r--  1 pratham pratham 15420 Sep  6 2025 resume.pdf',
          'output'
        );
        addToHistory(
          '-rw-r--r--  1 pratham pratham  2048 Sep  6 2025 about.md',
          'output'
        );
        break;
      case 'projects':
        setShowProjects(true);
        addToHistory('📂 Opening projects directory...', 'system');
        addToHistory('✨ Loading awesome projects...', 'system');
        break;
      case 'skills':
        addToHistory('💻 Core Technologies & Skills:', 'output');
        addToHistory('════════════════════════════════════════', 'output');
        addToHistory(
          '🔸 Languages: JavaScript/TypeScript, Dart, Python, Go',
          'output'
        );
        addToHistory('🔸 Frontend: Next.js, React.js, Flutter', 'output');
        addToHistory('🔸 Backend: Node.js, Express.js, PocketBase', 'output');
        addToHistory('🔸 Databases: PostgreSQL, MariaDB, SQLite', 'output');
        addToHistory('🔸 Cloud: AWS (EC2, RDS, S3), Azure, Firebase', 'output');
        addToHistory('🔸 DevOps: Docker, Linux, Nginx, CI/CD', 'output');
        break;
      case 'contact':
        addToHistory('📧 Contact Information:', 'output');
        addToHistory('════════════════════════════════', 'output');
        addToHistory('📧 Email: prathamjgajjar@gmail.com', 'output');
        addToHistory(
          '🔗 LinkedIn: https://linkedin.com/in/prathamgajjar/',
          'output'
        );
        addToHistory('💼 GitHub: https://github.com/Pratham5236', 'output');
        addToHistory('🌐 Portfolio: https://pratham.cloud', 'output');
        break;
      case 'resume':
        addToHistory('📄 Downloading resume...', 'system');
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/Pratham Gajjar - Resume.png';
          link.download = 'Pratham_Gajjar_Resume.png';
          link.click();
          addToHistory('✅ Resume downloaded successfully!', 'success');
        }, 1000);
        break;
      case 'neofetch':
        // Display ASCII art logo
        ASCII_ART.logo.split('\n').forEach((line) => {
          if (line.trim()) addToHistory(line, 'success');
        });
        addToHistory('', 'output');
        addToHistory('🔥 pratham@cloud.terminal', 'success');
        addToHistory('─────────────────────────────────', 'output');
        addToHistory('🖥️  OS: Ubuntu 22.04 LTS (Terminal Edition)', 'output');
        addToHistory('🏠 Host: Cloud Portfolio Server', 'output');
        addToHistory('⚡ Kernel: Next.js 15.4.4', 'output');
        addToHistory('🐚 Shell: Terminal Portfolio v1.0', 'output');
        addToHistory('🧠 CPU: TypeScript Engine (8 cores)', 'output');
        addToHistory('💾 Memory: 16GB Creativity RAM', 'output');
        addToHistory('🎮 GPU: Imagination Processor', 'output');
        addToHistory('⏰ Uptime: Building since 2020', 'output');
        addToHistory('☕ Coffee Level: 99%', 'output');
        addToHistory('🚀 Status: Ready to build amazing things!', 'output');
        addToHistory('', 'output');
        addToHistory('🏗️  Infrastructure Flex:', 'system');
        addToHistory('🏠 Hosted on: Custom Home Server Setup', 'output');
        addToHistory(
          '🌐 Proxy: Cloudflare Tunnels + DDoS Protection',
          'output'
        );
        addToHistory(
          '🛡️  Security: Enterprise-grade home infrastructure',
          'output'
        );
        addToHistory(
          '⚡ Performance: Self-managed cloud architecture',
          'output'
        );
        break;
      case 'ascii':
        addToHistory('🎨 Available ASCII Art:', 'output');
        addToHistory('─────────────────────────', 'output');
        addToHistory('• ascii logo    - Show portfolio logo', 'output');
        addToHistory('• ascii github  - GitHub logo', 'output');
        addToHistory('• ascii computer- Computer art', 'output');
        addToHistory('• ascii server  - Server rack art', 'output');
        break;
      case 'ascii logo':
        ASCII_ART.logo.split('\n').forEach((line) => {
          if (line.trim()) addToHistory(line, 'success');
        });
        break;
      case 'ascii github':
        ASCII_ART.github.split('\n').forEach((line) => {
          if (line.trim()) addToHistory(line, 'output');
        });
        addToHistory(
          'GitHub: Where code lives and dreams come true! 🚀',
          'system'
        );
        break;
      case 'ascii computer':
        ASCII_ART.computer.split('\n').forEach((line) => {
          if (line.trim()) addToHistory(line, 'output');
        });
        addToHistory('The classic computer - where it all began! 💻', 'system');
        break;
      case 'ascii server':
        ASCII_ART.server.split('\n').forEach((line) => {
          if (line.trim()) addToHistory(line, 'output');
        });
        addToHistory('Server rack - powering the digital world! ⚡', 'system');
        break;
      case 'htop':
        addToHistory(
          'Tasks: 42, 6 running, 36 sleeping, 0 stopped, 0 zombie',
          'output'
        );
        addToHistory(
          'CPU%: [████████████████████] 85.2% (coding mode)',
          'output'
        );
        addToHistory(
          'Mem: [███████████         ] 68.4% (ideas loaded)',
          'output'
        );
        addToHistory('', 'output');
        addToHistory(
          '  PID USER      PRI  NI  VIRT   RES   SHR S  %CPU %MEM     TIME+ COMMAND',
          'output'
        );
        addToHistory(
          ' 1337 pratham    20   0  512M  128M   64M R  25.3  12.8   1:42.33 next-dev',
          'output'
        );
        addToHistory(
          ' 2048 pratham    20   0  256M   64M   32M S  15.7   6.4   0:58.21 typescript',
          'output'
        );
        break;
      case 'fortune':
        const fortunes = [
          '💡 "Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '🚀 "The best way to predict the future is to implement it." - Alan Kay',
          '⚡ "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
          '🎯 "First, solve the problem. Then, write the code." - John Johnson',
          '🔥 "Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
        ];
        const randomFortune =
          fortunes[Math.floor(Math.random() * fortunes.length)];
        addToHistory(randomFortune, 'output');
        break;
      case 'date':
        addToHistory(new Date().toString(), 'output');
        break;
      case 'uptime':
        addToHistory(
          'System has been running for: 1337 days, 4 hours, 20 minutes',
          'output'
        );
        addToHistory('Load average: 0.42, 0.69, 1.33', 'output');
        break;
      case 'weather':
        addToHistory('🌤️  Current weather in Cloud City:', 'output');
        addToHistory('Temperature: 23°C (Perfect coding weather!)', 'output');
        addToHistory(
          'Conditions: Partly cloudy with a chance of commits',
          'output'
        );
        addToHistory('Humidity: 42% (The answer to everything)', 'output');
        break;
      case 'whoami --extended':
      case 'about':
        addToHistory('👨‍💻 Pratham Gajjar - The Code Whisperer', 'output');
        addToHistory('', 'output');
        addToHistory(
          '🎯 Mission: Building scalable solutions that make a difference',
          'output'
        );
        addToHistory(
          '🔥 Passion: Turning coffee into code since 2020',
          'output'
        );
        addToHistory(
          '🌟 Specialties: Full-stack development, cloud architecture, system design',
          'output'
        );
        addToHistory(
          '🎮 Fun fact: Can debug code faster than brewing coffee!',
          'output'
        );
        addToHistory('', 'output');
        addToHistory(
          '💼 Currently empowering businesses at ICD Technologies & Scikiq',
          'output'
        );
        break;
      case 'infra':
      case 'infrastructure':
        addToHistory('🏗️  Infrastructure Architecture Showcase', 'system');
        addToHistory('═══════════════════════════════════════════', 'output');
        addToHistory('', 'output');
        addToHistory('🏠 Home Server Setup:', 'success');
        addToHistory('   • Custom built server infrastructure', 'output');
        addToHistory('   • Self-managed cloud architecture', 'output');
        addToHistory('   • 24/7 uptime monitoring & maintenance', 'output');
        addToHistory('', 'output');
        addToHistory('🌐 Cloudflare Integration:', 'success');
        addToHistory(
          '   • Cloudflare Tunnels for secure connections',
          'output'
        );
        addToHistory('   • Enterprise DDoS protection', 'output');
        addToHistory('   • Global CDN for optimal performance', 'output');
        addToHistory('   • Zero-downtime deployments', 'output');
        addToHistory('', 'output');
        addToHistory('🛡️  Security & Performance:', 'success');
        addToHistory('   • SSL/TLS encryption end-to-end', 'output');
        addToHistory('   • Rate limiting & bot protection', 'output');
        addToHistory('   • Real-time threat monitoring', 'output');
        addToHistory('   • Automated backup systems', 'output');
        addToHistory('', 'output');
        addToHistory('💡 Why Host at Home?', 'system');
        addToHistory('   • Full control over infrastructure', 'output');
        addToHistory('   • Cost-effective scaling', 'output');
        addToHistory('   • Learning & experimentation freedom', 'output');
        addToHistory('   • Ultimate flexibility & customization', 'output');
        addToHistory('', 'output');
        addToHistory(
          '🔥 This portfolio is living proof of enterprise-grade',
          'output'
        );
        addToHistory('   home infrastructure capabilities!', 'output');
        break;
      case 'joke':
        const jokes = [
          '🤖 Why do programmers prefer dark mode? Because light attracts bugs!',
          '☕ How do you generate a random string? Put a web designer in front of VIM.',
          '🐛 99 little bugs in the code, 99 little bugs. Take one down, patch it around, 117 little bugs in the code.',
          "💻 Why do Java developers wear glasses? Because they can't C#!",
          '🔄 A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"',
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        addToHistory(randomJoke, 'output');
        break;
      default:
        // Check for close matches or suggestions
        const allCommands = [
          'help',
          'clear',
          'projects',
          'skills',
          'contact',
          'resume',
          'whoami',
          'ls',
          'neofetch',
          'htop',
          'matrix',
          'coffee',
          'cowsay',
          'sl',
          'ascii',
          'fortune',
          'date',
          'uptime',
          'weather',
          'about',
          'infra',
          'infrastructure',
          'joke',
        ];
        const suggestions = allCommands.filter(
          (cmd) =>
            cmd.includes(command) ||
            command.includes(cmd) ||
            Math.abs(cmd.length - command.length) <= 2
        );

        addToHistory(`❌ Command not found: ${cmd}`, 'error');
        if (suggestions.length > 0) {
          addToHistory(
            `💡 Did you mean: ${suggestions.slice(0, 3).join(', ')}?`,
            'system'
          );
        }
        addToHistory(
          '🎯 Type "help" for available commands or try some Easter eggs!',
          'system'
        );
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const statusColors = {
      live: 'bg-green-500/20 text-green-300 border-green-500/30',
      development: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      archived: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };

    return (
      <div className='bg-background/90 border border-foreground/20 rounded-lg p-6 hover:border-foreground/40 transition-all duration-300 transform hover:scale-105 terminal-glow hover-glow'>
        <div className='flex justify-between items-start mb-4'>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>
              {PROJECT_CATEGORIES[project.category]}
            </span>
            <h3 className='text-lg font-semibold text-foreground text-glow'>
              {project.title}
            </h3>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-sm'>{STATUS_ICONS[project.status]}</span>
            <span
              className={`px-2 py-1 rounded text-xs border ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        <p className='text-foreground/70 mb-4'>{project.description}</p>

        <div className='flex flex-wrap gap-2 mb-4'>
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className='bg-foreground/10 text-foreground/80 px-2 py-1 rounded text-xs'
            >
              {tech}
            </span>
          ))}
        </div>

        <div className='space-y-2 mb-4'>
          {project.highlights.map((highlight, index) => (
            <div key={index} className='text-sm text-foreground/60'>
              → {highlight}
            </div>
          ))}
        </div>

        {project.stats && (
          <div className='text-xs text-foreground/50 mb-4'>{project.stats}</div>
        )}

        <div className='flex gap-2'>
          {project.url && (
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1 rounded text-sm border border-blue-500/30 transition-colors'
            >
              Visit Site
            </a>
          )}
          <button
            onClick={() => setSelectedProject(project)}
            className='bg-foreground/20 text-foreground hover:bg-foreground/30 px-3 py-1 rounded text-sm border border-foreground/30 transition-colors'
          >
            Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-foreground/5 flex items-center justify-center p-2 terminal-screen'>
      {/* Matrix Rain Effect */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden opacity-20'>
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className='matrix-char absolute text-xs font-mono'
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            {
              ['0', '1', 'ア', 'イ', 'ウ', '◆', '●', '▲'][
                Math.floor(Math.random() * 8)
              ]
            }
          </div>
        ))}
      </div>

      {/* Scan Line Effect */}
      <div className='scan-line' />

      <div className='max-w-7xl w-full relative z-10'>
        <div className='bg-[var(--background)]/95 rounded-lg shadow-2xl border border-[var(--border)] overflow-hidden terminal-glow backdrop-blur-sm'>
          {/* Terminal Header */}
          <div className='bg-[var(--border)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border)]'>
            <div className='flex gap-1.5'>
              <div className='w-3 h-3 rounded-full bg-[var(--accent-red)] hover:bg-[var(--accent-red)]/80 transition-colors cursor-pointer shadow-lg'></div>
              <div className='w-3 h-3 rounded-full bg-[var(--accent-yellow)] hover:bg-[var(--accent-yellow)]/80 transition-colors cursor-pointer shadow-lg'></div>
              <div className='w-3 h-3 rounded-full bg-[var(--accent-green)] hover:bg-[var(--accent-green)]/80 transition-colors cursor-pointer shadow-lg'></div>
            </div>
            <div className='flex-1 text-center'>
              <span className='gradient-text text-sm font-mono font-bold'>
                pratham@cloud.terminal: ~/portfolio
              </span>
            </div>
            <div className='text-background/50 text-xs'>{currentTime}</div>
          </div>

          {/* Terminal Content */}
          <div
            className='h-[600px] p-4 font-mono text-sm overflow-y-auto'
            ref={terminalRef}
          >
            {history.map((line) => (
              <div
                key={line.id}
                className={`mb-1 ${
                  line.type === 'command'
                    ? 'command-input'
                    : line.type === 'error'
                    ? 'command-error'
                    : line.type === 'success'
                    ? 'command-success'
                    : line.type === 'system'
                    ? 'command-system'
                    : 'command-output'
                }`}
              >
                {line.content}
              </div>
            ))}

            {/* Input Line */}
            <div className='flex items-center'>
              <span className='command-input mr-2'>pratham@cloud:~$</span>
              <input
                ref={inputRef}
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className='bg-transparent border-none outline-none command-input flex-1 font-mono'
                placeholder='Type a command...'
                autoFocus
              />
              <span className='w-2 h-4 bg-[var(--accent-purple)] animate-pulse ml-1 cursor'></span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='bg-foreground/80 px-4 py-3 border-t border-background/20'>
            <div className='flex flex-wrap gap-2 text-xs'>
              {[
                'help',
                'projects',
                'skills',
                'contact',
                'resume',
                'neofetch',
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className='bg-background/20 hover:bg-background/30 text-background px-2 py-1 rounded transition-colors'
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {showProjects && (
          <div className='mt-8 space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-foreground flex items-center gap-2 text-glow'>
                <span className='text-cyan-400'>~/projects</span>
                <span className='text-foreground/50'>$</span>
                <span className='text-yellow-400'>ls -la</span>
              </h2>
              <button
                onClick={() => setShowProjects(false)}
                className='text-foreground/60 hover:text-foreground transition-colors'
              >
                ✕ Close
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-[var(--background)] border-2 border-[var(--accent-blue)] rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto terminal-glow shadow-2xl'>
              <div className='p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-lg'>
                      {PROJECT_CATEGORIES[selectedProject.category]}
                    </span>
                    <h2 className='text-xl font-bold gradient-text'>
                      {selectedProject.title}
                    </h2>
                    <span className='text-sm'>
                      {STATUS_ICONS[selectedProject.status]}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className='command-error hover:bg-[var(--accent-red)]/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110'
                  >
                    ✕
                  </button>
                </div>

                <p className='command-output mb-4 leading-relaxed'>
                  {selectedProject.description}
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <h3 className='command-success font-semibold mb-2 text-glow'>
                      💻 Technologies
                    </h3>
                    <div className='flex flex-wrap gap-1'>
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className='bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30 text-[var(--accent-blue)] px-2 py-1 rounded text-xs hover:bg-[var(--accent-blue)]/30 transition-colors'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='command-system font-semibold mb-2 text-glow'>
                      ✨ Highlights
                    </h3>
                    <ul className='space-y-1'>
                      {selectedProject.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className='command-output text-sm flex items-start gap-2'
                        >
                          <span className='command-success'>•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedProject.stats && (
                  <div className='mb-4 p-3 bg-[var(--accent-purple)]/10 border border-[var(--accent-purple)]/20 rounded'>
                    <span className='command-system text-sm'>
                      {selectedProject.stats}
                    </span>
                  </div>
                )}

                <div className='flex gap-2'>
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='terminal-button px-4 py-2 rounded text-sm font-medium'
                    >
                      🚀 Visit Project
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className='bg-[var(--border)] hover:bg-[var(--accent-red)]/20 text-[var(--foreground)] px-4 py-2 rounded text-sm transition-colors'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className='mt-8 text-center'>
          <div className='command-output font-mono text-sm'>
            <span className='command-input text-glow'>pratham</span>
            <span className='command-output'>.</span>
            <span className='command-system text-glow'>cloud</span>
            <span className='text-foreground/40'>
              {' '}
              - Building the future, one commit at a time
            </span>
          </div>
          <div className='text-foreground/40 text-xs mt-2'>
            💻 Terminal Portfolio v1.0 | Made with Next.js & TypeScript | ⚡
            Powered by creativity
          </div>
        </div>
      </div>
    </div>
  );
}
