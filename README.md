# Notepad Clone

A just for fun Windows Notepad clone using Electron

![Working Example Screenshot](./screenshots/Notepad%20Working%20Screenshot.png)

### Running, Building and Distributing

First clone this repo and run `npm install` inside the cloned directory.

In dev mode:

```bash
npm run dev
```

This will launch an electron window you can make changes to, since this is a small fun app, I haven't added HMR or shell reloads on changes. Feel free to add it if you need to.

To build, package and create a distributable for the application:

```bash
npm run package
npm run make
```
