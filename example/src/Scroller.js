import React, { useState, useRef, cloneElement, useEffect } from "react";

import Ticker from "react-moveable-ticker";

function Scroller(props) {
  const speedBound = 100;

  const click = useRef();
  const [speed, setSpeed] = useState(props.speed);

  const handleScrollStart = (event) => {
    if (!click.current) {
      click.current = event;
    }
  };

  const handleScrollEnd = (event) => {
    if (click.current) {
      click.current = undefined;
      setSpeed((speed) => speed + 0.1);
    }
  };

  const handleScrollMouse = (event) => {
    if (click.current) {
      const deltaClientX = event.clientX - click.current.clientX;
      const deltaTime = event.timeStamp - click.current.timeStamp;
      if (deltaTime) setSpeed((deltaClientX * 1000) / deltaTime);

      click.current = event;
    }
  };

  const handleScrollTouch = (event) => {
    if (click.current) {
      const deltaClientX =
        event.targetTouches[0].clientX - click.current.targetTouches[0].clientX;
      const deltaTime = event.timeStamp - click.current.timeStamp;
      if (deltaTime) setSpeed((deltaClientX * 1000) / deltaTime);

      click.current = event;
    }
  };

  useEffect(() => {
    if (click.current) return;
    if (speed >= -Math.abs(props.speed) && speed <= Math.abs(props.speed))
      return;

    const timeout = setTimeout(() => {
      setSpeed(speed - Math.sign(speed) * Math.max(Math.abs(speed) / 10, 10));
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [speed]);

  return (
    <div
      onMouseDown={handleScrollStart}
      onMouseUp={handleScrollEnd}
      onMouseMove={handleScrollMouse}
      onMouseLeave={handleScrollEnd}
      onTouchStart={handleScrollStart}
      onTouchEnd={handleScrollEnd}
      onTouchMove={handleScrollTouch}
    >
      <Ticker
        speed={speed}
        mode={props.mode}
        height={props.height}
        position={props.position}
        loopGap={props.loopGap}
      >
        {props.childFunction}
      </Ticker>
    </div>
  );
}

export default Scroller;
