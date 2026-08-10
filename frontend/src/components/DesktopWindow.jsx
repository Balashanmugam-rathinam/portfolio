import { motion, useDragControls } from 'framer-motion';
import PixelArt from '@/components/PixelArt';

export default function DesktopWindow({ win, cfg, wm, play, children }) {
  const controls = useDragControls();
  const { minimized, maximized, z } = win;

  return (
    <motion.section
      key={win.key + (maximized ? '-max' : '')}
      data-testid={`window-${win.key}`}
      role="dialog"
      aria-label={cfg.title}
      className="pixel-panel absolute flex flex-col"
      style={{
        zIndex: z,
        left: maximized ? 8 : win.x,
        top: maximized ? 40 : win.y,
        width: maximized ? 'calc(100vw - 16px)' : Math.min(cfg.w, window.innerWidth - 24),
        height: maximized ? 'calc(100vh - 130px)' : Math.min(cfg.h, window.innerHeight - 140),
      }}
      initial={{ scale: 0.5, opacity: 0, y: 30 }}
      animate={{ scale: minimized ? 0.3 : 1, opacity: minimized ? 0 : 1, y: minimized ? 300 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      drag={!maximized && !minimized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={() => wm.focusWindow(win.key)}
      pointerEvents={minimized ? 'none' : 'auto'}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 px-2 py-2 border-b border-white/10 select-none shrink-0"
        style={{ background: 'rgba(2,6,23,0.7)', cursor: maximized ? 'default' : 'grab', touchAction: 'none' }}
        onPointerDown={(e) => { if (!maximized) controls.start(e); }}
        onDoubleClick={() => { play('click'); wm.toggleMaximize(win.key); }}
      >
        <button
          data-testid={`window-close-${win.key}`}
          aria-label="Close window"
          className="w-3.5 h-3.5 bg-rose-600 hover:bg-rose-400 border border-black/60 transition-colors"
          onClick={() => { play('close'); wm.closeWindow(win.key); }}
        />
        <button
          data-testid={`window-minimize-${win.key}`}
          aria-label="Minimize window"
          className="w-3.5 h-3.5 bg-yellow-500 hover:bg-yellow-300 border border-black/60 transition-colors"
          onClick={() => { play('click'); wm.minimizeWindow(win.key); }}
        />
        <button
          data-testid={`window-maximize-${win.key}`}
          aria-label="Maximize window"
          className="w-3.5 h-3.5 bg-green-600 hover:bg-green-400 border border-black/60 transition-colors"
          onClick={() => { play('click'); wm.toggleMaximize(win.key); }}
        />
        <div className="flex items-center gap-2 ml-2 min-w-0">
          <PixelArt name={cfg.icon} scale={1.4} />
          <span className="font-pixel text-[9px] text-slate-100 truncate">{cfg.title}</span>
        </div>
      </div>
      {/* body */}
      <div className="win-scroll relative flex-1 overflow-auto p-4 sm:p-5 text-left">{children}</div>
    </motion.section>
  );
}
