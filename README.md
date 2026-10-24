# Image-to-Jigsaw

This is a jigsaw puzzle game I built with React and Vite. You can drop in any photo from your computer or pick one of the preset images, choose a grid size from 3x3 all the way up to 10x10, and then race a timer and move counter to put it back together. I made it to get more comfortable with React state, canvas, and building something that's actually fun to play.


## Why I Built This

I wanted a project that would help me to use React properly instead of just following a tutorial. A jigsaw game seemed like a good fit, because it needs state, events, drag and drop, and canvas all in one place.

## Personal

I've always liked puzzles, but I never have the space or the time to set one up on a table. I wanted a version I could play in a few minutes with any photo I chose, like one from my own camera roll. plus it doesnt cost me any money and i can paly any picture i want 

## Screenshots

### Image Picker
Upload your own photo or choose a preset, then pick how hard you want it.

<img width="1083" height="910" alt="image" src="https://github.com/user-attachments/assets/891c0a0e-d382-4eeb-9d84-7256f7efef03" />


### Puzzle Board
The image is cut into tiles and shuffled. Click two tiles to swap them, or drag one onto another. The header shows your time and move count.

<img width="633" height="621" alt="image" src="https://github.com/user-attachments/assets/ecba13c2-51ce-48c7-a97d-8b622e502918" />


### Win Screen
When every tile is in the right place you get a win popup with your time, your moves, and some confetti.

<img width="722" height="652" alt="image" src="https://github.com/user-attachments/assets/c47ecaa7-f2f4-4632-84e6-f906cfdffbcb" />


## Features

* Upload any custom photo or use a preset image
* Grid sizes from 3x3 up to 10x10
* Timer and move counter
* Swap tiles by clicking or by dragging and dropping
* Sound effects with a mute button
* Restart button that reshuffles the same image
* Win popup with confetti

## Running It Locally

1. Clone this repository.
2. Open the folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local link Vite prints (usually `http://localhost:5173`).

## Tech Stack

* **React:** Handles the screens, game state, and passing data between components.
* **Vite:** Dev server and build tool.
* **JavaScript and CSS:** Game logic and all of the styling.
* **Canvas:** Slices the chosen image into puzzle tiles.
* **Lucide React:** Icons.
* **canvas-confetti:** The confetti when you win.

## What Tripped Me Up (and How I Fixed It)

* **Layout fighting me:** Getting the puzzle board and the reference preview to sit side by side took a lot of trial and error. At one point the board collapsed into a tiny box because flexbox kept shrinking it. I had to sort out the flex basis, add `min-width: 0`, and remove conflicting CSS rules that I accidentally pasted twice.
* **Image decoding:** Uploaded files and preset images both had to be turned into object URLs, and I had to wait for `img.decode()` so the canvas didn't try to slice the image before it was ready.
* **A blank screen:** My board crashed because `PuzzleBoard` expected a `tiles` array and I wasn't passing one. The console error pointed straight at the line, and I learned to read it before guessing.

## What I Took Away From Building This

* I'm much more comfortable passing state and callbacks between components without getting tangled.
* I learned the difference between using React state for UI changes and tweaking the DOM directly in drag-and-drop events.
* Browser DevTools are crucial for catching CSS rules that silently override each other.

## Where AI Came In

I used AI to figure out why my asset paths were breaking, to sanity-check how I was using React hooks, and to debug the blank-screen crash. It also helped with the first version of the image-slicing and shuffle logic, which I then rewrote and tidied up myself.

## Contributing

It's a small personal project, but if you find a bug or have an idea, feel free to open an issue or a pull request. Please use a clear commit message like `Fix tile swap on large grids` instead of `fixed stuff`.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
