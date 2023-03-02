import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <main className="">
        <Header />
        <div className="text-green-500">Hello World!</div>
      </main>
    </>
  );
}
