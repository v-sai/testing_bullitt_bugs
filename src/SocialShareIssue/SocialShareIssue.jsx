import React from "react";
import { useParams } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";

function SocialShareIssue() {
  let { id } = useParams();

  const shareTitle = `Check out my tracking session ${id}!`;
  const appURL = window?.location?.hostname
  const fullURL = `${appURL}/sessions/${id}`;

  return (
    <div>
      <FacebookShareButton url={fullURL} quote={shareTitle}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={fullURL} title={shareTitle}>
        Share on Twitter
      </TwitterShareButton>
    </div>
  );
}

export default SocialShareIssue;
