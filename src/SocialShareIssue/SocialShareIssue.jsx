import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";

function SocialShareIssue() {
  let { id } = useParams();
  console.log(id);
  const imgs = [
    "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
    "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
  ];
  const randomImage = imgs[id];

  const shareTitle = `Check out my tracking session ${id}!`;
  const fullURL = `https://testing-bullitt-bugs.vercel.app/maps/${id}`;
  const imageURL = randomImage;

  useEffect(() => {
    // Assuming you have the selected product details available
    var selectedProduct = {
      title: shareTitle,
      description: "Product Description",
      image_url: randomImage,
      page_url: fullURL,
    };

    // Update the og:image tag dynamically
    document
      .querySelector('meta[property="og:title"]')
      .setAttribute("content", selectedProduct.title);
    document
      .querySelector('meta[property="og:description"]')
      .setAttribute("content", selectedProduct.description);
    document
      .querySelector('meta[property="og:image"]')
      .setAttribute("content", selectedProduct.image_url);
    document
      .querySelector('meta[property="og:url"]')
      .setAttribute("content", selectedProduct.page_url);
  }, []);

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
