import * as React from 'react';
import {
  CalendarContainer,
  CalendarController,
  CalendarDate,
  CalendarDateContainer,
  CalendarDateRow,
  CalendarDateTable,
  CalendarDescription,
  CalendarHeadRow,
  CalendarWeekName,
} from '@components/RecommendPage/Calendar/Calendar.style';

interface CalendarProps {
  startDate: string;
  endDate: string;
}

const weekName = ['일', '월', '화', '수', '목', '금', '토'];

const useMonthControl = (initialDateString: string): [Date, () => void, () => void] => {
  const [selectedDate, setSelectaedDate] = React.useState<Date>(new Date());

  const setPreviousMonth = () => {};

  const setNextMonth = () => {};

  React.useEffect(() => {
    const initialDate = new Date(initialDateString);
    initialDate.setDate(1);
    setSelectaedDate(initialDate);
  }, [initialDateString]);

  return [selectedDate, setPreviousMonth, setNextMonth];
};

interface DateInfo {
  date: number;
  disabled: boolean;
  isStartDate: boolean;
  isInRange: boolean;
  isEndDate: boolean;
}

const useDateInfoArray = (
  initialSelectedDate: Date,
  startDateString: string,
  endDateString: string,
): Array<Array<DateInfo>> => {
  const selectedDate = new Date(initialSelectedDate);
  const startDateTime = new Date(startDateString).getTime();
  const endDateTime = new Date(endDateString).getTime();

  const selectedMonth = initialSelectedDate.getMonth();
  const dayOfFirstDateOfMonth = selectedDate.getDay();
  if (dayOfFirstDateOfMonth !== 0) selectedDate.setDate(-dayOfFirstDateOfMonth + 1);

  function getCurrentDateInfo(): DateInfo {
    const currentDateNumber = selectedDate.getDate();
    const isContainedCurrentMonth = selectedDate.getMonth() === selectedMonth;
    const selectedDateTime = selectedDate.getTime();
    let isStartDate = false;
    let isInRange = false;
    let isEndDate = false;

    if (selectedDateTime >= startDateTime && selectedDateTime <= endDateTime) {
      isInRange = true;

      if (selectedDateTime === startDateTime) isStartDate = true;
      if (selectedDateTime === endDateTime) isEndDate = true;
    }

    selectedDate.setDate(currentDateNumber + 1);

    return {
      date: currentDateNumber,
      disabled: !isContainedCurrentMonth,
      isStartDate,
      isInRange,
      isEndDate,
    };
  }

  const dateArray = Array
    .from(
      { length: 5 },
      () => Array.from({ length: 7 }))
    .map((row) => row.map(getCurrentDateInfo));

  if (selectedDate.getMonth() === selectedMonth) {
    const lastWeek = Array.from({ length: 7 }).map(getCurrentDateInfo);

    dateArray.push(lastWeek);
  }

  return dateArray;
};

const Calendar: React.VFC<CalendarProps> = ({ startDate, endDate }) => {
  const [selectedDate] = useMonthControl(startDate);
  const dateArray = useDateInfoArray(selectedDate, startDate, endDate);
  const selectedDateString = `${selectedDate.getFullYear()} ${selectedDate.getMonth() + 1}월`;

  return (
    <CalendarContainer>
      <CalendarController>{selectedDateString}</CalendarController>
      <CalendarHeadRow>
        {weekName.map((value) => (
          <CalendarWeekName key={value}>{value}</CalendarWeekName>
        ))}
      </CalendarHeadRow>
      <CalendarDateTable>
        <CalendarDateContainer>
          {dateArray.map((week, weekIndex) => (
            <CalendarDateRow key={week[0].date + weekIndex}>
              {week.map((date) => (
                <CalendarDate
                  key={date.date}
                  disabled={date.disabled}
                  isStartDate={date.isStartDate}
                  isEndDate={date.isEndDate}
                  isInRange={date.isInRange}
                >
                  {!date.disabled ? date.date : null}
                </CalendarDate>
              ))}
            </CalendarDateRow>
          ))}
        </CalendarDateContainer>
      </CalendarDateTable>
      <CalendarDescription>= 신입생 모집기간</CalendarDescription>
    </CalendarContainer>
  );
};

export default Calendar;
