import { useEffect } from "react";
import { tasksIvents } from "../../../../../globalTypes";

export function useMouseIvents(props: tasksIvents) {
  useEffect(() => {
    function onMouse(e: MouseEvent, event: string) {
      if (e.target instanceof Element &&
        !e.target.classList.contains('unclicked') &&
        props.taskRef.current !== null) {
            if (event === 'up') {
              props.taskRef.current?.classList.remove(props.styles.absoluteTask);
              props.setIsAbsolute(false);
              props.setMovingObj({
                bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON: () => {}
              });
              props.swapStore()
            } else {
              props.taskRef.current?.classList.add(props.styles.absoluteTask);
              props.setIsAbsolute(true);
              props.setMovingObj(props.taskRef.current.getBoundingClientRect());
              props.setMouseCoord({left: e.clientX, top: e.clientY})
              const taskId = props.taskRef.current.id;
              props.setChoosedEl(props.tasks.findIndex(el => el.id === taskId));
            }
      }
    }

    props.taskRef.current?.addEventListener('mousedown', (e) => onMouse(e, 'down'))
    props.taskRef.current?.addEventListener('mouseup', (e) => onMouse(e, 'up'))

    return () => {
      props.taskRef.current?.removeEventListener('mousedown', (e) => onMouse(e, 'down'))
      props.taskRef.current?.removeEventListener('mouseup', (e) => onMouse(e, 'up'))
    }
  }, [props.tasks])
}
