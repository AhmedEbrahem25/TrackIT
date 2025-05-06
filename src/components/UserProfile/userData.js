// src/components/UserProfile/userData.js

const userData = {

    personalInfo: {
      name: "Ahmed Ebrahem Hamdy",
      email: "Ahmed.Abelzaher.2024@aiu.edu",
      phone: "01004696345",
      location: "Egypt",
      avatar: "../images/default-profile.jpg",
      bio: "Cybersecurity enthusiast and software developer focused on web security, ethical hacking, and building tech tools for career growth."
    },
    enrolledCourses: [
      {
        id: 1,
        title: "Cloud Computing with AWS",
      description: "Deploy and manage applications using Amazon Web Services.",
      level: "advanced",
      category: "cloud",
      duration: "8 weeks",
      instructor: "Lisa Morgan",
        certification: true
      },
      {
        id: 2,
        title: "Mobile App Development with Flutter",
      description:
        "Build cross-platform mobile applications with Flutter framework.",
      level: "intermediate",
      category: "mobile",
      duration: "9 weeks",
      instructor: "Ryan Park",
        certification: false
      }
    ],
    workExperience: [
      {
        id: 1,
        position: "position",
        company: "company",
        duration: "duration",
        responsibilities: [
          "responsibilities",
          "responsibilities",
        ]
      },

    ],
    education: [
      {
        id: 1,
        degree: "Computer Science",
        institution: "AIU",
        year: "2026"
      }
    ],
    skills: [
      "Cybersecurity",
      "Ethical Hacking",
      "Penetration Testing",
      "Web Application Security",
      "Metasploit Framework",
      "Kali Linux",
      "Bug Hunting",
      "Python",
      "Selenium Automation",
      "Java",
      "JDBC",
      "Database Management",
      "Career Development Platforms",
      "Customer Discovery & Validation",
      "E-learning Systems",
      "Linux Networking"
    ],
    resume: {
      file: "/resume.pdf",
      lastUpdated: "2025-04-1"
    }
  };
  
  export default userData;