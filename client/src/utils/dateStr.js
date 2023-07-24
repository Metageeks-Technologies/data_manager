

const dateStr = (date) => {
    console.log(date)
    const createdAtDate = new Date(date);
            const today=new Date().getDate();
            let day =createdAtDate.getDate();
            const month = createdAtDate.getMonth() + 1; // Months are zero-based, so we add 1
            const year = createdAtDate.getFullYear();
            let hours = createdAtDate.getHours();
            const minutes = createdAtDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            if (hours > 12) {
                hours -= 12;
              } else if (hours === 0) {
                hours = 12;
              }
            if(day===today) {
                day="today"
            } else{
                day=`${day}.${month}.${year}`
            }
           return `${hours}:${minutes} ${ampm} ${day} `;
}

export default dateStr
