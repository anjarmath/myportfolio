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