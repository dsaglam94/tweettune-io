import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { tweetToneType } from "@/components/DropDown";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [tweet, setTweet] = useState<string>("");
  const [tweetTone, setTweetTone] = useState<tweetToneType>("Professional");
  const [loading, setLoading] = useState<boolean>(false);
  const [tunedTweets, setTunedTweets] = useState<string>("");

  const tuneRef = useRef<null | HTMLDivElement>(null);

  const scrollToTunedTweets = () => {
    if (tuneRef.current !== null) {
      tuneRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `correct any grammar issues in this sentence: "${tweet}" and make it sound ${
    tweetTone === "Funny" ? "funnier" : `more ${tweetTone}`
  }. Make sure there are not more than 280 characters. Give me 2 different versions that clearly labeled "1." and "2.".`;

  // const prompt = `Generate 2 ${tweetTone} twitter biographies with no hashtags and clearly labeled "1." and "2.". "Make sure there is a joke in there and it's a little ridiculous." Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${tweet}.`;

  async function tuneTweet(e: React.SyntheticEvent) {
    e.preventDefault();
    setTunedTweets("");
    setLoading(true);
    const response = await fetch("/api/tune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setTunedTweets((prev) => prev + chunkValue);
    }
    scrollToTunedTweets();
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Tweet Tune</title>
        <meta
          name="description"
          content="TweetTune is a web app that uses the power of ChatGPT to help non-native language speakers correct their tweets, making them sound more natural and appealing to their audience. With just a few clicks, TweetTune analyzes your tweet and provides suggestions to improve its syntax, grammar, and overall fluency. Say goodbye to awkward or confusing tweets and hello to TweetTune!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <Header />
        <section className="flex flex-col items-center justify-center max-w-5xl mx-auto px-8 py-12">
          <h1 className=" sm:text-5xl md:text-6xl text-3xl font-bold max-w-[708px] text-center">
            Fine tune your next Tweet using chatGPT
          </h1>

          <div className="max-w-xl w-full">
            <div className="flex mt-10 items-center space-x-3">
              <Image
                src="/black-1.png"
                width={30}
                height={30}
                alt="1 icon"
                className="mb-5 sm:mb-0"
              />
              <p className="text-left font-medium space-x-1">
                Copy your current tweet
                <span className="text-slate-500 ml-1">
                  (or write a few sentences)
                </span>
                .
              </p>
            </div>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-400 shadow-sm focus:border-black focus:ring-black my-5 p-4"
              placeholder={
                "e.g. Playing with vercel's edge functions with streaming to make a nice UX."
              }
            />
            <div className="flex mb-5 items-center space-x-3">
              <Image src="/black-2.png" width={30} height={30} alt="1 icon" />
              <p className="text-left font-medium">Select your tone.</p>
            </div>
            <div className="block">
              <DropDown
                tweetTone={tweetTone}
                onTweetToneChange={(newTweeTone) => setTweetTone(newTweeTone)}
              />
            </div>
            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => tuneTweet(e)}
              >
                Tune your Tweet &rarr;
              </button>
            )}
            {loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <BeatLoader size={8} color="white" />
              </button>
            )}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
            <div className="space-y-10 my-10">
              {tunedTweets && (
                <>
                  <div>
                    <h2
                      className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto text-center"
                      ref={tuneRef}
                    >
                      Your tuned tweets
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {tunedTweets
                      .substring(tunedTweets.indexOf("1") + 3)
                      .split("2.")
                      .map((tunedTweet) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(tunedTweet);
                              toast("Tweet copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={tunedTweet}
                          >
                            <p>{tunedTweet}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
