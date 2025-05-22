import NewsLetter from "@/app/_components/news-letter/newsletter";
import Contact from "@/app/_components//contact-us/contact";
export default function Home() {
  function close(){
    console.log("Hi there")
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center mt-20">
        <NewsLetter />
        <Contact />
      </div>
    </>
  );
}
