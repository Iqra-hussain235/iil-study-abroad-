export type Testimonial = {
  name: string;
  course: string;
  country?: string;
  category:
    | "Study Visa"
    | "IELTS / PTE"
    | "Spoken English"
    | "Foreign Languages"
    | "Immigration";
  rating: number; // 1 se 5
  text: string;
  photo?: string; // jaise "/testimonials/rahul.jpg"
  source?: string; // jaise "Google"
};

// Ye sab public Google reviews hain (IIL ke Google Business Profile se).
// Jin reviews ke end mein "…" hai, wo Google par "More" ke peeche kate hue the.
export const testimonials: Testimonial[] = [
  {
    name: "Aryan Agrawal",
    course: "IELTS & Study Abroad",
    category: "Study Visa",
    rating: 5,
    source: "Google",
    text: "I successfully completed my IELTS and also got my dream university. The guidance and support I got were exceptional. Highly recommend their services to anyone planning to study abroad. Truly grateful and satisfied.",
  },
  {
    name: "Shivam Tyagi",
    course: "Study Abroad Guidance",
    category: "Study Visa",
    rating: 5,
    source: "Google",
    text: "The International Institute of Languages and study abroad is the most professional and trustworthy consultancy I have ever visited. The team gives honest guidance, perfect profile evaluation, and complete support for admissions and visas.…",
  },
  {
    name: "Aradhya Chauhan",
    course: "IELTS Coaching",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "I had an amazing experience at International Institute of Languages and Study Abroad, Moradabad. Honestly, this is the No.1 institute in Moradabad and even within 100 km radius for IELTS, Foreign Languages, and Study Abroad guidance.…",
  },
  {
    name: "Kaif Khan",
    course: "IELTS Coaching",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "I had an amazing experience at international institute of languages and study abroad, Moradabad. This is truly the best IELTS institute in Moradabad. The trainers are highly professional and focus on each student individually. My speaking…",
  },
  {
    name: "Mohammad Anas",
    course: "IELTS Coaching",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "The best Ielts coaching in all over moradabad for serious student. The trainers provide excellent guidance for listening reading writing and speaking with the proper guidance.…",
  },
  {
    name: "Shaifar Sid",
    course: "PTE & English",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "This is one of the best institutes for English and PTE preparation. Maaz Sir is a fantastic PTE teacher who explains everything in an easy way. Bushra Ma’am is very kind and helpful, and her English classes are really effective. I have improved a lot. Thank you!",
  },
  {
    name: "Google reviewer",
    course: "PTE & English",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "I am really thankful to this institute for helping me improve my English and confidence. Maaz Sir’s PTE classes are very structured and easy to understand. Bushra Ma’am is very supportive and teaches English in a simple and practical way. I truly appreciate their efforts.",
  },
  {
    name: "Vinod Singh",
    course: "IELTS Coaching",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "Best ielts institute in moradabad, I loved the way of teaching of ielts trainer maaz sir.",
  },
  {
    name: "Mohd Ubaish",
    course: "IELTS Coaching",
    category: "IELTS / PTE",
    rating: 5,
    source: "Google",
    text: "Best institute for IELTS training, no.1 institute in Moradabad for IELTS. And for foreign languages also.",
  },
  {
    name: "Sanjeev Kumar",
    course: "Spoken English",
    category: "Spoken English",
    rating: 5,
    source: "Google",
    text: "I am highly satisfied with the Spoken English program at IIL. The trainers are approachable, encouraging, and articulate concepts in a clear and effective manner. My confidence in spoken English has significantly improved, and my hesitation…",
  },
  {
    name: "Shuaib Ahmad",
    course: "Spoken English",
    category: "Spoken English",
    rating: 5,
    source: "Google",
    text: "The Best spoken English institute in Moradabad for improving communication skills and confidence. Their trainers are highly professional and the teaching style is very practical, focusing on real life speaking, grammar, personality…",
  },
  {
    name: "Raju Saini",
    course: "English Coaching",
    category: "Spoken English",
    rating: 5,
    source: "Google",
    text: "One of the best English coaching in all over moradabad. Best institute of English language the trainers are very supportive and teaching method is practical and easy to understand. The course focuses on grammar, vocabulary, confidence and…",
  },
  {
    name: "Amrekh Nayak",
    course: "Communication Skills",
    category: "Spoken English",
    rating: 5,
    source: "Google",
    text: "Learn communication, interview, personality development. I had good experience.",
  },
  {
    name: "Ubesh Raza",
    course: "Japanese Language",
    category: "Foreign Languages",
    rating: 5,
    source: "Google",
    text: "Japanese language in Moradabad. So I preferred iilstudyabroad is the best foreign language institute in Moradabad for japanese language.",
  },
  {
    name: "Vaibhav Rastogi",
    course: "German Language",
    category: "Foreign Languages",
    rating: 5,
    source: "Google",
    text: "I’m currently learning German at the International Institute of Languages (IIL), Moradabad, and I must say, it’s been an amazing journey so far! Without a doubt, this is the best German language institute in Moradabad.…",
  },
];