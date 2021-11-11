import React from "react";
import WritingModal from "../components/writing/WritingModal";
import Shadow from "../components/common/Shadow";

export default function Writing({ location }) {
  return (
    <>
      <WritingModal movieId={location.state.movieId} />
      <Shadow />
    </>
  );
}
