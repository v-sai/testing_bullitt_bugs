import React from "react";
import { useNavigate } from "react-router-dom";

function List() {
  const imgs = [
    "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
    "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
    "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
  ];
  const navigate = useNavigate();

  const handleSessionClick = (i) => {
    navigate(`${i}`);
  };

  return (
    <div>
      {imgs.map((item, i) => {
        return (
          <h1 key={i} onClick={() => handleSessionClick(i)}>
            session {i}
          </h1>
        );
      })}
    </div>
  );
}

export default List;
