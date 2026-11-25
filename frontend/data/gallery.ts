export const GALLERY_CATS = ["Classroom", "Events", "Achievements"] as const;
export type GalleryCat = (typeof GALLERY_CATS)[number];

export type GalleryItem = {
  id: string;
  src: string; // path inside /public
  w: number; // original width in px
  h: number; // original height in px
  cat: GalleryCat;
  caption: string;
};

// To add a photo: put it in /public and add one line here.
// w and h: open the image in VS Code, the size is shown at the bottom bar.
export const gallery: GalleryItem[] = [
  { id: "ceremony", src: "/Ceremony .png", w: 597, h: 335, cat: "Achievements", caption: "German & English certification ceremony" },
  { id: "celebration", src: "/images/img5.jpeg", w: 1280, h: 960, cat: "Events", caption: "Celebrating together" },
  { id: "certs-achievement", src: "/Certs achievement.png", w: 1080, h: 1350, cat: "Achievements", caption: "Students with their certificates" },
  { id: "class-world-map", src: "/class2.jpeg", w: 4032, h: 3024, cat: "Classroom", caption: "Students in class" },
  { id: "speaking-session", src: "/Speaking session.png", w: 1280, h: 632, cat: "Classroom", caption: "IELTS speaking session" },
  { id: "certificate-handover", src: "/section image (study visa).png", w: 1200, h: 1600, cat: "Achievements", caption: "Certificate of completion" },
  { id: "trainer-session", src: "/Trainer session.png", w: 1600, h: 900, cat: "Classroom", caption: "Trainer session" },
  { id: "seven-bands", src: "/Seven bands.png", w: 335, h: 597, cat: "Achievements", caption: "7 bands in IELTS" },
  { id: "outing-lobby", src: "/images/img3.jpeg", w: 1280, h: 960, cat: "Events", caption: "A day out together" },
  { id: "one-to-one", src: "/One to one .png", w: 848, h: 480, cat: "Classroom", caption: "One-to-one guidance" },
  { id: "training", src: "/class1.jpeg", w: 1600, h: 983, cat: "Classroom", caption: "Training in progress" },
  { id: "front-desk", src: "/Front desk .png", w: 387, h: 516, cat: "Achievements", caption: "At our front desk" },
  { id: "tesol", src: "/certificte.jpeg", w: 1080, h: 732, cat: "Achievements", caption: "TEFL / TESOL certificate" },
  { id: "six-five-bands", src: "/Six five bands .png", w: 168, h: 300, cat: "Achievements", caption: "6.5 bands in IELTS" },
  { id: "group-trip", src: "/images/img6.jpeg", w: 1152, h: 864, cat: "Events", caption: "A group trip" },
  { id: "study-session", src: "/IMG_5740.JPG.jpeg", w: 1280, h: 853, cat: "Classroom", caption: "Study session" },
  { id: "team", src: "/19_image.png", w: 1032, h: 1600, cat: "Events", caption: "Meet the team" },
  { id: "team-students", src: "/images/img7.jpeg", w: 1280, h: 960, cat: "Events", caption: "Team and students" },
  { id: "classroom-session", src: "/class.jpeg", w: 5238, h: 3810, cat: "Classroom", caption: "Classroom session" },
  { id: "our-classroom", src: "/Classroom 1.png", w: 1440, h: 1083, cat: "Classroom", caption: "Our classroom" },
  { id: "seminar", src: "/images/img2.jpeg", w: 1280, h: 960, cat: "Events", caption: "Seminar with students" },
  { id: "our-students", src: "/students 1.png", w: 516, h: 387, cat: "Classroom", caption: "Our students" },
  { id: "class-in-session", src: "/Screenshot 2026-04-07 173844.png", w: 451, h: 756, cat: "Classroom", caption: "Class in session" },
];