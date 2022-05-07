export const CATEGORY_FORM_SET_VALUE = "CATEGORY_FORM_SET_VALUE";
export const CATEGORY_FORM_CLEAR_STATE = "CATEGORY_FORM_CLEAR_STATE";

export const setCategoryFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | string[];
}) => ({
  type: CATEGORY_FORM_SET_VALUE,
  payload: { field, value },
});

export type ICATEGORY_FORM_SET_VALUE = ReturnType<typeof setCategoryFormValue>;
