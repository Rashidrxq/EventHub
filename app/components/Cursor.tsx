"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const outline = outlineRef.current!;
    const imageWrap = imageRef.current!;

    // starting positions
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // smooth trailing using GSAP ticker
    gsap.set(dot, { x: mouseX, y: mouseY });
    gsap.set(outline, { x: mouseX, y: mouseY });

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // move dot instantly (small lagless feel)
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.06, ease: "power3.out" });

      // outline trails with slightly more easing
      gsap.to(outline, { x: mouseX, y: mouseY, duration: 0.22, ease: "power3.out" });

      // also move image wrap if visible
      if (imageWrap.classList.contains("--visible")) {
        gsap.to(imageWrap, { x: mouseX, y: mouseY, duration: 0.12, ease: "power3.out" });
      }
    }

    function onDown() {
      dot.classList.add("--active");
      gsap.to(dot, { scale: 0.9, duration: 0.12 });
    }
    function onUp() {
      dot.classList.remove("--active");
      gsap.to(dot, { scale: 1, duration: 0.12 });
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // MAGNET EFFECT
    // Elements that want magnet effect should have `.magnet`. Optional data attribute data-strength (0.2-1)
    const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnet"));

    const onMagnetMove = (ev: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(ev.clientX - centerX, ev.clientY - centerY);
      const threshold = (Math.max(rect.width, rect.height) * 0.9) + 40; // area radius
      const strength = Math.min(Number(el.dataset.strength ?? "0.18"), 0.6); // max strength cap

      if (distance < threshold) {
        // calculate magnet target between mouse and element center
        // the closer the mouse, the closer to center
        const pullX = centerX + (ev.clientX - centerX) * (1 - strength * Math.min(distance / threshold, 1));
        const pullY = centerY + (ev.clientY - centerY) * (1 - strength * Math.min(distance / threshold, 1));

        // move outline to pull position smoothly
        outline.classList.add("--magnet");
        gsap.to(outline, { x: pullX, y: pullY, duration: 0.18, ease: "power3.out" });

        // small lift of element
        el.classList.add("--lift");
        gsap.to(el, { x: (ev.clientX - centerX) * strength * 0.12, y: -6, duration: 0.22, ease: "power3.out" });

      } else {
        // reset
        outline.classList.remove("--magnet");
        gsap.to(outline, { x: mouseX, y: mouseY, duration: 0.28, ease: "power3.out" });
        el.classList.remove("--lift");
        gsap.to(el, { x: 0, y: 0, duration: 0.28, ease: "power3.out" });
      }
    };

    // attach listeners per magnet element
    const listeners: Array<() => void> = [];
    magnets.forEach((el) => {
      const moveHandler = (ev: MouseEvent) => onMagnetMove(ev, el);
      const enterHandler = () => {
        // show outline magnet state
        outline.classList.add("--magnet");
        gsap.to(outline, { scale: 1, duration: 0.12 });

        // if element wants an image, show it
        if (el.dataset.cursorImage) {
          const url = el.dataset.cursorImage!;
          const img = imageWrap.querySelector("img") as HTMLImageElement | null;
          if (img) img.src = url;
          imageWrap.classList.add("--visible");
          gsap.to(imageWrap, { scale: 1, duration: 0.14 });
        }
      };
      const leaveHandler = () => {
        outline.classList.remove("--magnet");
        imageWrap.classList.remove("--visible");
        // reset
        gsap.to(el, { x: 0, y: 0, duration: 0.22, ease: "power3.out" });
      };
      window.addEventListener("mousemove", moveHandler);
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);

      listeners.push(() => {
        window.removeEventListener("mousemove", moveHandler);
        el.removeEventListener("mouseenter", enterHandler);
        el.removeEventListener("mouseleave", leaveHandler);
      });
    });

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      listeners.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
      <div ref={imageRef} className="cursor-image">
        {/* Using the uploaded image path as an example. Move to public/ and update path for prod */}
        <img src="/mnt/data/ed5d3fec-a44f-4148-84b2-2e237a6aad72.png" alt="cursor" />
      </div>
    </>
  );
}
