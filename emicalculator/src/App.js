import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Pie } from "react-chartjs-2";
import { useState } from "react";
import "./App.css";
import Table from "./Table";

const PrettoSlider = withStyles({
  root: { color: "#ed8c2b", height: 10 },
  thumb: {
    height: 25,
    width: 25,
    backgroundColor: "#ed8c2b",
    border: "3px solid #ed8c2b",
    marginTop: -9,
    marginLeft: -9
  },
  track: { height: 10, borderRadius: 4 },
  rail: { height: 10, borderRadius: 4 }
})(Slider);

export default function App() {
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [duration, setDuration] = useState(0);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);
  const [input3, setInput3] = useState(0);
  const [nemi, setNEMI] = useState("");
  const [amt, setAMT] = useState("");
  const [tAMT, setTAMT] = useState(1355584);
  const [submit, setSubmit] = useState(false);
  const [table, setTable] = useState([]);
  const maxValue = 1000000;
  const intMax = 26;
  const maxDuration = 84;
  let intr;
  let emi;
  let totalAmt;
  var TotalAmountofCredit;
  let TotalAmountofInterest;
  function oneChangeHandler(e) {
    setInput1(e.target.value);
    setPrincipleAmount(e.target.value);
  }
  function twoChangeHandler(e) {
    setInput2(e.target.value);
    setInterest(e.target.value);
  }
  function threeChangeHandler(e) {
    setInput3(e.target.value);
    setDuration(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    setSubmit(true);
    intr = interest / 1200;
    emi = duration
      ? Math.round(
          (principleAmount * intr) / (1 - Math.pow(1 / (1 + intr), duration))
        )
      : 0;
    setNEMI(emi);
    totalAmt = duration * emi;
    setAMT(totalAmt);
    TotalAmountofCredit = Math.round(
      (emi / intr) * (1 - Math.pow(1 + intr, -duration))
    );

    TotalAmountofInterest = Math.round(totalAmt - TotalAmountofCredit);
    setTAMT(TotalAmountofInterest);

    // data using for table
    let month = 1; 
    let principlePayableAmout = principleAmount/duration;
    let payableInerest = principleAmount * (interest/100);
    let balanceLeft = principleAmount - principlePayableAmout;
    let totalAmountPAid = principlePayableAmout;
    let amountLoadPaid = (totalAmountPAid/principleAmount) * 100+ "%";
    let newTable = [];
    for (let i = 0; i < balanceLeft; i++) {
      let data;
      data = {
        month: month,
        monthlyPaid: principlePayableAmout,
        interest: payableInerest,
        totalPaid: totalAmountPAid,
        balanceLeft: balanceLeft,
        loanPaid: amountLoadPaid
      }
      newTable.push(data)
      month++;
      balanceLeft = balanceLeft - principlePayableAmout;
      totalAmountPAid = totalAmountPAid + principlePayableAmout;
      amountLoadPaid = (totalAmountPAid/principleAmount) * 100+ "%";
      if(balanceLeft=== 0){
        data = {
          month: month,
          monthlyPaid: principlePayableAmout,
          interest: payableInerest,
          totalPaid: totalAmountPAid,
          balanceLeft: balanceLeft,
          loanPaid: amountLoadPaid
        }
        newTable.push(data)
      }     
    }
    setTable(newTable);
  }
  return (
    <>
    <div className="App">
      <div className="CalApp">
        <h2 className="CalHeading">EMI Calculator</h2>
        <form>
        <div>
          <Typography gutterBottom>
            <strong>Loan Amount</strong>
          </Typography>
          <input
            type="text"
            onChange={oneChangeHandler}
            style={{ width: "100%" }}
            value={input1}
          />
          <PrettoSlider
            value={principleAmount}
            onChange={(event, vAmt) => {
              setPrincipleAmount(vAmt);
              setInput1(vAmt);
            }}
            defaultValue={principleAmount}
            max={maxValue}
          />
        </div>
        <div>
          <Typography gutterBottom>
            <strong>Interest</strong>
          </Typography>
          <input
            type="text"
            onChange={twoChangeHandler}
            value={input2}
            style={{ width: "100%" }}
          />
          <PrettoSlider
            value={interest}
            onChange={(event, vInt) => {
              setInterest(vInt);
              setInput2(vInt);
            }}
            defaultValue={interest}
            max={intMax}
          />
        </div>
        <div>
          <Typography gutterBottom>
            <strong>Duration</strong>
          </Typography>
          <input
            type="text"
            onChange={threeChangeHandler}
            value={input3}
            style={{ width: "100%" }}
          />
          <PrettoSlider
            value={duration}
            onChange={(event, vDur) => {
              setDuration(vDur);
              setInput3(vDur);
            }}
            defaultValue={duration}
            max={maxDuration}
          />
        </div>
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
        </form>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div>
            <h4>Loan EMI</h4>
            <p>{nemi}</p>
          </div>
          <div>
            <h4>Total Interest Payable</h4>
            <p>{submit ? tAMT : ""}</p>
          </div>
          <div>
            <h4>Total Payment(Principal + Interest)</h4>
            <p>{amt}</p>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <Pie
            data={{
              labels: ["Principle Loan Amount", "Total Interest"],
              datasets: [
                {
                  data: [principleAmount, tAMT],
                  backgroundColor: ["orange", "green"]
                }
              ]
            }}
            width={200}
            height={200}
          />
        </div>
      </div>
    <div className="loanTable">
      <Table tableData={table}></Table>
    </div>
    </div>
    </>
  );
}
