import React, { useEffect } from "react";
import WritingModal from "../components/writing/WritingModal";
import Shadow from "../components/common/Shadow";

export default function Writing({ location }: any) {
  useEffect(() => {
    document.body.className = "non-scroll";
    return () => {
      document.body.className = "";
    };
  });

  return (
    <>
      <WritingModal movieId={location.state.movieId} movieName={location.state.movieName} />
      <Shadow />
    </>
  );
}
