import React from "react";

const TO_ADD = ["bg-cover", "bg-center", "bg-no-repeat"];

export function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const placeholder = props.src + "-placeholder.webp";
  const classes = TO_ADD.reduce((total, i) => {
    if (!total.includes(i)) {
      total += ` ${i}`;
    }
    return total;
  }, props.className || "");

  return (
    <img
      {...props}
      className={classes}
      style={{
        ...(props.style || {}),
        backgroundImage: `url(${placeholder})`,
      }}
    />
  );
}
