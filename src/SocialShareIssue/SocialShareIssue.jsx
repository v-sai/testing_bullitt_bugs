import React from 'react'
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton } from 'react-share'

function SocialShareIssue() {
  const shareTitle = 'Check out my tracking session!';
  const fullURL = "https://testing-bullitt-bugs.vercel.app/maps/1"
  const imageURL = `https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc`;

  return (
    <div>
      <FacebookShareButton url={fullURL} quote={shareTitle}>
        Share on Facebook
      </FacebookShareButton>
      <TwitterShareButton url={fullURL} title={shareTitle}>
        Share on Twitter
      </TwitterShareButton>
      <Helmet>
        <meta property="og:image" content={imageURL} />
        <meta name="twitter:image" content={imageURL} />
      </Helmet>
    </div>
  )
}

export default SocialShareIssue