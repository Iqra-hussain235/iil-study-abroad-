// Har photo ke liye kai possible paths hain. Pehla jo mil jaye, wahi dikhega.
// Isse file ka naam badalna zaroori nahi (space wale naam bhi chalenge).
export const galleryImages = [
  {
    srcs: ["/gallery/classroom-1.jpg", "/gallery/classroom-1.png", "/Classroom%201.png", "/classroom%201.png"],
    alt: "IIL classroom",
    label: "Classroom",
  },
  {
    srcs: ["/gallery/students-1.jpg", "/gallery/students-1.png", "/students%201.png", "/Students%201.png"],
    alt: "IIL students",
    label: "Our students",
  },
  {
    srcs: ["/gallery/event-1.jpg", "/gallery/event-1.png", "/Event%201.png", "/event%201.png"],
    alt: "IIL event",
    label: "Events",
  },
  {
    srcs: ["/gallery/office-1.jpg", "/gallery/office-1.png", "/Office%201.png", "/Office%201%60.png", "/office%201.png"],
    alt: "IIL office building",
    label: "Our office",
    position: "center 72%",
  },
];

// YouTube video ID daalo. Khaali ho to section hide rahega.
export const videos = [
  // { id: "VIDEO_ID", title: "Student name, course" },
];