import { createContext, useContext, useEffect, useReducer } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const initialState = {
    location: null,
    swiper: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "picker": {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/picker/${window.location.search}`
        );
        return { ...state, location: 0 };
      }
      case "random": {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/random/${window.location.search}`
        );
        return { ...state, location: 1 };
      }
      case "photo": {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/photo/${window.location.search}`
        );
        return { ...state, location: 2 };
      }
      case "user": {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/user/${window.location.search}`
        );
        return { ...state, location: 3 };
      }
      case 0: {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/picker/${window.location.search}`
        );
        return { ...state, location: 0 };
      }
      case 1: {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/random/${window.location.search}`
        );
        return { ...state, location: 1 };
      }
      case 2: {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/photo/${window.location.search}`
        );
        return { ...state, location: 2 };
      }
      case 3: {
        window.history.replaceState(
          null,
          null,
          `${process.env.PUBLIC_URL ?? ""}/user/${window.location.search}`
        );
        return { ...state, location: 3 };
      }
      case "setSwiper": {
        return { ...state, swiper: action.swiper };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Default location
    if (
      window.location.pathname === `${process.env.PUBLIC_URL ?? ""}/picker/` ||
      window.location.pathname === `${process.env.PUBLIC_URL ?? ""}/`
    ) {
      dispatch({ type: "picker" });
    } else if (
      window.location.pathname === `${process.env.PUBLIC_URL ?? ""}/random/`
    ) {
      dispatch({ type: "random" });
    } else if (
      window.location.pathname === `${process.env.PUBLIC_URL ?? ""}/photo/`
    ) {
      dispatch({ type: "photo" });
    } else if (
      window.location.pathname === `${process.env.PUBLIC_URL ?? ""}/user/`
    ) {
      dispatch({ type: "user" });
    }
  }, []);

  useEffect(() => {
    if (!state.swiper || state.swiper.destroyed) return;

    if (state.location === 0) {
      state.swiper.slideTo(0);
    } else if (state.location === 1) {
      state.swiper.slideTo(1);
    } else if (state.location === 2) {
      state.swiper.slideTo(2);
    } else if (state.location === 3) {
      state.swiper.slideTo(3);
    }
  }, [state.swiper, state.location]);

  return (
    <NavigationContext.Provider
      value={{
        location: state.location,
        swiper: state.swiper,
        dispatch,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export { NavigationProvider, useNavigation };
