import React from "react";
import { Composition } from "remotion";
import { CRMDemoVideo } from "./CRMDemoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CredstacksCRMDemo"
        component={CRMDemoVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
