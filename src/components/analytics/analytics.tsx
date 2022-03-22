import React, { useMemo, useState, useEffect } from "react";
import { Route, NavLink, useHistory, useLocation } from "react-router-dom";
import { Chart } from "react-google-charts";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { ru } from "date-fns/locale";
import alasql from "alasql";
import { useDispatch, useSelector } from "react-redux";
import { SET_EXPENSES_FILTERS } from "../../services/actions";
import { State } from "../../services/store/store";
import { serializeQuery, deserializeQuery } from "../../utils/api";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./analytics.module.css";

function Analytics() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const expenses = useSelector(
    (store: State) => store.expenses.transactions.data
  );
  const range = useSelector((store: State) => store.expenses.filters);

  const filterdExpenses = useMemo(
    () =>
      expenses.filter((expense) => {
        const date = new Date(expense.eventDate);
        return (
          (!range.startDate || date >= range.startDate) &&
          (!range.endDate || date <= range.endDate)
        );
      }),
    [expenses, range]
  );

  useEffect(() => {
    console.log("search", search);
    if (search) {
      let start;
      let end;
      console.log(Object.entries(deserializeQuery(search)));
      Object.entries(deserializeQuery(search)).forEach(([key, value]) => {
        if (key === "start") {
          start = new Date(value);
        }
        if (key === "end") {
          end = new Date(value);
        }
      });
      dispatch({
        type: SET_EXPENSES_FILTERS,
        payload: {
          startDate: start || range.startDate,
          endDate: end || range.endDate,
        },
      });
    }
  }, [search, dispatch]);

  useEffect(() => {
    const query = serializeQuery({
      start: range.startDate,
      end: range.endDate,
    });
    console.log("query", query);
    if (query) {
      history.replace({ search: query });
    } else {
      history.replace({ search: "" });
    }
  }, [range, history, search]);

  const handleSelect = (selectedRange: RangeKeyDict) => {
    dispatch({
      type: SET_EXPENSES_FILTERS,
      payload: selectedRange.range1,
    });
  };

  const aggrPieChartData = useMemo(() => {
    const header = ["Категория", "Сумма"];
    const rows = alasql(
      `
    SELECT category, SUM(amount) as amount
    FROM ? 
    GROUP BY category
    ORDER BY SUM(amount) DESC`,
      [filterdExpenses]
    ).map((el: [string, string, number][]) => Object.values(el));
    const data = [header, ...rows];
    return data;
  }, [filterdExpenses]);

  const aggrTableData = useMemo(() => {
    const header = ["Категория", "Подкатегория", "Сумма"];
    const rows = alasql(
      `
    SELECT category , subcategory, SUM(amount) as amount
    FROM ? 
    GROUP BY category, subcategory
    ORDER BY SUM(amount) DESC`,
      [filterdExpenses]
    ).map((el: [string, string, number][]) => Object.values(el));
    const data = [header, ...rows];
    return data;
  }, [filterdExpenses]);

  return (
    <>
      <h1 className={styles.title}>Расходы:</h1>
      <nav>
        <ul className={styles.list}>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/analytics/table"
            >
              Таблица
            </NavLink>
          </li>
          <li className={styles["list-item"]}>
            <NavLink
              className={styles.link}
              activeClassName={styles.activeLink}
              to="/analytics/chart"
            >
              Круговая диаграмма
            </NavLink>
          </li>
        </ul>
      </nav>
      <DateRangePicker
        locale={ru}
        ranges={[range]}
        onChange={handleSelect}
        direction="horizontal"
      />
      <Route path="/analytics/table" exact>
        <Chart
          chartType="Table"
          loader={<div className={styles.loader}>Загрузка визуализации...</div>}
          data={aggrTableData}
          options={{
            allowHtml: true,
            showRowNumber: true,
          }}
          render={({ renderControl, renderChart }) => (
            <div className={styles["table-container"]}>
              <div className={styles["table-filters"]}>
                <div className={styles["table-filter"]}>
                  {renderControl(
                    ({ controlProp }) =>
                      controlProp.controlID === "select-category"
                  )}
                </div>
                <div className={styles["table-filter"]}>
                  {renderControl(
                    ({ controlProp }) =>
                      controlProp.controlID === "select-subcategory"
                  )}
                </div>
              </div>
              <div className={styles["table-chart"]}>{renderChart()}</div>
            </div>
          )}
          controls={[
            {
              controlType: "CategoryFilter",
              controlID: "select-category",
              options: {
                filterColumnIndex: 0,
                ui: {
                  labelStacking: "vertical",
                  label: "Категория:",
                  allowTyping: false,
                  allowMultiple: true,
                },
              },
            },
            {
              controlType: "CategoryFilter",
              controlID: "select-subcategory",
              options: {
                filterColumnIndex: 1,
                ui: {
                  labelStacking: "vertical",
                  label: "Подкатегория:",
                  allowTyping: false,
                  allowMultiple: true,
                },
              },
            },
          ]}
        />
      </Route>

      <Route path="/analytics/chart" exact>
        <Chart
          className={styles["pie-chart"]}
          chartType="PieChart"
          loader={<div className={styles.loader}>Загрузка визуализации...</div>}
          data={aggrPieChartData}
          options={{
            title: "Расходы",
          }}
        />
      </Route>
    </>
  );
}

export default Analytics;
