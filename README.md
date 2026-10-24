Image-to-Jigsaw
I built a web jigsaw puzzle game with React and Vite where you can drop in any custom photo or pick from a few default presets, select your grid size (from 3x3 up to 10x10), and solve it against a timer and move counter.

What tripped me up (and how I fixed it)
Layout fighting me: Getting the puzzle board and reference preview to sit side-by-side cleanly took a lot of trial and error. At one point the board collapsed into a tiny box because flexbox was shrinking it down; I had to sort out the flex basis, add min-width: 0, and clean up conflicting CSS rules I accidentally pasted twice.
Image decoding: Managing both file uploads and preset images meant converting them to object URLs and waiting for img.decode() so the canvas didn't try to slice pieces before the image was ready.
What I took away from building this
Got much more comfortable passing state and callbacks between components without getting tangled.
Figured out the difference between using React state for UI triggers vs direct DOM tweaks on drag-and-drop events.
Learned how crucial browser DevTools are for catching rogue CSS rules that silently override each other.
Where AI came in
I used it to figure out why my asset paths were breaking, and to sanity-check my approach to React hooks.

Stack
React, Vite, JavaScript, CSS, Lucide icons, Canvas Confetti.

