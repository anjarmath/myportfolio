export type Tag = {
    id: string,
    title: string
  }
  
export const tagList: Tag[] = [
    {
      id: "go",
      title: "go lang"
    },
    {
      id: "flask",
      title: "flask"
    },
    {
      id: "android",
      title: "android"
    },
    {
      id: "flutter",
      title: "flutter"
    },
    {
      id: "react js",
      title: "react js"
    },
    {
      id: "next js",
      title: "next js"
    },
    {
      id: "vue js",
      title: "vue js"
    },
    {
      id: "nuxt js",
      title: "nuxt js"
    },
    {
      id: "bootstrap",
      title: "bootstrap"
    },
    {
      id: "tailwind",
      title: "tailwind"
    },
    {
      id: "tensorflow",
      title: "tensorflow"
    },
    {
      id: "firebase",
      title: "firebase"
    },
    {
      id: "next auth",
      title: "next auth"
    },
    {
      id: "xata",
      title: "xata"
    },
    {
      id: "postgresql",
      title: "postgresql"
    },
    {
      id: "mongo db",
      title: "mongo db"
    },
    {
      id: "figma",
      title: "figma"
    },
  ]

  export function tagToColor(tag:string): string {
    switch (tag) {
        case "go":
            return "#6FD8E6"
        case "flask":
            return "#080808"
        case "flutter":
            return "#30B8F6"
        case "android":
            return "#38DF88"
        case "react js":
            return "#30B8F6"
        case "next js":
            return "#080808"
        case "vue js":
            return "#3A4F63"
        case "nuxt js":
            return "#08DD86"
        case "bootstrap":
            return "#7719F7"
        case "tailwind":
            return "#1DC0CD"
        case "tensorflow":
            return "#FF9308"
        case "firebase":
            return "#FFCD36"
        case "next auth":
            return "#8631D8"
        case "xata":
            return "#FF0879"
        case "postgresql":
            return "#386595"
        case "mongo db":
            return "#08E466"
        default:
            return "#003600"
    }
}