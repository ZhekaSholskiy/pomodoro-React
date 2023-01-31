import { useEffect } from "react";
import { tasksIvents } from "../../../../../globalTypes";
import { manageHighlighting } from "./manageHighlighting";

export function useHighligh(props: tasksIvents) {

  useEffect(() => {
    function moving(e: MouseEvent) {
      if (props.taskRef.current !== null) {
        props.setMouseCoord({left: e.clientX, top: e.clientY});
        props.setMovingObj(props.taskRef.current.getBoundingClientRect());
      }
    }

    if (props.isAbsolute) {
      props.taskRef.current?.addEventListener('mousemove', moving);
    }

     manageHighlighting(props);
    return () => props.taskRef.current?.removeEventListener('mousemove', moving);
  }, [props.mouseCoord, props.movingObj])
}
