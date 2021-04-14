import React from 'react';
import {
  CalendarCol,
  CalendarContainer,
  CalendarControlButton,
  CalendarController,
  CalendarDate,
  CalendarDateContainer,
  CalendarDateRow,
  CalendarDateTable,
  CalendarDescription,
  CalendarDescriptionContainer,
  CalendarHeadRow,
  CalendarWeekName,
  LeftArrow,
  RightArrow,
} from '@components/RecommendPage/Calendar/Calendar.style';
import TypeSelect from '@components/RecommendPage/TypeSelect/TypeSelect';

interface DateInfo {
  type: string;
  name: string;
  vncalendarname: string;
  start: string;
  end?: string;
}

interface CalendarProps {
  t: (s: string) => string;
  data: Array<DateInfo>;
}

const weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Ths', 'Fri', 'Sat'] as const;

const semester = ['봄', '가을'] as const;
type Semester = typeof semester[number];
const isSemeseter = (str: string): str is Semester => (semester as ReadonlyArray<string>).includes(str);

const useSelectSemester = (data: Array<DateInfo>) => {
  const [selectedSemester, setSelectedSemester] = React.useState<Semester>(semester[0]);
  const handleChangeTypeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (isSemeseter(value)) setSelectedSemester(value);
  };

  return {
    selectedSemester,
    selectedData: data.filter((dateInfo) => dateInfo.type === selectedSemester),
    handleChangeTypeSelect,
  };
};

const getNowISOString = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);

const getFirstDateOfCalendar = (date: Date) => {
  const selectedDate = new Date(date);
  const dayOfFirstDateOfMonth = selectedDate.getDay();
  if (dayOfFirstDateOfMonth !== 0) selectedDate.setDate(-dayOfFirstDateOfMonth + 1);
  return selectedDate;
};

const initialStartDate = (dateString?: string) => {
  const startDateString = dateString ?? getNowISOString();
  const selectedDate = new Date(startDateString);
  selectedDate.setDate(1);
  return selectedDate;
};

const getDateTime = (dateString?: string) => (dateString ? new Date(dateString).getTime() : -1);

const createGetCurrentDateInfo = (selectedSemesterData: Array<DateInfo>, date: Date) => {
  const selectedMonth = date.getMonth();
  const dateController = getFirstDateOfCalendar(date);
  let count = selectedSemesterData.findIndex((data) =>
    data.end ? new Date(data.end).getTime() >= date.getTime() : new Date(data.start).getTime() >= date.getTime(),
  );

  if (count === -1) count = 0;

  let startDateTime = getDateTime(selectedSemesterData?.[count].start);
  let endDateTime = getDateTime(selectedSemesterData?.[count]?.end);
  return () => {
    const currentDateNumber = dateController.getDate();
    const isContainedCurrentMonth = dateController.getMonth() !== selectedMonth;
    const selectedDateTime = dateController.getTime();
    let isStartDate = false;
    let isInRange = -1;
    let isEndDate = false;
    if (endDateTime === -1 && selectedDateTime === startDateTime) {
      isInRange = count;
      isStartDate = true;
      isEndDate = true;
    } else if (selectedDateTime >= startDateTime && selectedDateTime <= endDateTime) {
      isInRange = count;
      if (selectedDateTime === startDateTime) isStartDate = true;
      if (selectedDateTime === endDateTime) {
        isEndDate = true;
        count !== selectedSemesterData.length - 1 ? count++ : null;
        startDateTime = getDateTime(selectedSemesterData?.[count].start);
        endDateTime = getDateTime(selectedSemesterData?.[count]?.end);
      }
    }
    dateController.setDate(currentDateNumber + 1);

    return {
      date: currentDateNumber,
      disabled: isContainedCurrentMonth,
      isStartDate,
      isInRange,
      isEndDate,
    };
  };
};

// DateInfo 의 날짜 범위는 겹치지 않아야 한다.
const useDateInfoArray = (selectedSemesterData: Array<DateInfo>, selectedSemester: Semester) => {
  const [selectedDate, setSelectedDate] = React.useState(() => initialStartDate(selectedSemesterData?.[0].start));

  React.useEffect(() => {
    setSelectedDate(initialStartDate(selectedSemesterData?.[0].start));
  }, [selectedSemester]);
  const nextMonthSelectedDate = new Date(selectedDate);
  nextMonthSelectedDate.setMonth(nextMonthSelectedDate.getMonth() + 1);
  const nextCalendar = () => {
    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setMonth(newSelectedDate.getMonth() + 1);
    setSelectedDate(newSelectedDate);
  };

  const previousCalendar = () => {
    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setMonth(newSelectedDate.getMonth() - 1);
    setSelectedDate(newSelectedDate);
  };
  const getFirstCalendarInfo = createGetCurrentDateInfo(selectedSemesterData, selectedDate);
  const getSecondCalendarInfo = createGetCurrentDateInfo(selectedSemesterData, nextMonthSelectedDate);

  return {
    calendars: [
      {
        formattedDate: selectedDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        calendar: Array.from({ length: 6 }, () => Array.from({ length: 7 })).map((row) =>
          row.map(getFirstCalendarInfo),
        ),
      },
      {
        formattedDate: nextMonthSelectedDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        calendar: Array.from({ length: 6 }, () => Array.from({ length: 7 })).map((row) =>
          row.map(getSecondCalendarInfo),
        ),
      },
    ],
    nextCalendar,
    previousCalendar,
  };
};

const Calendar: React.VFC<CalendarProps> = ({ t, lang, data }) => {
  const dateNullData = data.filter(({ start, end }) => start === null || end === null);
  const filteredData = data.filter((elem) => !dateNullData.includes(elem));

  const { selectedData, selectedSemester, handleChangeTypeSelect } = useSelectSemester(filteredData);
  const { nextCalendar, previousCalendar, calendars } = useDateInfoArray(selectedData, selectedSemester);

  return (
    <>
      <TypeSelect
        t={t}
        name="calender-semester"
        value={selectedSemester}
        typeFooter="학기"
        types={semester}
        onChange={handleChangeTypeSelect}
      />
      {calendars.map((calendarInfo) => (
        <CalendarContainer key={calendarInfo.formattedDate}>
          <CalendarController>
            <CalendarControlButton onClick={previousCalendar}>
              <LeftArrow />
            </CalendarControlButton>
            {calendarInfo.formattedDate}
            <CalendarControlButton onClick={nextCalendar}>
              <RightArrow />
            </CalendarControlButton>
          </CalendarController>
          <CalendarHeadRow>
            {weekName.map((value) => (
              <CalendarWeekName key={value}>{value}</CalendarWeekName>
            ))}
          </CalendarHeadRow>
          <CalendarDateTable>
            <CalendarDateContainer>
              {calendarInfo.calendar.map((week, weekIndex) => (
                <CalendarDateRow key={week[0].date + weekIndex}>
                  {week.map((date) => (
                    <CalendarCol
                      key={date.date}
                      disabled={date.disabled}
                      isStartDate={date.isStartDate}
                      isEndDate={date.isEndDate}
                      isInRange={date.isInRange}
                    >
                      <CalendarDate>{!date.disabled ? date.date : null}</CalendarDate>
                    </CalendarCol>
                  ))}
                </CalendarDateRow>
              ))}
            </CalendarDateContainer>
          </CalendarDateTable>
        </CalendarContainer>
      ))}
      <CalendarDescriptionContainer>
        {selectedData.map((data, index) => (
          <CalendarDescription key={data.name} index={index}>
            {lang === 'ko' ? data.name : data.vncalendarname}
          </CalendarDescription>
        ))}
        {dateNullData.map((data, index) => (
          <CalendarDescription key={data.name} index={index + selectedData.length}>
            {lang === 'ko' ? data.name : data.vncalendarname}
          </CalendarDescription>
        ))}
      </CalendarDescriptionContainer>
    </>
  );
};

export default Calendar;
