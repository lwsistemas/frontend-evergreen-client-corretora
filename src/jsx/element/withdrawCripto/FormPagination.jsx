import React, { useEffect, useState } from 'react';
import { DataGrid, GridSortModel } from '@material-ui/data-grid';
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import configGlobal from '../../jsonConfig/globalConfig.json'
import { useTranslation } from "react-i18next";


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
const rows = [
  {
    id: 2,
    coinType: 12345,
    createdAt: "2021-07-29T19:00:26.000Z",
    hash: "",
    nameUser: "Leandro primeiro",
    quantity: 1000,
    status: 1,
    tax: 0,
    type: "email",
    uid: 47,
    uuid: 81,
  },
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
]
const defaultTheme = createTheme({
  palette: {
    type: "dark"
  }
});
const useStyles = makeStyles(
  (theme) => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
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
        '"Segoe UI Symbol"'
      ].join(","),
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d"
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none"
      },
      "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid ${theme.palette.type === "light" ? "#f0f0f0" : "#303030"
          }`
      },
      "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
        borderBottom: `1px solid ${theme.palette.type === "light" ? "#f0f0f0" : "#303030"
          }`
      },
      "& .MuiIconButton-root ": {
        color: 'rgba(255,255, 255, 0.54) !important;'
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
            : "rgba(255,255,255,0.65)"
      },
      "& .MuiPaginationItem-root": {
        borderRadius: 0,
        color: "#fff"
      }, '& .MuiDataGrid-row.Mui-even:not(:hover)': {
        backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)',
      },
      ...customCheckbox(theme)
    }
  }),
  { defaultTheme }
);
function getParsedDate(date) {
  date = String(date).split('T');
  var days = String(date[0]).split('-');
  var hours = String(date[1]).split('.');
  let dataFrom = days[2] + "/" + days[1] + "/" + days[0] + " " + hours[0]
  return dataFrom
  // return [parseInt(days[0]), parseInt(days[1]), parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];

}

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.type === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
        }`,
      borderRadius: 2
    },
    "& .MuiCheckbox-root svg path": {
      display: "none"
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff"
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
      height: 9.14285714
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after": {
      width: 8,
      height: 8,
      backgroundColor: "#1890ff",
      transform: "none",
      top: "39%",
      border: 0
    }
  };
}
function getPagination() {
  let pagesize = configGlobal.pagination["intertransfer"]
  return (pagesize)
}

export default function DataGridTransfer(props) {
  const { t } = useTranslation()
  const [sortModel, setSortModel] = useState  ([
    {
      field: 'createdAt',
      sort: 'asc',
    },
  ]);
  function setModel(model){
   // setSortModel(model)
    console.log(model)

  }

  const [pageSize, setPageSize] = useState(getPagination());
  const classes = useStyles();
  //const combined2 = props.senderHistory
  let receiverHistory=[]
  console.log()
  const combined2 = [...props.senderHistory, ...receiverHistory];
  combined2.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  combined2.forEach((item, i) => {
    item.id = i + 1;
  });


  const columns = [
    { field: 'id', hide: true },
    {
      field: 'tranferTyper',
      headerName: t("Type"),
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        let keyValue = t("Sent")
      //  let keyValue = t(params.value)
        //let data = transferType.tokenCoins[params.value]
        return keyValue;
      },
    },
    {
      field: 'status',
      headerName: t('Status'),
      width: 120,

      editable: false,

    },
   
    {
      field: 'receiverAddress',
      headerName: t("Receiver address"),
      width: 385,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: t('Value'),
      description:t('Value in'),
      width: 190,
      editable: false, 
      valueFormatter: (params) => {
        let keyValue = new Intl.NumberFormat("en-IN",{ minimumFractionDigits: 6 }).format(params.value)
        keyValue = keyValue.replace(",","-")
        keyValue = keyValue.replace(".",",")
        keyValue = keyValue.replace("-",".")
        
        //let data = transferType.tokenCoins[params.value]
        return keyValue;
      },
    },

    {
      field: 'coinType',
      headerName: t('Token'),
      width: 120,
      description:
        t('Coin token'),
      editable: false,
      valueFormatter: (params) => {
        let keyValue = (configGlobal.tokenCoins[params.value])
        //let data = transferType.tokenCoins[params.value]
        return keyValue;
      },
    },
    {
      field: 'createdAt',
      headerName: t('Time'),
      width: 190,
      editable: false,
      description:
        'transfer date and time in dd/mm/yyyy',
      valueFormatter: (params) => {
        let data = getParsedDate(params.value)
        return data;
      },
    },

  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={classes.root}
        rows={combined2}
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
                alignItems: "center"
              }}
            >
            {t('No Historic')}
            </div>
          )
        }}
      />

    </div>
  );
}