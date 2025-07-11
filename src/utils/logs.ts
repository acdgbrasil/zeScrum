export const formatedDatePtBr = () => {
  const date = new Date(Date.now()).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const [day, month, restOfStringData] = date.split("/");
  const [year, time] = restOfStringData.split(", ");
  const [hour, minute, second] = time.split(":");
  const yesterdayComplet = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const [yDay, yMonth, yRestOfStringData] = yesterdayComplet.split("/");
  const [yYear, yTime] = yRestOfStringData.split(", ");
  const [yHour, yMinute, ySecond] = yTime.split(":");

  return {
    raw: date,
    yRaw: yesterdayComplet,
    dateFormat: {
      "day_month_year": `${day}/${month}/${year}`,
      "day_month_year_hour_minutes_secounds":
        `${day}/${month}/${year} ${hour}:${minute}:${second}`,
      "day_month_year_hour_minutes":
        `${day}/${month}/${year} ${hour}:${minute}`,
      "day_month_year_hour": `${day}/${month}/${year} ${hour}`,
      "day_month_year_hour_minutes_secounds_with_dash":
        `${day}-${month}-${year} ${hour}:${minute}:${second}`,
      "day_month_year_hour_minutes_with_dash":
        `${day}-${month}-${year} ${hour}:${minute}`,
      "day_month_year_hour_with_dash": `${day}-${month}-${year} ${hour}`,
      "day_month_year_with_dash": `${day}-${month}-${year}`,
      "day_month_year_with_dash_yesterday": `${yDay}-${month}-${year}`,
      genericFormat:
        ((
          date: Date,
          localeValue?: string,
          options?: Intl.DateTimeFormatOptions,
        ) => date.toLocaleDateString(localeValue, options)),
    },
    dateIndividual: {
      int: {
        day: Number(day),
        month: Number(month),
        year: Number(year),
        hour: Number(hour),
        minute: Number(minute),
        second: Number(second),
      },
      string: {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        second: second,
      },
    },

    yDateIndividual: {
      int: {
        day: Number(yDay),
        month: Number(yMonth),
        year: Number(yYear),
        hour: Number(yHour),
        minute: Number(yMinute),
        second: Number(ySecond),
      },
      string: {
        day: yDay,
        month: yMonth,
        year: yYear,
        hour: yHour,
        minute: yMinute,
        second: ySecond,
      },
    },
  };
};

export const messageWithDate = (mesage: string, _color?: string) => {
    const dateFormated = formatedDatePtBr();
    const dayToYear = dateFormated.dateFormat.day_month_year_with_dash;
  console.log(
    `%c[${dayToYear}]: ` +
      `${mesage}`,
    `color:${_color ? _color : "white"}`,
  );
  return;
};
