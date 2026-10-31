export const SITE = {
  name: "International Institute Of Languages & Study Abroad",
  phone: "+91-8630048365",
  whatsapp: "918630048365",
  email: "info@iilstudyabroad.com",
  address:
    "E-15, Near MIT College, Ram Ganga Vihar Phase 2, Moradabad, Uttar Pradesh 244105",
  yearsExperience: "9",
  googleRating: "4.8",
  googleReviews: "332",
  socials: {
    instagram: "https://www.instagram.com/iil.studyabroad",
    facebook: "https://www.facebook.com/iiLstudyabroad",
    linkedin: "https://www.linkedin.com/company/iilstudyabroad/",
    youtube: "https://youtube.com/@iil.studyabroad",
  },
};

export const whatsappLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;