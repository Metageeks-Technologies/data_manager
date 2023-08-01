# data_manager
DRI Data Management by Shiva
## here is how the format of the exel file should be;
* there should be no extra or blank row above or below the sheet if any remove it.
* there should be no extra or blank columm between the main coulmn or headers.
* the headers should follow the this naming pattern strictly (even extra spases).
  `const documentData = {
            dri_id: row["DRI-ID"],
            place: row["Place"],
            appNumber: row["APP No."],
            company: row["Company"],
            membership_type: row["Membership\nType"] || row["Membership Type"],
            amc: row["AMC"],
            customerName: row["CUSTOMER NAME"],
            GSV: row[' GSV '],
            CSV: row[' CSV '],
            deposit: row[' Deposit '],
            status: row[' Status '],
            currentValue: row["Current Value"],
            remarks: row[" Remarks "],
            date: row["Year Of Purchase"],
          };`
* [Here is actual code](https://github.com/Metageeks-Technologies/data_manager/blob/main/server/controllers/mainDataControllers.js) 
* please pay extra attention on **remarks** and **customer name**
* if there is extra charrecter like **|** with the headres then remove it eg **|Customer name** is wrong and **Customer name** right.

Hoper it will help you while uploading.
by Shiva :smiley:

