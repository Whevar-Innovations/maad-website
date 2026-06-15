# GSAP in React — Animation Expert Skill

Use this skill when implementing or refactoring animations using GSAP (GreenSock Animation Platform) within a React environment. This skill focuses on performance, proper lifecycle management, and React-specific best practices using the `@gsap/react` package.

## 1. Core Mandate: `useGSAP()`

**ALWAYS** use the `useGSAP()` hook from the `@gsap/react` package instead of `useEffect()` or `useLayoutEffect()` for animations. 

### Why?
- **Automatic Cleanup:** Kills all animations and ScrollTriggers created within the hook when the component unmounts.
- **Context Awareness:** Automatically handles GSAP Context, preventing memory leaks and double-execution bugs in React 18+ Strict Mode.
- **Performance:** Highly optimized for the React render cycle.

## 2. Key Patterns

### Scoping with `scope`
Always use the `scope` property to limit GSAP's selector engine to the component's root element. This avoids accidental global selection and improves performance.

```tsx
const container = useRef<HTMLDivElement>(null);

useGSAP(() => {
  // Target ".box" ONLY inside the container ref
  gsap.to(".box", { x: 100 });
}, { scope: container });

return (
  <div ref={container}>
    <div className="box">I am scoped</div>
  </div>
);
```

### Dependency Tracking
Just like `useEffect`, `useGSAP` accepts a dependency array. If you need to re-run animations based on state changes, include them here.

```tsx
useGSAP(() => {
  gsap.to(".box", { rotation: isRotated ? 360 : 0 });
}, [isRotated]);
```

### ScrollTrigger Initialization
When using ScrollTrigger, ensure it's registered globally (usually in the entry file or a specialized hook).

```tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

## 3. Best Practices

1. **Avoid `node_modules` selectors:** Use `refs` or scoped class selectors. Never use global ID selectors (e.g., `#logo`) as they break component reusability.
2. **Timeline Management:** Create timelines inside `useGSAP` for complex sequences.
3. **Smooth Scrolling:** When using Lenis, sync it with ScrollTrigger using `lenis.on('scroll', ScrollTrigger.update)`.
4. **Cleanup:** If you create animations *outside* of the `useGSAP` scope (e.g., in an event handler), you must manually manage their lifecycle or use `gsap.context()`.

## 4. Troubleshooting

- **Animation not firing:** Check if the `scope` ref is actually attached to the DOM.
- **ScrollTrigger markers misplaced:** Call `ScrollTrigger.refresh()` after layout shifts or dynamic content loads.
- **Double execution:** Ensure you are using `@gsap/react` version 2.1.0+ which natively handles React 18 Strict Mode.

## 5. References
- [GSAP React Resources](https://gsap.com/resources/React/)
- [GSAP Documentation](https://gsap.com/docs/v3/)
