import { SkillItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'skill-react-ts',
    name: 'React 19 & TypeScript',
    level: 98,
    category: 'Frontend',
    description: 'Bespoke React architectures with strict typing, custom hooks, atomic state management, and optimized rendering trees.',
    codeSnippet: `// High-Performance Custom Hook Pattern
export function useOptimisticState<T>(initial: T) {
  const [state, setState] = useState<T>(initial);
  const pendingRef = useRef<Map<string, T>>(new Map());

  const applyMutation = useCallback(async (id: string, next: T, action: () => Promise<void>) => {
    pendingRef.current.set(id, next);
    setState(next); // Optimistic UI update
    try {
      await action();
    } catch (err) {
      pendingRef.current.delete(id);
      setState(initial); // Graceful rollback
    }
  }, [initial]);

  return { state, applyMutation };
}`,
    iconName: 'Code2',
    highlights: ['Server Components', 'Custom Hooks', 'Type Safety', 'Zustand & Context']
  },
  {
    id: 'skill-motion-css',
    name: 'Motion & Creative UI',
    level: 95,
    category: 'UI/UX & Motion',
    description: 'Smooth 60fps micro-interactions, layout morphing, physics spring curves, and custom scroll triggers.',
    codeSnippet: `// Spring-Physics Staggered Entrance
const containerVariant = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.08,
      ease: [0.16, 1, 0.3, 1], // Custom bezier curve
    }
  }
};`,
    iconName: 'Sparkles',
    highlights: ['Framer Motion / Motion', 'SVG Path Morphing', 'Canvas Micro-animations', 'Spring Dynamics']
  },
  {
    id: 'skill-performance',
    name: 'Performance & SEO Best Practices',
    level: 99,
    category: 'Performance & SEO',
    description: 'Targeting 100/100 Google Lighthouse scores across Core Web Vitals (LCP < 1.2s, INP < 50ms, CLS = 0).',
    codeSnippet: `// Core Web Vitals & Dynamic Import Optimizer
const HeavyComponent = lazy(() => import('./HeavyCanvasWidget'));

export function OptimizedViewport({ isVisible }: { isVisible: boolean }) {
  return (
    <Suspense fallback={<SkeletonLoader className="h-64 rounded-2xl bg-emerald-500/10" />}>
      {isVisible && <HeavyComponent priority="high" />}
    </Suspense>
  );
}`,
    iconName: 'Zap',
    highlights: ['Core Web Vitals 100/100', 'Schema.org JSON-LD', 'Critical CSS Splitting', 'Zero-CLS Layouts']
  },
  {
    id: 'skill-node-express',
    name: 'Node.js & Express API Architecture',
    level: 94,
    category: 'Backend',
    description: 'Robust serverless & containerized Express backend routes, rate-limiting, secure headers, and payment webhooks.',
    codeSnippet: `// Resilient Express API Middleware & Rate Limiter
import express from 'express';

export const apiRouter = express.Router();

apiRouter.post('/api/contact-draft', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required contact parameters' });
  }
  // Sanitize and return draft payload
  res.json({ status: 'success', draftId: Date.now().toString(36) });
});`,
    iconName: 'Server',
    highlights: ['RESTful & GraphQL', 'Express Proxy Security', 'Webhooks & OAuth', 'Caching Layers']
  },
  {
    id: 'skill-tailwind-css',
    name: 'Tailwind CSS v4 & Theme System',
    level: 97,
    category: 'UI/UX & Motion',
    description: 'Modern CSS variable themes, responsive grid systems, dark mode palettes, and sleek glassmorphism.',
    codeSnippet: `/* Tailwind v4 CSS Custom Property Theming */
@theme {
  --color-brand-primary: #18CF80;
  --color-brand-secondary: #EA941B;
  --font-heading: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Poppins', sans-serif;
}`,
    iconName: 'Palette',
    highlights: ['Tailwind CSS v4', 'Dark Mode Sync', 'CSS Variables', 'Container Queries']
  },
  {
    id: 'skill-webgl-three',
    name: 'Canvas API & WebGL Graphics',
    level: 90,
    category: 'Frontend',
    description: 'Creating immersive 2D/3D web experiences using HTML5 Canvas, Matter.js physics, and Three.js shaders.',
    codeSnippet: `// HTML5 Particle Proximity Mesh Render Loop
function renderConstellation(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (dist < 100) {
        ctx.strokeStyle = \`rgba(24, 207, 128, \${1 - dist / 100})\`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}`,
    iconName: 'Cpu',
    highlights: ['HTML5 Canvas 2D', 'Three.js & WebGL', 'Matter.js Physics', 'Realtime Visualizers']
  }
];
