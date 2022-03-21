import { CATEGORY_FORM_SET_VALUE, CATEGORY_FORM_CLEAR_STATE } from "../actions";

import { ICATEGORY_FORM_SET_VALUE } from "../actions/settings-form";

type ICATEGORY_FORM_CLEAR_STATE = {
  type: "CATEGORY_FORM_CLEAR_STATE";
};

type CATEGORY_FORM_ACTION =
  | ICATEGORY_FORM_SET_VALUE
  | ICATEGORY_FORM_CLEAR_STATE;

const categoryFormInitialState = {
  data: {
    id: "",
    name: "",
    subcategories: [] as string[],
    description: "",
  },
};

const categoryFormReducer = (
  state = categoryFormInitialState,
  action: CATEGORY_FORM_ACTION
) => {
  switch (action.type) {
    case CATEGORY_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case CATEGORY_FORM_CLEAR_STATE: {
      return {
        ...categoryFormInitialState,
      };
    }
    default: {
      return state;
    }
  }
};

export { categoryFormInitialState, categoryFormReducer };
