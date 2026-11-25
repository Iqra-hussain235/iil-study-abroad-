export const SITE = {
  name: "International Institute Of Languages & Study Abroad",
  phone: "+91-8630048365",
  whatsapp: "918630048365",
  email: "Contact@iilstudyabroad.com",
  address:
    "E-15, Near MIT College, Ram Ganga Vihar Phase 2, Moradabad, Uttar Pradesh 244105",
  yearsExperience: "9",
  googleRating: "4.8",
  googleReviews: "332",

  // Paste your Google Form link between the quotes, e.g. "https://forms.gle/AbCdEf123".
  // While this is empty, the "Book an appointment" banner stays hidden.
  appointmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfW8aAfFu8Esalteu2iW6-NWtw2rjwR5uS3f35id926BsiGPw/viewform",

  socials: {
    instagram: "https://www.instagram.com/iil.studyabroad",
    facebook: "https://www.facebook.com/iiLstudyabroad",
    linkedin: "https://www.linkedin.com/company/iilstudyabroad/",
    youtube: "https://youtube.com/@iil.studyabroad",
  },
};

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;