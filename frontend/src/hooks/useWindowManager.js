import { useState, useCallback } from 'react';

let nextZ = 20;

export function useWindowManager() {
  const [windows, setWindows] = useState([]);

  const openWindow = useCallback((appId, props = {}) => {
    setWindows((ws) => {
      const key = props.key || appId;
      const existing = ws.find((w) => w.key === key);
      if (existing) {
        return ws.map((w) => (w.key === key ? { ...w, minimized: false, z: ++nextZ } : w));
      }
      const offset = (ws.length % 5) * 32;
      return [
        ...ws,
        {
          key,
          appId,
          props,
          x: Math.max(24, window.innerWidth / 2 - 340 + offset),
          y: 56 + offset,
          z: ++nextZ,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((key) => {
    setWindows((ws) => ws.filter((w) => w.key !== key));
  }, []);

  const minimizeWindow = useCallback((key) => {
    setWindows((ws) => ws.map((w) => (w.key === key ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((key) => {
    setWindows((ws) =>
      ws.map((w) => (w.key === key ? { ...w, maximized: !w.maximized, z: ++nextZ } : w))
    );
  }, []);

  const focusWindow = useCallback((key) => {
    setWindows((ws) => {
      const target = ws.find((w) => w.key === key);
      if (target && target.z === Math.max(...ws.map((x) => x.z)) && !target.minimized) return ws;
      return ws.map((w) => (w.key === key ? { ...w, z: ++nextZ, minimized: false } : w));
    });
  }, []);

  return { windows, openWindow, closeWindow, minimizeWindow, toggleMaximize, focusWindow };
}
