type ReducerMap<S> = {
  [key in keyof S]: React.Reducer<S[key], any>;
};

export function combineReducers<S extends Record<string, any>>(
  reducers: ReducerMap<S>,
) {
  return (state: S, action: { type: any; [key: string]: any }) =>
    Object.keys(reducers).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: { ...reducers[curr](state[curr], action) },
      }),
      state,
    );
}