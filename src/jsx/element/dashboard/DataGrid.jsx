import React, { useEffect, useState } from "react";
import { DataGrid, GridSortModel } from "@material-ui/data-grid";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import configGlobal from "../../jsonConfig/globalConfig.json";
import { useTranslation } from "react-i18next";
import moment from "moment";
import globalConfig from "../../jsonConfig/globalConfig.json";
const rows = [
  {},
  // {
  //     "uid": 81,
  //     "uuid": 47,
  //     "type": "login",
  //     "status": 1,
  //     "quantity": 1000,
  //     "tax": 0,
  //     "hash": "",
  //     "coinType": 12345,
  //     "nameUser": "Leandro primeiro",
  //     "createdAt": "2021-07-29T19:03:03.000Z"
  // }
];
const defaultTheme = createTheme({
  palette: {
    type: "dark",
  },
});
const useStyles = makeStyles(
  (theme) => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
      },
    },
    root: {
      border: 0,
      color:
        theme.palette.type === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.85)",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d",
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${
          theme.palette.type === "light" ? "#f0f0f0" : "#303030"
        }`,
      },
      "& .MuiIconButton-root ": {
        color: "rgba(255,255, 255, 0.54) !important;",
      },
      "& MuiDataGrid-columnHeaderTitle": {
        fontSize: "15px",
        height: 100,
      },
      "& .MuiTablePagination-root": {
        color: "rgba(255,255, 255, 0.87);",
        overflow: "auto;",
      },
      "& .MuiDataGrid-cell": {
        color:
          theme.palette.type === "light"
            ? "rgba(0,0,0,.85)"
            : "rgba(255,255,255,0.65)",
      },
      "& .MuiPaginationItem-root": {
        borderRadius: 0,
        color: "#fff",
      },
      "& .MuiDataGrid-row.Mui-even:not(:hover)": {
        backgroundColor:
          theme.palette.type === "light"
            ? "rgba(0, 0, 0, 0.04)"
            : "rgba(255, 255, 255, 0.04)",
      },
      ...customCheckbox(theme),
    },
  }),
  { defaultTheme }
);
function getParsedDate(date) {
  date = String(date).split("T");
  var days = String(date[0]).split("-");
  var hours = String(date[1]).split(".");
  let dataFrom = days[2] + "/" + days[1] + "/" + days[0] + " " + hours[0];
  return dataFrom;
  // return [parseInt(days[0]), parseInt(days[1]), parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.type === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}
function getPagination() {
  let pagesize = configGlobal.pagination["intertransfer"];
  return pagesize;
}

export default function DataGridDashboard(props) {
  const { history } = props;
  const { t } = useTranslation();
  const [sortModel, setSortModel] = useState([
    {
      field: "createdAt",
      sort: "asc",
    },
  ]);
  function setModel(model) {
    // setSortModel(model)
    console.log(model);
  }

  const [pageSize, setPageSize] = useState(getPagination());
  const classes = useStyles();
  // const combined2 = history
  // combined2.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  // combined2.forEach((item, i) => {
  //   item.id = i + 1;
  // });

  function formatValueToken(value) {
    const defaultOptions = {
      significantDigits: 7,
      thousandsSeparator: ",",
      decimalSeparator: ".",
    };

    if (typeof value !== "number") {
      return 0.0;
    }
    value = value.toFixed(defaultOptions.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      defaultOptions.thousandsSeparator
    )}${defaultOptions.decimalSeparator}${decimal}`;
  }

  const columns = [
    { field: "id", hide: true },
    {
      field: "quantity",
      headerName: t("Tokens"),
      width: 140,
      editable: false,
      valueFormatter: (params) => {
        return (
          formatValueToken(params.value) +
          " " +
          globalConfig.tokenCoins[params.outputType]
        );
      },
    },
    {
      field: "type",
      headerName: t("Type"),
      width: 140,
      editable: false,
    },

    {
      field: "description",
      headerName: t("Description"),
      width: 220,
      editable: false,
    },
    {
      field: "coinType",
      headerName: t("Token"),
      width: 120,
      description: t("Coin token"),
      editable: false,
      valueFormatter: (params) => {
        let keyValue = configGlobal.tokenCoins[params.value];
        //let data = transferType.tokenCoins[params.value]
        return keyValue;
      },
    },
    {
      field: "status",
      headerName: t("Status"),
      width: 120,

      editable: false,
    },
    {
      field: "createdAt",
      headerName: t("Time"),
      width: 160,
      editable: false,
      description: "transfer date and time in dd/mm/yyyy HH:mm",
      valueFormatter: (params) => {
        return moment(params.value).format("DD/MM/YYYY HH:mm");
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        className={classes.root}
        rows={history}
        columns={columns}
        pageSize={pageSize}
        //  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        //    rowsPerPageOptions={[10, 20, 30]}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {t("No Historic")}
            </div>
          ),
        }}
      />
    </div>
  );
}
