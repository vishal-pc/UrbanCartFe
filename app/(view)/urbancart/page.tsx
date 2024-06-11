"use client"
import { Carousel } from "@/app/components/carousel";
import { RecentViewCard } from "@/app/components/recentView";
import {SubMenu} from "@/app/components/subMenu";



export default function Home() {
  return (
    <>
    <SubMenu/>
      <Carousel />
     <RecentViewCard/>
 

      </>
  );
}
