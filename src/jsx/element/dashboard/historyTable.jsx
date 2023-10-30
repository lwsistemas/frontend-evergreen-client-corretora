import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import Moment from "moment";
import { useTranslation } from "react-i18next";
import globalConfig from "../../jsonConfig/globalConfig.json";

export default function HistoryTable(props) {
  const { thisData } = props;
  const { t } = useTranslation();
  const [notRows, setNotRows] = useState("");
  const headersTable = [
    t("Type"),
    t("Average price"),
    t("Final Value"),
    t("Time"),
  ];

  const data = React.useMemo(
    () => thisData,
    // {
    //     col1: 'Hello',
    // },
    // {
    //     col1: 'react-table',
    //     col2: 'rocks',
    // },
    // {
    //     col1: 'whatever',
    //     col2: 'you want',
    // },
    [thisData]
  );
  //     const data = React.useMemo(
  //         () => [{
  //             acao: "doc",
  // cpf: "10202817407",
  // createdAt: "2021-10-21T12:13:02.000Z",
  // imagem: {type: 'Buffer', data: Array(23)},
  // tipo: "doc",
  // status:'1',
  // typeUser: "toUser"},{
  // acao: "doc",
  // cpf: "10202817407",
  // createdAt: "2021-10-21T12:13:02.000Z",
  // imagem: {type: 'Buffer', data: Array(23)},
  // tipo: "doc",
  // typeUser: "toUser"},
  //             // {
  //             //     col1: 'Hello',
  //             // },
  //             // {
  //             //     col1: 'react-table',
  //             //     col2: 'rocks',
  //             // },
  //             // {
  //             //     col1: 'whatever',
  //             //     col2: 'you want',
  //             // },
  //         ],
  //         []
  //     )
  function dateComponentPad(value) {
    var format = String(value);

    return format.length < 2 ? "0" + format : format;
  }

  function formatDate(date) {
    var datePart = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ].map(dateComponentPad);
    var timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(
      dateComponentPad
    );

    return datePart.join("-") + " " + timePart.join(":");
  }

  function formatUSD(value) {
    const formatedValue = value
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    return formatedValue;
  }

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

  const columns = React.useMemo(
    () => [
      {
        Header: `${headersTable[0]}`,
        accessor: "type",
        Footer: "Status",
      },
      {
        Header: `Tokens`,
        accessor: (row) => {
          return (
            formatValueToken(row.quantity) +
            " " + row.coinSimbolo
          );
        },
        Footer: "Tipo",
      },
      {
        Header: `${headersTable[1]}`,
        accessor: (row) => {
          return formatUSD(row.priceMedia) + " " + "USD";
        },
        Footer: "Tipo",
      },
      {
        Header: `${headersTable[2]}`,
        accessor: (row) => {
          return formatUSD(row.finalValue) + " " + "USD";
        },
        Footer: "Value Final ",
      },

      {
        Header: `${headersTable[3]}`,
        accessor: (row) => {
          return Moment(row.createdAt).local().format("DD/MM/YYYY HH:mm:ss");
        }, // You format date here
        //  accessor: 'createdAt',
        Footer: "Data do Envio",
      },
    ],

    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [
            {
              id: "id",
              desc: true,
            },
          ],
        },
      },
      useSortBy
    );

  const validRows = async () => {
    if (!data[0]) {
      setNotRows("");
    } else {
      setNotRows("none");
    }
  };
  useEffect(async () => {
    // console.log(thisData.reverse();)
    await validRows();
    // console.log(docUser)
  }, [thisData]);
  return (
    <table
      class="table table-hover"
      {...getTableProps()}
      style={{ background: "#262626 !important", textAlign: "center" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                style={{
                  color: "#777",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody style={{ display: notRows }}>
        <tr>
          <td colspan="10" class="text-center">
            <strong>{t("No records found.")}</strong>
          </td>
        </tr>
      </tbody>
      <tbody {...getTableBodyProps()}>
        {/* {console.log('row', rows[0])} */}
        {rows.map((row) => {
          prepareRow(row);
          // console.log('row', row)
          // if (true) {
          //     return (<td
          //         style={{
          //             padding: '10px',
          //             border: 'solid 1px gray',
          //         }}
          //     >
          //         apo
          //     </td>
          //     )

          // } else {

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      color:
                        cell.row.values.type == "buy" ? "#28a745" : "#dc3545",
                     // borderBottom: "1px solid #000000",
                      maxHeight: "160px"
                      //   border: 'solid 1px gray',
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
