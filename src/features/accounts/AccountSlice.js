import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action){
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action){
      state.balance -= action.payload;
    },
    requestLoan:{
      prepare(amount, purpose){
        return{
          payload: {amount, purpose}
        }
      },
    reducer(state, action){
      if(state.loan > 0) return state;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    }},
    payLoan(state){
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state){
      state.isLoading = true;
    }
  }
});
console.log(accountSlice);

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  } else {
    //if Redux sees this function : is knows that this is the synchronous action we want to execute before dispatching anything to the store
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      // API Call
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      console.log(data);
      const converted = data.rates.USD;

      // Return action
      dispatch({ type: "account/deposit", payload: converted });
    };
  }
}
export default accountSlice.reducer;
