export const dateFormatter = (updatedAt) => {
    const date = new Date(updatedAt);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    // console.log('formattedDate', formattedDate)

    const [, dateString, time] = formattedDate.match(/(.+),\s(.+)/);
    const [, hour, minute, amOpm] = time.match(/(\d+):(\d+)\s(.+)/);

    return { hour, minute, amOpm };
}