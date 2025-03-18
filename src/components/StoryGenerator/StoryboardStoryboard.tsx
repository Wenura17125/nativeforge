import React from "react";
import StoryboardView from "./StoryboardView";

interface StoryboardStoryboardProps {
  story: string;
  title?: string;
}

const StoryboardStoryboard: React.FC<StoryboardStoryboardProps> = ({
  story = "",
  title = "Untitled Story",
}) => {
  return <StoryboardView story={story} title={title} />;
};

export default StoryboardStoryboard;
