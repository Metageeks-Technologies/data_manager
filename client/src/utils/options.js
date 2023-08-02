// export const statusOptions = ["Regular", "Outstanding", "I.R.M","R.M"];
// export const placeOptions = ["Goa","Delhi","Ajmer"];
// export const memberOptions=["Purchaser"];
// export const companyOptions=["DRIPL"];
export const editStatusOption=["pending","rejected","approved",]
export const yearsOption=[]; 
const minYear = 1980;
const maxYear =  new Date().getFullYear();

for (let year = minYear; year <= maxYear; year++) {
    yearsOption.push(year.toString());
}
export const loginImgOption=[
    {
        id:1,
        src:"https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id:2,
        src:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
        id:3,
        src:"https://images.unsplash.com/photo-1623039003809-784a7ff2d33f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
        id:4,
        src:"https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
]

