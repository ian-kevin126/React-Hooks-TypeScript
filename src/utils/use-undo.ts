import { useCallback, useReducer, useState } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  // past：记录操作的历史，present：当前的，future：下一个操作
  const { past, present, future } = state;
  const { newPresent } = action;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
  return state;
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );

  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};

const useUndo1 = <T>(initialPresent: T) => {
  // 历史操作集合
  const [past, setPast] = useState<T[]>([]);
  // 当前操作
  const [present, setPresent] = useState(initialPresent);
  // 未来的操作集合
  const [future, setFuture] = useState<T[]>([]);

  // 能否后退
  const canUndo = past.length !== 0;
  // 能否前进
  const canRedo = future.length !== 0;

  // 回退
  const undo = useCallback(() => {
    if (!canUndo) return false;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  }, [future, past, canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return false;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [past, future, canRedo]);

  const set = useCallback(
    (newPresent: T) => {
      if (newPresent === present) {
        return false;
      }
      setPast([...past, present]);
      setPresent(newPresent);
      // 既然是设置了一个新的操作，那future就不存在了，置空它
      setFuture([]);
    },
    [past, present]
  );

  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  }, []);

  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ] as const;
};

const useUndo2 = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  // 还可以这样
  // const [state, setState] = useState({
  //   past: [] as T[],
  //   present: initialPresent as T,
  //   future: [] as T[]
  // });

  // 能否后退
  const canUndo = state.past.length !== 0;
  // 能否前进
  const canRedo = state.future.length !== 0;

  // 回退
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
    // 这里我们不再需要任何依赖了，因为我们的逻辑里没有任何一个跟外面的状态相关的变量
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        // 既然是设置了一个新的操作，那future就不存在了，置空它
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
