# Image-to-Jigsaw

A jigsaw puzzle game I built with React and Vite. Drop in any photo or pick one of the presets, choose a grid size from 3x3 up to 10x10, and try to solve it before the timer gets too embarrassing.

## Screenshots

### Image Picker
Upload your own photo or pick a preset, then choose how hard you want it.

<img width="1083" height="910" alt="image" src="https://github.com/user-attachments/assets/891c0a0e-d382-4eeb-9d84-7256f7efef03" />

### Puzzle Board
Click two tiles to swap them, or drag one onto another. Time and moves show up in the header.
<img width="633" height="621" alt="image" src="https://github.com/user-attachments/assets/ecba13c2-51ce-48c7-a97d-8b622e502918" />

### Win Screen
Solve it and you get a popup with your time, your moves, and some confetti.

<img width="722" height="652" alt="image" src="https://github.com/user-attachments/assets/c47ecaa7-f2f4-4632-84e6-f906cfdffbcb" />

## Why I Built This

I wanted to build something myself instead of just following another React tutorial. A jigsaw game seemed like a good pick because it needs state, drag and drop, and canvas all at once. Also I wanted something I could actually play when I was done.

## Why I Like This Project

I've always liked puzzles, but setting one up on a table is a hassle. This way I can use any photo I want and finish one in a few minutes. It was annoying when the board went blank and the layout kept breaking, but those were the parts I learned the most from.

## Features

* Upload your own photo or use a preset
* Grid sizes from 3x3 to 10x10
* Timer and move counter
* Swap tiles by clicking or dragging
* Sound effects with a mute button
* Restart button that reshuffles the same image
* Win popup with confetti

## Running It Locally

1. Clone this repository.
2. Open the folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the link Vite prints (usually `http://localhost:5173`).

## Tech Stack

* **React and Vite:** the app itself and the dev server
* **JavaScript and CSS:** the game logic and styling
* **Canvas:** cuts the image into tiles
* **Lucide React:** icons
* **canvas-confetti:** the confetti on the win screen

## What Went Wrong

* **The layout fought me.** Getting the board and the reference preview side by side took a lot of trial and error. At one point the board shrank into a tiny box because of flexbox. Adding `min-width: 0`, fixing the flex basis, and deleting some CSS I'd accidentally pasted twice sorted it out.
* **Images weren't ready.** Uploaded files and presets both get turned into object URLs, and I had to wait for `img.decode()` before slicing, otherwise the canvas cut up an image that hadn't loaded yet.
* **Blank screen.** The board crashed because `PuzzleBoard` wanted a `tiles` array and I wasn't giving it one. The console error pointed right at the line, so now I read that first.

## What I Learned

By the end, passing state and functions between components started making more sense to me. I also figured out that drag and drop works better driven by React state than by poking at the DOM, and I learned to open DevTools when my CSS wasn't doing what I expected.

## Where AI Came In

I used AI to work out why my asset paths were breaking, to double check how I was using hooks, and to debug the blank screen. It also wrote a first version of the image slicing and shuffle code, which I then rewrote and cleaned up myself.

## Contributing

It's a small personal project, but if you find a bug or have an idea, open an issue or a pull request. Please write a commit message that says what you changed, like `Fix tile swap on large grids`, not something like `fixed stuff lol`.

## License

MIT License. See [LICENSE.md](LICENSE.md) for the details.




cense. See the [LICENSE.md](LICENSE.md) file for details.
