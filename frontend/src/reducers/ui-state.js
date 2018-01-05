import {
  SHOW_APP_BAR,
  SHOW_COMMANDS,
  SHOW_RESULT,
  SHOW_SEARCH_WINDOW,
  SHOW_MAIN_MENU
} from "../actions/ui-state";

import { handleActions } from "redux-actions";
import { Map } from "immutable";

const defaultState = Map({
  showMainMenu: false,
  showAppBar: true,
  showCommands: true,
  showResult: false,
  showSearchWindow: false,
});

export default handleActions(
  {
    [SHOW_APP_BAR]: (state, action) => state.set("showAppBar", action.payload),
    [SHOW_COMMANDS]: (state, action) =>
      state.set("showCommands", action.payload),
    [SHOW_RESULT]: (state, action) => state.set("showResult", action.payload),
    [SHOW_SEARCH_WINDOW]: (state, action) =>
      state.set("showSearchWindow", action.payload),
    [SHOW_MAIN_MENU]: (state, action) =>
      state.set("showMainMenu", action.payload)
  },
  defaultState
);
