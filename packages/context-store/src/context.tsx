import React, { createContext, useReducer } from 'react';

interface StoreProps<S, A> {
  reducer: React.Reducer<S, A>;
  initialState: S;
}

interface ProviderProps {
  children: React.ReactNode;
}

type ContextType<S, A> = [S, React.Dispatch<A>];

type StateMapper<S, P> = (state: S, props: P) => { [key in keyof S]?: S[key] };

type DispatchMapper<A, P> = (
  dispatch: React.Dispatch<A>,
  props: P,
) => Record<string, (...args: any[]) => void>;

/**
 * Creates react context
 *
 * @returns React.Context<[S, React.Dispatch<A>]>
 */
function createStoreContext<T = unknown>() {
  return createContext<T>(null!);
}

/**
 * Creates context provider from context with reducer value
 *
 * @param StoreContext
 * @param initializer
 * @param props
 * @returns JSX.Element
 */
function CreateStoreProvider<S, A>(
  StoreContext: React.Context<ContextType<S, A>>,
  initializer: StoreProps<S, A>,
  { children }: ProviderProps,
) {
  const value = useReducer(initializer.reducer, initializer.initialState);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

/**
 * Creates higher order state and dispatch selector to decorate component props
 *
 * @param StoreContext
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @returns JSX.Element
 */
function createWithStoreSelect<S, A, P>(
  StoreContext: React.Context<ContextType<S, A>>,
  mapStateToProps?: StateMapper<S, P>,
  mapDispatchToProps?: DispatchMapper<A, P>,
) {
  return function (Component: React.ComponentType<P>) {
    return (props: P) => (
      <StoreContext.Consumer>
        {([state, dispatch]) => (
          <Component
            {...props}
            {...(mapStateToProps ? mapStateToProps(state, props) : state)}
            actions={{
              ...(mapDispatchToProps
                ? mapDispatchToProps(dispatch, props)
                : null),
            }}
          />
        )}
      </StoreContext.Consumer>
    );
  };
}

/**
 * Creates store components
 *
 * @param initializer
 * @returns
 */
export function createStore<S = unknown, A = unknown>(
  initializer: StoreProps<S, A>,
) {
  const StoreContext = createStoreContext<ContextType<S, A>>();

  const StoreProvider = (props: ProviderProps) => {
    return CreateStoreProvider<S, A>(StoreContext, initializer, props);
  };

  const withStoreSelect = <P extends any = any>(
    ...args: [StateMapper<S, P>?, DispatchMapper<A, P>?]
  ) => {
    return createWithStoreSelect<S, A, P>(StoreContext, ...args);
  };

  return {
    StoreProvider,
    withStoreSelect,
  };
}