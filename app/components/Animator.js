import { SpriteAnimator } from "react-sprite-animator";

const Animator = ({ spriteSheetPath, dimensions }) => {
  return (
    <SpriteAnimator
      className="dog"
      sprite={spriteSheetPath}
      width={dimensions?.width || 100}
      height={dimensions?.height || 100}
      fps={2}
      direction={"horizontal"}
    />
  );
};

export default Animator;
