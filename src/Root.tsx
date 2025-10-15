import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { BackgroundImage, backgroundImageSchema } from "./Popomo/BackgroundImage";
import { Puppet, puppetSchema } from "./Popomo/Puppet";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      <Composition
        id="BackgroundImage"
        component={BackgroundImage}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={backgroundImageSchema}
        defaultProps={{
          background: "#87CEEB",
        }}
      />

      <Composition
        id="Puppet"
        component={Puppet}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={puppetSchema}
        defaultProps={{
          image: "puppy.png",
          pos: "960,540",
          scale: 1.0,
          enterDuration: 0.5,
          enterEase: "easeOut",
          enterFrom: "bottom" as const,
          exitDuration: 0.5,
          exitEase: "easeIn",
          exitTo: "bottom" as const,
        }}
      />
    </>
  );
};
