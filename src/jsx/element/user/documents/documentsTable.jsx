import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import Moment from "moment";
import { useTranslation } from "react-i18next";

export default function TableDoc(props) {
  const { thisTitle, docUser } = props;
  const { t } = useTranslation();
  const [title, setTitle] = useState(thisTitle);
  const [notRows, setNotRows] = useState("");

  const data = React.useMemo(
    () => docUser,
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
    [docUser]
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
  function formatCPF(cpf) {
    //retira os caracteres indesejados...
    cpf = cpf.replace(/[^\d]/g, "");

    //realizar a formatação...
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const columns = React.useMemo(
    () => [
      {
        Header: title,
        Footer: "Info",
        columns: [
          {
            Header: "Status",
            accessor: "status",
            Footer: "Status",
          },
          {
            Header: t("Document Type"),
            accessor: "typeDoc",
            Footer: "Tipo",
          },

          {
            Header: t("Send date"),
            accessor: (row) => {
              return Moment(row.createdAt)
                .local()
                .format("DD/MM/YYYY HH:mm:ss");
            }, // You format date here
            //  accessor: 'createdAt',
            Footer: "Data do Envio",
          },

          {
            Header: t("Documents"),
            accessor: (row) => {
              return formatCPF(row.cpf);
            },
            Footer: "CPF Válido",
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const validRows = async () => {
    if (!data[0]) {
      setNotRows("");
    } else {
      setNotRows("none");
    }
  };
  useEffect(async () => {
    await validRows();
    // console.log(docUser)
  }, [docUser]);
  return (
    <div className="table-responsive">
      <table
        class="table table-condensed table-hover table-striped"
        {...getTableProps()}
        style={{ border: "solid 1px white", textAlign: "center" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px white",
                    alignContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "solid 2px white",
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
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
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
    </div>
  );
}
