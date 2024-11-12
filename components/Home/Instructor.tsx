import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"

export default function Instructor() {
  const instructors = [
    {
      name: "Suraj Kumar Jha",
      role: "SWE | Mentor | Content-Creator",
      image: "https://avatars.githubusercontent.com/u/107530887?v=4",
      coverImage: "/instructor.jpeg",
      experience: [
        "5+ years of experience in Software Development",
        "Previously Teaching Assistant at @codes.learning ",
        "Also working as a Teaching Assistant at @codewith_random",
        "Co-Founder of Codesnippet",
        "Mentored 5000+ students in the field of Software Development",
      ],
    },
    {
      name: "Aryan Jha",
      role: "Tech Lead Backend Engineer | Entrepreneur",
      image: "/co-founder.jpg",
      coverImage: "/co-founder.jpg",
      experience: [
        "7+ years of experience in Backend Development as .net and sql server",
        "Lead Instructor at TechEd Academy",
        "Open Source Contributor",
        "Published author on web development topics",
        "Conducted workshops for 500+ aspiring developers",
      ],
    },
  ]

  return (
    <section className="w-1/3 py-12 bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB] rounded-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1A1818] dark:text-white mb-2">Meet Our Instructors</h2>
        <p className="text-center text-[#08BD80] font-semibold mb-12">Learn from the Best in the Industry</p>
        <div className="grid  gap-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="bg-white dark:bg-[#18181B] rounded-lg shadow-lg overflow-hidden border border-[#E5E7EB] dark:border-[#3F3F46] flex flex-col md:flex-row">
              <div className="relative w-full md:w-2/5 h-96 md:h-auto overflow-hidden">
                <Image
                  src={instructor.coverImage}
                  alt={`${instructor.name}'s portrait`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105 obje"
                />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full border-2 border-[#08BD80] obj"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A1818] dark:text-white">{instructor.name}</h3>
                    <p className="text-sm text-[#6B7280] dark:text-gray-300">{instructor.role}</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {instructor.experience.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-5 h-5 bg-[#08BD80] rounded-full mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-[#6B7280] dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center space-x-4">
                  {[FaInstagram, FaGithub, FaLinkedin, FaTwitter].map((Icon, idx) => (
                    <Link
                      key={idx}
                      href="#"
                      className="text-[#6B7280] hover:text-[#08BD80] transition-colors duration-300"
                    >
                      <Icon size={24} />
                      <span className="sr-only">Social media link</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}