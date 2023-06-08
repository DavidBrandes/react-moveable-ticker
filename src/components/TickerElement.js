import classes from "./styles/Styles.module.css";
import Context from "./Context";
import React, { useRef, useEffect, useContext, useMemo } from "react";

function TickerElement(props) {
  const ref = useRef();
  const position = useRef(props.position);
  const previousTime = useRef();

  const context = useContext(Context);

  const animationCallback = useMemo(() => {
    if (context.speed <= 0) {
      return (deltaTime) => {
        const left =
          position.current.left + context.speed * (deltaTime * 0.001);
        position.current = {
          left,
          right:
            ref.current.offsetParent.offsetWidth -
            left -
            ref.current.offsetWidth,
        };

        context.callback(props.index, position.current);

        ref.current.style.left = `${position.current.left}px`;
      };
    } else {
      return (deltaTime) => {
        const right =
          position.current.right - context.speed * (deltaTime * 0.001);
        position.current = {
          left:
            ref.current.offsetParent.offsetWidth -
            right -
            ref.current.offsetWidth,
          right,
        };
        context.callback(props.index, position.current);

        ref.current.style.right = `${position.current.right}px`;
      };
    }
    // eslint-disable-next-line
  }, [context]);

  useEffect(() => {
    let animation;

    const animate = (time) => {
      const deltaTime = time - previousTime.current;
      previousTime.current = time;

      if (ref.current) animationCallback(deltaTime);

      animation = requestAnimationFrame(animate);
    };

    if (!previousTime.current) previousTime.current = performance.now();

    animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
    // eslint-disable-next-line
  }, [context]);

  return (
    <div
      ref={ref}
      className={classes.tickerElement}
      style={
        context.speed <= 0
          ? {
              left: `${position.current.left}px`,
            }
          : {
              right: `${position.current.right}px`,
            }
      }
    >
      {props.children}
    </div>
  );
}

export default TickerElement;
