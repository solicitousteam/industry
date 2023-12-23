// RootNavigation.js

import * as React from 'react';

// export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function reset(name, params) {
  if (navigationRef.current) {
    navigationRef.current?.reset(name, params);
  } else {
  }
}
export function navigate(name, params) {
  if (navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  } else {
  }
}
