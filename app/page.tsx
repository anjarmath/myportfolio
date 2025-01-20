import Link from "next/link";
import NavBar from "./__components/NavBar";
import Image from "next/image";
import { tagToColor } from "./models/TagModel";
import { getProfile } from "./_actions/profile_actions";
import { getExperiences } from "./_actions/experience_actions";
import { getPortfolios } from "./_actions/portfolio_actions";
import {
  Download,
  Github,
  Linkedin,
  LucideIcon,
  Mail,
  MoveRight,
  Send,
  Youtube,
} from "lucide-react";
import { ReactElement } from "react";

interface Tools {
  alt: string;
  image: string;
}

interface Account {
  icon: ReactElement<LucideIcon>;
  href: string;
}

export default async function Home() {
  const me = await getProfile();
  const portfolios = await getPortfolios();
  const experiences = await getExperiences();

  const myAccount: Account[] = [
    {
      icon: <Github />,
      href: "https://github.com/anjarmath",
    },
    {
      icon: <Linkedin />,
      href: "https://www.linkedin.com/in/anjar2hariadi/",
    },
    {
      icon: <Mail />,
      href: `mailto:creative.anjar@gmail.com`,
    },
    {
      icon: <Youtube />,
      href: "https://www.youtube.com/@an.alphaleonis",
    },
  ];

  const myTool: Tools[] = [
    {
      alt: "Flutter",
      image: "mytools/flutter.svg",
    },
    {
      alt: "Go Lang",
      image: "mytools/go.svg",
    },
    {
      alt: "React JS",
      image: "mytools/react.svg",
    },
    // {
    //   alt: "Next JS",
    //   image: "mytools/next.svg",
    // },
    {
      alt: "Vue JS",
      image: "mytools/vue.svg",
    },
    // {
    //   alt: "Nuxt JS",
    //   image: "mytools/nuxt.svg",
    // },
    {
      alt: "Figma",
      image: "mytools/figma.svg",
    },
  ];

  return (
    <main className=" scroll-smooth">
      <NavBar />

      {/* Hero Section */}
      <div id="home" className=" px-4 py-16 min-h-screen grid bg-hprimary-dark">
        <div className=" max-w-5xl mx-auto flex gap-8 flex-col-reverse md:flex-row items-center">
          <div className=" flex-[3] flex flex-col gap-4">
            <h1 className=" text-white font-bold text-4xl">
              <span className=" text-hprimary-light">Congratulation!</span> 🙌,
              you have come to the right place!
            </h1>
            <span className=" text-white mb-5 text-lg">
              Hello, my name is
              <span className=" font-bold"> Anjar Dwi Hariadi</span>.
              {me?.greeting}
            </span>
            <Link href={"#contact"}>
              <button className=" text-white bg-hprimary px-6 py-4 rounded-lg hover:bg-hprimary-light hover:text-black transition-colors w-full md:w-auto">
                Get Started
              </button>
            </Link>
            <div className=" flex gap-6 mt-4">
              {myAccount.map((account, index) => (
                <Link
                  href={account.href}
                  key={index}
                  className=" text-white hover:text-hprimary transition-colors"
                >
                  {account.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className=" flex-[2]">
            <div className=" p-3 bg-hprimary-light rounded-t-full rounded-l-full absolute mx-8 my-4">
              <span className=" text-5xl">{me?.mood}</span>
            </div>
            <Image
              width={3000}
              height={3000}
              alt="anjar"
              src={"/hero-image.png"}
            ></Image>
          </div>
        </div>
      </div>

      {/* New Info Banner */}
      <div className=" px-5 py-8 bg-red-50">
        <div className=" max-w-5xl mx-auto flex gap-5 items-center justify-center">
          <span>
            <b className=" text-red-500">NEW:</b> Now I'm on Youtube
          </span>
          <Link href={"https://www.youtube.com/@an.alphaleonis"}>
            <button className=" text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full md:w-auto flex gap-2 items-center">
              <Youtube /> Visit My Channel
            </button>
          </Link>
        </div>
      </div>

      {/* Profile Desc */}
      <div id="profile" className=" px-5 py-8">
        <div className=" max-w-5xl flex gap-6 flex-col md:flex-row mx-auto">
          <div className=" flex-[2]">
            <Image
              alt=""
              src={me?.image!.url ?? "/me.jpg"}
              width={1000}
              height={1000}
              className=" object-cover w-full aspect-square rounded-3xl border-2 border-hprimary-dark"
            />
          </div>
          <div className=" flex-[3] flex flex-col gap-2">
            <span className=" text-hprimary font-bold text-lg">About Me</span>
            <h1 className=" text-4xl font-bold">{me?.desc_title}</h1>
            <p className=" text-slate-700 mb-3">{me?.desc_content}</p>
            <Link
              href={`${me?.resume!.url}`}
              className=" flex items-center gap-2 text-lg font-bold hover:text-hprimary transition-colors"
            >
              <Download />
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* My Tools */}
      <div id="tools" className=" px-5 py-8">
        <div className=" max-w-5xl flex mx-auto items-center">
          <h3 className=" font-bold mr-5 text-lg">Tools</h3>
          <div className=" flex flex-wrap gap-3">
            {myTool.map((tool, index) => (
              <Image
                width={200}
                height={200}
                key={index}
                alt={tool.alt}
                src={tool.image}
                className=" aspect-square w-10 object-contain opacity-100 hover:opacity-60 transition-opacity"
              ></Image>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div id="experience" className=" px-5 py-8 bg-slate-950">
        <div className=" max-w-2xl flex flex-col gap-5 mx-auto items-center">
          <span className=" text-hprimary font-bold text-lg">Experience</span>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className=" rounded-xl bg-slate-900 text-white px-5 py-3 w-full"
            >
              <h2 className=" font-bold mb-2">{experience.company}</h2>
              <h4 className=" mb-2">{experience.title}</h4>
              <span className=" text-slate-500 text-sm font-light">
                {experience.period}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* My portfolio */}
      <div id="portfolio" className=" px-5 py-8 bg-hprimary-xlight">
        <div className=" max-w-5xl mx-auto flex flex-col gap-5 items-center">
          <span className=" text-hprimary font-bold text-lg">Portfolio</span>
          <h1 className=" text-4xl font-bold">
            Enjoying every process and here’s the results
          </h1>
          <div className=" flex flex-wrap gap-3 justify-center">
            {portfolios.map(
              (portfolio) =>
                portfolio.is_show && (
                  <div
                    key={portfolio.id}
                    className=" rounded-xl bg-white p-3 shadow-lg md:w-[48%] hover:shadow-2xl border-2 hover:border-hprimary transition-all"
                  >
                    <Image
                      alt={portfolio.image?.name ?? ""}
                      src={portfolio.image!.url}
                      width={1200}
                      height={800}
                      className=" aspect-video object-cover rounded-lg"
                    ></Image>
                    <h3 className=" font-bold mt-4">{portfolio.title}</h3>
                    <div className=" flex flex-wrap gap-2 my-2">
                      {portfolio.tag?.map((tag, index) => {
                        const color = tagToColor(tag);
                        return (
                          <div
                            key={index}
                            className="rounded-full px-3 py-1 text-white text-xs"
                            style={{
                              background: color,
                            }}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                    <span className=" text-slate-700 my-4">
                      {portfolio.description}
                    </span>
                    <div className=" flex my-5 gap-4">
                      {portfolio.url && (
                        <Link
                          href={portfolio.url}
                          className=" flex gap-1 items-center hover:text-hprimary hover:underline transition-all"
                        >
                          <MoveRight /> Try It
                        </Link>
                      )}
                      {portfolio.github_url && (
                        <Link
                          href={portfolio.github_url}
                          className=" flex gap-1 items-center hover:text-hprimary hover:underline transition-all"
                        >
                          <Github /> Github
                        </Link>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* Contact Me */}
      <div id="contact" className=" px-5 py-8">
        <div className=" max-w-5xl rounded-xl bg-hprimary-dark p-4 mx-auto flex flex-col gap-3">
          <h3 className=" text-hprimary-light text-lg font-bold">Contact me</h3>
          <h1 className=" text-white text-2xl font-bold">
            Ready to get started?
          </h1>
          <p className=" text-white">
            Feel free to contact me, let’s discuss about your vision!
          </p>
          <Link href={`mailto:${me?.email}`} className=" ml-auto">
            <button className=" px-3 py-2 bg-white rounded-md w-full md:w-auto flex items-center gap-2">
              Send Me an Email <Send />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className=" p-5 flex justify-center bg-black">
        <p className=" text-white">
          Made with ❤ by Anjar Dwi Hariadi using NextJS.
        </p>
      </footer>
    </main>
  );
}
