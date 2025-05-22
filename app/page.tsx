import NewsLetter from '@/app/_components/news-letter/newsletter';
import Contact from '@/app/_components//contact-us/contact';
export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row justify-center">
          <NewsLetter/>
          <Contact/>
        </div>
    </>
  );
}
