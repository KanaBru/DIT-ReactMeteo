export const formatData = (data) => {
    const dataDaily = []

    const dataEntries = Object.keys(data)
    // console.log(dataEntries)

    dataEntries.forEach((key, keyIndex) => {
        for (let i = 0; i < data[key].length; i++) {
            // const element = array[i];
            if (keyIndex === 0) {
                dataDaily.push({})
            }

            const dayValue = data[key][i];
            // console.log(dayValue)
            dataDaily[i][key] = dayValue;
        }
    });

    dataDaily.forEach((data) => {
        const date = new Date(data.time);
        const dayIndex = date.getDay();
        data.Day = dates[dayIndex];
    });
    // console.log(dataDaily)
    return dataDaily;
};
const dates = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
]