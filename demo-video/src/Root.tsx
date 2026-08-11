import React from 'react';
import { Composition } from 'remotion';
import { CredstacksCrmDemo } from './CredstacksCrmDemo';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="CredstacksCrmDemo"
        component={CredstacksCrmDemo}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
