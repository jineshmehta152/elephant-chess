"use client";

import React from "react";
import SubpageBanner from "./SubpageBanner";

const AboutBanner: React.FC = () => {
  return (
    <SubpageBanner
      title="Our"
      highlight="Mission."
      subtitle="Redefining mental toughness through strategic intelligence & critical thinking."
      breadcrumbLabel="About Us"
      bgImage="/chess.webp"
      widgetLeft1Icon="Compass"
      widgetLeft1Label="Vision"
      widgetLeft1Value="Performance Labs"
      widgetLeft2Icon="Brain"
      widgetLeft2Label="Methodology"
      widgetLeft2Value="Mind & Positional Play"
      widgetRightIcon="Clock"
      widgetRightLabel="Established"
      widgetRightValue="FIDE Academy HQ"
    />
  );
};

export default AboutBanner;