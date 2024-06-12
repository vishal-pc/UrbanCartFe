"use client"
import { Carousel } from "./components/carousel";
import { RecentViewCard } from "./components/recentView";
import { SubMenu } from "./components/subMenu";

export default function Home() {
  return (
    <>
      <SubMenu />
      <Carousel />
      <RecentViewCard />
    </>
  );
}
