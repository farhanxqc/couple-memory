const http = require("node:http");

http
  .get(process.argv[2] || "http://localhost:3000", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const markers = [
        ["film mode", "Putar cerita"],
        ["share", "Bagikan kenangan"],
        ["reading progress", "origin-left bg-clay"],
        ["audio element", "/audio/our-song.mp3"],
        ["music button", "Buka pemutar musik"],
        ["letter", "Untuk Agatha"],
        ["signature", "— Farhan"],
        ["header initials", "A <span"],
        ["blur placeholders", "data:image/jpeg;base64"],
        ["story stats", "hari bersama"],
      ];
      let ok = true;
      for (const [label, needle] of markers) {
        const found = data.includes(needle);
        if (!found) ok = false;
        console.log(label.padEnd(18), found);
      }
      console.log(ok ? "ALL OK" : "MISSING");
    });
  })
  .on("error", (error) => console.log("ERR", error.message));
