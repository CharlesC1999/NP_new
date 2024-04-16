import React from "react";
import LectureCardVertical from "@/components/speaker/speaker-detail/LectureCardVertical";
import SpeakerCardHorizontal from "@/components/speaker/speaker-detail/SpeakerCardHorizontal";
import SpeakerProfileSection from "@/components/speaker/speaker-detail/SpeakerProfileSection";
import SpeakerCardVertical from "@/components/speaker/speaker-list/speakerCardVertical";
export default function Speaker() {
  return (
    <>
      <LectureCardVertical />
      <div>123</div>
      <SpeakerCardHorizontal />
      <div>123</div>
      <SpeakerProfileSection />
      <div>123</div>
      <SpeakerCardVertical/>
    </>
  );
}
