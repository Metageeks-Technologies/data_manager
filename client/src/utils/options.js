export const statusOptions = ["Regular", "Outstanding", "I.R.M","R.M"];
export const placeOptions = ["Goa","Delhi","Ajmer"];
export const memberOptions=["Purchaser"];
export const companyOptions=["DRIPL"];
export const yearsOption=[];
const minYear = 1980;
const maxYear =  new Date().getFullYear();

for (let year = minYear; year <= maxYear; year++) {
    yearsOption.push(year.toString());
}

