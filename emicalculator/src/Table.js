import React from 'react'

function Table(props) {
    return (
    <table>
    <tr>
      <th>Month</th>
      <th>Priciple(B)</th>
      <th>Interest(B)</th>
      <th>Total(A+B)</th>
      <th>Balance</th>
      <th>Loan Paid Till Date</th>
    </tr>
    {props.tableData?.map(data=>{
      return(
      <tr key={data.balanceLeft}>
        <td>{data.month}</td>
        <td>{data.monthlyPaid}</td>
        <td>{data.interest}</td>
        <td>{data.totalPaid}</td>
        <td>{data.balanceLeft}</td>
        <td>{data.loanPaid}</td>
      </tr>
        ) 
    })}
  </table>
  )
}

export default Table
